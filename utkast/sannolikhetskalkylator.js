/* Sannolikhetskalkylator — Fysiklabbet
 *
 * Motsvarar sannolikhetskalkylatorn i Geogebra: fördelning, parametrar,
 * fyra intervalltyper (öppet åt vänster, intervall, intervallkomplement,
 * öppet åt höger), omvänd beräkning från en andel, kumulativ vy,
 * normalapproximation, värdetabell och en statistikflik med z-test, t-test,
 * konfidensintervall och chitvåtest. Utöver det: reglage, gränser som dras i
 * grafen, jämförelse av två kurvor, simulerade stickprov, exempel med riktiga
 * data och en färdig redovisningsrad.
 *
 * Sektioner:
 *   1. Specialfunktioner (normalfördelning, gamma, beta)
 *   2. Fördelningarna
 *   3. Talformat och inläsning
 *   4. Exempel med riktiga data
 *   5. Tillstånd
 *   6. Grafen (ritas som SVG-sträng, används både live och vid export)
 *   7. Panelerna
 *   8. Statistikfliken
 *   9. Pekare, zoom och vy
 *  10. Export, delning och start
 *
 * Beteckningarna följer ma2c-6.5: medelvärdet μ, standardavvikelsen σ, och
 * intervalltyperna heter som i genomgångens tabell.
 */
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ================= 1. Specialfunktioner ================= */
const SQ2PI = Math.sqrt(2 * Math.PI);
// Standardnormalfördelningens fördelningsfunktion (Hart 1968 i Wests form,
// dubbel precision). Svansarna räknas direkt, utan 1 − c-förlust.
function Phi(x) {
  const ax = Math.abs(x);
  let c;
  if (ax > 37) c = 0;
  else {
    const e = Math.exp(-ax * ax / 2);
    if (ax < 7.07106781186547) {
      let b = 3.52624965998911e-2 * ax + 0.700383064443688;
      b = b * ax + 6.37396220353165; b = b * ax + 33.912866078383; b = b * ax + 112.079291497871;
      b = b * ax + 221.213596169931; b = b * ax + 220.206867912376;
      c = e * b;
      b = 8.83883476483184e-2 * ax + 1.75566716318264; b = b * ax + 16.064177579207;
      b = b * ax + 86.7807322029461; b = b * ax + 296.564248779674; b = b * ax + 637.333633378831;
      b = b * ax + 793.826512519948; b = b * ax + 440.413735824752;
      c /= b;
    } else {
      let b = ax + 0.65; b = ax + 4 / b; b = ax + 3 / b; b = ax + 2 / b; b = ax + 1 / b;
      c = e / b / 2.506628274631;
    }
  }
  return x > 0 ? 1 - c : c;
}
// Inversen (Acklam) med ett Halley-steg, symmetriskt så att övre svansen
// behåller precisionen.
function PhiInv(p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p > 0.5) return -PhiInv(1 - p);
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  let x;
  if (p < 0.02425) {
    const q = Math.sqrt(-2 * Math.log(p));
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else {
    const q = p - 0.5, r = q * q;
    x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const e = Phi(x) - p, u = e * SQ2PI * Math.exp(x * x / 2);
  return x - u / (1 + x * u / 2);
}
const LG = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
function lgamma(x) {
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
  x -= 1;
  let a = LG[0];
  const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += LG[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
const gammaFn = x => Math.exp(lgamma(x));
function gser(a, x) {
  let ap = a, sum = 1 / a, del = sum;
  for (let n = 0; n < 100000; n++) { ap += 1; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-16) break; }
  return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
}
function gcf(a, x) {
  const TINY = 1e-300;
  let b = x + 1 - a, c = 1 / TINY, d = 1 / b, h = d;
  for (let i = 1; i < 100000; i++) {
    const an = -i * (i - a); b += 2;
    d = an * d + b; if (Math.abs(d) < TINY) d = TINY;
    c = b + an / c; if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-16) break;
  }
  return Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}
// Regulariserade ofullständiga gammafunktionen P(a, x) och Q = 1 − P.
const gammaP = (a, x) => x <= 0 ? 0 : x < a + 1 ? gser(a, x) : 1 - gcf(a, x);
const gammaQ = (a, x) => x <= 0 ? 1 : x < a + 1 ? 1 - gser(a, x) : gcf(a, x);
function betacf(x, a, b) {
  const TINY = 1e-300, qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1, d = 1 - qab * x / qap;
  if (Math.abs(d) < TINY) d = TINY;
  d = 1 / d; let h = d;
  for (let m = 1; m <= 100000; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < TINY) d = TINY;
    c = 1 + aa / c; if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < TINY) d = TINY;
    c = 1 + aa / c; if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-16) break;
  }
  return h;
}
const lnB = (a, b) => lgamma(a) + lgamma(b) - lgamma(a + b);
// Regulariserade ofullständiga betafunktionen I_x(a, b).
function betaI(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(-lnB(a, b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? bt * betacf(x, a, b) / a : 1 - bt * betacf(1 - x, b, a) / b;
}
const lnC = (n, k) => lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);

/* ================= 2. Fördelningarna ================= */
// Parametrarnas sorter styr reglagens intervall: loc (läge), pos (positiv
// skala eller form), prob (sannolikhet), int (heltal), df (frihetsgrader).
const I = s => `<i>${s}</i>`;
const P = (k, sym, label, def, kind, o) => Object.assign({ k, sym, label, def, kind }, o || {});
const tInfo = nu => ({ lc: Math.exp(lgamma((nu + 1) / 2) - lgamma(nu / 2)) / Math.sqrt(nu * Math.PI) });

const DISTS = {
  normal: {
    name: 'Normalfördelning', kind: 'kont', grp: 'vanlig',
    params: [P('mu', I('μ'), 'Medelvärde', '0', 'loc'), P('sigma', I('σ'), 'Standardavvikelse', '1', 'pos')],
    valid: p => p.sigma > 0 ? '' : 'Standardavvikelsen måste vara större än 0.',
    mean: p => p.mu, sd: p => p.sigma,
    pdf: (x, p) => Math.exp(-0.5 * ((x - p.mu) / p.sigma) ** 2) / (p.sigma * SQ2PI),
    cdf: (x, p) => Phi((x - p.mu) / p.sigma),
    sf: (x, p) => Phi((p.mu - x) / p.sigma),
    q: (u, p) => p.mu + p.sigma * PhiInv(u),
    qu: (u, p) => p.mu - p.sigma * PhiInv(u),
    supp: () => [-Infinity, Infinity],
    view: p => [p.mu - 4 * p.sigma, p.mu + 4 * p.sigma],
    rand: p => p.mu + p.sigma * randn(),
    tex: 'f(x) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
  },
  binom: {
    name: 'Binomialfördelning', kind: 'disk', grp: 'vanlig',
    params: [P('n', I('n'), 'Antal försök', '20', 'int', { min: 1 }), P('p', I('p'), 'Sannolikhet per försök', '0,5', 'prob')],
    valid: p => !(Number.isInteger(p.n) && p.n >= 1) ? 'Antalet försök måste vara ett positivt heltal.' : !(p.p > 0 && p.p < 1) ? 'Sannolikheten måste ligga mellan 0 och 1.' : p.n > 1e6 ? 'Välj högst 1 000 000 försök.' : '',
    mean: p => p.n * p.p, sd: p => Math.sqrt(p.n * p.p * (1 - p.p)),
    lo: () => 0, hi: p => p.n,
    pmf: (k, p) => (k < 0 || k > p.n) ? 0 : Math.exp(lnC(p.n, k) + k * Math.log(p.p) + (p.n - k) * Math.log(1 - p.p)),
    cdf: (k, p) => k < 0 ? 0 : k >= p.n ? 1 : betaI(1 - p.p, p.n - k, k + 1),
    ge: (k, p) => k <= 0 ? 1 : k > p.n ? 0 : betaI(p.p, k, p.n - k + 1),
    tex: 'P(X = k) = \\dbinom{n}{k}\\,p^k\\,(1-p)^{n-k}',
  },
  poisson: {
    name: 'Poissonfördelning', kind: 'disk', grp: 'vanlig',
    params: [P('lam', I('λ'), 'Medelvärde', '3', 'pos')],
    valid: p => p.lam > 0 ? (p.lam > 1e6 ? 'Välj ett medelvärde under 1 000 000.' : '') : 'Medelvärdet måste vara större än 0.',
    mean: p => p.lam, sd: p => Math.sqrt(p.lam),
    lo: () => 0, hi: () => Infinity,
    pmf: (k, p) => k < 0 ? 0 : Math.exp(k * Math.log(p.lam) - p.lam - lgamma(k + 1)),
    cdf: (k, p) => k < 0 ? 0 : gammaQ(k + 1, p.lam),
    ge: (k, p) => k <= 0 ? 1 : gammaP(k, p.lam),
    tex: 'P(X = k) = \\dfrac{\\lambda^k\\,e^{-\\lambda}}{k!}',
  },
  exp: {
    name: 'Exponentialfördelning', kind: 'kont', grp: 'vanlig',
    params: [P('lam', I('λ'), 'Intensitet', '1', 'pos')],
    valid: p => p.lam > 0 ? '' : 'Intensiteten måste vara större än 0.',
    mean: p => 1 / p.lam, sd: p => 1 / p.lam,
    pdf: (x, p) => x < 0 ? 0 : p.lam * Math.exp(-p.lam * x),
    cdf: (x, p) => x <= 0 ? 0 : -Math.expm1(-p.lam * x),
    sf: (x, p) => x <= 0 ? 1 : Math.exp(-p.lam * x),
    q: (u, p) => -Math.log1p(-u) / p.lam,
    qu: (u, p) => -Math.log(u) / p.lam,
    supp: () => [0, Infinity],
    view: p => [0, 6 / p.lam],
    tex: 'f(x) = \\lambda\\,e^{-\\lambda x},\\quad x \\ge 0',
  },
  unif: {
    name: 'Likformig fördelning', kind: 'kont', grp: 'vanlig',
    params: [P('a', I('a'), 'Minsta värde', '0', 'loc'), P('b', I('b'), 'Största värde', '1', 'loc')],
    valid: p => p.b > p.a ? '' : 'Det största värdet måste vara större än det minsta.',
    mean: p => (p.a + p.b) / 2, sd: p => (p.b - p.a) / Math.sqrt(12),
    pdf: (x, p) => (x < p.a || x > p.b) ? 0 : 1 / (p.b - p.a),
    cdf: (x, p) => x <= p.a ? 0 : x >= p.b ? 1 : (x - p.a) / (p.b - p.a),
    sf: (x, p) => x <= p.a ? 1 : x >= p.b ? 0 : (p.b - x) / (p.b - p.a),
    q: (u, p) => p.a + u * (p.b - p.a),
    supp: p => [p.a, p.b],
    view: p => [p.a - 0.2 * (p.b - p.a), p.b + 0.2 * (p.b - p.a)],
    tex: 'f(x) = \\dfrac{1}{b-a},\\quad a \\le x \\le b',
  },
  t: {
    name: 't-fördelning', html: I('t') + '-fördelning', kind: 'kont', grp: 'stat',
    params: [P('nu', I('ν'), 'Frihetsgrader', '10', 'df')],
    valid: p => p.nu > 0 ? '' : 'Antalet frihetsgrader måste vara större än 0.',
    mean: p => p.nu > 1 ? 0 : NaN, sd: p => p.nu > 2 ? Math.sqrt(p.nu / (p.nu - 2)) : (p.nu > 1 ? Infinity : NaN),
    pdf: (x, p) => tInfo(p.nu).lc * Math.pow(1 + x * x / p.nu, -(p.nu + 1) / 2),
    cdf: (x, p) => { const h = 0.5 * betaI(p.nu / (p.nu + x * x), p.nu / 2, 0.5); return x > 0 ? 1 - h : h; },
    sf: (x, p) => { const h = 0.5 * betaI(p.nu / (p.nu + x * x), p.nu / 2, 0.5); return x > 0 ? h : 1 - h; },
    supp: () => [-Infinity, Infinity],
    view: p => { const w = Math.min(10, Math.max(4, quant(DISTS.t, p, 0.005, true))); return [-w, w]; },
    rand: p => randn() / Math.sqrt(randGamma(p.nu / 2) * 2 / p.nu),
    tex: 'f(x) = \\dfrac{\\Gamma\\left(\\frac{\\nu+1}{2}\\right)}{\\sqrt{\\nu\\pi}\\;\\Gamma\\left(\\frac{\\nu}{2}\\right)}\\left(1+\\dfrac{x^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}',
  },
  chi2: {
    name: 'Chitvåfördelning', html: I('χ') + '<sup>2</sup>-fördelning', kind: 'kont', grp: 'stat',
    params: [P('nu', I('ν'), 'Frihetsgrader', '4', 'df')],
    valid: p => p.nu > 0 ? '' : 'Antalet frihetsgrader måste vara större än 0.',
    mean: p => p.nu, sd: p => Math.sqrt(2 * p.nu),
    pdf: (x, p) => x <= 0 ? (p.nu < 2 ? Infinity : p.nu === 2 ? 0.5 : 0) : Math.exp((p.nu / 2 - 1) * Math.log(x) - x / 2 - (p.nu / 2) * Math.LN2 - lgamma(p.nu / 2)),
    cdf: (x, p) => gammaP(p.nu / 2, x / 2),
    sf: (x, p) => gammaQ(p.nu / 2, x / 2),
    supp: () => [0, Infinity],
    view: p => [0, quant(DISTS.chi2, p, 0.001, true)],
    rand: p => 2 * randGamma(p.nu / 2),
    tex: 'f(x) = \\dfrac{x^{\\nu/2-1}\\,e^{-x/2}}{2^{\\nu/2}\\,\\Gamma(\\nu/2)},\\quad x > 0',
  },
  f: {
    name: 'F-fördelning', html: I('F') + '-fördelning', kind: 'kont', grp: 'stat',
    params: [P('d1', I('ν') + '<sub>1</sub>', 'Frihetsgrader i täljaren', '5', 'df'), P('d2', I('ν') + '<sub>2</sub>', 'Frihetsgrader i nämnaren', '10', 'df')],
    valid: p => (p.d1 > 0 && p.d2 > 0) ? '' : 'Frihetsgraderna måste vara större än 0.',
    mean: p => p.d2 > 2 ? p.d2 / (p.d2 - 2) : NaN,
    sd: p => p.d2 > 4 ? Math.sqrt(2 * p.d2 * p.d2 * (p.d1 + p.d2 - 2) / (p.d1 * (p.d2 - 2) ** 2 * (p.d2 - 4))) : NaN,
    pdf: (x, p) => x <= 0 ? (p.d1 < 2 ? Infinity : p.d1 === 2 ? 1 : 0) : Math.exp(0.5 * (p.d1 * Math.log(p.d1 * x) + p.d2 * Math.log(p.d2) - (p.d1 + p.d2) * Math.log(p.d1 * x + p.d2)) - Math.log(x) - lnB(p.d1 / 2, p.d2 / 2)),
    cdf: (x, p) => x <= 0 ? 0 : betaI(p.d1 * x / (p.d1 * x + p.d2), p.d1 / 2, p.d2 / 2),
    sf: (x, p) => x <= 0 ? 1 : betaI(p.d2 / (p.d2 + p.d1 * x), p.d2 / 2, p.d1 / 2),
    supp: () => [0, Infinity],
    view: p => [0, Math.min(quant(DISTS.f, p, 0.005, true), 12)],
    rand: p => (randGamma(p.d1 / 2) / p.d1) / (randGamma(p.d2 / 2) / p.d2),
    tex: 'f(x) = \\dfrac{1}{x\\,\\mathrm{B}\\left(\\frac{\\nu_1}{2},\\frac{\\nu_2}{2}\\right)}\\sqrt{\\frac{(\\nu_1 x)^{\\nu_1}\\,\\nu_2^{\\,\\nu_2}}{(\\nu_1 x+\\nu_2)^{\\nu_1+\\nu_2}}}',
  },
  cauchy: {
    name: 'Cauchyfördelning', kind: 'kont', grp: 'fler',
    params: [P('x0', I('x') + '<sub>0</sub>', 'Läge', '0', 'loc'), P('g', I('γ'), 'Skala', '1', 'pos')],
    valid: p => p.g > 0 ? '' : 'Skalan måste vara större än 0.',
    mean: () => NaN, sd: () => NaN, scale: p => p.g,
    pdf: (x, p) => 1 / (Math.PI * p.g * (1 + ((x - p.x0) / p.g) ** 2)),
    cdf: (x, p) => 0.5 + Math.atan((x - p.x0) / p.g) / Math.PI,
    sf: (x, p) => 0.5 - Math.atan((x - p.x0) / p.g) / Math.PI,
    q: (u, p) => p.x0 + p.g * Math.tan(Math.PI * (u - 0.5)),
    supp: () => [-Infinity, Infinity],
    view: p => [p.x0 - 8 * p.g, p.x0 + 8 * p.g],
    tex: 'f(x) = \\dfrac{1}{\\pi\\gamma\\left(1+\\left(\\frac{x-x_0}{\\gamma}\\right)^2\\right)}',
  },
  weibull: {
    name: 'Weibullfördelning', kind: 'kont', grp: 'fler',
    params: [P('k', I('k'), 'Form', '1,5', 'pos'), P('lam', I('λ'), 'Skala', '1', 'pos')],
    valid: p => (p.k > 0 && p.lam > 0) ? '' : 'Formen och skalan måste vara större än 0.',
    mean: p => p.lam * gammaFn(1 + 1 / p.k),
    sd: p => p.lam * Math.sqrt(Math.max(0, gammaFn(1 + 2 / p.k) - gammaFn(1 + 1 / p.k) ** 2)),
    pdf: (x, p) => x < 0 ? 0 : x === 0 ? (p.k < 1 ? Infinity : p.k === 1 ? 1 / p.lam : 0) : (p.k / p.lam) * Math.pow(x / p.lam, p.k - 1) * Math.exp(-Math.pow(x / p.lam, p.k)),
    cdf: (x, p) => x <= 0 ? 0 : -Math.expm1(-Math.pow(x / p.lam, p.k)),
    sf: (x, p) => x <= 0 ? 1 : Math.exp(-Math.pow(x / p.lam, p.k)),
    q: (u, p) => p.lam * Math.pow(-Math.log1p(-u), 1 / p.k),
    qu: (u, p) => p.lam * Math.pow(-Math.log(u), 1 / p.k),
    supp: () => [0, Infinity],
    view: p => [0, p.lam * Math.pow(-Math.log(0.001), 1 / p.k)],
    tex: 'f(x) = \\dfrac{k}{\\lambda}\\left(\\dfrac{x}{\\lambda}\\right)^{k-1}e^{-(x/\\lambda)^k},\\quad x \\ge 0',
  },
  gamma: {
    name: 'Gammafördelning', kind: 'kont', grp: 'fler',
    params: [P('k', I('k'), 'Form', '2', 'pos'), P('th', I('θ'), 'Skala', '1', 'pos')],
    valid: p => (p.k > 0 && p.th > 0) ? '' : 'Formen och skalan måste vara större än 0.',
    mean: p => p.k * p.th, sd: p => Math.sqrt(p.k) * p.th,
    pdf: (x, p) => x < 0 ? 0 : x === 0 ? (p.k < 1 ? Infinity : p.k === 1 ? 1 / p.th : 0) : Math.exp((p.k - 1) * Math.log(x) - x / p.th - lgamma(p.k) - p.k * Math.log(p.th)),
    cdf: (x, p) => gammaP(p.k, x / p.th),
    sf: (x, p) => gammaQ(p.k, x / p.th),
    supp: () => [0, Infinity],
    view: p => [0, quant(DISTS.gamma, p, 0.001, true)],
    rand: p => p.th * randGamma(p.k),
    tex: 'f(x) = \\dfrac{x^{k-1}\\,e^{-x/\\theta}}{\\Gamma(k)\\,\\theta^{k}},\\quad x > 0',
  },
  lognorm: {
    name: 'Lognormalfördelning', kind: 'kont', grp: 'fler',
    params: [P('mu', I('μ'), 'Medelvärde för ln X', '0', 'loc'), P('sigma', I('σ'), 'Standardavvikelse för ln X', '0,5', 'pos')],
    valid: p => p.sigma > 0 ? '' : 'Standardavvikelsen måste vara större än 0.',
    mean: p => Math.exp(p.mu + p.sigma * p.sigma / 2),
    sd: p => Math.sqrt(Math.expm1(p.sigma * p.sigma)) * Math.exp(p.mu + p.sigma * p.sigma / 2),
    pdf: (x, p) => x <= 0 ? 0 : Math.exp(-0.5 * ((Math.log(x) - p.mu) / p.sigma) ** 2) / (x * p.sigma * SQ2PI),
    cdf: (x, p) => x <= 0 ? 0 : Phi((Math.log(x) - p.mu) / p.sigma),
    sf: (x, p) => x <= 0 ? 1 : Phi((p.mu - Math.log(x)) / p.sigma),
    q: (u, p) => Math.exp(p.mu + p.sigma * PhiInv(u)),
    qu: (u, p) => Math.exp(p.mu - p.sigma * PhiInv(u)),
    supp: () => [0, Infinity],
    view: p => [0, Math.exp(p.mu + p.sigma * 3.1)],
    tex: 'f(x) = \\dfrac{1}{x\\,\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{(\\ln x-\\mu)^2}{2\\sigma^2}},\\quad x > 0',
  },
  logistic: {
    name: 'Logistisk fördelning', kind: 'kont', grp: 'fler',
    params: [P('mu', I('μ'), 'Medelvärde', '0', 'loc'), P('s', I('s'), 'Skala', '1', 'pos')],
    valid: p => p.s > 0 ? '' : 'Skalan måste vara större än 0.',
    mean: p => p.mu, sd: p => p.s * Math.PI / Math.sqrt(3),
    pdf: (x, p) => { const e = Math.exp(-Math.abs(x - p.mu) / p.s); return e / (p.s * (1 + e) ** 2); },
    cdf: (x, p) => 1 / (1 + Math.exp(-(x - p.mu) / p.s)),
    sf: (x, p) => 1 / (1 + Math.exp((x - p.mu) / p.s)),
    q: (u, p) => p.mu + p.s * Math.log(u / (1 - u)),
    supp: () => [-Infinity, Infinity],
    view: p => [p.mu - 8 * p.s, p.mu + 8 * p.s],
    tex: 'f(x) = \\dfrac{e^{-(x-\\mu)/s}}{s\\left(1+e^{-(x-\\mu)/s}\\right)^2}',
  },
  beta: {
    name: 'Betafördelning', kind: 'kont', grp: 'fler',
    params: [P('al', I('α'), 'Form', '2', 'pos'), P('be', I('β'), 'Form', '5', 'pos')],
    valid: p => (p.al > 0 && p.be > 0) ? '' : 'Båda formparametrarna måste vara större än 0.',
    mean: p => p.al / (p.al + p.be),
    sd: p => Math.sqrt(p.al * p.be / ((p.al + p.be) ** 2 * (p.al + p.be + 1))),
    pdf: (x, p) => (x < 0 || x > 1) ? 0 : (x === 0 ? (p.al < 1 ? Infinity : p.al === 1 ? p.be : 0) : x === 1 ? (p.be < 1 ? Infinity : p.be === 1 ? p.al : 0) : Math.exp((p.al - 1) * Math.log(x) + (p.be - 1) * Math.log(1 - x) - lnB(p.al, p.be))),
    cdf: (x, p) => betaI(x, p.al, p.be),
    sf: (x, p) => x <= 0 ? 1 : x >= 1 ? 0 : betaI(1 - x, p.be, p.al),
    supp: () => [0, 1],
    view: () => [-0.08, 1.08],
    rand: p => { const a = randGamma(p.al), b = randGamma(p.be); return a / (a + b); },
    tex: 'f(x) = \\dfrac{x^{\\alpha-1}(1-x)^{\\beta-1}}{\\mathrm{B}(\\alpha,\\beta)},\\quad 0 \\le x \\le 1',
  },
  pascal: {
    name: 'Pascalfördelning', kind: 'disk', grp: 'fler',
    params: [P('n', I('n'), 'Antal lyckade som krävs', '3', 'int', { min: 1 }), P('p', I('p'), 'Sannolikhet per försök', '0,4', 'prob')],
    valid: p => !(Number.isInteger(p.n) && p.n >= 1) ? 'Antalet lyckade måste vara ett positivt heltal.' : !(p.p > 0 && p.p < 1) ? 'Sannolikheten måste ligga mellan 0 och 1.' : '',
    mean: p => p.n * (1 - p.p) / p.p, sd: p => Math.sqrt(p.n * (1 - p.p)) / p.p,
    lo: () => 0, hi: () => Infinity,
    pmf: (k, p) => k < 0 ? 0 : Math.exp(lgamma(k + p.n) - lgamma(k + 1) - lgamma(p.n) + p.n * Math.log(p.p) + k * Math.log(1 - p.p)),
    cdf: (k, p) => k < 0 ? 0 : betaI(p.p, p.n, k + 1),
    ge: (k, p) => k <= 0 ? 1 : betaI(1 - p.p, k, p.n),
    note: 'Antalet misslyckade försök före det n:te lyckade.',
    tex: 'P(X = k) = \\dbinom{k+n-1}{k}\\,p^{n}(1-p)^{k}',
  },
  hyper: {
    name: 'Hypergeometrisk fördelning', kind: 'disk', grp: 'fler',
    params: [P('N', I('N'), 'Antal i populationen', '50', 'int', { min: 1 }), P('K', I('K'), 'Antal lyckade i populationen', '20', 'int', { min: 0 }), P('n', I('n'), 'Antal som dras', '10', 'int', { min: 1 })],
    valid: p => ![p.N, p.K, p.n].every(Number.isInteger) ? 'Alla tre värdena måste vara heltal.' : p.N < 1 ? 'Populationen måste rymma minst ett element.' : (p.K < 0 || p.K > p.N) ? 'Antalet lyckade måste ligga mellan 0 och populationens storlek.' : (p.n < 1 || p.n > p.N) ? 'Antalet dragna måste ligga mellan 1 och populationens storlek.' : p.N > 1e6 ? 'Välj en population på högst 1 000 000.' : '',
    mean: p => p.n * p.K / p.N,
    sd: p => p.N > 1 ? Math.sqrt(p.n * (p.K / p.N) * (1 - p.K / p.N) * (p.N - p.n) / (p.N - 1)) : 0,
    lo: p => Math.max(0, p.n - (p.N - p.K)), hi: p => Math.min(p.n, p.K),
    pmf: (k, p) => (k < Math.max(0, p.n - (p.N - p.K)) || k > Math.min(p.n, p.K)) ? 0 : Math.exp(lnC(p.K, k) + lnC(p.N - p.K, p.n - k) - lnC(p.N, p.n)),
    note: 'Dragning utan återläggning.',
    tex: 'P(X = k) = \\dfrac{\\binom{K}{k}\\binom{N-K}{n-k}}{\\binom{N}{n}}',
  },
};
const ORDER = ['normal', 'binom', 'poisson', 'exp', 'unif', 't', 'chi2', 'f', 'cauchy', 'weibull', 'gamma', 'lognorm', 'logistic', 'beta', 'pascal', 'hyper'];
const GROUPS = [['vanlig', 'Vanligast'], ['stat', 'Statistik'], ['fler', 'Fler fördelningar']];
const dname = D => D.html || D.name;

// Hypergeometrisk fördelning saknar sluten fördelningsfunktion: tabell.
const tblCache = new Map();
function discTable(D, p) {
  const key = D.name + JSON.stringify(p);
  let t = tblCache.get(key);
  if (t) return t;
  const lo = D.lo(p), hi = D.hi(p), pm = [], cum = [];
  let s = 0;
  for (let k = lo; k <= hi; k++) { const v = D.pmf(k, p); pm.push(v); s += v; cum.push(s); }
  t = { lo, hi, pm, cum, tot: s };
  if (tblCache.size > 40) tblCache.clear();
  tblCache.set(key, t);
  return t;
}
function dcdf(D, k, p) {
  k = Math.floor(k);
  if (D.cdf) return Math.min(1, Math.max(0, D.cdf(k, p)));
  const t = discTable(D, p);
  if (k < t.lo) return 0;
  if (k >= t.hi) return 1;
  return Math.min(1, t.cum[k - t.lo] / t.tot);
}
function dge(D, k, p) {
  k = Math.ceil(k);
  if (D.ge) return Math.min(1, Math.max(0, D.ge(k, p)));
  const t = discTable(D, p);
  if (k <= t.lo) return 1;
  if (k > t.hi) return 0;
  return Math.max(0, (t.tot - t.cum[k - 1 - t.lo]) / t.tot);
}
// Minsta k med P(X ≤ k) ≥ u.
function qDisc(D, p, u) {
  const lo = D.lo(p), hi = D.hi(p);
  let a = lo, b;
  if (isFinite(hi)) b = hi;
  else {
    b = Math.max(lo + 1, Math.ceil(D.mean(p) + 10 * D.sd(p) + 10));
    while (dcdf(D, b, p) < u && b < 1e9) b = b * 2 + 1;
  }
  while (a < b) { const m = Math.floor((a + b) / 2); if (dcdf(D, m, p) >= u) b = m; else a = m + 1; }
  return a;
}
// Kvantil för kontinuerlig fördelning. upper: lös P(X ≥ x) = u i stället,
// så att övre svansen räknas utan avrundningsförlust.
function quant(D, p, u, upper) {
  if (!(u > 0)) return upper ? D.supp(p)[1] : D.supp(p)[0];
  if (!(u < 1)) return upper ? D.supp(p)[0] : D.supp(p)[1];
  if (upper && D.qu) return D.qu(u, p);
  if (D.q) return D.q(upper ? 1 - u : u, p);
  const [slo, shi] = D.supp(p);
  const g = upper ? x => u - D.sf(x, p) : x => D.cdf(x, p) - u;
  let c = D.mean(p);
  if (!isFinite(c)) c = isFinite(slo) ? slo + 1 : 0;
  let s = D.sd(p);
  if (!isFinite(s) || !(s > 0)) s = 1;
  let L = isFinite(slo) ? slo : c - s, H = isFinite(shi) ? shi : c + s;
  for (let i = 0; i < 400 && g(L) > 0 && !isFinite(slo); i++) L = c - (c - L) * 2;
  for (let i = 0; i < 400 && g(H) < 0 && !isFinite(shi); i++) H = c + (H - c) * 2;
  for (let i = 0; i < 300; i++) {
    const m = (L + H) / 2;
    if (m === L || m === H) break;
    if (g(m) < 0) L = m; else H = m;
  }
  return (L + H) / 2;
}
function median(D, p) { return D.kind === 'disk' ? qDisc(D, p, 0.5) : quant(D, p, 0.5); }

// Sannolikheten för intervallet. Diskreta gränser räknas med: P(a ≤ X ≤ b).
function probOf(D, p, mode, a, b, med) {
  if (med == null) med = median(D, p);
  if (D.kind === 'disk') {
    const A = Math.round(a), B = Math.round(b);
    if (mode === 'left') return dcdf(D, B, p);
    if (mode === 'right') return dge(D, A, p);
    if (mode === 'interval') {
      if (A > B) return 0;
      return clamp01(A > med ? dge(D, A, p) - dge(D, B + 1, p) : dcdf(D, B, p) - dcdf(D, A - 1, p));
    }
    if (A >= B) return NaN;
    return clamp01(dcdf(D, A, p) + dge(D, B, p));
  }
  const cdf = x => x === -Infinity ? 0 : x === Infinity ? 1 : D.cdf(x, p);
  const sf = x => x === -Infinity ? 1 : x === Infinity ? 0 : D.sf(x, p);
  if (mode === 'left') return clamp01(cdf(b));
  if (mode === 'right') return clamp01(sf(a));
  if (mode === 'interval') {
    if (a > b) return 0;
    return clamp01(a > med ? sf(a) - sf(b) : cdf(b) - cdf(a));
  }
  if (a > b) return NaN;
  return clamp01(cdf(a) + sf(b));
}
const clamp01 = v => Math.min(1, Math.max(0, v));

// Slumptal
function randn() { let u = 0; while (u === 0) u = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random()); }
function randGamma(k) {
  if (k < 1) return randGamma(k + 1) * Math.pow(Math.random(), 1 / k);
  const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x, v;
    do { x = randn(); v = 1 + c * x; } while (v <= 0);
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * x ** 4 || Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}
function sample(D, p, n) {
  const out = new Float64Array(n);
  if (D.kind === 'disk') {
    const lo = D.lo(p), hi = isFinite(D.hi(p)) ? D.hi(p) : qDisc(D, p, 1 - 1e-12);
    const cum = [];
    for (let k = lo; k <= hi; k++) cum.push(dcdf(D, k, p));
    for (let i = 0; i < n; i++) {
      const u = Math.random();
      let a = 0, b = cum.length - 1;
      while (a < b) { const m = (a + b) >> 1; if (cum[m] >= u) b = m; else a = m + 1; }
      out[i] = lo + a;
    }
    return out;
  }
  for (let i = 0; i < n; i++) {
    out[i] = D.rand ? D.rand(p) : D.q ? D.q(Math.random(), p) : quant(D, p, Math.random());
  }
  return out;
}

/* ================= 3. Talformat och inläsning ================= */
const MINUS = '−', NB = ' ';
const group3 = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
function fixedStr(x, d) {
  if (!isFinite(x)) return x > 0 ? '∞' : x < 0 ? MINUS + '∞' : '–';
  const s = Math.abs(x).toFixed(Math.max(0, Math.min(20, d)));
  if (parseFloat(s) === 0) return '0';
  const [i, f] = s.split('.');
  return (x < 0 ? MINUS : '') + group3(i) + (f ? ',' + f : '');
}
// Högst d decimaler, utan avslutande nollor.
function num(x, d = 4) {
  if (!isFinite(x)) return x > 0 ? '∞' : x < 0 ? MINUS + '∞' : '–';
  let s = Math.abs(x).toFixed(Math.max(0, Math.min(20, d)));
  if (parseFloat(s) === 0) return '0';
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  const [i, f] = s.split('.');
  return (x < 0 ? MINUS : '') + group3(i) + (f ? ',' + f : '');
}
// Sannolikhet med valt antal decimaler; mycket små värden (och värden
// mycket nära 1) visas med tre värdesiffror i stället för som 0 eller 1.
function pfmt(p, d) {
  if (d == null) d = S.dec;
  if (!isFinite(p)) return '–';
  if (p <= 0) return '0';
  if (p >= 1) return '1';
  const lim = 0.5 * Math.pow(10, -d);
  if (p < lim) return fixedStr(p, -Math.floor(Math.log10(p)) + 2);
  if (1 - p < lim) return fixedStr(p, Math.min(16, -Math.floor(Math.log10(1 - p)) + 2));
  return fixedStr(p, d);
}
function pctfmt(p, d) {
  if (d == null) d = S.dec;
  if (!isFinite(p)) return '–';
  const dd = Math.max(1, d - 2), v = p * 100, lim = 0.5 * Math.pow(10, -dd);
  let s;
  if (p <= 0) s = '0';
  else if (p >= 1) s = '100';
  else if (v < lim) s = fixedStr(v, -Math.floor(Math.log10(v)) + 1);
  else if (100 - v < lim) s = fixedStr(v, Math.min(14, -Math.floor(Math.log10(100 - v)) + 1));
  else s = fixedStr(v, dd);
  return s + NB + '%';
}
// Avrundad procentsats för redovisningen: heltal i mitten, två värdesiffror
// i svansarna.
function roughPct(p) {
  const v = p * 100;
  if (!isFinite(v)) return '–';
  if (v >= 10 && v <= 90) return fixedStr(Math.round(v), 0) + NB + '%';
  if (v < 10) { if (v === 0) return '0' + NB + '%'; const e = Math.floor(Math.log10(v)); return fixedStr(v, Math.max(0, 1 - e)) + NB + '%'; }
  const r = 100 - v;
  if (r === 0) return '100' + NB + '%';
  const e = Math.floor(Math.log10(r));
  return fixedStr(v, Math.max(0, 1 - e)) + NB + '%';
}
// Rimligt antal decimaler för ett värde på en axel med spannet span.
const decFor = span => Math.max(0, Math.min(8, 3 - Math.floor(Math.log10(Math.max(1e-12, Math.abs(span))))));
function parseNum(s, prob) {
  if (s == null) return NaN;
  let t = String(s).trim().replace(/[\s  ]/g, '').replace(/[−–]/g, '-').replace(/,/g, '.');
  if (!t) return NaN;
  let pct = false;
  if (prob && t.endsWith('%')) { pct = true; t = t.slice(0, -1); }
  let v;
  const fr = t.match(/^([-+]?\d*\.?\d+)\/(\d*\.?\d+)$/);
  if (fr) v = parseFloat(fr[1]) / parseFloat(fr[2]);
  else if (/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t)) v = parseFloat(t);
  else return NaN;
  return pct ? v / 100 : v;
}
function niceStep(raw) {
  if (!(raw > 0) || !isFinite(raw)) return 1;
  const e = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / e;
  return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * e;
}
function tickList(a, b, maxN, minStep) {
  let st = niceStep((b - a) / Math.max(1, maxN));
  if (minStep && st < minStep) st = minStep;
  const out = [];
  for (let i = Math.ceil(a / st - 1e-9); i * st <= b + st * 1e-9; i++) out.push(Math.abs(i * st) < st * 1e-9 ? 0 : i * st);
  return { st, out, dec: Math.max(0, -Math.floor(Math.log10(st) + 1e-9)) };
}
const snapTo = (x, st) => Math.round(x / st) * st;
// Ren text ur HTML, för urklipp och bildens rubriker.
const plain = h => String(h).replace(/<sub>(.*?)<\/sub>/g, '$1').replace(/<sup>2<\/sup>/g, '²').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

/* ================= 4. Exempel med riktiga data ================= */
// Källorna står också under "Källor till exemplen" i sidans text.
const PRESETS = [
  { id: 'kvinnor', grp: 'Normalfördelning', title: 'Längd, svenska kvinnor', d: 'normal', pt: { mu: '165,5', sigma: '6,15' }, u: 'cm', xl: 'Längd', desc: I('X') + ' = längden hos en slumpvis vald svensk kvinna', src: 'SCB 1998–2000, 16–84 år', m: 'interval', a: 160, b: 170 },
  { id: 'man', grp: 'Normalfördelning', title: 'Längd, svenska män', d: 'normal', pt: { mu: '179', sigma: '6,85' }, u: 'cm', xl: 'Längd', desc: I('X') + ' = längden hos en slumpvis vald svensk man', src: 'SCB 1998–2000, 16–84 år', m: 'right', a: 190 },
  { id: 'jamfor', grp: 'Normalfördelning', title: 'Kvinnor och män jämförda', d: 'normal', pt: { mu: '165,5', sigma: '6,15' }, cmp: { mu: '179', sigma: '6,85' }, names: ['Kvinnor', 'Män'], u: 'cm', xl: 'Längd', desc: 'Hur stor andel av kvinnorna är längre än medellängden för män?', src: 'SCB 1998–2000, 16–84 år', m: 'right', a: 179 },
  { id: 'iq', grp: 'Normalfördelning', title: 'IQ', d: 'normal', pt: { mu: '100', sigma: '15' }, u: '', xl: 'IQ', desc: I('X') + ' = resultatet på ett IQ-test', src: 'Testerna normeras till 100 och 15', m: 'right', a: 130 },
  { id: 'temp', grp: 'Normalfördelning', title: 'Kroppstemperatur', d: 'normal', pt: { mu: '36,8', sigma: '0,4' }, u: '°C', xl: 'Temperatur', desc: I('X') + ' = temperaturen i munnen hos en frisk vuxen', src: 'Mackowiak och kollegor 1992', m: 'right', a: 37.7 },
  { id: 'z', grp: 'Normalfördelning', title: 'Standardnormalfördelningen', d: 'normal', pt: { mu: '0', sigma: '1' }, u: '', xl: '', desc: '95' + NB + '% av värdena ligger mellan ' + MINUS + '1,96 och 1,96', src: 'Medelvärde 0, standardavvikelse 1', m: 'interval', a: -1.96, b: 1.96 },
  { id: 'tarning', grp: 'Binomialfördelning', title: 'Sexor på 60 tärningskast', d: 'binom', pt: { n: '60', p: '1/6' }, u: '', xl: 'Antal sexor', desc: I('X') + ' = antalet sexor på 60 kast med en tärning', src: 'Sannolikheten 1/6 per kast', m: 'right', a: 15 },
  { id: 'mynt', grp: 'Binomialfördelning', title: 'Krona på 100 myntkast', d: 'binom', pt: { n: '100', p: '0,5' }, u: '', xl: 'Antal krona', desc: I('X') + ' = antalet krona på 100 kast med ett mynt', src: 'Sannolikheten 0,5 per kast', m: 'interval', a: 40, b: 60 },
  { id: 'gissa', grp: 'Binomialfördelning', title: 'Gissa på ett flervalsprov', d: 'binom', pt: { n: '20', p: '0,25' }, u: '', xl: 'Antal rätt', desc: I('X') + ' = antalet rätt när alla 20 frågor med fyra alternativ gissas', src: 'Sannolikheten 1/4 per fråga', m: 'right', a: 10 },
  { id: 'vm', grp: 'Poissonfördelning', title: 'Mål per match i fotbolls-VM 2022', d: 'poisson', pt: { lam: '2,69' }, u: '', xl: 'Antal mål', desc: I('X') + ' = antalet mål i en match', src: '172 mål på 64 matcher', m: 'right', a: 5 },
  { id: 'hast', grp: 'Poissonfördelning', title: 'Hästsparkar i preussiska armén', d: 'poisson', pt: { lam: '0,61' }, u: '', xl: 'Antal döda', desc: I('X') + ' = antalet soldater i en kår som dödades av hästsparkar under ett år', src: 'Bortkiewicz 1898, 122 döda på 200 kårår', m: 'right', a: 2 },
  { id: 'radon', grp: 'Exponentialfördelning', title: 'Sönderfall av radon-222', d: 'exp', pt: { lam: '0,18145' }, u: 'dygn', xl: 'Tid', desc: I('X') + ' = tiden tills en radonatom sönderfaller', src: 'Halveringstiden 3,82 dygn ger ' + I('λ') + ' = ln 2 / 3,82', m: 'left', b: 3.82 },
  { id: 't95', grp: I('t') + '- och chitvåfördelning', title: 'Kritiska värden, ' + I('t') + '-fördelning', d: 't', pt: { nu: '9' }, u: '', xl: '', desc: '95' + NB + '% av värdena ligger mellan de kritiska värdena (stickprov med 10 värden)', src: '9 frihetsgrader', m: 'interval', a: -2.262, b: 2.262 },
  { id: 'chi', grp: I('t') + '- och chitvåfördelning', title: 'Kritiskt värde, chitvåfördelning', d: 'chi2', pt: { nu: '3' }, u: '', xl: '', desc: '5' + NB + '% av värdena ligger över det kritiska värdet 7,815', src: '3 frihetsgrader', m: 'right', a: 7.815 },
];

/* ================= 5. Tillstånd ================= */
const STORE_KEY = 'sannolikhetskalkylator-v1';
function newState() {
  return {
    tab: 'fordelning', d: 'normal', pt: {}, m: 'interval', a: -1, b: 1, u: '', xl: '',
    cum: false, sig: false, apx: false, tbl: false, cmp: false, cpt: {}, names: null,
    dec: 4, N: '100', pre: null, simN: 1000, proc: 'z1', st: {},
  };
}
let S = newState();
let sim = null;            // { key, vals, n } — simulerat stickprov
let V = { x0: -4, x1: 4, y1: 0.45 }, animT = null;
let lastInv = null;        // senaste omvända beräkningen (för redovisningen)
let rng = {};              // reglagens intervall, räknas när fördelningen byts

const D_ = () => DISTS[S.d];
function ptext(d, src) {
  const box = src || S.pt;
  if (!box[d]) box[d] = {};
  DISTS[d].params.forEach(q => { if (box[d][q.k] == null) box[d][q.k] = q.def; });
  return box[d];
}
// Parametrarna som tal; ogiltiga fält faller tillbaka på senast giltiga.
const lastGood = {};
function params(d, src, tag) {
  const D = DISTS[d], t = ptext(d, src), p = {}, bad = {};
  D.params.forEach(q => {
    const v = parseNum(t[q.k], q.kind === 'prob');
    p[q.k] = v;
    if (!isFinite(v)) bad[q.k] = true;
  });
  const lk = d + (tag || '');
  const err = Object.keys(bad).length ? 'Skriv ett tal i fältet.' : D.valid(p);
  if (err) return { p: lastGood[lk] || defaultParams(d), bad, err };
  lastGood[lk] = p;
  return { p, bad: {}, err: '' };
}
function defaultParams(d) {
  const p = {};
  DISTS[d].params.forEach(q => { p[q.k] = parseNum(q.def, q.kind === 'prob'); });
  return p;
}
const scaleOf = (D, p) => { const s = D.sd(p); return isFinite(s) && s > 0 ? s : (D.scale ? D.scale(p) : 1); };

// Reglagens intervall runt nuvarande värden.
function computeRanges() {
  const D = D_(), { p } = params(S.d);
  const sc = scaleOf(D, p);
  rng = {};
  D.params.forEach(q => {
    const v = p[q.k];
    let r;
    if (q.kind === 'loc') {
      const span = Math.max(sc * 5, Math.abs(v) * 0.5, 1);
      const st = niceStep(span / 150);
      r = { min: snapTo(v - span, st), max: snapTo(v + span, st), step: st };
    } else if (q.kind === 'pos') {
      const top = Math.max(v * 3, 1e-9);
      const st = niceStep(top / 200);
      r = { min: st, max: Math.ceil(top / st) * st, step: st };
    } else if (q.kind === 'prob') r = { min: 0.01, max: 0.99, step: 0.01 };
    else if (q.kind === 'df') r = { min: 1, max: Math.max(60, Math.ceil(v * 2)), step: 1 };
    else {
      let mx = Math.max(50, Math.ceil(v * 2));
      if (S.d === 'hyper' && q.k !== 'N') mx = p.N;
      r = { min: q.min != null ? q.min : 0, max: mx, step: 1 };
    }
    rng[q.k] = r;
  });
}
function defaultBounds() {
  const D = D_(), { p } = params(S.d);
  const mu = D.mean(p), sd = D.sd(p);
  if (D.kind === 'disk') {
    const lo = D.lo(p), hi = D.hi(p);
    S.a = Math.max(lo, Math.round(mu - sd));
    S.b = Math.min(hi, Math.round(mu + sd));
    if (S.b <= S.a) S.b = Math.min(hi, S.a + 1);
  } else if (isFinite(mu) && isFinite(sd) && sd > 0) {
    const st = niceStep(sd / 20);
    S.a = snapTo(mu - sd, st); S.b = snapTo(mu + sd, st);
    const [slo, shi] = D.supp(p);
    if (S.a < slo) S.a = slo; if (S.b > shi) S.b = shi;
  } else {
    const q1 = quant(D, p, 0.25), q3 = quant(D, p, 0.75), st = niceStep((q3 - q1) / 20);
    S.a = snapTo(q1, st); S.b = snapTo(q3, st);
  }
  S.m = 'interval';
}

let saveT = 0;
function save() {
  clearTimeout(saveT);
  saveT = setTimeout(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* privat läge */ } }, 300);
}
function encodeState() {
  const bytes = new TextEncoder().encode(JSON.stringify(S));
  let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function decodeState(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
}
function loadState() {
  let d = null;
  const m = location.hash.match(/[#&]s=([A-Za-z0-9_-]+)/);
  if (m) { try { d = decodeState(m[1]); } catch (e) { d = null; } }
  if (!d) { try { d = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { d = null; } }
  if (d && DISTS[d.d]) S = Object.assign(newState(), d);
}

// Förinställningen gäller bara så länge parametrarna inte ändrats.
const curPreset = () => {
  const pr = PRESETS.find(x => x.id === S.pre);
  if (!pr || pr.d !== S.d) return null;
  const t = ptext(S.d);
  const same = Object.keys(pr.pt).every(k => parseNum(t[k], true) === parseNum(pr.pt[k], true));
  return same ? pr : null;
};
function applyPreset(pr) {
  S.d = pr.d;
  S.pt[pr.d] = Object.assign({}, pr.pt);
  ptext(pr.d);
  S.u = pr.u || ''; S.xl = pr.xl || '';
  S.m = pr.m;
  if (pr.a != null) S.a = pr.a;
  if (pr.b != null) S.b = pr.b;
  if (pr.m === 'left' && pr.a == null) S.a = Math.min(S.a, pr.b);
  if (pr.m === 'right' && pr.b == null) S.b = Math.max(S.b, pr.a);
  S.cmp = !!pr.cmp;
  if (pr.cmp) { S.cpt[pr.d] = Object.assign({}, pr.cmp); ptext(pr.d, S.cpt); }
  S.names = pr.names || null;
  S.pre = pr.id;
  sim = null; lastInv = null;
  computeRanges();
  V = fitView();
}

/* ================= 6. Grafen ================= */
const COL = { ink: '#0f1620', soft: '#3f4a5c', muted: '#8a8577', grid: 'rgba(15,22,32,0.07)', axis: '#1f2530', area: '#8fb8d8', areaStroke: '#1c3d6b', accent: '#c8324a', blue: '#1c3d6b', green: '#3f7a34', bar: '#d9d1c1', barStroke: '#a79d89' };
const FONT = 'Poppins, Arial, sans-serif';
const tw = (s, fs) => String(s).length * fs * 0.56;
const f2 = v => Math.round(v * 100) / 100;

function regionsFor(mode, a, b, lo, hi) {
  if (mode === 'left') return [[lo, b]];
  if (mode === 'right') return [[a, hi]];
  if (mode === 'interval') return a <= b ? [[a, b]] : [];
  return a < b ? [[lo, a], [b, hi]] : [];
}
function inRegion(k, mode, a, b) {
  a = Math.round(a); b = Math.round(b);
  if (mode === 'left') return k <= b;
  if (mode === 'right') return k >= a;
  if (mode === 'interval') return k >= a && k <= b;
  return a < b && (k <= a || k >= b);
}
function unitSuffix() { return S.u ? NB + S.u : ''; }
function axisTitle() {
  const D = D_();
  const base = S.xl || '';
  if (base) return base + (S.u ? ' (' + S.u + ')' : '');
  if (D.kind === 'disk') return '';
  return S.u ? '(' + S.u + ')' : '';
}
// Kurvan som tät polylinje (steg om cirka 1,5 px), klippt mot ymax.
function curveD(f, x0, x1, X, Y, ycap, stepPx) {
  const n = Math.max(2, Math.ceil((X(x1) - X(x0)) / (stepPx || 1.5)));
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    let y = f(x);
    if (!isFinite(y) || y > ycap) y = ycap;
    d += (i ? 'L' : 'M') + f2(X(x)) + ',' + f2(Y(y));
  }
  return d;
}
function areaD(f, lo, hi, X, Y, ycap) {
  if (!(hi > lo)) return '';
  const n = Math.max(2, Math.ceil((X(hi) - X(lo)) / 1.5));
  let d = 'M' + f2(X(lo)) + ',' + f2(Y(0));
  for (let i = 0; i <= n; i++) {
    const x = lo + (hi - lo) * i / n;
    let y = f(x);
    if (!isFinite(y) || y > ycap) y = ycap;
    d += 'L' + f2(X(x)) + ',' + f2(Y(y));
  }
  return d + 'L' + f2(X(hi)) + ',' + f2(Y(0)) + 'Z';
}
const txt = (x, y, s, o = {}) => `<text x="${f2(x)}" y="${f2(y)}" font-size="${o.fs || 12}" fill="${o.fill || COL.soft}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}${o.fw ? ` font-weight="${o.fw}"` : ''}${o.it ? ' font-style="italic"' : ''}>${s}</text>`;
// HTML med <i>, <sub> och <sup> till SVG-tspans. Bara variabeln kursiveras.
function svgRich(h) {
  return String(h)
    .replace(/<i>(.*?)<\/i>/g, '<tspan font-style="italic">$1</tspan>')
    .replace(/<sub>(.*?)<\/sub>/g, '<tspan font-size="75%" dy="0.3em">$1</tspan><tspan dy="-0.3em">​</tspan>')
    .replace(/<sup>(.*?)<\/sup>/g, '<tspan font-size="70%" dy="-0.45em">$1</tspan><tspan dy="0.45em">​</tspan>')
    .replace(/<(?!\/?tspan)[^>]+>/g, '');
}
function pill(cx, cy, label, color, fs) {
  fs = fs || 12.5;
  const w = tw(plain(label), fs) + 14, h = fs + 8;
  return `<g><rect x="${f2(cx - w / 2)}" y="${f2(cy - h / 2)}" width="${f2(w)}" height="${h}" rx="${h / 2}" fill="${color}"/>${txt(cx, cy + fs * 0.36, svgRich(label), { fs, fill: '#ffffff', anchor: 'middle', fw: 600 })}</g>`;
}

// Hela ritningen som SVG-sträng. opt.exp = exportläge (utan handtag, med
// rubrik). Returnerar även geometrin så att pekarhanteringen kan räkna.
function drawDist(W, H, opt = {}) {
  const D = D_(), { p } = params(S.d), disk = D.kind === 'disk';
  const cmpP = S.cmp ? params(S.d, S.cpt, 'c').p : null;
  const head = opt.exp ? 56 : 0;
  const M = { l: 58, r: 22, t: 50 + head + (W < 640 && !opt.exp ? 18 : 0), b: 58 };
  const pw = W - M.l - M.r, ph = H - M.t - M.b;
  const v = opt.view || V;
  const x0 = v.x0, x1 = v.x1, y1 = S.cum ? 1.08 : v.y1;
  const X = x => M.l + (x - x0) / (x1 - x0) * pw;
  const Y = y => M.t + ph - y / y1 * ph;
  const base = Y(0);
  const out = [];
  const med = median(D, p);
  out.push(`<defs><clipPath id="clipPlot"><rect x="${M.l}" y="${M.t - 6}" width="${pw}" height="${ph + 6}"/></clipPath></defs>`);
  if (opt.exp) out.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`);

  // Rutnät och axlar
  const xt = tickList(x0, x1, Math.max(4, Math.floor(pw / 76)), disk ? 1 : 0);
  const yt = S.cum ? tickList(0, 1, 5) : tickList(0, y1, Math.max(2, Math.floor(ph / 60)));
  xt.out.forEach(t => { out.push(`<line x1="${f2(X(t))}" y1="${M.t}" x2="${f2(X(t))}" y2="${base}" stroke="${COL.grid}" stroke-width="1"/>`); });
  yt.out.forEach(t => { if (t > 0) out.push(`<line x1="${M.l}" y1="${f2(Y(t))}" x2="${M.l + pw}" y2="${f2(Y(t))}" stroke="${COL.grid}" stroke-width="1"/>`); });

  // Gränserna som gäller för läget
  const bounds = [];
  if (S.m !== 'left') bounds.push(['a', S.a]);
  if (S.m !== 'right') bounds.push(['b', S.b]);
  const [slo, shi] = disk ? [D.lo(p), D.hi(p)] : D.supp(p);
  const regs = regionsFor(S.m, S.a, S.b, disk ? -Infinity : Math.max(x0 - 1, slo === -Infinity ? x0 - 1 : slo), disk ? Infinity : Math.min(x1 + 1, shi === Infinity ? x1 + 1 : shi));
  const ycap = y1 * 1.4;
  const fMain = disk ? null : (S.cum ? x => D.cdf(x, p) : x => D.pdf(x, p));

  const plot = [];
  // Simulerat stickprov (bakom allt annat)
  if (sim && sim.key === simKey() && !S.cum) plot.push(drawSample(D, p, X, Y, x0, x1));

  if (!disk) {
    if (!S.cum) {
      regs.forEach(([lo, hi]) => {
        const L = Math.max(lo, x0 - (x1 - x0) * 0.02), R = Math.min(hi, x1 + (x1 - x0) * 0.02);
        if (R > L) plot.push(`<path d="${areaD(fMain, L, R, X, Y, ycap)}" fill="${COL.area}" fill-opacity="0.62"/>`);
      });
      if (cmpP) regs.forEach(([lo, hi]) => {
        const L = Math.max(lo, x0), R = Math.min(hi, x1);
        if (R > L) plot.push(`<path d="${areaD(x => D.pdf(x, cmpP), L, R, X, Y, ycap)}" fill="${COL.accent}" fill-opacity="0.13"/>`);
      });
    }
    if (cmpP) plot.push(`<path d="${curveD(S.cum ? x => D.cdf(x, cmpP) : x => D.pdf(x, cmpP), x0, x1, X, Y, ycap)}" fill="none" stroke="${COL.accent}" stroke-width="2.2" stroke-dasharray="7 5" stroke-linejoin="round"/>`);
    plot.push(`<path d="${curveD(fMain, x0, x1, X, Y, ycap)}" fill="none" stroke="${COL.ink}" stroke-width="2.4" stroke-linejoin="round"/>`);
    if (S.cum) plot.push(cumMarks(D, p, X, Y, M, true));
  } else {
    const k0 = Math.max(slo, Math.ceil(x0)), k1 = Math.min(shi, Math.floor(x1));
    const upx = pw / (x1 - x0);
    if (!S.cum) {
      const bw = Math.max(1, Math.min(upx * 0.78, 46));
      for (let k = k0; k <= k1; k++) {
        const pv = D.pmf(k, p);
        const hpx = base - Y(Math.min(pv, ycap));
        if (hpx < 0.2) continue;
        const inR = inRegion(k, S.m, S.a, S.b);
        plot.push(`<rect x="${f2(X(k) - bw / 2)}" y="${f2(base - hpx)}" width="${f2(bw)}" height="${f2(hpx)}" fill="${inR ? COL.area : COL.bar}" stroke="${inR ? COL.areaStroke : COL.barStroke}" stroke-width="${upx > 8 ? 1.2 : 0}"/>`);
      }
      if (cmpP) {
        let dd = '';
        const c0 = Math.max(D.lo(cmpP), Math.ceil(x0)), c1 = Math.min(D.hi(cmpP), Math.floor(x1));
        for (let k = c0; k <= c1; k++) {
          const pv = D.pmf(k, cmpP);
          if (pv * ph / y1 < 0.3) continue;
          dd += `<circle cx="${f2(X(k))}" cy="${f2(Y(Math.min(pv, ycap)))}" r="${upx > 10 ? 4 : 2.5}" fill="${COL.accent}"/>`;
        }
        plot.push(dd);
      }
    } else {
      plot.push(stepD(D, p, X, Y, x0, x1, COL.ink, 2.2));
      if (cmpP) plot.push(stepD(D, cmpP, X, Y, x0, x1, COL.accent, 1.8, true));
      plot.push(cumMarks(D, p, X, Y, M, false));
    }
    if (S.apx && !S.cum) {
      const m = D.mean(p), s = D.sd(p);
      if (s > 0) plot.push(`<path d="${curveD(x => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * SQ2PI), x0, x1, X, Y, ycap)}" fill="none" stroke="${COL.green}" stroke-width="2.2" stroke-dasharray="6 4"/>`);
    }
  }
  out.push(`<g clip-path="url(#clipPlot)">${plot.join('')}</g>`);

  // Axlar (x-axeln med pil åt det positiva hållet)
  out.push(`<line x1="${M.l}" y1="${f2(base)}" x2="${M.l + pw + 6}" y2="${f2(base)}" stroke="${COL.axis}" stroke-width="1.4"/>`);
  out.push(`<polygon points="${M.l + pw + 14},${f2(base)} ${M.l + pw + 5},${f2(base - 4)} ${M.l + pw + 5},${f2(base + 4)}" fill="${COL.axis}"/>`);
  out.push(`<line x1="${M.l}" y1="${f2(base)}" x2="${M.l}" y2="${M.t - 8}" stroke="${COL.axis}" stroke-width="1.2"/>`);
  out.push(`<polygon points="${M.l},${M.t - 16} ${M.l - 4},${M.t - 7} ${M.l + 4},${M.t - 7}" fill="${COL.axis}"/>`);
  yt.out.forEach(t => {
    if (t === 0 && !S.cum) return;
    out.push(`<line x1="${M.l - 4}" y1="${f2(Y(t))}" x2="${M.l}" y2="${f2(Y(t))}" stroke="${COL.axis}" stroke-width="1"/>`);
    out.push(txt(M.l - 8, Y(t) + 4, num(t, yt.dec), { fs: 11, fill: COL.muted, anchor: 'end' }));
  });
  const ylab = disk ? (S.cum ? `<tspan font-style="italic">P</tspan>(<tspan font-style="italic">X</tspan> ≤ <tspan font-style="italic">k</tspan>)` : `<tspan font-style="italic">P</tspan>(<tspan font-style="italic">X</tspan> = <tspan font-style="italic">k</tspan>)`)
    : (S.cum ? `<tspan font-style="italic">F</tspan>(<tspan font-style="italic">x</tspan>)` : `<tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)`);
  out.push(txt(M.l + 10, M.t - 6, ylab, { fs: 12.5, fill: COL.soft }));

  // Gränsernas värden som etiketter under axeln; skalans tal som krockar döljs.
  const pills = [];
  const dec = disk ? 0 : Math.min(6, Math.max(decFor(x1 - x0), 2));
  bounds.forEach(([h, val]) => {
    if (!isFinite(val) || val < x0 || val > x1) return;
    const lab = (disk ? num(Math.round(val), 0) : num(val, Math.max(dec, 4))) + unitSuffix();
    const w = tw(lab, 12.5) + 14;
    pills.push({ h, x: X(disk ? Math.round(val) : val), w, lab });
  });
  if (pills.length === 2 && Math.abs(pills[0].x - pills[1].x) < (pills[0].w + pills[1].w) / 2 + 4) {
    const mid = (pills[0].x + pills[1].x) / 2, half = (pills[0].w + pills[1].w) / 4 + 2;
    const l = pills[0].x < pills[1].x ? 0 : 1;
    pills[l].px = mid - half - pills[l].w / 4; pills[1 - l].px = mid + half + pills[1 - l].w / 4;
  }
  xt.out.forEach(t => {
    const x = X(t);
    out.push(`<line x1="${f2(x)}" y1="${f2(base)}" x2="${f2(x)}" y2="${f2(base + 5)}" stroke="${COL.axis}" stroke-width="1"/>`);
    const lab = num(t, xt.dec), w = tw(lab, 11.5);
    if (pills.some(pl => Math.abs((pl.px != null ? pl.px : pl.x) - x) < pl.w / 2 + w / 2 + 3)) return;
    out.push(txt(x, base + 19, lab, { fs: 11.5, fill: COL.muted, anchor: 'middle' }));
  });
  const at = axisTitle();
  if (at) out.push(txt(M.l + pw + 12, base + 44, esc(at), { fs: 12, fill: COL.soft, anchor: 'end' }));
  else out.push(txt(M.l + pw + 12, base - 9, `<tspan font-style="italic">${disk ? 'k' : 'x'}</tspan>`, { fs: 13.5, fill: COL.soft, anchor: 'end' }));

  // Standardavvikelsernas markeringar
  if (S.sig) out.push(sigmaMarks(D, p, X, Y, M, x0, x1, base));

  // Handtag och gränslinjer
  const hy = val => {
    if (S.cum) return Y(disk ? dcdf(D, Math.round(val), p) : D.cdf(val, p));
    const f = disk ? D.pmf(Math.round(val), p) : D.pdf(val, p);
    return Y(Math.min(isFinite(f) ? f : ycap, y1 * 1.02));
  };
  pills.forEach(pl => {
    const val = pl.h === 'a' ? S.a : S.b;
    out.push(`<line x1="${f2(pl.x)}" y1="${f2(base)}" x2="${f2(pl.x)}" y2="${f2(Math.max(M.t - 4, hy(val)))}" stroke="${COL.accent}" stroke-width="2.2"/>`);
  });
  if (!S.cum) out.push(areaLabels(D, p, X, Y, M, x0, x1, med));
  pills.forEach(pl => {
    const cx = pl.px != null ? pl.px : pl.x;
    if (!opt.exp) {
      out.push(`<g class="hnd" data-h="${pl.h}"><rect x="${f2(pl.x - 14)}" y="${M.t}" width="28" height="${f2(base - M.t + 8)}" fill="transparent"/>`
        + `<circle cx="${f2(pl.x)}" cy="${f2(base)}" r="7.5" fill="#ffffff" stroke="${COL.accent}" stroke-width="2.6"/></g>`);
      out.push(`<g class="hnd" data-h="${pl.h}">${pill(cx, base + 27, pl.lab, COL.accent)}</g>`);
    } else out.push(pill(cx, base + 27, pl.lab, COL.accent));
  });

  // Förklaring när två kurvor visas
  const leg = [];
  if (S.cmp) {
    const nm = S.names || ['Fördelning 1', 'Fördelning 2'];
    leg.push([nm[0], COL.ink, false], [nm[1], COL.accent, true]);
  }
  if (disk && S.apx && !S.cum) leg.push(['Normalapproximation', COL.green, true]);
  if (sim && sim.key === simKey() && !S.cum) leg.push(['Stickprov, ' + num(sim.n, 0) + ' värden', COL.green, false, true]);
  if (leg.length) {
    const lw = Math.max(...leg.map(l => tw(l[0], 12))) + 44;
    const lx = M.l + pw - lw - 4;
    let ly = M.t + 6;
    out.push(`<rect x="${f2(lx - 8)}" y="${f2(ly - 6)}" width="${f2(lw + 8)}" height="${leg.length * 20 + 8}" rx="8" fill="#fffefb" fill-opacity="0.92" stroke="${COL.grid}"/>`);
    leg.forEach(([name, c, dash, box]) => {
      if (box) out.push(`<rect x="${f2(lx)}" y="${f2(ly + 3)}" width="24" height="9" fill="${c}" fill-opacity="0.3" stroke="${c}"/>`);
      else out.push(`<line x1="${f2(lx)}" y1="${f2(ly + 8)}" x2="${f2(lx + 24)}" y2="${f2(ly + 8)}" stroke="${c}" stroke-width="2.4"${dash ? ' stroke-dasharray="6 4"' : ''}/>`);
      out.push(txt(lx + 32, ly + 12, esc(name), { fs: 12, fill: COL.ink }));
      ly += 20;
    });
  }

  if (opt.exp) {
    const tag = sheetTagHtml();
    out.push(txt(M.l - 30, 26, svgRich(tag), { fs: 14, fill: COL.soft }));
    out.push(txt(M.l - 30, 48, svgRich(answerHtml(probOf(D, p, S.m, S.a, S.b, med))), { fs: 16, fill: COL.ink, fw: 600 }));
  }
  return { svg: out.join(''), M, X, Y, pw, ph, x0, x1, y1, base };
}
function stepD(D, p, X, Y, x0, x1, color, sw, dash) {
  const lo = Math.max(D.lo(p), Math.floor(x0) - 1), hi = Math.min(isFinite(D.hi(p)) ? D.hi(p) : Infinity, Math.ceil(x1) + 1);
  let d = `M${f2(X(x0))},${f2(Y(dcdf(D, Math.floor(x0), p)))}`;
  for (let k = Math.max(lo, Math.ceil(x0)); k <= hi && k <= x1; k++) {
    d += `L${f2(X(k))},${f2(Y(dcdf(D, k - 1, p)))}L${f2(X(k))},${f2(Y(dcdf(D, k, p)))}`;
  }
  d += `L${f2(X(x1))},${f2(Y(dcdf(D, Math.floor(x1), p)))}`;
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ''}/>`;
}
// Kumulativ vy: gränsernas F-värden på y-axeln och en klammer för andelen.
function cumMarks(D, p, X, Y, M, cont) {
  const F = v => cont ? D.cdf(v, p) : dcdf(D, Math.round(v), p);
  const Fm = v => cont ? D.cdf(v, p) : dcdf(D, Math.round(v) - 1, p);
  const o = [];
  const pts = [];
  if (S.m === 'left') pts.push([S.b, F(S.b)]);
  if (S.m === 'right') pts.push([S.a, Fm(S.a)]);
  if (S.m === 'interval' || S.m === 'outside') {
    pts.push([S.a, S.m === 'interval' ? Fm(S.a) : F(S.a)]);
    pts.push([S.b, S.m === 'interval' ? F(S.b) : Fm(S.b)]);
  }
  pts.forEach(([x, y]) => {
    const xx = X(cont ? x : Math.round(x));
    o.push(`<line x1="${f2(M.l)}" y1="${f2(Y(y))}" x2="${f2(xx)}" y2="${f2(Y(y))}" stroke="${COL.accent}" stroke-width="1.3" stroke-dasharray="4 3"/>`);
    o.push(`<circle cx="${f2(xx)}" cy="${f2(Y(y))}" r="4" fill="${COL.accent}"/>`);
    o.push(txt(M.l + 6, Y(y) - 5, pfmt(y), { fs: 11.5, fill: COL.accent, fw: 600 }));
  });
  const br = (ya, yb) => {
    const bx = M.l + 3;
    o.push(`<line x1="${bx}" y1="${f2(Y(ya))}" x2="${bx}" y2="${f2(Y(yb))}" stroke="${COL.areaStroke}" stroke-width="5" stroke-opacity="0.55"/>`);
  };
  if (S.m === 'left') br(0, pts[0][1]);
  if (S.m === 'right') br(pts[0][1], 1);
  if (S.m === 'interval') br(pts[0][1], pts[1][1]);
  if (S.m === 'outside') { br(0, pts[0][1]); br(pts[1][1], 1); }
  return o.join('');
}
// Procentsatsen i den färgade arean (en per svans i intervallkomplement).
function areaLabels(D, p, X, Y, M, x0, x1, med) {
  const disk = D.kind === 'disk';
  const parts = [];
  if (S.m === 'outside') {
    if (S.a < S.b) { parts.push({ lo: -Infinity, hi: S.a, pr: probOf(D, p, 'left', 0, S.a, med), side: 'L' }); parts.push({ lo: S.b, hi: Infinity, pr: probOf(D, p, 'right', S.b, 0, med), side: 'R' }); }
  } else parts.push({ lo: S.m === 'left' ? -Infinity : S.a, hi: S.m === 'right' ? Infinity : S.b, pr: probOf(D, p, S.m, S.a, S.b, med), side: S.m === 'left' ? 'L' : S.m === 'right' ? 'R' : 'M' });
  const o = [];
  const top = M.t + 16;
  const h = x => disk ? D.pmf(Math.round(x), p) : D.pdf(x, p);
  parts.forEach(pt => {
    if (!isFinite(pt.pr)) return;
    let L = Math.max(pt.lo, x0), R = Math.min(pt.hi, x1);
    if (disk) {
      // Bara staplar som syns (minst en pixel höga) räknas.
      const ks = [];
      for (let k = Math.ceil(L); k <= Math.floor(R); k++) if (Y(0) - Y(D.pmf(k, p)) >= 1) ks.push(k);
      if (ks.length) { L = ks[0] - 0.4; R = ks[ks.length - 1] + 0.4; }
    }
    if (!(R >= L)) return;
    const lab = pctfmt(pt.pr), fs = 16, w = tw(lab, fs);
    const wpx = X(R) - X(L);
    let cx = (X(L) + X(R)) / 2, anchor = 'middle';
    // Högsta punkten i området, för att lägga etiketten ovanför kurvan
    let hmax = 0, xmax = (L + R) / 2;
    const n = 40;
    for (let i = 0; i <= n; i++) { const x = L + (R - L) * i / n, hv = h(x); if (isFinite(hv) && hv > hmax) { hmax = hv; xmax = x; } }
    const hmid = h((L + R) / 2);
    const inside = wpx > w + 16 && isFinite(hmid) && (Y(0) - Y(hmid)) > 46;
    let y;
    if (inside) y = Y(0) - (Y(0) - Y(hmid)) * 0.42 + fs * 0.35;
    else if (pt.side === 'L' || pt.side === 'R') {
      // Svans: etiketten precis ovanför kurvan vid gränsen, utåt från den.
      const xb = pt.side === 'L' ? R : L, hb = h(xb);
      cx = X(xb) + (pt.side === 'L' ? -8 : 8); anchor = pt.side === 'L' ? 'end' : 'start';
      y = Math.max(top, Math.min(Y(Math.min(isFinite(hb) ? hb : V.y1, V.y1)) - 10, Y(0) - 14));
    } else {
      cx = X(xmax);
      y = Math.max(top, Y(Math.min(hmax, V.y1)) - 12);
    }
    cx = Math.max(M.l + (anchor === 'start' ? 2 : anchor === 'end' ? w + 2 : w / 2 + 2), Math.min(M.l + (X(x1) - M.l) - (anchor === 'end' ? 2 : anchor === 'start' ? w + 2 : w / 2 + 2), cx));
    o.push(txt(cx, y, lab, { fs, fill: COL.ink, anchor, fw: 600 }));
  });
  return o.join('');
}
function sigmaMarks(D, p, X, Y, M, x0, x1, base) {
  const mu = D.mean(p), s = D.sd(p);
  if (!isFinite(mu) || !isFinite(s) || !(s > 0)) return '';
  const o = [];
  const isNormal = S.d === 'normal';
  for (let k = -3; k <= 3; k++) {
    const x = mu + k * s;
    if (x < x0 || x > x1) continue;
    const xx = X(x);
    o.push(`<line x1="${f2(xx)}" y1="${f2(base)}" x2="${f2(xx)}" y2="${M.t + 16}" stroke="${COL.blue}" stroke-width="1.1" stroke-dasharray="3 4" stroke-opacity="0.75"/>`);
    const sym = isNormal ? '<tspan font-style="italic">μ</tspan>' : '<tspan font-style="italic">μ</tspan>';
    const lab = k === 0 ? sym : `${sym} ${k < 0 ? MINUS : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}<tspan font-style="italic">σ</tspan>`;
    o.push(txt(xx, M.t + 10, lab, { fs: 11.5, fill: COL.blue, anchor: 'middle' }));
  }
  return o.join('');
}
function drawSample(D, p, X, Y, x0, x1) {
  const vals = sim.vals, n = vals.length, o = [];
  if (D.kind === 'disk') {
    const cnt = new Map();
    for (let i = 0; i < n; i++) cnt.set(vals[i], (cnt.get(vals[i]) || 0) + 1);
    const upx = X(1) - X(0), w = Math.max(3, Math.min(upx * 0.9, 50));
    cnt.forEach((c, k) => {
      if (k < x0 || k > x1) return;
      const y = Y(c / n);
      o.push(`<line x1="${f2(X(k) - w / 2)}" y1="${f2(y)}" x2="${f2(X(k) + w / 2)}" y2="${f2(y)}" stroke="${COL.green}" stroke-width="3"/>`);
    });
    return o.join('');
  }
  const bw = niceStep((x1 - x0) / Math.min(70, Math.max(10, Math.sqrt(n) * 1.6)));
  const cnt = new Map();
  for (let i = 0; i < n; i++) { const b = Math.floor(vals[i] / bw); cnt.set(b, (cnt.get(b) || 0) + 1); }
  cnt.forEach((c, b) => {
    const L = b * bw, R = L + bw;
    if (R < x0 || L > x1) return;
    const hgt = c / (n * bw);
    o.push(`<rect x="${f2(X(L))}" y="${f2(Y(hgt))}" width="${f2(X(R) - X(L))}" height="${f2(Y(0) - Y(hgt))}" fill="${COL.green}" fill-opacity="0.2" stroke="${COL.green}" stroke-opacity="0.7" stroke-width="1"/>`);
  });
  return o.join('');
}
const simKey = () => S.d + JSON.stringify(params(S.d).p);

// Vy som rymmer kurvan (och en eventuell jämförelsekurva).
function fitView() {
  const D = D_(), { p } = params(S.d), disk = D.kind === 'disk';
  const sets = [p];
  if (S.cmp) sets.push(params(S.d, S.cpt, 'c').p);
  let x0 = Infinity, x1 = -Infinity;
  sets.forEach(q => {
    let a, b;
    if (disk) {
      const lo = D.lo(q), hi = D.hi(q);
      a = qDisc(D, q, 0.0005); b = qDisc(D, q, 0.9995);
      if (isFinite(hi) && hi - lo <= 40) { a = lo; b = hi; }
      a -= 1; b += 1;
      if (b - a < 8) { const c = (a + b) / 2; a = Math.min(a, Math.floor(c - 4)); b = Math.max(b, Math.ceil(c + 4)); }
      a = Math.max(a, lo - 1);
    } else [a, b] = D.view(q);
    x0 = Math.min(x0, a); x1 = Math.max(x1, b);
  });
  if (!(x1 > x0)) { x0 -= 1; x1 += 1; }
  let ymax = 0;
  const hs = [];
  sets.forEach(q => {
    if (disk) {
      for (let k = Math.ceil(x0); k <= Math.floor(x1); k++) { const v = D.pmf(k, q); if (v > ymax) ymax = v; }
      if (S.apx) ymax = Math.max(ymax, 1 / (D.sd(q) * SQ2PI));
    } else {
      for (let i = 0; i <= 400; i++) { const v = D.pdf(x0 + (x1 - x0) * i / 400, q); if (isFinite(v)) hs.push(v); }
    }
  });
  if (!disk) {
    hs.sort((a, b) => a - b);
    const p95 = hs[Math.floor(hs.length * 0.97)] || 1;
    ymax = hs[hs.length - 1];
    if (ymax > p95 * 3) ymax = p95 * 1.6;
  }
  if (!(ymax > 0)) ymax = 1;
  return { x0, x1, y1: ymax * 1.2 };
}
function animateTo(t) {
  cancelAnimationFrame(animT);
  const s = Object.assign({}, V), t0 = performance.now(), dur = 260;
  const step = now => {
    const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    V = { x0: s.x0 + (t.x0 - s.x0) * e, x1: s.x1 + (t.x1 - s.x1) * e, y1: s.y1 + (t.y1 - s.y1) * e };
    drawNow();
    if (k < 1) animT = requestAnimationFrame(step);
  };
  animT = requestAnimationFrame(step);
}
// Efter en ändrad parameter: justera vyn bara om kurvan inte längre syns bra.
function maybeRefit() {
  if (S.tab !== 'fordelning') return;
  const D = D_(), { p } = params(S.d), t = fitView();
  const med = median(D, p);
  const mass = D.kind === 'disk' ? probOf(D, p, 'interval', Math.ceil(V.x0), Math.floor(V.x1), med) : probOf(D, p, 'interval', V.x0, V.x1, med);
  const peak = t.y1 / 1.2;
  if (mass < 0.9 || (t.x1 - t.x0) < (V.x1 - V.x0) * 0.25) animateTo(t);
  else if (peak > V.y1 * 0.98 || peak < V.y1 * 0.35) animateTo({ x0: V.x0, x1: V.x1, y1: t.y1 });
}

/* ================= 7. Panelerna ================= */
const svg = $('#svg'), sheet = $('#sheet'), leftEl = $('#left'), rightEl = $('#right'), sbarEl = $('#sbar');
let geo = null;
let rafDraw = 0;
function drawNow() {
  const W = sheet.clientWidth, H = sheet.clientHeight;
  if (!W || !H) return;
  if (S.tab === 'statistik') { const g = drawStat(W, H); svg.innerHTML = g.svg; geo = g; return; }
  const g = drawDist(W, H);
  svg.innerHTML = g.svg;
  geo = g;
}
function draw() { cancelAnimationFrame(rafDraw); rafDraw = requestAnimationFrame(drawNow); }

function spark(dk, w, h) {
  const D = DISTS[dk], p = defaultParams(dk);
  w = w || 46; h = h || 30;
  if (D.kind === 'disk') {
    const lo = qDisc(D, p, 0.001), hi = Math.min(qDisc(D, p, 0.999), lo + 15);
    let mx = 0; for (let k = lo; k <= hi; k++) mx = Math.max(mx, D.pmf(k, p));
    let s = '';
    const n = hi - lo + 1, bw = (w - 8) / n;
    for (let k = lo; k <= hi; k++) { const bh = D.pmf(k, p) / mx * (h - 8); s += `<rect x="${f2(4 + (k - lo) * bw + bw * 0.15)}" y="${f2(h - 4 - bh)}" width="${f2(bw * 0.7)}" height="${f2(bh)}" fill="currentColor" opacity=".75"/>`; }
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${s}</svg>`;
  }
  let [a, b] = D.view(p);
  let mx = 0; const ys = [];
  for (let i = 0; i <= 40; i++) { const v = D.pdf(a + (b - a) * i / 40, p); ys.push(v); if (isFinite(v) && v > mx) mx = v; }
  const hs = ys.filter(isFinite).sort((x, y) => x - y); const cap = Math.min(mx, (hs[Math.floor(hs.length * 0.9)] || mx) * 1.5);
  const d = ys.map((v, i) => (i ? 'L' : 'M') + f2(4 + (w - 8) * i / 40) + ',' + f2(h - 4 - Math.min(isFinite(v) ? v : cap, cap) / cap * (h - 8))).join('');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
}
const CARET = '<svg class="car" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

function renderLeft() {
  if (S.tab === 'statistik') { renderProcList(); return; }
  const D = D_(), t = ptext(S.d), { bad, err } = params(S.d);
  const pr = curPreset();
  let h = `<div class="eyebrow">Fördelning</div>
  <div class="picker"><button type="button" class="pick-btn" id="pickBtn" aria-haspopup="true">${spark(S.d)}<span><b>${dname(D)}</b><small>${D.kind === 'disk' ? 'Diskret' : 'Kontinuerlig'}</small></span>${CARET}</button>
  <div class="pick-list" id="pickList">${GROUPS.map(([g, gt]) => `<div class="eyebrow">${gt}</div>` + ORDER.filter(d => DISTS[d].grp === g).map(d => `<button type="button" class="pick-it${d === S.d ? ' on' : ''}" data-d="${d}">${spark(d, 38, 24)}<span>${dname(DISTS[d])}</span></button>`).join('')).join('')}</div></div>`;
  D.params.forEach(q => {
    const r = rng[q.k] || { min: 0, max: 1, step: 0.01 };
    const withU = S.u && (q.kind === 'loc' || (q.kind === 'pos' && ['normal', 'unif', 'cauchy', 'logistic'].includes(S.d)));
    const val = parseNum(t[q.k], q.kind === 'prob');
    h += `<div class="prm"><div class="prm-top"><label for="p-${q.k}">${q.label} <span class="sym">${q.sym}</span></label>
      <div class="nf${withU ? ' has-u' : ''}"><input id="p-${q.k}" data-p="${q.k}" value="${esc(t[q.k])}" inputmode="decimal" autocomplete="off" spellcheck="false" class="${bad[q.k] ? 'bad' : ''}">${withU ? `<span class="u">${esc(S.u)}</span>` : ''}</div></div>
      <input type="range" data-r="${q.k}" min="${r.min}" max="${r.max}" step="${r.step}" value="${isFinite(val) ? val : r.min}" aria-label="${q.label}"></div>`;
  });
  if (err) h += `<p class="prm-help" style="color:var(--accent)">${err}</p>`;
  if (D.note) h += `<p class="prm-help">${D.note}</p>`;
  h += `<div class="unitrow"><label for="unitIn">Enhet</label><input id="unitIn" value="${esc(S.u)}" placeholder="ingen" autocomplete="off"></div>`;
  h += `<div class="presets"><div class="eyebrow">Exempel med riktiga data</div><div class="pset-list">`;
  let lastG = '';
  PRESETS.forEach(x => {
    if (x.grp !== lastG) { h += `<div class="pset-g eyebrow" style="letter-spacing:.08em">${x.grp}</div>`; lastG = x.grp; }
    h += `<button type="button" class="pset${pr && pr.id === x.id ? ' on' : ''}" data-pre="${x.id}"><b>${x.title}</b><small>${presetMeta(x)}</small><span class="tag">${x.src}</span></button>`;
  });
  h += `</div></div>`;
  leftEl.innerHTML = h;
}
function presetMeta(x) {
  const D = DISTS[x.d];
  const u = x.u ? NB + x.u : '';
  const parts = D.params.map(q => `${q.sym} = ${esc(x.pt[q.k])}${(q.kind === 'loc' || (q.kind === 'pos' && x.d === 'normal')) ? u : ''}`);
  if (x.cmp) return 'Kvinnor: ' + parts.join(', ') + '<br>Män: ' + D.params.map(q => `${q.sym} = ${esc(x.cmp[q.k])}${u}`).join(', ');
  return parts.join(', ');
}

// Symboler för intervalltyperna: en klockkurva med den färgade delen.
function modeIcon(m) {
  const pts = []; for (let i = 0; i <= 30; i++) { const x = -3 + 6 * i / 30; pts.push([x, Math.exp(-x * x / 2)]); }
  const X = x => 17 + x * 5, Y = y => 19 - y * 14;
  const curve = pts.map((q, i) => (i ? 'L' : 'M') + f2(X(q[0])) + ',' + f2(Y(q[1]))).join('');
  const area = (a, b) => { let d = `M${f2(X(a))},19`; pts.filter(q => q[0] >= a - 1e-9 && q[0] <= b + 1e-9).forEach(q => { d += `L${f2(X(q[0]))},${f2(Y(q[1]))}`; }); return d + `L${f2(X(b))},19Z`; };
  const regs = m === 'left' ? [[-3, 0.6]] : m === 'right' ? [[-0.6, 3]] : m === 'interval' ? [[-1, 1]] : [[-3, -1], [1, 3]];
  return `<svg viewBox="0 0 34 22" fill="none">${regs.map(([a, b]) => `<path d="${area(a, b)}" fill="#8fb8d8"/>`).join('')}<path d="${curve}" stroke="currentColor" stroke-width="1.6"/><line x1="1" y1="19.2" x2="33" y2="19.2" stroke="currentColor" stroke-width="1.2"/></svg>`;
}
// Intervalltyperna heter som i tabellen i ma2c-6.5, och frågorna följer
// genomgångens exempelformuleringar.
const MODES = [['left', 'Öppet åt vänster'], ['interval', 'Intervall'], ['outside', 'Intervallkomplement'], ['right', 'Öppet åt höger']];
function renderSbar() {
  if (S.tab === 'statistik') { renderStatBar(); return; }
  const disk = D_().kind === 'disk';
  const u = S.u ? `<span class="qu">${esc(S.u)}</span>` : '';
  const inp = h => `<span class="qf"><input data-b="${h}" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="${h === 'a' ? 'Undre gräns' : 'Övre gräns'}">${u}</span>`;
  let q;
  if (!disk) {
    if (S.m === 'left') q = `Hur många procent är mindre än ${inp('b')}?`;
    else if (S.m === 'right') q = `Hur många procent är större än ${inp('a')}?`;
    else if (S.m === 'interval') q = `Hur många procent ligger mellan ${inp('a')} och ${inp('b')}?`;
    else q = `Hur många procent är mindre än ${inp('a')} eller större än ${inp('b')}?`;
  } else {
    const st = 'Hur stor är sannolikheten att utfallet blir';
    if (S.m === 'left') q = `${st} högst ${inp('b')}?`;
    else if (S.m === 'right') q = `${st} minst ${inp('a')}?`;
    else if (S.m === 'interval') q = `${st} mellan ${inp('a')} och ${inp('b')}?`;
    else q = `${st} högst ${inp('a')} eller minst ${inp('b')}?`;
  }
  sbarEl.innerHTML = `<div class="qtypes" role="radiogroup" aria-label="Intervalltyp">${MODES.map(([m, t]) => `<button type="button" data-m="${m}" class="${m === S.m ? 'on' : ''}" role="radio" aria-checked="${m === S.m}">${modeIcon(m)}<span>${t}</span></button>`).join('')}</div>
    <div class="qrow">
      <div class="qtext">${q}<div class="qsym" id="qSym"></div></div>
      <label class="qans" title="Skriv en andel här för att räkna ut gränsen i stället">
        <span class="qans-l">${disk ? 'Sannolikhet' : 'Andel'}</span>
        <span class="qans-v"><input data-pr="1" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="Andel i procent"><span class="pc">%</span></span>
        <span class="qans-d" id="pctOut"></span>
      </label>
    </div>
    <div class="sbar-hint" id="sbarHint"></div>`;
}
// Påståendet som HTML, för redovisningen och bildens rubrik.
// Med beteckningar som i ma4-3.6: P(a ≤ X ≤ b), där X är utfallet.
function stmtHtml(withP) {
  const D = D_(), disk = D.kind === 'disk', { p } = params(S.d);
  const f = v => disk ? num(Math.round(v), 0) : num(v, 4);
  let s;
  if (S.m === 'left') s = `<i>P</i>(<i>X</i> ≤ ${f(S.b)})`;
  else if (S.m === 'right') s = `<i>P</i>(<i>X</i> ≥ ${f(S.a)})`;
  else if (S.m === 'interval') s = `<i>P</i>(${f(S.a)} ≤ <i>X</i> ≤ ${f(S.b)})`;
  else s = `<i>P</i>(<i>X</i> ≤ ${f(S.a)}) + <i>P</i>(<i>X</i> ≥ ${f(S.b)})`;
  if (withP) { const pr = probOf(D, p, S.m, S.a, S.b); s += ' = ' + pfmt(pr) + ' = ' + pctfmt(pr); }
  return s;
}
// Intervallet som i redovisningen i ma2c-6.5: 160 ≤ x ≤ 170.
function intervalX() {
  const disk = D_().kind === 'disk';
  const f = v => disk ? num(Math.round(v), 0) : num(v, 4);
  const x = '<i>x</i>';
  if (S.m === 'left') return `${x} ≤ ${f(S.b)}`;
  if (S.m === 'right') return `${x} ≥ ${f(S.a)}`;
  if (S.m === 'interval') return `${f(S.a)} ≤ ${x} ≤ ${f(S.b)}`;
  return `${x} ≤ ${f(S.a)} eller ${x} ≥ ${f(S.b)}`;
}
// Svaret som mening, för bildens rubrik.
function answerHtml(pr) {
  const disk = D_().kind === 'disk';
  return disk ? `Sannolikheten att utfallet blir ${wordsFor()}: ${pctfmt(pr)}` : `Andelen som är ${wordsFor()}: ${pctfmt(pr)}`;
}
function paramList(d, src, withUnit) {
  const D = DISTS[d], t = ptext(d, src);
  return D.params.map(q => {
    const v = parseNum(t[q.k], q.kind === 'prob');
    const withU = withUnit && S.u && (q.kind === 'loc' || (q.kind === 'pos' && ['normal', 'unif', 'cauchy', 'logistic'].includes(d)));
    const shown = /\//.test(t[q.k]) ? esc(t[q.k].trim()) : num(v, 6);
    return `${q.sym} = ${shown}${withU ? NB + esc(S.u) : ''}`;
  });
}
function sheetTagHtml() {
  const pr = curPreset();
  if (pr) return pr.desc;
  const D = D_(), pl = paramList(S.d, null, true);
  return `${dname(D)} med ${pl.length > 1 ? pl.slice(0, -1).join(', ') + ' och ' + pl[pl.length - 1] : pl[0]}`;
}
function wordsFor() {
  const D = D_(), disk = D.kind === 'disk';
  const f = v => (disk ? num(Math.round(v), 0) : num(v, Math.max(S.dec, 2))) + unitSuffix();
  if (disk) {
    if (S.m === 'left') return `högst ${f(S.b)}`;
    if (S.m === 'right') return `minst ${f(S.a)}`;
    if (S.m === 'interval') return `från och med ${f(S.a)} till och med ${f(S.b)}`;
    return `högst ${f(S.a)} eller minst ${f(S.b)}`;
  }
  if (S.m === 'left') return `mindre än ${f(S.b)}`;
  if (S.m === 'right') return `större än ${f(S.a)}`;
  if (S.m === 'interval') return `mellan ${f(S.a)} och ${f(S.b)}`;
  return `mindre än ${f(S.a)} eller större än ${f(S.b)}`;
}
function redovHtml(pr) {
  const D = D_(), disk = D.kind === 'disk';
  const pl = paramList(S.d, null, false);
  const plTxt = pl.length > 1 ? pl.slice(0, -1).join(', ') + ' och ' + pl[pl.length - 1] : pl[0];
  const intro = S.d === 'normal' ? plTxt : `${dname(D)} med ${plTxt}`;
  if (lastInv && lastInv.m === S.m && lastInv.d === S.d) {
    const g = v => (disk ? num(Math.round(v), 0) : num(v, Math.abs(v) >= 10 ? 1 : 2)) + unitSuffix();
    const var_ = { left: 'under gränsen', right: 'över gränsen', interval: 'mellan gränserna', outside: 'utanför gränserna' }[S.m];
    const gtxt = (S.m === 'left' ? g(S.b) : S.m === 'right' ? g(S.a) : `${g(S.a)} och ${g(S.b)}`);
    return `${intro} med andelen ${num(lastInv.P, 8)} ${var_} ger ${S.m === 'left' || S.m === 'right' ? 'gränsen' : 'gränserna'} ${gtxt}.`;
  }
  return `${intro} med intervallet ${intervalX()} ger ${pfmt(pr, Math.min(S.dec, 4))} ≈ ${roughPct(pr)}.`;
}

function renderRight() {
  if (S.tab === 'statistik') { renderStatRight(); return; }
  const D = D_(), disk = D.kind === 'disk';
  const hasSd = isFinite(D.sd(params(S.d).p));
  let h = `<div class="res"><div class="eyebrow">Svar</div><p id="resWords" class="words"></p><div id="cmpRes"></div></div>`;
  h += `<div class="grp"><div class="eyebrow">Redovisning <button type="button" class="copytxt" id="copyRedov">Kopiera</button></div><div class="redov" id="redov"></div></div>`;
  h += `<div class="grp"><div class="eyebrow">Fördelningen</div><div class="formel" id="formel"></div><dl class="props" id="props"></dl></div>`;
  h += `<div class="grp"><div class="eyebrow">Visa</div>
    <label class="tgl"><input type="checkbox" data-t="cum"${S.cum ? ' checked' : ''}><span class="sw"></span><span class="tx">Kumulativ fördelning<small>${disk ? '<i>P</i>(<i>X</i> ≤ <i>k</i>) i stället för <i>P</i>(<i>X</i> = <i>k</i>)' : '<i>F</i>(<i>x</i>) = <i>P</i>(<i>X</i> ≤ <i>x</i>) i stället för tätheten'}</small></span></label>
    ${hasSd ? `<label class="tgl"><input type="checkbox" data-t="sig"${S.sig ? ' checked' : ''}><span class="sw"></span><span class="tx">Visa <i>μ</i> ± <i>σ</i>, 2<i>σ</i> och 3<i>σ</i><small>Streckade linjer vid hela standardavvikelser</small></span></label>` : ''}
    ${disk ? `<label class="tgl"><input type="checkbox" data-t="apx"${S.apx ? ' checked' : ''}><span class="sw"></span><span class="tx">Normalapproximation<small>Normalfördelning med samma <i>μ</i> och <i>σ</i></small></span></label><div id="apxOut" class="note"></div>
    <label class="tgl"><input type="checkbox" data-t="tbl"${S.tbl ? ' checked' : ''}><span class="sw"></span><span class="tx">Tabell<small>Sannolikheten för varje värde</small></span></label><div id="tblBox"></div>` : ''}
  </div>`;
  h += `<div class="grp"><label class="tgl"><input type="checkbox" data-t="cmp"${S.cmp ? ' checked' : ''}><span class="sw"></span><span class="tx">Jämför med en andra kurva<small>Samma fördelning med andra parametrar, streckad i rött</small></span></label>`;
  if (S.cmp) {
    const ct = ptext(S.d, S.cpt), cb = params(S.d, S.cpt, 'c').bad;
    h += `<div class="sub">` + D.params.map(q => `<div class="fld"><span>${q.label} <span class="sym">${q.sym}</span></span><input data-cp="${q.k}" value="${esc(ct[q.k])}" inputmode="decimal" autocomplete="off" class="${cb[q.k] ? 'bad' : ''}"></div>`).join('') + `</div>`;
  }
  h += `</div>`;
  h += `<div class="grp"><div class="eyebrow">Simulera ett stickprov</div>
    <div class="optrow"><span>Antal värden</span><div class="seg" data-seg="simN">${[100, 1000, 10000].map(n => `<button type="button" data-v="${n}" class="${S.simN === n ? 'on' : ''}">${num(n, 0)}</button>`).join('')}</div></div>
    <div style="display:flex;gap:8px;margin-top:6px"><button type="button" class="wbtn dark" id="simBtn">Slumpa</button><button type="button" class="wbtn" id="simClr"${sim ? '' : ' hidden'}>Ta bort</button></div>
    <div class="note simstat" id="simStat"></div></div>`;
  h += `<div class="grp"><div class="eyebrow">Antal i en grupp</div><div class="cnt"><span>Av</span><input id="cntN" value="${esc(S.N)}" inputmode="numeric" autocomplete="off" aria-label="Antal i gruppen"><span>väntas</span></div><div class="cnt-out" id="cntOut"></div></div>`;
  h += `<div class="grp"><div class="optrow"><span>Decimaler</span><div class="seg" data-seg="dec">${[2, 3, 4, 5, 6].map(n => `<button type="button" data-v="${n}" class="${S.dec === n ? 'on' : ''}">${n}</button>`).join('')}</div></div></div>`;
  rightEl.innerHTML = h;
  renderFormula();
}
function renderFormula() {
  const el = $('#formel');
  if (!el) return;
  const tex = S.tab === 'statistik' ? null : D_().tex;
  if (!tex) { el.innerHTML = ''; return; }
  if (window.katex) { try { window.katex.render(tex, el, { throwOnError: false, displayMode: true }); } catch (e) { el.textContent = ''; } }
}

// Uppdaterar allt som beror på värdena, utan att bygga om fälten.
function update(o = {}) {
  if (S.tab === 'statistik') { updateStat(); save(); return; }
  const D = D_(), disk = D.kind === 'disk', { p, err } = params(S.d);
  const med = median(D, p);
  const pr = probOf(D, p, S.m, S.a, S.b, med);
  const act = document.activeElement;
  // Fälten i sannolikhetsraden
  sbarEl.querySelectorAll('[data-b]').forEach(el => {
    if (el === act) return;
    const v = S[el.dataset.b];
    el.value = disk ? num(Math.round(v), 0) : num(v, Math.max(S.dec, 2)).replace(/ /g, ' ');
    el.classList.remove('bad');
  });
  const prEl = sbarEl.querySelector('[data-pr]');
  if (prEl && prEl !== act) { prEl.value = isFinite(pr) ? pctfmt(pr).replace(/ %$/, '') : ''; prEl.classList.remove('bad'); }
  const pctEl = $('#pctOut'); if (pctEl) pctEl.textContent = isFinite(pr) ? '= ' + pfmt(pr) + ' i decimalform' : '';
  const sym = $('#qSym'); if (sym) sym.innerHTML = isFinite(pr) ? 'Med beteckningar: ' + stmtHtml(false) : '';
  const hint = $('#sbarHint');
  if (hint) {
    let m = '', warn = false;
    if ((S.m === 'interval' || S.m === 'outside') && S.a > S.b) { m = 'Den undre gränsen är större än den övre.'; warn = true; }
    else if (S.m === 'outside' && S.a === S.b) { m = 'Gränserna måste vara olika i ett intervallkomplement.'; warn = true; }
    else if (o.hint) { m = o.hint; warn = !!o.warn; }
    else if (err) { m = err; warn = true; }
    else if (disk) m = 'Gränserna räknas med. Vet du sannolikheten men inte gränsen? Skriv den i rutan till höger.';
    else m = 'Dra i de röda handtagen eller skriv in gränserna. Vet du andelen men inte gränsen? Skriv andelen i rutan till höger.';
    hint.textContent = m; hint.classList.toggle('warn', warn);
  }
  // Högerpanelen
  const big = $('#bigP');
  if (big) big.innerHTML = isFinite(pr) ? `${pfmt(pr)}<small>${pctfmt(pr)}</small>` : '–';
  const words = $('#resWords');
  if (words) words.innerHTML = isFinite(pr) ? (disk ? `Sannolikheten att utfallet blir ${wordsFor()} är ${pfmt(pr)} = ${pctfmt(pr)}.` : `${pctfmt(pr)} av värdena är ${wordsFor()}. Andelen är arean under grafen i intervallet.`) : '';
  const cr = $('#cmpRes');
  if (cr) {
    if (S.cmp) {
      const cp = params(S.d, S.cpt, 'c').p, cpr = probOf(D, cp, S.m, S.a, S.b);
      const nm = S.names ? S.names : ['Kurva 1', 'Kurva 2'];
      cr.innerHTML = `<div class="cmpres"><b>${esc(nm[1])}:</b> ${pfmt(cpr)} (${pctfmt(cpr)})<br><span style="color:var(--soft)">${esc(nm[0])}: ${pfmt(pr)} (${pctfmt(pr)})</span></div>`;
    } else cr.innerHTML = '';
  }
  const rd = $('#redov'); if (rd) rd.innerHTML = isFinite(pr) ? redovHtml(pr) : '';
  const pp = $('#props');
  if (pp) {
    const mu = D.mean(p), sd = D.sd(p);
    const nd = v => num(v, 4);
    let h = `<dt>Medelvärde <i>μ</i></dt><dd>${isFinite(mu) ? nd(mu) : 'saknas'}</dd>`;
    h += `<dt>Standardavvikelse <i>σ</i></dt><dd>${isFinite(sd) ? nd(sd) : sd === Infinity ? '∞' : 'saknas'}</dd>`;
    h += `<dt>Varians <i>σ</i><sup>2</sup></dt><dd>${isFinite(sd) ? nd(sd * sd) : sd === Infinity ? '∞' : 'saknas'}</dd>`;
    h += `<dt>Median</dt><dd>${disk ? num(med, 0) : nd(med)}</dd>`;
    if (S.d === 'normal') {
      const zs = [];
      if (S.m !== 'right') zs.push(S.b);
      if (S.m !== 'left') zs.unshift(S.a);
      zs.forEach(v => { h += `<dt><i>z</i>-värde för ${num(v, 4)}${unitSuffix()}</dt><dd>${num((v - p.mu) / p.sigma, 4)}</dd>`; });
    }
    pp.innerHTML = h;
  }
  const ao = $('#apxOut');
  if (ao) {
    if (S.apx && disk) {
      const m = D.mean(p), s = D.sd(p), N = { mu: m, sigma: s };
      const A = Math.round(S.a) - 0.5, B = Math.round(S.b) + 0.5;
      const napx = S.m === 'left' ? DISTS.normal.cdf(B, N) : S.m === 'right' ? DISTS.normal.sf(A, N) : S.m === 'interval' ? probOf(DISTS.normal, N, 'interval', A, B, m) : DISTS.normal.cdf(Math.round(S.a) + 0.5, N) + DISTS.normal.sf(Math.round(S.b) - 0.5, N);
      ao.innerHTML = `Normalapproximation med halvkorrektion: ${pfmt(napx)}. Exakt: ${pfmt(pr)}.`;
    } else ao.innerHTML = '';
  }
  const tb = $('#tblBox');
  if (tb) {
    if (S.tbl && disk) {
      const keep = tb.firstChild ? tb.firstChild.scrollTop : 0;
      const lo = Math.max(D.lo(p), Math.ceil(V.x0)), hi = Math.min(D.hi(p), Math.floor(V.x1), lo + 400);
      let r = '';
      for (let k = lo; k <= hi; k++) r += `<tr data-k="${k}" class="${inRegion(k, S.m, S.a, S.b) ? 'in' : ''}"><td>${k}</td><td>${pfmt(D.pmf(k, p))}</td><td>${pfmt(dcdf(D, k, p))}</td></tr>`;
      tb.innerHTML = `<div class="tbl-wrap"><table class="vt"><thead><tr><th><i>k</i></th><th><i>P</i>(<i>X</i> = <i>k</i>)</th><th><i>P</i>(<i>X</i> ≤ <i>k</i>)</th></tr></thead><tbody>${r}</tbody></table></div><p class="note">Klicka på en rad för att flytta närmaste gräns dit.</p>`;
      tb.firstChild.scrollTop = keep;
    } else tb.innerHTML = '';
  }
  const ss = $('#simStat');
  if (ss) {
    if (sim && sim.key === simKey()) {
      const v = sim.vals, n = v.length;
      let s = 0, s2 = 0, inR = 0;
      for (let i = 0; i < n; i++) { s += v[i]; }
      const m = s / n;
      for (let i = 0; i < n; i++) { s2 += (v[i] - m) ** 2; if (inSample(v[i])) inR++; }
      const sd = Math.sqrt(s2 / (n - 1));
      ss.innerHTML = `Medelvärde ${num(m, 3)}${unitSuffix()}, standardavvikelse ${num(sd, 3)}${unitSuffix()}.<br>${pctfmt(inR / n, 3)} av värdena hamnade i intervallet. Teoretiskt: ${pctfmt(pr, 3)}.`;
    } else ss.innerHTML = 'Dra ett slumpmässigt stickprov ur fördelningen och jämför histogrammet med kurvan.';
    const clr = $('#simClr'); if (clr) clr.hidden = !(sim && sim.key === simKey());
  }
  const co = $('#cntOut');
  if (co) {
    const N = parseNum(S.N);
    co.innerHTML = (isFinite(N) && N > 0 && isFinite(pr)) ? `i genomsnitt <b>${num(N * pr, N * pr >= 100 ? 0 : 1)}</b> ha ett värde som är ${wordsFor()}.` : 'Skriv hur många som ingår i gruppen.';
  }
  const tag = $('#sheetTag'); if (tag) tag.innerHTML = sheetTagHtml();
  if (!o.noDraw) draw();
  save();
}
function inSample(x) {
  const disk = D_().kind === 'disk';
  if (disk) return inRegion(x, S.m, S.a, S.b);
  if (S.m === 'left') return x <= S.b;
  if (S.m === 'right') return x >= S.a;
  if (S.m === 'interval') return x >= S.a && x <= S.b;
  return x <= S.a || x >= S.b;
}
function syncSliders() {
  const act = document.activeElement;
  leftEl.querySelectorAll('[data-r]').forEach(r => {
    if (r === act) return;
    const q = D_().params.find(x => x.k === r.dataset.r);
    const v = parseNum(ptext(S.d)[r.dataset.r], q.kind === 'prob');
    if (isFinite(v)) r.value = v;
  });
}
function renderAll() {
  document.querySelectorAll('.tabs button').forEach(b => { const on = b.dataset.tab === S.tab; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
  $('.zoom').style.display = S.tab === 'fordelning' ? '' : 'none';
  renderLeft(); renderSbar(); renderRight(); update();
}

// Omvänd beräkning: en andel ger gränsen (eller gränserna).
function inverse(P) {
  const D = D_(), { p } = params(S.d), disk = D.kind === 'disk';
  let hint = '', warn = false;
  if (!disk) {
    if (S.m === 'left') S.b = quant(D, p, P);
    else if (S.m === 'right') S.a = quant(D, p, P, true);
    else if (S.m === 'interval') { S.a = quant(D, p, (1 - P) / 2); S.b = quant(D, p, (1 - P) / 2, true); hint = 'Intervallet är lagt så att lika stor andel hamnar utanför på båda sidor.'; }
    else { S.a = quant(D, p, P / 2); S.b = quant(D, p, P / 2, true); hint = 'Svansarna är lika stora, ' + pfmt(P / 2) + ' var.'; }
  } else {
    const best = (cands, f) => cands.reduce((b, k) => Math.abs(f(k) - P) < Math.abs(f(b) - P) ? k : b);
    if (S.m === 'left') { const k = qDisc(D, p, P); S.b = best([k, k - 1], k2 => dcdf(D, k2, p)); }
    else if (S.m === 'right') { const k = qDisc(D, p, 1 - P); S.a = best([k, k + 1], k2 => dge(D, k2, p)); }
    else if (S.m === 'interval') { S.a = qDisc(D, p, (1 - P) / 2) ; S.b = qDisc(D, p, (1 + P) / 2); if (S.b < S.a) S.b = S.a; }
    else { S.a = qDisc(D, p, P / 2) - 1; S.b = qDisc(D, p, 1 - P / 2) + 1; }
    const got = probOf(D, p, S.m, S.a, S.b);
    if (Math.abs(got - P) > 1e-9) { hint = `Exakt ${pfmt(P)} går inte att få i en diskret fördelning. Närmast: ${pfmt(got)}.`; warn = true; }
  }
  lastInv = { P, m: S.m, d: S.d };
  const [a0, a1] = [S.a, S.b];
  if (isFinite(a0) && isFinite(a1) && (Math.min(a0, a1) < V.x0 || Math.max(a0, a1) > V.x1)) {
    const lo = Math.min(V.x0, S.m === 'left' ? V.x0 : a0), hi = Math.max(V.x1, S.m === 'right' ? V.x1 : a1);
    const pad = (hi - lo) * 0.05;
    animateTo({ x0: lo - pad, x1: hi + pad, y1: V.y1 });
  }
  update({ hint, warn });
}

/* ---- Händelser i vänsterpanelen ---- */
leftEl.addEventListener('click', e => {
  if (S.tab === 'statistik') {
    const b = e.target.closest('[data-proc]');
    if (b) { S.proc = b.dataset.proc; renderAll(); }
    return;
  }
  const pb = e.target.closest('#pickBtn');
  if (pb) { $('#pickList').classList.toggle('open'); return; }
  const it = e.target.closest('[data-d]');
  if (it) {
    if (it.dataset.d !== S.d) {
      S.d = it.dataset.d; S.pre = null; S.cmp = false; S.names = null; S.u = ''; S.xl = ''; S.apx = false; S.tbl = false;
      sim = null; lastInv = null;
      ptext(S.d); computeRanges(); defaultBounds(); V = fitView();
    }
    renderAll();
    return;
  }
  const ps = e.target.closest('[data-pre]');
  if (ps) { applyPreset(PRESETS.find(x => x.id === ps.dataset.pre)); renderAll(); }
});
document.addEventListener('pointerdown', e => {
  const pl = $('#pickList');
  if (pl && !e.target.closest('.picker')) pl.classList.remove('open');
});
leftEl.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.p) {
    ptext(S.d)[t.dataset.p] = t.value;
    lastInv = null;
    const { bad } = params(S.d);
    leftEl.querySelectorAll('[data-p]').forEach(el => el.classList.toggle('bad', !!bad[el.dataset.p]));
    syncSliders();
    update();
  } else if (t.dataset.r) {
    const q = D_().params.find(x => x.k === t.dataset.r);
    const v = parseFloat(t.value);
    const s = q.kind === 'int' || q.kind === 'df' ? String(Math.round(v)) : num(v, decFor(rng[q.k].step) + 1).replace(/ /g, '');
    ptext(S.d)[q.k] = s;
    const f = leftEl.querySelector(`[data-p="${q.k}"]`); if (f) { f.value = s; f.classList.remove('bad'); }
    lastInv = null;
    if (S.d === 'hyper') { const { p } = params(S.d); ['K', 'n'].forEach(k => { if (rng[k]) { rng[k].max = p.N; const r = leftEl.querySelector(`[data-r="${k}"]`); if (r) r.max = p.N; } }); }
    update();
  } else if (t.id === 'unitIn') {
    S.u = t.value.trim().slice(0, 12);
    update();
    leftEl.querySelectorAll('.nf').forEach(nf => { const u = nf.querySelector('.u'); if (u) u.textContent = S.u; });
  }
});
leftEl.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.p || t.dataset.r) {
    if (t.dataset.p) {
      // Ett inskrivet värde utanför reglagets intervall: räkna om intervallen.
      const q = D_().params.find(x => x.k === t.dataset.p), v = parseNum(t.value, q.kind === 'prob'), r = rng[q.k];
      if (isFinite(v) && r && (v < r.min || v > r.max)) { computeRanges(); renderLeft(); }
    }
    if (S.tab === 'fordelning' && S.d === 'unif') computeRanges();
    renderRight(); update({ noDraw: true }); maybeRefit(); draw();
  }
  if (t.id === 'unitIn') renderLeft();
});

/* ---- Händelser i sannolikhetsraden ---- */
sbarEl.addEventListener('click', e => {
  const b = e.target.closest('[data-m]');
  if (!b || S.tab !== 'fordelning') return;
  const old = S.m;
  S.m = b.dataset.m;
  const D = D_(), { p } = params(S.d), disk = D.kind === 'disk';
  // Behåll den gräns som ligger kvar, och ge den nya en rimlig plats.
  if (old === 'left' && S.m !== 'left') { if (!(S.a < S.b)) S.a = disk ? Math.round(D.mean(p) - D.sd(p)) : S.b - 2 * scaleOf(D, p); }
  if (old === 'right' && S.m !== 'right') { if (!(S.b > S.a)) S.b = disk ? Math.round(D.mean(p) + D.sd(p)) : S.a + 2 * scaleOf(D, p); }
  lastInv = null;
  renderSbar(); renderRight(); update();
});
sbarEl.addEventListener('input', e => {
  const t = e.target;
  if (S.tab !== 'fordelning') return;
  if (t.dataset.b) {
    const v = parseNum(t.value);
    t.classList.toggle('bad', !isFinite(v));
    if (isFinite(v)) { S[t.dataset.b] = v; lastInv = null; update(); }
  }
});
// Ett klick i ett talfält markerar hela talet, så att det nya skrivs över det gamla.
[sbarEl, leftEl, rightEl].forEach(el => el.addEventListener('focusin', e => {
  const t = e.target;
  if (t.matches('input:not([type=range]):not([type=checkbox])')) setTimeout(() => { if (document.activeElement === t) t.select(); }, 0);
}));
sbarEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.matches('input')) { e.target.blur(); }
});
sbarEl.addEventListener('change', e => {
  const t = e.target;
  if (S.tab !== 'fordelning') return;
  if (t.dataset.pr) {
    // Rutan räknar i procent: 99 betyder 99 %.
    const P = parseNum(t.value.replace('%', '')) / 100;
    if (!(P > 0 && P < 1)) { t.classList.add('bad'); update({ hint: 'Skriv en andel i procent mellan 0 och 100, till exempel 99.', warn: true }); return; }
    inverse(P);
  } else if (t.dataset.b) {
    update();
    const v = S[t.dataset.b];
    if (isFinite(v) && (v < V.x0 || v > V.x1)) {
      const w = V.x1 - V.x0;
      animateTo({ x0: Math.min(V.x0, v - w * 0.08), x1: Math.max(V.x1, v + w * 0.08), y1: V.y1 });
    }
  }
});

/* ---- Händelser i högerpanelen ---- */
rightEl.addEventListener('change', e => {
  const t = e.target;
  if (S.tab === 'statistik') return;
  if (t.dataset.t) {
    S[t.dataset.t] = t.checked;
    if (t.dataset.t === 'cmp' && t.checked) {
      if (!S.cpt[S.d]) {
        // Förval: kurva nummer två förskjuten en standardavvikelse, eller
        // med dubbel spridning.
        const D = D_(), { p } = params(S.d), c = {};
        D.params.forEach(q => {
          let v = p[q.k];
          if (q.kind === 'loc') v = v + scaleOf(D, p);
          else if (q.kind === 'pos') v = v * 1.5;
          else if (q.kind === 'prob') v = Math.min(0.9, v + 0.2);
          else if (q.kind === 'int' || q.kind === 'df') v = Math.max(1, Math.round(v * 1.5));
          c[q.k] = num(v, 4).replace(/ /g, '');
        });
        S.cpt[S.d] = c;
      }
      if (!S.names) S.names = null;
    }
    if (t.dataset.t === 'cmp' || t.dataset.t === 'apx') { renderRight(); update({ noDraw: true }); maybeRefit(); draw(); return; }
    renderRight(); update();
    if (t.dataset.t === 'cum') draw();
  }
  if (t.dataset.cp) { renderRight(); update({ noDraw: true }); maybeRefit(); draw(); }
});
rightEl.addEventListener('input', e => {
  const t = e.target;
  if (S.tab === 'statistik') return;
  if (t.dataset.cp) {
    ptext(S.d, S.cpt)[t.dataset.cp] = t.value;
    const { bad } = params(S.d, S.cpt, 'c');
    rightEl.querySelectorAll('[data-cp]').forEach(el => el.classList.toggle('bad', !!bad[el.dataset.cp]));
    update();
  }
  if (t.id === 'cntN') { S.N = t.value; update({ noDraw: true }); }
});
rightEl.addEventListener('click', e => {
  if (S.tab === 'statistik') return;
  const sb = e.target.closest('.seg button');
  if (sb) {
    const key = sb.parentElement.dataset.seg;
    S[key] = +sb.dataset.v;
    renderRight(); update();
    return;
  }
  if (e.target.closest('#simBtn')) {
    const D = D_(), { p } = params(S.d);
    sim = { key: simKey(), vals: sample(D, p, S.simN), n: S.simN };
    const clr = $('#simClr'); if (clr) clr.hidden = false;
    update();
    return;
  }
  if (e.target.closest('#simClr')) { sim = null; update(); return; }
  if (e.target.closest('#copyRedov')) {
    const txtv = plain($('#redov').innerHTML);
    copyText(txtv, 'Redovisningen är kopierad.');
    return;
  }
  const row = e.target.closest('tr[data-k]');
  if (row) { setNearestBound(+row.dataset.k); }
});
function setNearestBound(x) {
  if (S.m === 'left') S.b = x;
  else if (S.m === 'right') S.a = x;
  else if (Math.abs(x - S.a) <= Math.abs(x - S.b)) S.a = Math.min(x, S.b); else S.b = Math.max(x, S.a);
  lastInv = null;
  update();
}

/* ================= 8. Statistikfliken ================= */
const XB = (i) => `<i class="xbar">x</i>${i ? '<sub>' + i + '</sub>' : ''}`;
const PH = (i) => `<i>p̂</i>${i ? '<sub>' + i + '</sub>' : ''}`;
const Fd = (k, sym, label, def, o) => Object.assign({ k, sym, label, def }, o || {});
const S1 = [Fd('xbar', XB(), 'Stickprovets medelvärde', '105'), Fd('n', I('n'), 'Stickprovets storlek', '36', { int: true })];
const two = (sd) => [
  Fd('xbar1', XB(1), 'Medelvärde, stickprov 1', '52,3'), Fd(sd + '1', sd === 'sigma' ? I('σ') + '<sub>1</sub>' : I('s') + '<sub>1</sub>', sd === 'sigma' ? 'Standardavvikelse, population 1' : 'Standardavvikelse, stickprov 1', '6,2'), Fd('n1', I('n') + '<sub>1</sub>', 'Storlek, stickprov 1', '40', { int: true }),
  Fd('xbar2', XB(2), 'Medelvärde, stickprov 2', '49,1'), Fd(sd + '2', sd === 'sigma' ? I('σ') + '<sub>2</sub>' : I('s') + '<sub>2</sub>', sd === 'sigma' ? 'Standardavvikelse, population 2' : 'Standardavvikelse, stickprov 2', '7,0'), Fd('n2', I('n') + '<sub>2</sub>', 'Storlek, stickprov 2', '35', { int: true }),
];
const twoProp = [Fd('x1', I('x') + '<sub>1</sub>', 'Antal lyckade, stickprov 1', '48', { int: true }), Fd('n1', I('n') + '<sub>1</sub>', 'Storlek, stickprov 1', '120', { int: true }), Fd('x2', I('x') + '<sub>2</sub>', 'Antal lyckade, stickprov 2', '33', { int: true }), Fd('n2', I('n') + '<sub>2</sub>', 'Storlek, stickprov 2', '110', { int: true })];
const welch = (v) => { const a = v.s1 * v.s1 / v.n1, b = v.s2 * v.s2 / v.n2; return (a + b) ** 2 / (a * a / (v.n1 - 1) + b * b / (v.n2 - 1)); };
function pooledSE(v) { const sp2 = ((v.n1 - 1) * v.s1 ** 2 + (v.n2 - 1) * v.s2 ** 2) / (v.n1 + v.n2 - 2); return Math.sqrt(sp2 * (1 / v.n1 + 1 / v.n2)); }
const chk = (c, m) => { if (!c) throw new Error(m); };
const PROCS = [
  { id: 'z1', g: 'test', name: I('z') + '-test för ett medelvärde', par: I('μ'), h0: v => num(v.mu0),
    fields: [Fd('mu0', I('μ') + '<sub>0</sub>', 'Nollhypotesens medelvärde', '100'), Fd('sigma', I('σ'), 'Populationens standardavvikelse', '15'), ...S1],
    run(v) { chk(v.sigma > 0 && v.n >= 1, 'Standardavvikelsen och stickprovets storlek måste vara positiva.'); const se = v.sigma / Math.sqrt(v.n); return { ref: { t: 'z' }, stat: (v.xbar - v.mu0) / se, rows: [['Standardfel ' + I('σ') + '/√' + I('n'), num(se, 4)]] }; } },
  { id: 't1', g: 'test', name: I('t') + '-test för ett medelvärde', par: I('μ'), h0: v => num(v.mu0), data: 1,
    fields: [Fd('mu0', I('μ') + '<sub>0</sub>', 'Nollhypotesens medelvärde', '500'), Fd('xbar', XB(), 'Stickprovets medelvärde', '497,2'), Fd('s', I('s'), 'Stickprovets standardavvikelse', '4,1'), Fd('n', I('n'), 'Stickprovets storlek', '12', { int: true })],
    run(v) { chk(v.s > 0 && v.n >= 2, 'Standardavvikelsen måste vara positiv och stickprovet ha minst två värden.'); const se = v.s / Math.sqrt(v.n); return { ref: { t: 't', df: v.n - 1 }, stat: (v.xbar - v.mu0) / se, rows: [['Standardfel ' + I('s') + '/√' + I('n'), num(se, 4)], ['Frihetsgrader', num(v.n - 1, 0)]] }; } },
  { id: 'zp1', g: 'test', name: I('z') + '-test för en andel', par: I('p'), h0: v => num(v.p0),
    fields: [Fd('p0', I('p') + '<sub>0</sub>', 'Nollhypotesens andel', '0,5', { prob: true }), Fd('x', I('x'), 'Antal lyckade', '62', { int: true }), Fd('n', I('n'), 'Stickprovets storlek', '100', { int: true })],
    run(v) { chk(v.p0 > 0 && v.p0 < 1, 'Andelen måste ligga mellan 0 och 1.'); chk(v.n >= 1 && v.x >= 0 && v.x <= v.n, 'Antalet lyckade måste ligga mellan 0 och stickprovets storlek.'); const ph = v.x / v.n, se = Math.sqrt(v.p0 * (1 - v.p0) / v.n); return { ref: { t: 'z' }, stat: (ph - v.p0) / se, rows: [['Stickprovets andel ' + PH(), num(ph, 4)], ['Standardfel', num(se, 4)]], warn: (v.n * v.p0 < 5 || v.n * (1 - v.p0) < 5) ? 'Normalapproximationen är osäker när ' + I('n') + I('p') + '<sub>0</sub> eller ' + I('n') + '(1 − ' + I('p') + '<sub>0</sub>) är mindre än 5.' : '' }; } },
  { id: 'z2', g: 'test', name: I('z') + '-test för två medelvärden', par2: [I('μ') + '<sub>1</sub>', I('μ') + '<sub>2</sub>'], fields: two('sigma'),
    run(v) { chk(v.sigma1 > 0 && v.sigma2 > 0 && v.n1 >= 1 && v.n2 >= 1, 'Standardavvikelserna och storlekarna måste vara positiva.'); const se = Math.sqrt(v.sigma1 ** 2 / v.n1 + v.sigma2 ** 2 / v.n2); return { ref: { t: 'z' }, stat: (v.xbar1 - v.xbar2) / se, rows: [['Skillnad ' + XB(1) + ' − ' + XB(2), num(v.xbar1 - v.xbar2, 4)], ['Standardfel', num(se, 4)]] }; } },
  { id: 't2', g: 'test', name: I('t') + '-test för två medelvärden', par2: [I('μ') + '<sub>1</sub>', I('μ') + '<sub>2</sub>'], fields: two('s'), pool: 1, data: 2,
    run(v, o) { chk(v.s1 > 0 && v.s2 > 0 && v.n1 >= 2 && v.n2 >= 2, 'Standardavvikelserna måste vara positiva och varje stickprov ha minst två värden.'); const se = o.pooled ? pooledSE(v) : Math.sqrt(v.s1 ** 2 / v.n1 + v.s2 ** 2 / v.n2); const df = o.pooled ? v.n1 + v.n2 - 2 : welch(v); return { ref: { t: 't', df }, stat: (v.xbar1 - v.xbar2) / se, rows: [['Skillnad ' + XB(1) + ' − ' + XB(2), num(v.xbar1 - v.xbar2, 4)], ['Standardfel', num(se, 4)], ['Frihetsgrader', num(df, o.pooled ? 0 : 2)]] }; } },
  { id: 'zp2', g: 'test', name: I('z') + '-test för två andelar', par2: [I('p') + '<sub>1</sub>', I('p') + '<sub>2</sub>'], fields: twoProp,
    run(v) { chk(v.n1 >= 1 && v.n2 >= 1 && v.x1 >= 0 && v.x2 >= 0 && v.x1 <= v.n1 && v.x2 <= v.n2, 'Antalet lyckade måste ligga mellan 0 och stickprovets storlek.'); const p1 = v.x1 / v.n1, p2 = v.x2 / v.n2, pp = (v.x1 + v.x2) / (v.n1 + v.n2), se = Math.sqrt(pp * (1 - pp) * (1 / v.n1 + 1 / v.n2)); chk(se > 0, 'Andelarna kan inte vara 0 eller 1 i båda stickproven.'); return { ref: { t: 'z' }, stat: (p1 - p2) / se, rows: [[PH(1), num(p1, 4)], [PH(2), num(p2, 4)], ['Sammanvägd andel', num(pp, 4)], ['Standardfel', num(se, 4)]] }; } },
  { id: 'zci1', g: 'ci', name: 'Konfidensintervall för ett medelvärde, känt ' + I('σ'), par: I('μ'), fields: [Fd('sigma', I('σ'), 'Populationens standardavvikelse', '15'), ...S1],
    run(v) { chk(v.sigma > 0 && v.n >= 1, 'Standardavvikelsen och stickprovets storlek måste vara positiva.'); return { ref: { t: 'z' }, est: v.xbar, se: v.sigma / Math.sqrt(v.n), estLab: XB() }; } },
  { id: 'tci1', g: 'ci', name: 'Konfidensintervall för ett medelvärde, okänt ' + I('σ'), par: I('μ'), data: 1, fields: [Fd('xbar', XB(), 'Stickprovets medelvärde', '497,2'), Fd('s', I('s'), 'Stickprovets standardavvikelse', '4,1'), Fd('n', I('n'), 'Stickprovets storlek', '12', { int: true })],
    run(v) { chk(v.s > 0 && v.n >= 2, 'Standardavvikelsen måste vara positiv och stickprovet ha minst två värden.'); return { ref: { t: 't', df: v.n - 1 }, est: v.xbar, se: v.s / Math.sqrt(v.n), estLab: XB(), rows: [['Frihetsgrader', num(v.n - 1, 0)]] }; } },
  { id: 'zpci1', g: 'ci', name: 'Konfidensintervall för en andel', par: I('p'), fields: [Fd('x', I('x'), 'Antal lyckade', '420', { int: true }), Fd('n', I('n'), 'Stickprovets storlek', '1000', { int: true })],
    run(v) { chk(v.n >= 1 && v.x >= 0 && v.x <= v.n, 'Antalet lyckade måste ligga mellan 0 och stickprovets storlek.'); const ph = v.x / v.n; return { ref: { t: 'z' }, est: ph, se: Math.sqrt(ph * (1 - ph) / v.n), estLab: PH(), pct: true }; } },
  { id: 'zci2', g: 'ci', name: 'Konfidensintervall för skillnad mellan medelvärden, kända ' + I('σ'), par: I('μ') + '<sub>1</sub> − ' + I('μ') + '<sub>2</sub>', fields: two('sigma'),
    run(v) { chk(v.sigma1 > 0 && v.sigma2 > 0 && v.n1 >= 1 && v.n2 >= 1, 'Standardavvikelserna och storlekarna måste vara positiva.'); return { ref: { t: 'z' }, est: v.xbar1 - v.xbar2, se: Math.sqrt(v.sigma1 ** 2 / v.n1 + v.sigma2 ** 2 / v.n2), estLab: XB(1) + ' − ' + XB(2) }; } },
  { id: 'tci2', g: 'ci', name: 'Konfidensintervall för skillnad mellan medelvärden, okända ' + I('σ'), par: I('μ') + '<sub>1</sub> − ' + I('μ') + '<sub>2</sub>', fields: two('s'), pool: 1, data: 2,
    run(v, o) { chk(v.s1 > 0 && v.s2 > 0 && v.n1 >= 2 && v.n2 >= 2, 'Standardavvikelserna måste vara positiva och varje stickprov ha minst två värden.'); const df = o.pooled ? v.n1 + v.n2 - 2 : welch(v); return { ref: { t: 't', df }, est: v.xbar1 - v.xbar2, se: o.pooled ? pooledSE(v) : Math.sqrt(v.s1 ** 2 / v.n1 + v.s2 ** 2 / v.n2), estLab: XB(1) + ' − ' + XB(2), rows: [['Frihetsgrader', num(df, o.pooled ? 0 : 2)]] }; } },
  { id: 'zpci2', g: 'ci', name: 'Konfidensintervall för skillnad mellan andelar', par: I('p') + '<sub>1</sub> − ' + I('p') + '<sub>2</sub>', fields: twoProp,
    run(v) { chk(v.n1 >= 1 && v.n2 >= 1 && v.x1 >= 0 && v.x2 >= 0 && v.x1 <= v.n1 && v.x2 <= v.n2, 'Antalet lyckade måste ligga mellan 0 och stickprovets storlek.'); const p1 = v.x1 / v.n1, p2 = v.x2 / v.n2; return { ref: { t: 'z' }, est: p1 - p2, se: Math.sqrt(p1 * (1 - p1) / v.n1 + p2 * (1 - p2) / v.n2), estLab: PH(1) + ' − ' + PH(2), rows: [[PH(1), num(p1, 4)], [PH(2), num(p2, 4)]] }; } },
  { id: 'gof', g: 'chi', name: 'Chitvåtest för anpassning', chi: 'gof' },
  { id: 'ind', g: 'chi', name: 'Chitvåtest för oberoende', chi: 'ind' },
];
const PGROUPS = [['test', 'Hypotesprövning'], ['ci', 'Konfidensintervall'], ['chi', 'Chitvåtest']];
const proc = () => PROCS.find(x => x.id === S.proc) || PROCS[0];
function stState() {
  const P_ = proc();
  if (!S.st[P_.id]) {
    const o = { alt: 'ne', alpha: '0,05', level: '95 %', pooled: false, v: {} };
    (P_.fields || []).forEach(f => { o.v[f.k] = f.def; });
    if (P_.chi === 'gof') { o.obs = ['8', '12', '9', '11', '6', '14']; o.exp = ['1/6', '1/6', '1/6', '1/6', '1/6', '1/6']; o.lab = ['1', '2', '3', '4', '5', '6']; }
    if (P_.chi === 'ind') { o.tab = [['24', '31', '15'], ['18', '22', '30']]; }
    S.st[P_.id] = o;
  }
  return S.st[P_.id];
}
function renderProcList() {
  leftEl.innerHTML = PGROUPS.map(([g, gt]) => `<div class="proc-g"><div class="eyebrow">${gt}</div>${PROCS.filter(x => x.g === g).map(x => `<button type="button" class="proc${x.id === S.proc ? ' on' : ''}" data-proc="${x.id}">${x.name}</button>`).join('')}</div>`).join('')
    + `<p class="note" style="margin-top:16px">Grafen visar nollhypotesens fördelning. Det röda området är det kritiska området, och den blå arean är <i>p</i>-värdet.</p>`;
}
function hypHtml(P_, alt) {
  const rel = { ne: '≠', lt: '<', gt: '>' }[alt];
  const st = stState();
  if (P_.par2) return { h0: `${P_.par2[0]} = ${P_.par2[1]}`, h1: `${P_.par2[0]} ${rel} ${P_.par2[1]}` };
  const v = parseNum(st.v[P_.fields[0].k], true);
  const val = isFinite(v) ? num(v, 6) : '?';
  return { h0: `${P_.par} = ${val}`, h1: `${P_.par} ${rel} ${val}` };
}
function renderStatRight() {
  const P_ = proc(), st = stState();
  let h = `<div class="eyebrow">${P_.g === 'test' ? 'Hypoteser' : P_.g === 'ci' ? 'Konfidensintervall' : 'Data'}</div>`;
  if (P_.g === 'test') {
    const alts = ['ne', 'lt', 'gt'].map(a => [a, hypHtml(P_, a).h1]);
    h += `<div class="hyp" id="h0">H<sub>0</sub>: ${hypHtml(P_, st.alt).h0}</div>
      <div class="optrow" style="flex-wrap:wrap"><span>H<sub>1</sub>:</span><div class="seg" data-sseg="alt" id="altSeg">${alts.map(([a, t]) => `<button type="button" data-v="${a}" class="${st.alt === a ? 'on' : ''}">${t}</button>`).join('')}</div></div>
      <div class="fld"><span>Signifikansnivå <span class="sym"><i>α</i></span></span><input data-sv="alpha" value="${esc(st.alpha)}" inputmode="decimal" autocomplete="off"></div>`;
  }
  if (P_.g === 'ci') h += `<div class="fld"><span>Konfidensgrad</span><input data-sv="level" value="${esc(st.level)}" inputmode="decimal" autocomplete="off"></div>`;
  if (P_.fields) {
    let lastSamp = '';
    P_.fields.forEach(f => {
      const samp = /1$/.test(f.k) ? 'Stickprov 1' : /2$/.test(f.k) ? 'Stickprov 2' : '';
      if (samp && samp !== lastSamp) { h += `<div class="samp-h">${samp}</div>`; lastSamp = samp; }
      h += `<div class="fld"><span>${f.label} <span class="sym">${f.sym}</span></span><input data-f="${f.k}" value="${esc(st.v[f.k])}" inputmode="decimal" autocomplete="off"></div>`;
    });
  }
  if (P_.pool) h += `<label class="tgl" style="margin-top:8px"><input type="checkbox" data-pool="1"${st.pooled ? ' checked' : ''}><span class="sw"></span><span class="tx">Sammanvägd standardavvikelse<small>Anta att populationerna har samma spridning</small></span></label>`;
  if (P_.data) {
    h += `<details class="datab"><summary>Räkna ut ${XB()}, <i>s</i> och <i>n</i> från mätvärden</summary><textarea id="dataIn" placeholder="Klistra in eller skriv mätvärdena, åtskilda av mellanslag, semikolon eller radbrytningar"></textarea><div id="dataOut" class="note"></div>
      <div class="tb-acts">${P_.data === 2 ? '<button type="button" class="wbtn" data-use="1">Använd som stickprov 1</button><button type="button" class="wbtn" data-use="2">Använd som stickprov 2</button>' : '<button type="button" class="wbtn" data-use="0">Använd värdena</button>'}</div></details>`;
  }
  if (P_.chi === 'gof') {
    h += `<p class="note" style="margin-top:0">Skriv de observerade antalen och den förväntade sannolikheten (eller det förväntade antalet) för varje kategori.</p>
      <table class="ctab"><thead><tr><th>Kategori</th><th>Observerat</th><th>Förväntat</th></tr></thead><tbody>${st.obs.map((o, i) => `<tr><td><input data-gl="${i}" value="${esc(st.lab[i] || '')}"></td><td><input data-go="${i}" value="${esc(o)}" inputmode="decimal"></td><td><input data-ge="${i}" value="${esc(st.exp[i])}" inputmode="decimal"></td></tr>`).join('')}</tbody></table>
      <div class="tb-acts"><button type="button" class="wbtn" data-tb="addr">Lägg till rad</button><button type="button" class="wbtn" data-tb="delr"${st.obs.length <= 2 ? ' disabled' : ''}>Ta bort rad</button></div>`;
  }
  if (P_.chi === 'ind') {
    const c = st.tab[0].length;
    h += `<p class="note" style="margin-top:0">Skriv de observerade antalen i korstabellen. De förväntade antalen visas under varje ruta.</p>
      <table class="ctab"><tbody>${st.tab.map((row, r) => `<tr>${row.map((v, j) => `<td><input data-ci="${r},${j}" value="${esc(v)}" inputmode="decimal"><div class="exp" id="ex-${r}-${j}"></div></td>`).join('')}</tr>`).join('')}</tbody></table>
      <div class="tb-acts"><button type="button" class="wbtn" data-tb="addr">Rad +</button><button type="button" class="wbtn" data-tb="delr"${st.tab.length <= 2 ? ' disabled' : ''}>Rad −</button><button type="button" class="wbtn" data-tb="addc">Kolumn +</button><button type="button" class="wbtn" data-tb="delc"${c <= 2 ? ' disabled' : ''}>Kolumn −</button></div>`;
    if (P_.chi) h += `<div class="fld"><span>Signifikansnivå <span class="sym"><i>α</i></span></span><input data-sv="alpha" value="${esc(st.alpha)}" inputmode="decimal" autocomplete="off"></div>`;
  }
  if (P_.chi === 'gof') h += `<div class="fld"><span>Signifikansnivå <span class="sym"><i>α</i></span></span><input data-sv="alpha" value="${esc(st.alpha)}" inputmode="decimal" autocomplete="off"></div>`;
  h += `<div class="grp" style="margin-top:12px;border-top:1px solid var(--line)"><div class="eyebrow">Resultat</div><dl class="props" id="stRes"></dl><div id="stConcl"></div></div>`;
  rightEl.innerHTML = h;
}
function renderStatBar() {
  sbarEl.innerHTML = `<div class="stbar" id="stBar"></div>`;
}
// Räknar ut testet eller intervallet. Returnerar null vid ogiltiga värden.
function runStat() {
  const P_ = proc(), st = stState();
  try {
    if (P_.chi) return runChi(P_, st);
    const v = {};
    P_.fields.forEach(f => {
      const x = parseNum(st.v[f.k], f.prob);
      chk(isFinite(x), 'Fyll i alla fält med tal.');
      chk(!f.int || Number.isInteger(x), 'Antal och storlekar måste vara heltal.');
      v[f.k] = x;
    });
    const r = P_.run(v, { pooled: st.pooled });
    const ref = r.ref;
    const RD = ref.t === 'z' ? DISTS.normal : DISTS.t, rp = ref.t === 'z' ? { mu: 0, sigma: 1 } : { nu: ref.df };
    if (P_.g === 'test') {
      const alpha = parseNum(st.alpha, true);
      chk(alpha > 0 && alpha < 1, 'Signifikansnivån måste ligga mellan 0 och 1, till exempel 0,05.');
      const cdf = RD.cdf(r.stat, rp), sf = RD.sf(r.stat, rp);
      const pv = st.alt === 'ne' ? Math.min(1, 2 * Math.min(cdf, sf)) : st.alt === 'lt' ? cdf : sf;
      const crit = st.alt === 'ne' ? quant(RD, rp, alpha / 2, true) : quant(RD, rp, alpha, true);
      return Object.assign(r, { kind: 'test', RD, rp, pv, alpha, crit, alt: st.alt });
    }
    const lev = parseNum(st.level, true);
    chk(lev > 0 && lev < 1, 'Konfidensgraden måste ligga mellan 0 och 1, till exempel 0,95 eller 95 %.');
    const crit = quant(RD, rp, (1 - lev) / 2, true);
    return Object.assign(r, { kind: 'ci', RD, rp, lev, crit, lo: r.est - crit * r.se, hi: r.est + crit * r.se });
  } catch (e) { return { err: e.message }; }
}
function runChi(P_, st) {
  const alpha = parseNum(st.alpha, true);
  chk(alpha > 0 && alpha < 1, 'Signifikansnivån måste ligga mellan 0 och 1, till exempel 0,05.');
  let stat = 0, df, warn = '';
  const rows = [];
  if (P_.chi === 'gof') {
    const O = st.obs.map(x => parseNum(x)), E0 = st.exp.map(x => parseNum(x, true));
    chk(O.every(x => isFinite(x) && x >= 0) && E0.every(x => isFinite(x) && x > 0), 'Fyll i alla observerade och förväntade värden med positiva tal.');
    const n = O.reduce((a, b) => a + b, 0), se = E0.reduce((a, b) => a + b, 0);
    chk(n > 0, 'Summan av de observerade antalen måste vara större än 0.');
    // Förväntat som sannolikheter om summan är cirka 1, annars som antal.
    const asProb = Math.abs(se - 1) < 0.02;
    const E = E0.map(e => asProb ? e / se * n : e * n / se);
    O.forEach((o, i) => { stat += (o - E[i]) ** 2 / E[i]; });
    df = O.length - 1;
    if (E.some(e => e < 5)) warn = 'Något förväntat antal är mindre än 5, så approximationen med chitvåfördelningen är osäker.';
    rows.push(['Antal observationer', num(n, 0)], ['Förväntade antal', E.map(e => num(e, 2)).join('; ')]);
    if (!asProb && Math.abs(se - n) > 1e-9) rows.push(['Obs', 'De förväntade antalen är skalade till summan ' + num(n, 0)]);
  } else {
    const T = st.tab.map(r => r.map(x => parseNum(x)));
    chk(T.every(r => r.every(x => isFinite(x) && x >= 0)), 'Fyll i alla rutor med tal som är 0 eller större.');
    const R = T.map(r => r.reduce((a, b) => a + b, 0)), C = T[0].map((_, j) => T.reduce((a, r) => a + r[j], 0)), n = R.reduce((a, b) => a + b, 0);
    chk(R.every(x => x > 0) && C.every(x => x > 0), 'Varje rad och kolumn måste ha minst en observation.');
    const E = T.map((r, i) => r.map((_, j) => R[i] * C[j] / n));
    T.forEach((r, i) => r.forEach((o, j) => { stat += (o - E[i][j]) ** 2 / E[i][j]; }));
    df = (T.length - 1) * (T[0].length - 1);
    if (E.some(r => r.some(e => e < 5))) warn = 'Något förväntat antal är mindre än 5, så approximationen med chitvåfördelningen är osäker.';
    rows.push(['Antal observationer', num(n, 0)]);
    setTimeout(() => E.forEach((r, i) => r.forEach((e, j) => { const el = $('#ex-' + i + '-' + j); if (el) el.textContent = num(e, 2); })), 0);
  }
  const RD = DISTS.chi2, rp = { nu: df };
  const pv = RD.sf(stat, rp), crit = quant(RD, rp, alpha, true);
  rows.push(['Frihetsgrader', num(df, 0)]);
  return { kind: 'test', chi: true, ref: { t: 'chi2', df }, RD, rp, stat, pv, alpha, crit, alt: 'gt', rows, warn };
}
const statSym = r => r.chi ? I('χ') + '<sup>2</sup>' : r.ref.t === 'z' ? I('z') : I('t');
function updateStat() {
  const r = runStat(), P_ = proc(), st = stState();
  const res = $('#stRes'), cc = $('#stConcl'), bar = $('#stBar');
  if (!res) return;
  if (r.err) {
    res.innerHTML = '';
    cc.innerHTML = `<p class="note warn">${r.err}</p>`;
    if (bar) bar.innerHTML = '';
    lastStat = null; draw(); save();
    return;
  }
  lastStat = r;
  let h = (r.rows || []).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  if (r.kind === 'test') {
    h += `<dt>Teststorhet ${statSym(r)}</dt><dd>${num(r.stat, 4)}</dd>`;
    h += `<dt>Kritiskt värde</dt><dd>${r.alt === 'ne' ? '±' : r.alt === 'lt' ? MINUS : ''}${num(r.crit, 4)}</dd>`;
    h += `<dt><i>p</i>-värde</dt><dd>${pfmt(r.pv, 4)}</dd>`;
    res.innerHTML = h;
    const rej = r.pv < r.alpha;
    const h1 = r.chi ? (P_.chi === 'gof' ? 'fördelningen avviker från den förväntade' : 'variablerna inte är oberoende') : hypHtml(P_, st.alt).h1;
    cc.innerHTML = `<div class="concl ${rej ? 'rej' : 'keep'}">${rej
      ? `<i>p</i>-värdet ${pfmt(r.pv, 4)} är mindre än signifikansnivån ${num(r.alpha, 4)}. Nollhypotesen förkastas, och resultatet stöder att ${h1}.`
      : `<i>p</i>-värdet ${pfmt(r.pv, 4)} är större än signifikansnivån ${num(r.alpha, 4)}. Nollhypotesen kan inte förkastas.`}</div>${r.warn ? `<p class="note warn">${r.warn}</p>` : ''}`;
    if (bar) bar.innerHTML = `${statSym(r)} = ${num(r.stat, 4)} <span class="sep">·</span> <i>p</i>-värde = ${pfmt(r.pv, 4)}`;
  } else {
    const f = v => r.pct ? num(v, 4) : num(v, 4);
    h += `<dt>Punktskattning ${r.estLab}</dt><dd>${f(r.est)}</dd><dt>Standardfel</dt><dd>${num(r.se, 4)}</dd><dt>Kritiskt värde</dt><dd>${num(r.crit, 4)}</dd><dt>Felmarginal</dt><dd>${num(r.crit * r.se, 4)}</dd>`;
    res.innerHTML = h;
    cc.innerHTML = `<div class="concl keep">Konfidensintervallet för ${P_.par} med konfidensgraden ${pctfmt(r.lev, 3).replace(/,0+ /, NB)} är ${f(r.lo)} ≤ ${P_.par} ≤ ${f(r.hi)}.</div>`;
    if (bar) bar.innerHTML = `${pctfmt(r.lev, 3).replace(/,0+ /, NB)} konfidensintervall för ${P_.par}: ${f(r.lo)} till ${f(r.hi)}`;
  }
  const tag = $('#sheetTag');
  if (tag) tag.innerHTML = r.kind === 'ci' ? 'Punktskattningens fördelning kring skattningen' : r.chi ? `Chitvåfördelning med ${num(r.ref.df, 0)} frihetsgrader` : r.ref.t === 'z' ? 'Nollhypotesens fördelning: standardnormalfördelningen' : `Nollhypotesens fördelning: ${I('t')}-fördelning med ${num(r.ref.df, r.ref.df % 1 ? 2 : 0)} frihetsgrader`;
  draw(); save();
}
let lastStat = null;
function drawStat(W, H, opt = {}) {
  const r = lastStat;
  const head = opt.exp ? 56 : 0;
  const M = { l: 58, r: 22, t: 50 + head + (W < 640 && !opt.exp ? 18 : 0), b: 58 };
  const pw = W - M.l - M.r, ph = H - M.t - M.b;
  const o = [];
  if (opt.exp) o.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`);
  if (!r || r.err) return { svg: o.join(''), M };
  let x0, x1, f, tr = x => x;
  const { RD, rp } = r;
  if (r.kind === 'test') {
    if (r.chi) { x0 = 0; x1 = Math.max(quant(RD, rp, 0.001, true), r.stat * 1.15, r.crit * 1.2); }
    else { const w = Math.max(4, Math.min(12, Math.abs(r.stat) * 1.15)); x0 = -w; x1 = w; }
    f = x => RD.pdf(x, rp);
  } else {
    const w = Math.max(4, r.crit * 1.8);
    x0 = r.est - w * r.se; x1 = r.est + w * r.se;
    f = x => RD.pdf((x - r.est) / r.se, rp) / r.se;
    tr = x => (x - r.est) / r.se;
  }
  let ymax = 0;
  for (let i = 0; i <= 300; i++) { const v = f(x0 + (x1 - x0) * i / 300); if (isFinite(v) && v > ymax) ymax = v; }
  if (r.chi && rp.nu <= 2) ymax = Math.min(ymax, f((x1 - x0) * 0.02) * 1.1 || ymax);
  const y1 = ymax * 1.22;
  const X = x => M.l + (x - x0) / (x1 - x0) * pw, Y = y => M.t + ph - y / y1 * ph, base = Y(0);
  const ycap = y1 * 1.4;
  o.push(`<defs><clipPath id="clipPlot"><rect x="${M.l}" y="${M.t - 6}" width="${pw}" height="${ph + 6}"/></clipPath></defs>`);
  const xt = tickList(x0, x1, Math.max(3, Math.floor(pw / 86)));
  xt.out.forEach(t => o.push(`<line x1="${f2(X(t))}" y1="${M.t}" x2="${f2(X(t))}" y2="${base}" stroke="${COL.grid}"/>`));
  const plot = [];
  if (r.kind === 'test') {
    // Kritiskt område (rött) och p-värdets area (blå)
    const crs = r.alt === 'ne' ? [[x0, -r.crit], [r.crit, x1]] : r.alt === 'lt' ? [[x0, -r.crit]] : [[r.crit, x1]];
    const pvs = r.alt === 'ne' ? [[x0, -Math.abs(r.stat)], [Math.abs(r.stat), x1]] : r.alt === 'lt' ? [[x0, r.stat]] : [[r.stat, x1]];
    pvs.forEach(([a, b]) => { const L = Math.max(a, x0), R = Math.min(b, x1); if (R > L) plot.push(`<path d="${areaD(f, L, R, X, Y, ycap)}" fill="${COL.area}" fill-opacity="0.7"/>`); });
    crs.forEach(([a, b]) => { const L = Math.max(a, x0), R = Math.min(b, x1); if (R > L) plot.push(`<path d="${areaD(f, L, R, X, Y, ycap)}" fill="${COL.accent}" fill-opacity="0.2" stroke="${COL.accent}" stroke-width="1.2"/>`); });
  } else {
    plot.push(`<path d="${areaD(f, r.lo, r.hi, X, Y, ycap)}" fill="${COL.area}" fill-opacity="0.62"/>`);
  }
  plot.push(`<path d="${curveD(f, x0, x1, X, Y, ycap)}" fill="none" stroke="${COL.ink}" stroke-width="2.4" stroke-linejoin="round"/>`);
  o.push(`<g clip-path="url(#clipPlot)">${plot.join('')}</g>`);
  o.push(`<line x1="${M.l}" y1="${f2(base)}" x2="${M.l + pw + 6}" y2="${f2(base)}" stroke="${COL.axis}" stroke-width="1.4"/>`);
  o.push(`<polygon points="${M.l + pw + 14},${f2(base)} ${M.l + pw + 5},${f2(base - 4)} ${M.l + pw + 5},${f2(base + 4)}" fill="${COL.axis}"/>`);
  const pills = [];
  if (r.kind === 'test') {
    const sx = Math.max(x0, Math.min(x1, r.stat));
    o.push(`<line x1="${f2(X(sx))}" y1="${f2(base)}" x2="${f2(X(sx))}" y2="${M.t + 4}" stroke="${COL.ink}" stroke-width="2.2"/>`);
    o.push(pill(Math.max(M.l + 50, Math.min(M.l + pw - 50, X(sx))), M.t - 8, statSym(r).replace(/<\/?i>/g, m => m) + ' = ' + num(r.stat, 3), COL.ink));
    const cvals = r.alt === 'ne' ? [-r.crit, r.crit] : r.alt === 'lt' ? [-r.crit] : [r.crit];
    cvals.forEach(c => { if (c >= x0 && c <= x1) pills.push({ x: X(c), lab: num(c, 3), c: COL.accent }); });
    // p-värdet som text vid den blå arean
    const px = r.alt === 'lt' ? X(Math.max(x0, r.stat)) - 10 : X(Math.min(x1, Math.abs(r.stat))) + 10;
    const anchor = r.alt === 'lt' ? 'end' : 'start';
    o.push(txt(Math.max(M.l + 4, Math.min(M.l + pw - 4, px)), base - Math.max(28, (base - Y(f(Math.min(x1, Math.abs(r.stat))))) + 18), `<tspan font-style="italic">p</tspan> = ${pfmt(r.pv, 4)}`, { fs: 14, fill: COL.blue, anchor, fw: 600 }));
    o.push(txt(M.l + pw - 4, M.t + 20, `<tspan font-style="italic">α</tspan> = ${num(r.alpha, 4)}`, { fs: 12.5, fill: COL.accent, anchor: 'end' }));
  } else {
    [r.lo, r.hi].forEach(v => { o.push(`<line x1="${f2(X(v))}" y1="${f2(base)}" x2="${f2(X(v))}" y2="${f2(Y(f(v)))}" stroke="${COL.accent}" stroke-width="2.2"/>`); pills.push({ x: X(v), lab: num(v, 4), c: COL.accent }); });
    o.push(`<line x1="${f2(X(r.est))}" y1="${f2(base)}" x2="${f2(X(r.est))}" y2="${f2(Y(f(r.est)))}" stroke="${COL.ink}" stroke-width="1.6" stroke-dasharray="5 4"/>`);
    const by = M.t + 6;
    o.push(`<line x1="${f2(X(r.lo))}" y1="${by}" x2="${f2(X(r.hi))}" y2="${by}" stroke="${COL.blue}" stroke-width="2"/><line x1="${f2(X(r.lo))}" y1="${by - 5}" x2="${f2(X(r.lo))}" y2="${by + 5}" stroke="${COL.blue}" stroke-width="2"/><line x1="${f2(X(r.hi))}" y1="${by - 5}" x2="${f2(X(r.hi))}" y2="${by + 5}" stroke="${COL.blue}" stroke-width="2"/>`);
    o.push(txt(X(r.est), by - 9, `${pctfmt(r.lev, 3).replace(/,0+ /, NB)} konfidensintervall`, { fs: 13, fill: COL.blue, anchor: 'middle', fw: 600 }));
    o.push(txt(X(r.est), Y(f(r.est) * 0.45), svgRich(r.estLab) + ' = ' + num(r.est, 4), { fs: 13.5, fill: COL.ink, anchor: 'middle', fw: 600 }));
  }
  xt.out.forEach(t => {
    const x = X(t), lab = num(t, xt.dec), w = tw(lab, 11.5);
    o.push(`<line x1="${f2(x)}" y1="${f2(base)}" x2="${f2(x)}" y2="${f2(base + 5)}" stroke="${COL.axis}"/>`);
    if (pills.some(pl => Math.abs(pl.x - x) < tw(pl.lab, 12.5) / 2 + 7 + w / 2 + 3)) return;
    o.push(txt(x, base + 19, lab, { fs: 11.5, fill: COL.muted, anchor: 'middle' }));
  });
  pills.forEach(pl => o.push(pill(pl.x, base + 27, pl.lab, pl.c)));
  if (opt.exp) {
    o.push(txt(M.l - 30, 26, svgRich(proc().name), { fs: 14, fill: COL.soft }));
    o.push(txt(M.l - 30, 48, svgRich($('#stBar') ? $('#stBar').innerHTML.replace(/<span[^>]*>·<\/span>/, '·') : ''), { fs: 16, fill: COL.ink, fw: 600 }));
  }
  return { svg: o.join(''), M };
}
// Händelser i statistikfliken (högerpanelen)
rightEl.addEventListener('input', e => {
  if (S.tab !== 'statistik') return;
  const t = e.target, st = stState();
  if (t.dataset.f) { st.v[t.dataset.f] = t.value; const h0 = $('#h0'); if (h0) h0.innerHTML = 'H<sub>0</sub>: ' + hypHtml(proc(), st.alt).h0; updateAltLabels(); }
  else if (t.dataset.sv) st[t.dataset.sv] = t.value;
  else if (t.dataset.go != null) st.obs[+t.dataset.go] = t.value;
  else if (t.dataset.ge != null) st.exp[+t.dataset.ge] = t.value;
  else if (t.dataset.gl != null) st.lab[+t.dataset.gl] = t.value;
  else if (t.dataset.ci) { const [i, j] = t.dataset.ci.split(',').map(Number); st.tab[i][j] = t.value; }
  else if (t.id === 'dataIn') { dataSummary(); return; }
  else return;
  updateStat();
});
function updateAltLabels() {
  const seg = $('#altSeg'); if (!seg) return;
  seg.querySelectorAll('button').forEach(b => { b.innerHTML = hypHtml(proc(), b.dataset.v).h1; });
}
function parseData() {
  const el = $('#dataIn'); if (!el) return null;
  const vals = el.value.split(/[\s;\t]+/).map(s => parseNum(s)).filter(isFinite);
  if (vals.length < 2) return null;
  const n = vals.length, m = vals.reduce((a, b) => a + b, 0) / n;
  const s = Math.sqrt(vals.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1));
  return { n, m, s };
}
function dataSummary() {
  const d = parseData(), out = $('#dataOut');
  if (!out) return;
  out.innerHTML = d ? `${I('n')} = ${d.n}, ${XB()} = ${num(d.m, 4)}, ${I('s')} = ${num(d.s, 4)}` : 'Skriv minst två mätvärden. Decimaltal kan skrivas med kommatecken.';
}
rightEl.addEventListener('change', e => {
  if (S.tab !== 'statistik') return;
  if (e.target.dataset.pool) { stState().pooled = e.target.checked; updateStat(); }
});
rightEl.addEventListener('click', e => {
  if (S.tab !== 'statistik') return;
  const st = stState(), P_ = proc();
  const sb = e.target.closest('[data-sseg] button');
  if (sb) { st.alt = sb.dataset.v; renderStatRight(); updateStat(); return; }
  const tb = e.target.closest('[data-tb]');
  if (tb) {
    const a = tb.dataset.tb;
    if (P_.chi === 'gof') {
      if (a === 'addr') { st.obs.push('0'); st.exp.push(st.exp[st.exp.length - 1] || '1'); st.lab.push(String(st.obs.length)); }
      if (a === 'delr' && st.obs.length > 2) { st.obs.pop(); st.exp.pop(); st.lab.pop(); }
    } else {
      if (a === 'addr') st.tab.push(st.tab[0].map(() => '0'));
      if (a === 'delr' && st.tab.length > 2) st.tab.pop();
      if (a === 'addc') st.tab.forEach(r => r.push('0'));
      if (a === 'delc' && st.tab[0].length > 2) st.tab.forEach(r => r.pop());
    }
    renderStatRight(); updateStat();
    return;
  }
  const use = e.target.closest('[data-use]');
  if (use) {
    const d = parseData();
    if (!d) { toast('Skriv minst två mätvärden först.'); return; }
    const sfx = use.dataset.use === '0' ? '' : use.dataset.use;
    const sdKey = P_.fields.some(f => f.k === 's' + sfx) ? 's' + sfx : null;
    st.v['xbar' + sfx] = num(d.m, 6).replace(/ /g, '');
    if (sdKey) st.v[sdKey] = num(d.s, 6).replace(/ /g, '');
    st.v['n' + sfx] = String(d.n);
    renderStatRight(); updateStat();
    toast('Stickprovets värden är ifyllda.', null, null, true);
  }
});

/* ================= 9. Pekare, zoom och vy ================= */
const tipEl = $('#tip');
let drag = null;
function invX(px) { return V.x0 + (px - geo.M.l) / geo.pw * (V.x1 - V.x0); }
function snapVal(x) {
  const D = D_();
  if (D.kind === 'disk') return Math.round(x);
  return snapTo(x, niceStep((V.x1 - V.x0) / 250));
}
svg.addEventListener('pointerdown', e => {
  if (S.tab !== 'fordelning' || !geo || e.button > 0) return;
  const r = svg.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
  const h = e.target.closest('[data-h]');
  if (h) {
    drag = { kind: 'bound', h: h.dataset.h };
    svg.setPointerCapture(e.pointerId);
    e.preventDefault();
    return;
  }
  if (px < geo.M.l || px > geo.M.l + geo.pw || py > geo.base + 40) return;
  drag = { kind: 'pan', sx: px, v0: Object.assign({}, V), moved: false, id: e.pointerId, touch: e.pointerType === 'touch' };
});
svg.addEventListener('pointermove', e => {
  if (!geo || S.tab !== 'fordelning') return;
  const r = svg.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
  if (drag && drag.kind === 'bound') {
    const x = snapVal(invX(px));
    if (drag.h === 'a') S.a = (S.m === 'interval' || S.m === 'outside') ? Math.min(x, S.b) : x;
    else S.b = (S.m === 'interval' || S.m === 'outside') ? Math.max(x, S.a) : x;
    lastInv = null;
    tipEl.classList.remove('on');
    update();
    return;
  }
  if (drag && drag.kind === 'pan') {
    const dx = px - drag.sx;
    if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; svg.setPointerCapture(drag.id); sheet.classList.add('panning'); }
    if (drag.moved) {
      const k = (drag.v0.x1 - drag.v0.x0) / geo.pw;
      V = { x0: drag.v0.x0 - dx * k, x1: drag.v0.x1 - dx * k, y1: V.y1 };
      tipEl.classList.remove('on');
      draw();
      if (S.tbl) update({ noDraw: true });
    }
    return;
  }
  if (e.pointerType === 'mouse') showTip(px, py);
});
function endDrag(e) {
  if (!drag) return;
  if (drag.kind === 'pan' && !drag.moved && geo) {
    const r = svg.getBoundingClientRect();
    setNearestBound(snapVal(invX(e.clientX - r.left)));
  }
  if (drag.kind === 'pan' && drag.moved && S.tbl) update({ noDraw: true });
  drag = null;
  sheet.classList.remove('panning');
}
svg.addEventListener('pointerup', endDrag);
svg.addEventListener('pointercancel', () => { drag = null; sheet.classList.remove('panning'); });
svg.addEventListener('pointerleave', () => tipEl.classList.remove('on'));
function showTip(px, py) {
  if (px < geo.M.l || px > geo.M.l + geo.pw || py < geo.M.t - 10 || py > geo.base) { tipEl.classList.remove('on'); return; }
  const D = D_(), { p } = params(S.d), x = invX(px);
  let h;
  if (D.kind === 'disk') {
    const k = Math.round(x);
    if (k < D.lo(p) || k > D.hi(p)) { tipEl.classList.remove('on'); return; }
    h = `<i>P</i>(<i>X</i> = ${k}) = ${pfmt(D.pmf(k, p))}<br><i>P</i>(<i>X</i> ≤ ${k}) = ${pfmt(dcdf(D, k, p))}`;
  } else {
    const xs = snapVal(x), dec = Math.max(decFor(V.x1 - V.x0), 1);
    h = `<i>x</i> = ${num(xs, dec)}${unitSuffix()}<br><i>P</i>(<i>X</i> ≤ ${num(xs, dec)}) = ${pfmt(D.cdf(xs, p))}`;
  }
  tipEl.innerHTML = h;
  tipEl.classList.add('on');
  const tw_ = tipEl.offsetWidth;
  tipEl.style.transform = `translate(${Math.min(px + 14, sheet.clientWidth - tw_ - 8)}px, ${Math.max(8, py - 54)}px)`;
}
function zoomAt(factor, cx) {
  if (cx == null) cx = (V.x0 + V.x1) / 2;
  animateTo({ x0: cx - (cx - V.x0) * factor, x1: cx + (V.x1 - cx) * factor, y1: V.y1 });
}
sheet.addEventListener('wheel', e => {
  if (S.tab !== 'fordelning' || !geo) return;
  e.preventDefault();
  const r = svg.getBoundingClientRect(), cx = invX(e.clientX - r.left);
  const f = Math.exp(Math.sign(e.deltaY) * Math.min(0.25, Math.abs(e.deltaY) / 400));
  cancelAnimationFrame(animT);
  V = { x0: cx - (cx - V.x0) * f, x1: cx + (V.x1 - cx) * f, y1: V.y1 };
  draw();
}, { passive: false });
$('#zoomIn').addEventListener('click', () => zoomAt(0.7));
$('#zoomOut').addEventListener('click', () => zoomAt(1 / 0.7));
$('#zoomFit').addEventListener('click', () => animateTo(fitView()));
svg.addEventListener('dblclick', e => { if (S.tab === 'fordelning' && !e.target.closest('[data-h]')) animateTo(fitView()); });

/* ================= 10. Export, delning och start ================= */
// Poppins bäddas in i den exporterade bilden, annars ritar webbläsaren
// SVG-bilden med ett reservtypsnitt.
let fontCss = null;
async function fontFaces() {
  if (fontCss != null) return fontCss;
  try {
    const css = await (await fetch('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,400&display=swap')).text();
    const blocks = css.split('@font-face').slice(1).filter(b => /U\+0000-00FF/.test(b));
    const faces = await Promise.all(blocks.map(async b => {
      const url = (b.match(/url\((https:[^)]+)\)/) || [])[1];
      if (!url) return '';
      const buf = await (await fetch(url)).arrayBuffer();
      let bin = ''; new Uint8Array(buf).forEach(x => { bin += String.fromCharCode(x); });
      return '@font-face' + b.replace(/url\([^)]+\)/, `url(data:font/woff2;base64,${btoa(bin)})`).replace(/unicode-range:[^;]+;/, '');
    }));
    fontCss = faces.join('\n');
  } catch (e) { fontCss = ''; }
  return fontCss;
}
async function exportSvg() {
  const W = 960, H = 560;
  const g = S.tab === 'statistik' ? drawStat(W, H, { exp: true }) : drawDist(W, H, { exp: true, view: V });
  const css = await fontFaces();
  return { str: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}"><style>${css}</style>${g.svg}</svg>`, W, H };
}
async function pngBlob() {
  const { str, W, H } = await exportSvg();
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str);
  await img.decode();
  const k = 2, cv = document.createElement('canvas');
  cv.width = W * k; cv.height = H * k;
  const ctx = cv.getContext('2d');
  ctx.scale(k, k);
  ctx.drawImage(img, 0, 0, W, H);
  return new Promise(res => cv.toBlob(res, 'image/png'));
}
function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const fileName = ext => 'sannolikhet-' + new Date().toISOString().slice(0, 10) + '.' + ext;
async function copyImage() {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) throw new Error('ingen urklippsåtkomst');
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob() })]);
    toast('Bilden är kopierad. Klistra in med Ctrl+V (Cmd+V på Mac) i ditt dokument.', null, null, true);
  } catch (err) {
    download(await pngBlob(), fileName('png'));
    toast('Webbläsaren tillät inte kopiering här, så bilden laddades ned i stället.');
  }
}
async function copyText(t, msg) {
  try { await navigator.clipboard.writeText(t); toast(msg, null, null, true); }
  catch (e) { toast('Webbläsaren tillät inte kopiering. Markera texten och kopiera den själv.'); }
}
async function copyLink() {
  const url = location.origin + location.pathname + '#s=' + encodeState();
  try { await navigator.clipboard.writeText(url); toast('Länken är kopierad. Den öppnar exakt det du ser nu.', null, null, true); }
  catch (e) { history.replaceState(null, '', url); toast('Länken står nu i adressfältet. Kopiera den därifrån.'); }
}
const DL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
const menuEl = $('#exportMenu');
menuEl.innerHTML = `
  <button class="mi" data-x="copy"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/></svg><span>Kopiera bild<small>För Word, PowerPoint och Google Dokument</small></span></button>
  <button class="mi" data-x="png">${DL}<span>Ladda ned som PNG<small>Bildfil med hög upplösning</small></span></button>
  <button class="mi" data-x="svg">${DL}<span>Ladda ned som SVG<small>Vektorbild som går att skala fritt</small></span></button>
  <hr>
  <button class="mi" data-x="link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg><span>Kopiera länk<small>Öppnar exakt samma fördelning och gränser</small></span></button>`;
$('#copyBtn').addEventListener('click', copyImage);
$('#moreBtn').addEventListener('click', e => { e.stopPropagation(); menuEl.classList.toggle('open'); });
document.addEventListener('pointerdown', e => { if (!e.target.closest('.split')) menuEl.classList.remove('open'); });
menuEl.addEventListener('click', async e => {
  const b = e.target.closest('[data-x]');
  if (!b) return;
  menuEl.classList.remove('open');
  const m = b.dataset.x;
  if (m === 'copy') copyImage();
  if (m === 'png') download(await pngBlob(), fileName('png'));
  if (m === 'svg') { const { str } = await exportSvg(); download(new Blob([str], { type: 'image/svg+xml' }), fileName('svg')); }
  if (m === 'link') copyLink();
});

const toastEl = $('#toast');
let toastT = 0;
function toast(msg, actLabel, actFn, ok) {
  toastEl.innerHTML = `${ok ? '<span class="tk"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"/></svg></span>' : ''}<span>${esc(msg)}</span>${actLabel ? `<button type="button">${esc(actLabel)}</button>` : ''}`;
  if (actLabel) toastEl.querySelector('button').onclick = () => { actFn(); toastEl.classList.remove('on'); };
  toastEl.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('on'), actLabel ? 5200 : 3600);
}

document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => {
  if (S.tab === b.dataset.tab) return;
  S.tab = b.dataset.tab;
  renderAll();
  if (S.tab === 'fordelning') draw();
}));
$('#resetBtn').addEventListener('click', () => {
  const old = JSON.stringify(S), oldV = Object.assign({}, V);
  S = newState(); sim = null; lastInv = null;
  ptext(S.d); computeRanges(); V = fitView();
  renderAll();
  toast('Kalkylatorn är återställd.', 'Ångra', () => { S = JSON.parse(old); computeRanges(); V = oldV; renderAll(); });
});

// Verktyget fyller skärmen under sajtens sidhuvud.
const siteHdr = document.querySelector('.lab-header');
const setHdr = () => document.documentElement.style.setProperty('--hdr', (siteHdr ? siteHdr.offsetHeight : 0) + 'px');
setHdr();
window.addEventListener('resize', setHdr);

loadState();
ptext(S.d);
computeRanges();
V = fitView();
renderAll();
if (location.hash.includes('s=')) history.replaceState(null, '', location.pathname);
new ResizeObserver(() => drawNow()).observe(sheet);
document.addEventListener('DOMContentLoaded', renderFormula);
window.addEventListener('load', renderFormula);
document.fonts.ready.then(drawNow);

// Öppnas för felsökning och automatiska tester.
window.SANNOLIKHET = { DISTS, probOf, quant, qDisc, Phi, PhiInv, gammaP, betaI, get S() { return S; }, runStat, PROCS, pngBlob, exportSvg };
})();
