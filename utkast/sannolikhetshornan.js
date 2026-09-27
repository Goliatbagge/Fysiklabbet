/*
 * Sannolikhetshörnan — lärarverktyg för slumpförsök i 3D (infört 2026-09-27).
 *
 * Fyra stationer står på samma bord, och kameran flyger mellan dem:
 *   Tärningar  (mitten)   fysiksimulerade tärningar och mynt (cannon-es)
 *   Kortlek    (vänster)  kort som dras, vänds och blandas (animeringar)
 *   Urna       (höger)    kulor i en glasurna, fysiksimulerade (cannon-es)
 *   Lyckohjul  (bakom)    tivolihjul med pinnar och en klaff som tickar
 *
 * RÄTTVISA. Tärningarna är rättvisa av symmetriskäl: varje sida har samma
 * form, och kastet slumpas. Kortet och kulan väljs likformigt bland dem som
 * finns kvar. Lyckohjulets slutvinkel dras likformigt över hela varvet och
 * animeringen räknas ut baklänges från den, så sannolikheten för en sektor
 * är exakt sektorns andel av varvet. Snabbsimuleringen drar utfallen direkt
 * ur samma modeller, utan 3D.
 *
 * ALL GRAFIK RITAS I KODEN: trä, filt, tärningssidor, kort, hjulets yta.
 * ALLA LJUD SYNTETISERAS med Web Audio (inga ljudfiler), se Ljud nedan.
 *
 * Scenen renderas bara när något rör sig (wake()), så en stillastående sida
 * kostar ingenting.
 *
 * Språkreglerna i CLAUDE.md gäller all text besökaren ser: komma som
 * decimaltecken, raka bråkstreck (.frac), inga emojier, inga tankstreck.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as CANNON from 'cannon-es';

// ============================================================================
// Grund
// ============================================================================
const $ = s => document.querySelector(s);
const V3 = THREE.Vector3;
const TAU = Math.PI * 2;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeIn = t => t * t;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };
const lcm = (a, b) => a / gcd(a, b) * b;
const rbuf = new Uint32Array(64); let rpos = 64;
/** Slumptal i [0, 1) från webbläsarens kryptografiska generator. */
function rnd() {
  if (rpos >= 64) { crypto.getRandomValues(rbuf); rpos = 0; }
  return rbuf[rpos++] / 4294967296;
}
const rint = n => Math.floor(rnd() * n);
const rsign = () => rnd() < .5 ? -1 : 1;
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = rint(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/** Decimaltal med komma; exakt noll skrivs 0. */
function fmt(x, d = 2) { const s = x.toFixed(d); if (parseFloat(s) === 0) return '0'; return s.replace('.', ','); }
/** Heltal med hårt mellanslag som tusentalsavgränsare. */
const fmtInt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
/** Rakt bråkstreck (aldrig snedstreck), förkortat. */
function fracHtml(num, den) {
  const g = gcd(num, den); num /= g; den /= g;
  if (num === 0) return '0';
  if (den === 1) return String(num);
  return `<span class="frac"><span>${fmtInt(num)}</span><span>${fmtInt(den)}</span></span>`;
}
const LS = {
  get(k, d) { try { const v = localStorage.getItem('sannolikhet:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('sannolikhet:' + k, JSON.stringify(v)); } catch (e) { /* privat läge */ } },
};
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function luminans(h) { const [r, g, b] = hexToRgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; }
const kontrast = h => luminans(h) > .32 ? '#15171c' : '#ffffff';
function shade(h, k) { const [r, g, b] = hexToRgb(h); const f = v => Math.round(clamp(k < 0 ? v * (1 + k) : v + (255 - v) * k, 0, 255)); return `rgb(${f(r)},${f(g)},${f(b)})`; }
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

// ============================================================================
// Ljud — allt syntetiseras med Web Audio. Inga ljudfiler.
//   Tärningar: ett kort brusknäpp genom ett bandpassfilter plus en ton som
//   klingar av. Filt ger en dov duns, trä ett "tock", tärning mot tärning ett
//   ljust klick, myntet en metallisk klang.
//   Kort: brus genom ett bandpass som sveper uppåt ("schhk") när kortet
//   glider av leken, ett snärt när det vänds, en ström av mikroklick när
//   leken blandas.
//   Kulor: höga, snabbt avklingande toner (glas- och kulklick).
//   Hjulet: ett tick för varje pinne som passerar klaffen.
// ============================================================================
const Ljud = (() => {
  let ctx = null, out = null, noiseBuf = null, on = LS.get('ljud', true);
  let recent = [];
  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { ctx = new AC(); } catch (e) { return; }
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 5;
    comp.attack.value = 0.002; comp.release.value = 0.12;
    out = ctx.createGain(); out.gain.value = 0.9;
    out.connect(comp); comp.connect(ctx.destination);
    const len = Math.floor(ctx.sampleRate * 2);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  const ok = () => on && ctx && ctx.state === 'running';
  function budget(max) {
    const t = performance.now();
    recent = recent.filter(x => t - x < 70);
    if (recent.length >= max) return false;
    recent.push(t); return true;
  }
  function noise(t, dur, filters, peak, attack = 0.002) {
    const src = ctx.createBufferSource(); src.buffer = noiseBuf;
    let node = src;
    for (const f of filters) {
      const bq = ctx.createBiquadFilter(); bq.type = f.type;
      bq.frequency.setValueAtTime(f.f, t);
      if (f.q) bq.Q.value = f.q;
      if (f.f2) bq.frequency.exponentialRampToValueAtTime(f.f2, t + dur);
      node.connect(bq); node = bq;
    }
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    node.connect(g); g.connect(out);
    src.start(t, Math.random() * (noiseBuf.duration - dur - 0.1));
    src.stop(t + dur + 0.03);
  }
  function tone(t, f, dur, peak, type = 'sine', f2) {
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.03);
  }
  const styrka = (v, lo, hi) => clamp((v - lo) / (hi - lo), 0, 1);
  const T = (delay = 0) => ctx.currentTime + 0.004 + delay;
  return {
    init,
    get on() { return on; },
    set on(v) { on = v; LS.set('ljud', v); if (v) init(); },
    tarning(v, yta) {
      if (!ok()) return;
      const k = styrka(v, 1.2, 24); if (k <= 0.02 || !budget(14)) return;
      const t = T(), g = Math.pow(k, 1.25);
      if (yta === 'filt') {
        noise(t, 0.07, [{ type: 'lowpass', f: 500 + 700 * k }], 0.55 * g);
        tone(t, 105 + 50 * Math.random(), 0.08, 0.4 * g);
      } else if (yta === 'tra') {
        noise(t, 0.04, [{ type: 'bandpass', f: 1200 + 700 * Math.random(), q: 2.2 }], 0.75 * g);
        tone(t, 560 + 260 * Math.random(), 0.07, 0.3 * g, 'triangle');
      } else if (yta === 'mynt') {
        noise(t, 0.02, [{ type: 'highpass', f: 3000 }], 0.4 * g);
        const f = 2900 + 500 * Math.random();
        tone(t, f, 0.35 + 0.3 * k, 0.12 * g); tone(t, f * 1.53, 0.25, 0.07 * g); tone(t, f * 2.41, 0.15, 0.04 * g);
      } else {
        noise(t, 0.022, [{ type: 'bandpass', f: 3600 + 1800 * Math.random(), q: 3 }], 0.65 * g);
        tone(t, 2100 + 1000 * Math.random(), 0.04, 0.2 * g, 'triangle');
      }
    },
    glid(delay = 0, dur = 0.24, s = 1) {
      if (!ok()) return;
      const t = T(delay);
      noise(t, dur, [{ type: 'highpass', f: 700 }, { type: 'bandpass', f: 1900, f2: 5200, q: 0.8 }], 0.34 * s, dur * 0.4);
      noise(t + dur * 0.15, dur * 0.85, [{ type: 'bandpass', f: 7000, q: 1.1 }], 0.1 * s, dur * 0.35);
    },
    vand(delay = 0) {
      if (!ok()) return;
      const t = T(delay);
      noise(t, 0.05, [{ type: 'highpass', f: 2400 }], 0.3, 0.004);
      noise(t + 0.03, 0.05, [{ type: 'lowpass', f: 900 }], 0.35, 0.003);
      tone(t + 0.03, 170, 0.06, 0.14);
    },
    blanda(delay = 0, dur = 0.85) {
      if (!ok()) return;
      const n = 40, t0 = T(delay);
      for (let i = 0; i < n; i++) {
        const t = t0 + dur * Math.pow(i / n, 0.9) + Math.random() * 0.006;
        noise(t, 0.012 + Math.random() * 0.008, [{ type: 'bandpass', f: 2600 + 3000 * Math.random(), q: 1.3 }], 0.14 + 0.12 * Math.random());
      }
      noise(t0, dur, [{ type: 'bandpass', f: 4200, q: 0.7 }], 0.05, dur * 0.3);
      this.glid(delay + dur + 0.05, 0.3, 0.7);
    },
    kula(v) {
      if (!ok()) return;
      const k = styrka(v, 0.6, 14); if (k <= 0.02 || !budget(12)) return;
      const t = T(), g = Math.pow(k, 1.2), f = 2700 + 900 * Math.random();
      tone(t, f, 0.06, 0.28 * g); tone(t, f * 2.63, 0.035, 0.11 * g);
      noise(t, 0.008, [{ type: 'highpass', f: 4000 }], 0.18 * g);
    },
    glas(v) {
      if (!ok()) return;
      const k = styrka(v, 1, 14); if (k <= 0.03 || !budget(12)) return;
      const t = T(), g = Math.pow(k, 1.3), f = 1750 + 300 * Math.random();
      tone(t, f, 0.55, 0.07 * g); tone(t, f * 2.37, 0.35, 0.045 * g); tone(t, f * 3.9, 0.2, 0.025 * g);
      noise(t, 0.01, [{ type: 'highpass', f: 3500 }], 0.12 * g);
    },
    tock(v = 6) {
      if (!ok()) return;
      const k = styrka(v, 0.5, 10), t = T();
      tone(t, 480 + 120 * Math.random(), 0.1, 0.32 * k, 'triangle');
      noise(t, 0.04, [{ type: 'bandpass', f: 900, q: 1.5 }], 0.3 * k);
    },
    tick(s = 1) {
      if (!ok() || !budget(20)) return;
      const t = T();
      noise(t, 0.014, [{ type: 'highpass', f: 1800 }], 0.4 * s);
      tone(t, 1500, 0.025, 0.14 * s, 'triangle', 700);
    },
    pling() {
      if (!ok()) return;
      const t = T();
      tone(t, 784, 1.1, 0.06); tone(t + 0.09, 1175, 1.0, 0.05); tone(t + 0.18, 1568, 0.9, 0.035);
    },
    sus(delay = 0, dur = 0.5) {
      if (!ok()) return;
      noise(T(delay), dur, [{ type: 'bandpass', f: 500, f2: 1600, q: 0.6 }], 0.1, dur * 0.5);
    },
  };
})();

// ============================================================================
// Renderare, scen, kamera och ljus
// ============================================================================
const stage = $('#stage');
const canvas = $('#c3d');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
} catch (e) { renderer = null; }
const MOBIL = matchMedia('(max-width: 700px)').matches || /Android|iPhone|iPad/.test(navigator.userAgent);
const scene = new THREE.Scene();
const BG = new THREE.Color(0x15110d);
scene.background = BG;
scene.fog = new THREE.Fog(BG, 55, 120);
const camera = new THREE.PerspectiveCamera(36, 1.6, 0.5, 300);
let controls = null;
if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBIL ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.09;
  controls.enablePan = false; controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
} else {
  stage.classList.add('fel');
}
const ANISO = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;

scene.add(new THREE.HemisphereLight(0xfff1dc, 0x2a1c10, 0.3));
const spot = new THREE.SpotLight(0xffe6c4, 3.7, 0, 0.5, 0.9, 0);
spot.castShadow = true;
spot.shadow.mapSize.set(MOBIL ? 1024 : 2048, MOBIL ? 1024 : 2048);
spot.shadow.bias = -0.0003; spot.shadow.normalBias = 0.03;
spot.shadow.camera.near = 12; spot.shadow.camera.far = 90;
scene.add(spot, spot.target);
const fill = new THREE.DirectionalLight(0xc8dcff, 0.45);
fill.position.set(-30, 25, 40);
scene.add(fill);

// Render på begäran: loopen går bara medan något rör sig.
const tweens = new Set();
let awakeUntil = 0, rafOn = false, lastT = 0;
const stepFns = [];
function wake(ms = 250) {
  awakeUntil = Math.max(awakeUntil, performance.now() + ms);
  if (!rafOn && renderer) { rafOn = true; lastT = performance.now(); requestAnimationFrame(loop); }
}
/** Enkel tidsstyrd animering. fn(e, k) får det utjämnade och det råa förloppet. */
function tween(dur, fn, { delay = 0, ease = t => t } = {}) {
  return new Promise(res => {
    tweens.add({ t0: performance.now() + delay * 1000, dur: Math.max(1, dur * 1000), fn, ease, res, started: false });
    wake();
  });
}
function loop(t) {
  const dt = Math.min(0.05, Math.max(0.001, (t - lastT) / 1000)); lastT = t;
  let busy = false;
  for (const tw of tweens) {
    if (t < tw.t0) { busy = true; continue; }
    const k = Math.min(1, (t - tw.t0) / tw.dur);
    tw.fn(tw.ease(k), k);
    if (k >= 1) { tweens.delete(tw); tw.res(); } else busy = true;
  }
  for (const f of stepFns) if (f(dt, t)) busy = true;
  if (controls && controls.update()) busy = true;
  renderer.render(scene, camera);
  if (busy || t < awakeUntil || tweens.size) requestAnimationFrame(loop);
  else rafOn = false;
}
if (controls) controls.addEventListener('change', () => wake(120));

// ============================================================================
// Texturer som ritas i koden
// ============================================================================
function texOf(c, { repeat, srgb = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = ANISO;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}
function brus(g, w, h, amp) {
  const id = g.getImageData(0, 0, w, h), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - .5) * amp; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(id, 0, 0);
}
/** Bordsskiva av plankor. Ådringen är periodisk i x-led och plankskarven
 *  ligger i texturens kant, så att mönstret upprepas sömlöst. */
function traTextur() {
  const S = 1024, c = mkCanvas(S, S), g = c.getContext('2d');
  const toner = [[92, 58, 33], [101, 65, 38], [86, 54, 31], [97, 61, 35]];
  const ph = S / 4;
  for (let p = 0; p < 4; p++) {
    const y0 = p * ph;
    g.save(); g.beginPath(); g.rect(0, y0, S, ph); g.clip();
    g.fillStyle = `rgb(${toner[p]})`; g.fillRect(0, y0, S, ph);
    for (let i = 0; i < 90; i++) {
      const yy = y0 + Math.random() * ph, amp = 2 + Math.random() * 11, k = 1 + Math.floor(Math.random() * 3), f0 = Math.random() * TAU;
      const mork = Math.random() < .62;
      g.strokeStyle = mork ? `rgba(38,20,9,${.05 + Math.random() * .2})` : `rgba(190,138,86,${.04 + Math.random() * .1})`;
      g.lineWidth = .6 + Math.random() * 2.6;
      g.beginPath();
      for (let x = 0; x <= S; x += 8) {
        const y = yy + amp * Math.sin(x / S * TAU * k + f0) + 2.5 * Math.sin(x / S * TAU * (3 * k + 1) + 2 * f0);
        if (x === 0) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.stroke();
    }
    // en kvist här och där
    if (Math.random() < .7) {
      const kx = Math.random() * S, ky = y0 + ph * (.3 + .4 * Math.random());
      for (let r = 26; r > 2; r -= 3) { g.strokeStyle = `rgba(45,24,10,${.12 + (26 - r) / 120})`; g.lineWidth = 1.4; g.beginPath(); g.ellipse(kx, ky, r * 1.9, r * .55, 0, 0, TAU); g.stroke(); }
    }
    g.restore();
    g.fillStyle = 'rgba(18,9,3,.6)'; g.fillRect(0, y0, S, 3);
    g.fillStyle = 'rgba(255,215,170,.07)'; g.fillRect(0, y0 + 3, S, 1);
  }
  brus(g, S, S, 12);
  return c;
}
function filtTextur(hex) {
  const S = 256, c = mkCanvas(S, S), g = c.getContext('2d');
  g.fillStyle = hex; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * S, y = Math.random() * S, a = Math.random() * TAU, l = 2 + Math.random() * 5;
    g.strokeStyle = Math.random() < .5 ? 'rgba(0,0,0,.09)' : 'rgba(255,255,255,.05)';
    g.lineWidth = .7; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  brus(g, S, S, 18);
  return c;
}
/** Etikett som svävar över en tärning efter kastet. */
const etikettCache = new Map();
function etikettTextur(text) {
  if (etikettCache.has(text)) return etikettCache.get(text);
  const c = mkCanvas(256, 128), g = c.getContext('2d');
  let fs = 74; g.font = `700 ${fs}px Poppins, sans-serif`;
  while (g.measureText(text).width > 200 && fs > 30) { fs -= 4; g.font = `700 ${fs}px Poppins, sans-serif`; }
  const w = Math.max(96, g.measureText(text).width + 56);
  g.fillStyle = 'rgba(20,15,11,.82)';
  g.beginPath(); g.roundRect((256 - w) / 2, 14, w, 100, 50); g.fill();
  g.fillStyle = '#fbf3e6'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 128, 68);
  const t = texOf(c); etikettCache.set(text, t); return t;
}

// ============================================================================
// Bordet
// ============================================================================
const traTex = texOf(traTextur(), { repeat: [5, 3.5] });
const bord = new THREE.Mesh(
  new THREE.PlaneGeometry(170, 120),
  new THREE.MeshPhysicalMaterial({ map: traTex, roughness: 0.58, clearcoat: 0.35, clearcoatRoughness: 0.45, envMapIntensity: 0.6 }));
bord.rotation.x = -Math.PI / 2; bord.position.set(0, 0, -5);
bord.receiveShadow = true;
scene.add(bord);
const filtFarg = '#174a37';
// Fond bakom bordet: varm skymning med suddiga ljuspunkter, så att vyerna
// som ser ut över bordet inte slutar i ett svart tomrum.
{
  const c = mkCanvas(2048, 512), g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 512);
  gr.addColorStop(0, '#0d0a08'); gr.addColorStop(.55, '#241a13'); gr.addColorStop(1, '#3a2a1c');
  g.fillStyle = gr; g.fillRect(0, 0, 2048, 512);
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * 2048, y = 150 + Math.random() * 300, r = 10 + Math.random() * 38;
    const b = g.createRadialGradient(x, y, 0, x, y, r);
    const f = Math.random() < .7 ? '255,196,120' : '255,150,110';
    b.addColorStop(0, `rgba(${f},${.1 + Math.random() * .2})`); b.addColorStop(1, `rgba(${f},0)`);
    g.fillStyle = b; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  }
  const fond = new THREE.Mesh(new THREE.PlaneGeometry(260, 65), new THREE.MeshBasicMaterial({ map: texOf(c), fog: false }));
  fond.position.set(0, 28, -62);
  scene.add(fond);
}
const filtMat = (rep) => {
  const t = texOf(filtTextur(filtFarg), { repeat: rep });
  return new THREE.MeshStandardMaterial({ map: t, roughness: 1, metalness: 0, envMapIntensity: 0.35 });
};
const traMorkMat = new THREE.MeshPhysicalMaterial({ color: 0x5b3218, map: traTex, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.25, envMapIntensity: 0.8 });
const massingMat = new THREE.MeshStandardMaterial({ color: 0xc9a14a, metalness: 1, roughness: 0.28, envMapIntensity: 1.2 });
/** Rundad rektangel som THREE.Shape, centrerad i origo. */
function rundRekt(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

// ============================================================================
// Stationer och kamera
// ============================================================================
const STATION = {
  tarningar: { target: new V3(0, 0.3, 0.5), dir: new V3(0, 1.2, 0.95), w: 19, h: 12.8 },
  kort: { target: new V3(-34.2, 0, 0.5), dir: new V3(0, 1.75, 0.85), w: 30.5, h: 20.8 },
  urna: { target: new V3(31, 3.7, 1.6), dir: new V3(0, 0.55, 1), w: 20, h: 13.5 },
  hjul: { target: new V3(0, 8.6, -24), dir: new V3(0, 0.12, 1), w: 21, h: 21 },
};
let mode = null;
function stationPose(key) {
  const s = STATION[key];
  const aspect = camera.aspect, tv = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  // utrymme för knapparna i över- och underkant
  const d = Math.max((s.h / 2) / tv, (s.w / 2) / (tv * aspect)) * 1.07;
  return { pos: s.target.clone().add(s.dir.clone().normalize().multiplyScalar(d)), target: s.target.clone(), d };
}
function styrVinklar(key, d) {
  if (!controls) return;
  const s = STATION[key], dir = s.dir.clone().normalize();
  const polar = Math.acos(dir.y);
  controls.minPolarAngle = Math.max(0.12, polar - 0.5);
  controls.maxPolarAngle = Math.min(1.42, polar + 0.32);
  controls.minAzimuthAngle = -0.75; controls.maxAzimuthAngle = 0.75;
  controls.minDistance = d * 0.55; controls.maxDistance = d * 1.45;
}
let flyg = null;
async function flygTill(key, direkt = false) {
  const p = stationPose(key);
  const s = STATION[key];
  spot.position.copy(s.target).add(new V3(7, 36, 16));
  spot.target.position.copy(s.target);
  if (!controls) return;
  controls.minDistance = 0; controls.maxDistance = Infinity;
  controls.minPolarAngle = 0; controls.maxPolarAngle = Math.PI;
  controls.minAzimuthAngle = -Infinity; controls.maxAzimuthAngle = Infinity;
  if (direkt) {
    camera.position.copy(p.pos); controls.target.copy(p.target);
    controls.update(); styrVinklar(key, p.d); wake(); return;
  }
  const p0 = camera.position.clone(), t0 = controls.target.clone();
  const id = flyg = {};
  controls.enabled = false;
  await tween(1.15, e => {
    if (flyg !== id) return;
    camera.position.lerpVectors(p0, p.pos, e);
    camera.position.y += Math.sin(Math.PI * e) * 7;
    controls.target.lerpVectors(t0, p.target, e);
    camera.lookAt(controls.target);
  }, { ease: easeInOut });
  if (flyg !== id) return;
  flyg = null;
  controls.enabled = true;
  controls.update(); styrVinklar(key, p.d);
}
function resize() {
  if (!renderer) return;
  const r = stage.getBoundingClientRect();
  const w = Math.max(10, r.width), h = Math.max(10, r.height);
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  if (mode && !flyg) {
    const p = stationPose(mode);
    // behåll betraktarens vinkel men anpassa avståndet
    const off = camera.position.clone().sub(controls.target).setLength(p.d);
    controls.minDistance = 0; controls.maxDistance = Infinity;
    camera.position.copy(controls.target).add(off);
    controls.update(); styrVinklar(mode, p.d);
  }
  wake();
}

// ============================================================================
// Tärningarnas geometri: konvexa polyedrar med fasade kanter
// ============================================================================
const PHI = (1 + Math.sqrt(5)) / 2;
/** Tärningarnas skala: en T6 är 1,16 enheter bred. */
const TS = 1.25;
/** Hörnen till en tärning med n sidor (2 = mynt). */
function polyPunkter(sides) {
  let p = [];
  if (sides === 4) p = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
  else if (sides === 6) { for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) p.push([x, y, z]); }
  else if (sides === 8) p = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  else if (sides === 10) {
    // Femsidigt trapetsoeder. Ringens höjd a ger plana drakfyrhörningar när
    // spetsen ligger på höjden 1: a = (1 − cos 36°)/(1 + cos 36°).
    const c36 = Math.cos(Math.PI / 5), a = (1 - c36) / (1 + c36);
    p = [[0, 1, 0], [0, -1, 0]];
    for (let i = 0; i < 10; i++) { const v = i * TAU / 10; p.push([Math.cos(v), i % 2 ? -a : a, Math.sin(v)]); }
  } else if (sides === 12) {
    for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) p.push([x, y, z]);
    const i = 1 / PHI;
    for (const s of [-1, 1]) for (const t of [-1, 1]) { p.push([0, s * i, t * PHI]); p.push([s * i, t * PHI, 0]); p.push([s * PHI, 0, t * i]); }
  } else if (sides === 20) {
    for (const s of [-1, 1]) for (const t of [-1, 1]) { p.push([0, s, t * PHI]); p.push([s, t * PHI, 0]); p.push([s * PHI, 0, t]); }
  } else if (sides === 2) {
    for (let i = 0; i < 20; i++) { const v = i * TAU / 20; p.push([Math.cos(v), 0.08, Math.sin(v)]); p.push([Math.cos(v), -0.08, Math.sin(v)]); }
  }
  const pts = p.map(q => new V3(q[0], q[1], q[2]));
  const R = TS * { 2: 1.12, 4: 1.3, 6: 0.93, 8: 1.05, 10: 1.02, 12: 1.0, 20: 1.04 }[sides];
  const cur = sides === 2 ? 1 : Math.max(...pts.map(v => v.length()));
  pts.forEach(v => v.multiplyScalar(R / cur));
  return pts;
}
/** Sidorna i punkternas konvexa hölje, med hörnen moturs sett utifrån. */
function hullSidor(pts) {
  const faces = [], n = pts.length, eps = 1e-4;
  const ab = new V3(), ac = new V3();
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    const nrm = new V3().crossVectors(ab.subVectors(pts[j], pts[i]), ac.subVectors(pts[k], pts[i]));
    if (nrm.lengthSq() < 1e-10) continue;
    nrm.normalize();
    let d = nrm.dot(pts[i]), pos = 0, neg = 0;
    for (let m = 0; m < n; m++) { const s = nrm.dot(pts[m]) - d; if (s > eps) pos++; else if (s < -eps) neg++; if (pos && neg) break; }
    if (pos && neg) continue;
    if (pos) { nrm.negate(); d = -d; }
    if (faces.some(f => f.n.dot(nrm) > 1 - 1e-6)) continue;
    const idx = [];
    for (let m = 0; m < n; m++) if (Math.abs(nrm.dot(pts[m]) - d) <= eps) idx.push(m);
    faces.push({ n: nrm, idx, d });
  }
  for (const f of faces) {
    const c = new V3(); f.idx.forEach(i => c.add(pts[i])); c.divideScalar(f.idx.length); f.c = c;
    const u = pts[f.idx[0]].clone().sub(c).normalize(), w = new V3().crossVectors(f.n, u);
    const ang = i => { const v = pts[i].clone().sub(c); return Math.atan2(v.dot(w), v.dot(u)); };
    f.idx.sort((p, q) => ang(p) - ang(q));
  }
  return faces;
}
const polyCache = new Map();
/** All geometri för en tärningstyp: hölje, etikettsidor, atlaslayout,
 *  visuell geometri med fasade kanter och fysikform. */
function polyFor(sides) {
  if (polyCache.has(sides)) return polyCache.get(sides);
  const pts = polyPunkter(sides);
  const faces = hullSidor(pts);
  const P = { sides, pts, faces };
  if (sides === 2) {
    P.labelFaces = faces.map((f, i) => i).filter(i => Math.abs(faces[i].n.y) > .99);
    P.labelFaces.sort((a, b) => faces[b].n.y - faces[a].n.y);   // krona uppåt först
    P.faceLi = new Map(P.labelFaces.map((fi, k) => [fi, k]));
    P.vila = 0.08 * 1.12 * TS;
  } else if (sides === 4) {
    P.vertLi = pts.map((_, i) => i);
    P.vertDir = pts.map(v => v.clone().normalize());
  } else {
    P.labelFaces = faces.map((f, i) => i);
    // Motstående sidor får summan n + 1, som på en riktig tärning.
    const val = new Array(faces.length).fill(0), used = new Set();
    let q = 0;
    faces.forEach((f, i) => {
      if (used.has(i)) return;
      const j = faces.findIndex((g, jj) => !used.has(jj) && jj !== i && g.n.dot(f.n) < -0.999);
      used.add(i); q++;
      val[i] = q;
      if (j >= 0) { used.add(j); val[j] = faces.length + 1 - q; }
    });
    if (val.some(v => !v) || new Set(val).size !== faces.length) faces.forEach((f, i) => { val[i] = i + 1; });
    P.faceLi = new Map(faces.map((f, i) => [i, val[i] - 1]));
  }
  // Atlaslayout: en cell per sida plus en tom cell för kanterna.
  const nCell = faces.length + 1;
  P.cols = Math.ceil(Math.sqrt(nCell)); P.rows = Math.ceil(nCell / P.cols);
  P.cell = faces.length <= 8 ? 256 : 168;
  P.W = P.cols * P.cell; P.H = P.rows * P.cell;
  P.cellXY = k => [(k % P.cols + .5) * P.cell, (Math.floor(k / P.cols) + .5) * P.cell];
  // Varje sidas lokala 2D-bas: "upp" mot spetsen (drakar), mot en kantmitt
  // (kvadrater) eller mot ett hörn (övriga).
  faces.forEach(f => {
    let far = f.idx[0], fd = 0;
    for (const i of f.idx) { const dd = pts[i].distanceTo(f.c); if (dd > fd + 1e-6) { fd = dd; far = i; } }
    let up;
    if (f.idx.length === 4 && sides === 6) up = pts[f.idx[0]].clone().add(pts[f.idx[1]]).multiplyScalar(.5).sub(f.c);
    else up = pts[far].clone().sub(f.c);
    f.u = up.normalize();
    f.r = f.u.clone().cross(f.n);
    f.R = Math.max(...f.idx.map(i => pts[i].distanceTo(f.c)));
    let inr = Infinity;
    for (let j = 0; j < f.idx.length; j++) {
      const a = pts[f.idx[j]], b = pts[f.idx[(j + 1) % f.idx.length]];
      const e = b.clone().sub(a).normalize(), v = f.c.clone().sub(a);
      inr = Math.min(inr, v.sub(e.multiplyScalar(v.dot(e))).length());
    }
    f.inr = inr;
    f.loc = p => { const v = p.clone().sub(f.c); return [v.dot(f.r), v.dot(f.u)]; };
  });
  P.half = P.cell * 0.46;
  P.px = (fi, x, y) => { const f = faces[fi], [cx, cy] = P.cellXY(fi); return [cx + x / f.R * P.half, cy - y / f.R * P.half]; };
  if (sides !== 2) P.geo = fasadGeometri(P, TS * { 4: .075, 6: .09, 8: .06, 10: .05, 12: .055, 20: .05 }[sides]);
  P.shape = new CANNON.ConvexPolyhedron({
    vertices: pts.map(v => new CANNON.Vec3(v.x, v.y, v.z)),
    faces: faces.map(f => f.idx.slice()),
  });
  polyCache.set(sides, P);
  return P;
}
/** Visuell geometri: sidorna krymps in en bit, och remsor och hörnlock
 *  fyller glappet. Normalerna glider över från sida till sida i remsorna,
 *  så kanterna ser rundade ut trots att geometrin är enkel. */
function fasadGeometri(P, bevel) {
  const { pts, faces } = P;
  const pos = [], nor = [], uv = [];
  const [bx, by] = P.cellXY(faces.length);
  const blank = [bx / P.W, 1 - by / P.H];
  const tmp1 = new V3(), tmp2 = new V3();
  function tri(a, b, c, na, nb, nc, ua, ub, uc) {
    const nOut = na.clone().add(nb).add(nc);
    tmp1.subVectors(b, a); tmp2.subVectors(c, a);
    if (tmp1.cross(tmp2).dot(nOut) < 0) { [b, c] = [c, b]; [nb, nc] = [nc, nb]; [ub, uc] = [uc, ub]; }
    for (const [p, n, t] of [[a, na, ua], [b, nb, ub], [c, nc, uc]]) { pos.push(p.x, p.y, p.z); nor.push(n.x, n.y, n.z); uv.push(t[0], t[1]); }
  }
  // krympta hörn per sida
  const shr = faces.map(f => f.idx.map((vi, j) => {
    const k = f.idx.length, v = pts[vi];
    const e1 = pts[f.idx[(j - 1 + k) % k]].clone().sub(v).normalize();
    const e2 = pts[f.idx[(j + 1) % k]].clone().sub(v).normalize();
    const half = Math.acos(clamp(e1.dot(e2), -1, 1)) / 2;
    return v.clone().add(e1.add(e2).normalize().multiplyScalar(bevel / Math.sin(half)));
  }));
  const uvOf = (fi, p) => { const [x, y] = faces[fi].loc(p); const [px, py] = P.px(fi, x, y); return [px / P.W, 1 - py / P.H]; };
  faces.forEach((f, fi) => {
    const s = shr[fi], cu = uvOf(fi, f.c);
    for (let j = 0; j < s.length; j++) {
      const a = s[j], b = s[(j + 1) % s.length];
      tri(f.c, a, b, f.n, f.n, f.n, cu, uvOf(fi, a), uvOf(fi, b));
    }
  });
  // remsor längs kanterna
  const kant = new Map();
  faces.forEach((f, fi) => f.idx.forEach((vi, j) => {
    const vj = f.idx[(j + 1) % f.idx.length], key = Math.min(vi, vj) + '_' + Math.max(vi, vj);
    if (!kant.has(key)) kant.set(key, []);
    kant.get(key).push({ fi, a: vi, b: vj, ja: j, jb: (j + 1) % f.idx.length });
  }));
  for (const [, e] of kant) {
    if (e.length !== 2) continue;
    const [F, G] = e, fn = faces[F.fi].n, gn = faces[G.fi].n;
    const fa = shr[F.fi][F.ja], fb = shr[F.fi][F.jb];
    const gA = shr[G.fi][faces[G.fi].idx.indexOf(F.a)], gB = shr[G.fi][faces[G.fi].idx.indexOf(F.b)];
    tri(fa, fb, gB, fn, fn, gn, blank, blank, blank);
    tri(fa, gB, gA, fn, gn, gn, blank, blank, blank);
  }
  // hörnlock
  pts.forEach((v, vi) => {
    const ring = [];
    faces.forEach((f, fi) => { const j = f.idx.indexOf(vi); if (j >= 0) ring.push({ p: shr[fi][j], n: f.n }); });
    if (ring.length < 3) return;
    const ax = v.clone().normalize();
    const u = ring[0].p.clone().sub(v); u.sub(ax.clone().multiplyScalar(u.dot(ax))).normalize();
    const w = new V3().crossVectors(ax, u);
    ring.sort((A, B) => { const a = A.p.clone().sub(v), b = B.p.clone().sub(v); return Math.atan2(a.dot(w), a.dot(u)) - Math.atan2(b.dot(w), b.dot(u)); });
    const m = new V3(); ring.forEach(r => m.add(r.p)); m.divideScalar(ring.length);
    for (let j = 0; j < ring.length; j++) {
      const A = ring[j], B = ring[(j + 1) % ring.length];
      tri(m, A.p, B.p, ax, A.n, B.n, blank, blank, blank);
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeBoundingSphere();
  return g;
}

// ---- Tärningarnas färger och sidornas etiketter ----
const TFARGER = [
  { key: 'elfenben', namn: 'Elfenben', bas: '#efe8d8', blakk: '#17181d' },
  { key: 'rod', namn: 'Röd', bas: '#b3172d', blakk: '#ffffff' },
  { key: 'bla', namn: 'Blå', bas: '#1e4d92', blakk: '#ffffff' },
  { key: 'gron', namn: 'Grön', bas: '#156c49', blakk: '#ffffff' },
  { key: 'svart', namn: 'Svart', bas: '#1b1c21', blakk: '#f1eadc' },
  { key: 'guld', namn: 'Guld', bas: '#c9a13f', blakk: '#2a1c04', metall: true },
  { key: 'lila', namn: 'Lila', bas: '#5c3990', blakk: '#ffffff' },
  { key: 'orange', namn: 'Orange', bas: '#d9661b', blakk: '#ffffff' },
];
const tfarg = key => TFARGER.find(f => f.key === key) || TFARGER[0];
const SIDFARGER = [
  { hex: '#c8324a', namn: 'Röd' }, { hex: '#2457a6', namn: 'Blå' }, { hex: '#23874d', namn: 'Grön' },
  { hex: '#e6b41c', namn: 'Gul' }, { hex: '#f4f1ea', namn: 'Vit' }, { hex: '#1f2127', namn: 'Svart' },
  { hex: '#7a4bb0', namn: 'Lila' }, { hex: '#e0701f', namn: 'Orange' },
];
const sidfargNamn = hex => (SIDFARGER.find(s => s.hex === hex) || {}).namn || 'Färg';
function standardEtiketter(sides) { return sides === 2 ? ['Krona', 'Klave'] : Array.from({ length: sides }, (_, i) => String(i + 1)); }
function nyTarning(sides = 6, farg = 'elfenben') { return { sides, farg, labels: standardEtiketter(sides), sidfarg: new Array(sides).fill(null) }; }
const parseTal = s => { const t = String(s).trim().replace(',', '.').replace('−', '-'); return /^-?\d+(\.\d+)?$/.test(t) ? parseFloat(t) : NaN; };
/** Utfallet när sidan med etikettindex li hamnar uppåt. */
function utfallAv(def, li) {
  const text = (def.labels[li] || '').trim(), sf = def.sidfarg[li];
  return { key: text || (sf ? sidfargNamn(sf) : '(tom)'), text: text || (sf ? sidfargNamn(sf) : '–'), num: parseTal(text), farg: sf };
}
function arStandard(def) { const s = standardEtiketter(def.sides); return def.labels.every((l, i) => l === s[i]) && def.sidfarg.every(x => !x); }

function ritaPrickar(g, v, cx, cy, h, ink) {
  const o = h * 0.5, r = h * 0.17;
  const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[v];
  for (const [x, y] of P) {
    const px = cx + x * o, py = cy + y * o;
    const gr = g.createRadialGradient(px - r * .3, py - r * .35, r * .1, px, py, r);
    gr.addColorStop(0, shade(ink, ink === '#ffffff' || luminans(ink) > .5 ? -0.25 : 0.25)); gr.addColorStop(1, ink);
    g.fillStyle = gr;
    g.beginPath(); g.arc(px, py, v === 1 ? r * 1.35 : r, 0, TAU); g.fill();
  }
}
function ritaText(g, text, cx, cy, maxW, fs, ink, understruken) {
  g.font = `700 ${fs}px Poppins, sans-serif`;
  while (g.measureText(text).width > maxW && fs > 8) { fs *= .92; g.font = `700 ${fs}px Poppins, sans-serif`; }
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = ink;
  g.fillText(text, cx, cy + fs * .04);
  if (understruken) { const w = g.measureText(text).width; g.fillRect(cx - w * .42, cy + fs * .46, w * .84, Math.max(2, fs * .07)); }
}
const tarningMatCache = new Map();
function tarningMaterial(def) {
  const key = JSON.stringify([def.sides, def.farg, def.labels, def.sidfarg]);
  if (tarningMatCache.has(key)) return tarningMatCache.get(key);
  if (tarningMatCache.size > 40) { for (const [, m] of tarningMatCache) { m.map.dispose(); m.dispose(); } tarningMatCache.clear(); }
  const P = polyFor(def.sides), F = tfarg(def.farg);
  const c = mkCanvas(P.W, P.H), g = c.getContext('2d');
  g.fillStyle = F.bas; g.fillRect(0, 0, P.W, P.H);
  const std = arStandard(def);
  const har69 = def.labels.some(l => l.trim() === '6') && def.labels.some(l => l.trim() === '9');
  P.faces.forEach((f, fi) => {
    const [cx, cy] = P.cellXY(fi);
    const inrPx = f.inr / f.R * P.half;
    if (def.sides === 4) {
      f.idx.forEach(vi => {
        const [x, y] = f.loc(P.pts[vi]);
        const len = Math.hypot(x, y), ang = Math.atan2(x, y);
        g.save(); g.translate(cx, cy); g.rotate(ang);
        ritaText(g, def.labels[P.vertLi[vi]] || '', 0, -len / f.R * P.half * .56, inrPx * 1.1, inrPx * .72, F.blakk, false);
        g.restore();
      });
      return;
    }
    const li = P.faceLi.get(fi);
    const sf = def.sidfarg[li];
    const poly = f.idx.map(vi => P.px(fi, ...f.loc(P.pts[vi])));
    if (sf) {
      g.fillStyle = sf; g.beginPath(); poly.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.fill();
    }
    const ink = sf ? kontrast(sf) : F.blakk;
    const text = (def.labels[li] || '').trim();
    if (def.sides === 6 && std) { ritaPrickar(g, li + 1, cx, cy, inrPx, ink); return; }
    if (!text) return;
    const fs = inrPx * (f.idx.length === 3 ? 1.05 : 1.2);
    // drakarna på T10: texten ligger i den breda delen
    const oy = f.idx.length === 4 && def.sides === 10 ? inrPx * .35 : (f.idx.length === 3 ? inrPx * .12 : 0);
    ritaText(g, text, cx, cy + oy, inrPx * (f.idx.length === 3 ? 1.45 : 1.7), fs, ink, har69 && (text === '6' || text === '9'));
  });
  const map = texOf(c);
  const mat = new THREE.MeshPhysicalMaterial({
    map, roughness: F.metall ? .3 : .27, metalness: F.metall ? .55 : 0,
    clearcoat: .75, clearcoatRoughness: .16, envMapIntensity: .95,
  });
  tarningMatCache.set(key, mat);
  return mat;
}
// ---- Myntet ----
function myntTextur(def, sida) {
  const S = 512, c = mkCanvas(S, S), g = c.getContext('2d');
  const gr = g.createRadialGradient(S * .42, S * .38, S * .05, S / 2, S / 2, S * .5);
  gr.addColorStop(0, '#f2f3f4'); gr.addColorStop(1, '#a9adb3');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  g.strokeStyle = 'rgba(40,44,50,.55)'; g.lineWidth = 7;
  g.beginPath(); g.arc(S / 2, S / 2, S * .44, 0, TAU); g.stroke();
  for (let i = 0; i < 72; i++) { const a = i / 72 * TAU; g.fillStyle = 'rgba(40,44,50,.4)'; g.beginPath(); g.arc(S / 2 + Math.cos(a) * S * .4, S / 2 + Math.sin(a) * S * .4, 3.2, 0, TAU); g.fill(); }
  const text = (def.labels[sida] || '').trim();
  const std = arStandard(def);
  g.fillStyle = 'rgba(38,42,48,.85)'; g.strokeStyle = 'rgba(38,42,48,.85)';
  if (std && sida === 0) {
    // krona
    const cx = S / 2, cy = S / 2 - 18, w = 190, h = 120;
    g.beginPath();
    g.moveTo(cx - w / 2, cy + h / 2); g.lineTo(cx - w / 2 - 8, cy - h / 2 + 10); g.lineTo(cx - w / 4, cy); g.lineTo(cx, cy - h / 2 - 12);
    g.lineTo(cx + w / 4, cy); g.lineTo(cx + w / 2 + 8, cy - h / 2 + 10); g.lineTo(cx + w / 2, cy + h / 2); g.closePath(); g.fill();
    g.fillRect(cx - w / 2 - 4, cy + h / 2 + 10, w + 8, 22);
    for (const [x, y] of [[cx - w / 2 - 8, cy - h / 2 + 10], [cx, cy - h / 2 - 12], [cx + w / 2 + 8, cy - h / 2 + 10]]) { g.beginPath(); g.arc(x, y - 8, 13, 0, TAU); g.fill(); }
    g.font = '700 46px Poppins, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('KRONA', S / 2, S * .76);
  } else if (std && sida === 1) {
    g.font = '700 230px Poppins, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('1', S / 2, S / 2 - 6);
    g.font = '700 46px Poppins, sans-serif'; g.fillText('KLAVE', S / 2, S * .79);
  } else if (text) {
    ritaText(g, text, S / 2, S / 2, S * .66, 170, 'rgba(38,42,48,.88)', false);
  }
  return texOf(c);
}
const myntKantTex = (() => {
  const c = mkCanvas(256, 16), g = c.getContext('2d');
  g.fillStyle = '#b9bdc3'; g.fillRect(0, 0, 256, 16);
  for (let x = 0; x < 256; x += 4) { g.fillStyle = 'rgba(40,44,50,.45)'; g.fillRect(x, 0, 2, 16); }
  const t = texOf(c, { repeat: [8, 1] }); return t;
})();
function myntMesh(def) {
  const R = 1.12 * TS, h = 0.08 * 1.12 * TS, grp = new THREE.Group();
  const metall = tex => new THREE.MeshStandardMaterial({ map: tex, bumpMap: tex, bumpScale: 0.012, metalness: 1, roughness: .3, envMapIntensity: 1.15 });
  const topp = new THREE.Mesh(new THREE.CircleGeometry(R, 64).rotateX(-Math.PI / 2).translate(0, h, 0), metall(myntTextur(def, 0)));
  const botten = new THREE.Mesh(new THREE.CircleGeometry(R, 64).rotateX(Math.PI / 2).translate(0, -h, 0), metall(myntTextur(def, 1)));
  const kant = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 2 * h, 64, 1, true), new THREE.MeshStandardMaterial({ map: myntKantTex, metalness: 1, roughness: .35 }));
  for (const m of [topp, botten, kant]) { m.castShadow = true; grp.add(m); }
  grp.userData.dispose = () => { for (const m of [topp, botten]) { m.material.map.dispose(); m.material.dispose(); m.geometry.dispose(); } kant.geometry.dispose(); kant.material.dispose(); };
  return grp;
}

// ============================================================================
// Station 1: Tärningar
// ============================================================================
const Tarningar = (() => {
  const G = 230, FLOOR = 0.42, IW = 15.4, ID = 10;
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -G, 0) });
  world.allowSleep = true;
  world.solver.iterations = 14;
  const mGolv = new CANNON.Material(), mT = new CANNON.Material(), mVagg = new CANNON.Material();
  world.addContactMaterial(new CANNON.ContactMaterial(mGolv, mT, { friction: 0.24, restitution: 0.36 }));
  world.addContactMaterial(new CANNON.ContactMaterial(mT, mT, { friction: 0.1, restitution: 0.5 }));
  world.addContactMaterial(new CANNON.ContactMaterial(mVagg, mT, { friction: 0.06, restitution: 0.62 }));
  const golv = new CANNON.Body({ mass: 0, material: mGolv, shape: new CANNON.Plane() });
  golv.quaternion.setFromEuler(-Math.PI / 2, 0, 0); golv.position.set(0, FLOOR, 0);
  world.addBody(golv);
  const vaggar = [];
  for (const [x, z, hx, hz] of [[0, -ID / 2 - .5, IW / 2 + 1, .5], [0, ID / 2 + .5, IW / 2 + 1, .5], [-IW / 2 - .5, 0, .5, ID / 2 + 1], [IW / 2 + .5, 0, .5, ID / 2 + 1]]) {
    const b = new CANNON.Body({ mass: 0, material: mVagg, shape: new CANNON.Box(new CANNON.Vec3(hx, 14, hz)) });
    b.position.set(x, FLOOR + 14, z); b.isVagg = true; world.addBody(b); vaggar.push(b);
  }
  // Brickan: trälåda med filtbotten.
  const grp = new THREE.Group(); scene.add(grp);
  const bas = new THREE.Mesh(new RoundedBoxGeometry(IW + 2.8, FLOOR, ID + 2.8, 3, .16), traMorkMat);
  bas.position.y = FLOOR / 2; bas.receiveShadow = true; bas.castShadow = true; grp.add(bas);
  const filt = new THREE.Mesh(new THREE.PlaneGeometry(IW, ID), filtMat([2.9, 1.9]));
  filt.rotation.x = -Math.PI / 2; filt.position.y = FLOOR + 0.004; filt.receiveShadow = true; grp.add(filt);
  // Ramen i ett stycke: rundad ytterkontur med ett hål, extruderad med
  // avfasade kanter. Egen träkopia eftersom extruderingens uv är i enheter.
  const kH = 1.2, kT = 1.4, fas = .28;
  const ramForm = rundRekt(IW + 2 * kT - 2 * fas, ID + 2 * kT - 2 * fas, 1.1);
  ramForm.holes.push(rundRekt(IW + 2 * fas, ID + 2 * fas, .35));
  const ramTex = traTex.clone(); ramTex.repeat.set(.07, .07); ramTex.needsUpdate = true;
  const ramMat = traMorkMat.clone(); ramMat.map = ramTex;
  const ram = new THREE.Mesh(new THREE.ExtrudeGeometry(ramForm, { depth: kH - 2 * fas, bevelEnabled: true, bevelSize: fas, bevelThickness: fas, bevelSegments: 5, curveSegments: 10 }).rotateX(-Math.PI / 2), ramMat);
  ram.position.y = FLOOR - .15 + fas; ram.castShadow = true; ram.receiveShadow = true; grp.add(ram);
  let dice = [], busy = false, aktiv = false, tRoll = 0, still = 0, knuffar = 0;
  let onResult = () => {};
  const etiketter = [];
  function rensaEtiketter() { for (const s of etiketter) { grp.remove(s); s.material.dispose(); } etiketter.length = 0; }
  function taBort() {
    for (const d of dice) {
      world.removeBody(d.body); grp.remove(d.mesh);
      if (d.mesh.userData.dispose) d.mesh.userData.dispose();
    }
    dice = [];
  }
  function skapa(def) {
    const P = polyFor(def.sides);
    let mesh;
    if (def.sides === 2) mesh = myntMesh(def);
    else { mesh = new THREE.Mesh(P.geo, tarningMaterial(def)); mesh.castShadow = true; mesh.receiveShadow = true; }
    const body = new CANNON.Body({ mass: 1, material: mT, shape: P.shape, linearDamping: 0.05, angularDamping: 0.09, allowSleep: true, sleepSpeedLimit: 0.4, sleepTimeLimit: 0.25 });
    body.isDie = true; body.isMynt = def.sides === 2;
    body.addEventListener('collide', e => {
      const o = e.body; if (!o || (o.isDie && o.id < body.id)) return;
      const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (body.isMynt) Ljud.tarning(v * .8, 'mynt');
      else Ljud.tarning(v, o === golv ? 'filt' : o.isDie ? (o.isMynt ? 'mynt' : 'tarning') : 'tra');
    });
    world.addBody(body); grp.add(mesh);
    return { def, P, mesh, body };
  }
  /** Lägg tärningen vilande med en slumpad sida uppåt. */
  function placeraVilande(d, x, z) {
    const P = d.P, q = new THREE.Quaternion(), up = new V3(0, 1, 0);
    let hojd;
    if (P.sides === 4) {
      const f = P.faces[rint(4)];
      q.setFromUnitVectors(f.n, new V3(0, -1, 0)); hojd = f.d;
    } else {
      const fi = P.labelFaces[rint(P.labelFaces.length)], f = P.faces[fi];
      q.setFromUnitVectors(f.n, up); hojd = P.sides === 2 ? P.vila : f.d;
    }
    q.premultiply(new THREE.Quaternion().setFromAxisAngle(up, rnd() * TAU));
    d.body.position.set(x, FLOOR + hojd + 0.002, z);
    d.body.quaternion.set(q.x, q.y, q.z, q.w);
    d.body.velocity.setZero(); d.body.angularVelocity.setZero();
    d.body.sleep();
    d.mesh.position.copy(d.body.position); d.mesh.quaternion.copy(d.body.quaternion);
  }
  function setDefs(defs) {
    if (busy) { busy = false; }
    rensaEtiketter(); taBort();
    dice = defs.map(skapa);
    const n = dice.length, cols = Math.min(n, 6), rows = Math.ceil(n / 6);
    dice.forEach((d, i) => {
      const r = Math.floor(i / 6), c = i % 6, cr = Math.min(6, n - r * 6);
      placeraVilande(d, (c - (cr - 1) / 2) * 2.45 + (rnd() - .5) * .4, (r - (rows - 1) / 2) * 3.1 + (rnd() - .5) * .4);
    });
    wake();
  }
  function kasta() {
    if (busy || !dice.length) return false;
    rensaEtiketter();
    const n = dice.length;
    dice.forEach((d, i) => {
      const r = Math.floor(i / 6), c = i % 6, cr = Math.min(6, n - r * 6);
      const b = d.body;
      b.position.set((c - (cr - 1) / 2) * 2.3 + (rnd() - .5) * .4, 3.4 + r * 2.4 + rnd() * 1.5, ID / 2 - 1.6 - r * 2.2);
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd() * TAU, rnd() * TAU, rnd() * TAU));
      b.quaternion.set(q.x, q.y, q.z, q.w);
      const mynt = b.isMynt;
      b.velocity.set((rnd() - .5) * 12, mynt ? 16 + rnd() * 6 : 3 + rnd() * 6, -(15 + rnd() * 11));
      b.angularVelocity.set((rnd() - .5) * (mynt ? 70 : 40), (rnd() - .5) * 30, (rnd() - .5) * (mynt ? 70 : 40));
      b.wakeUp();
    });
    Ljud.sus(0, 0.35);
    busy = true; aktiv = true; tRoll = 0; still = 0; knuffar = 0; bild = null; fonster = 0;
    wake();
    return true;
  }
  function uppIndex(d) {
    const q = d.body.quaternion, up = new CANNON.Vec3(0, 1, 0);
    const lu = q.conjugate().vmult(up), L = new V3(lu.x, lu.y, lu.z);
    const P = d.P;
    if (P.sides === 4) {
      let best = 0, bd = -2;
      P.vertDir.forEach((v, i) => { const t = v.dot(L); if (t > bd) { bd = t; best = i; } });
      return { li: P.vertLi[best], dot: bd > .94 ? 1 : 0 };
    }
    let best = -1, bd = -2;
    for (const fi of P.labelFaces) { const t = P.faces[fi].n.dot(L); if (t > bd) { bd = t; best = fi; } }
    return { li: P.faceLi.get(best), dot: bd };
  }
  function avlas() {
    const res = dice.map(uppIndex);
    const sned = res.findIndex(r => r.dot < .93);
    if (sned >= 0 && knuffar < 4) {
      // Tärningen lutar mot en kant eller en annan tärning: ge den en knuff.
      const b = dice[sned].body;
      b.wakeUp(); b.velocity.set((rnd() - .5) * 3, 7, (rnd() - .5) * 3);
      b.angularVelocity.set((rnd() - .5) * 14, (rnd() - .5) * 6, (rnd() - .5) * 14);
      knuffar++; still = 0; bild = null; return;
    }
    busy = false; vila = 0;
    const utfall = dice.map((d, i) => utfallAv(d.def, res[i].li));
    dice.forEach((d, i) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: etikettTextur(utfall[i].text), depthTest: false, transparent: true }));
      s.renderOrder = 10;
      s.position.set(d.body.position.x, d.body.position.y + 1.9, d.body.position.z);
      s.scale.set(0.01, 0.01, 1);
      grp.add(s); etiketter.push(s);
      tween(.35, e => { s.scale.set(2.1 * e, 1.05 * e, 1); }, { delay: i * .04, ease: easeOut });
    });
    onResult(utfall);
  }
  // Stillhet mäts som förflyttning över korta tidsfönster, inte som
  // ögonblicklig hastighet: kontaktlösaren låter en tärning i vila darra
  // lite, och en enda darrning fick annars räkningen att börja om.
  let fonster = 0, bild = null, vila = 0;
  function rorelse() {
    const nu = dice.map(d => [d.body.position.clone(), d.body.quaternion.clone()]);
    let max = Infinity;
    if (bild && bild.length === nu.length) {
      max = 0;
      nu.forEach(([p, q], i) => {
        const [p0, q0] = bild[i];
        const dq = Math.abs(q.x * q0.x + q.y * q0.y + q.z * q0.z + q.w * q0.w);
        max = Math.max(max, p.distanceTo(p0), 2 * Math.acos(Math.min(1, dq)));
      });
    }
    bild = nu; return max;
  }
  function step(dt) {
    if (!aktiv) return false;
    world.step(1 / 120, dt, 8);
    for (const d of dice) { d.mesh.position.copy(d.body.position); d.mesh.quaternion.copy(d.body.quaternion); }
    fonster += dt;
    if (busy) {
      tRoll += dt;
      if (fonster >= 0.15) { fonster = 0; still = rorelse() < 0.012 ? still + 1 : 0; }
      if (still >= 3 || tRoll > 9) avlas();
      return true;
    }
    vila += dt;
    if (dice.every(d => d.body.sleepState === CANNON.Body.SLEEPING) || vila > 1.5) {
      dice.forEach(d => d.body.sleep()); aktiv = false; return false;
    }
    return true;
  }
  stepFns.push(step);
  return {
    setDefs, kasta,
    visaEtiketter: v => etiketter.forEach(e => { e.visible = v; }),
    dbg: () => ({ aktiv, busy, still: +still.toFixed(2), tRoll: +tRoll.toFixed(2), knuffar, wt: +world.time.toFixed(2) }),
    get busy() { return busy; },
    set onResult(f) { onResult = f; },
    tarningar: () => dice,
    trafar: obj => grp === obj || grp.children.includes(obj) || dice.some(d => d.mesh === obj || d.mesh.children.includes(obj)),
    grp,
  };
})();

// ============================================================================
// Station 2: Kortlek
// ============================================================================
const FARGNAMN = { S: 'spader', H: 'hjärter', D: 'ruter', C: 'klöver' };
const FARGSYM = { S: '♠︎', H: '♥︎', D: '♦︎', C: '♣︎' };
const VALORNAMN = { 1: 'ess', 11: 'knekt', 12: 'dam', 13: 'kung' };
const VALORINDEX = { 1: 'E', 11: 'Kn', 12: 'D', 13: 'K' };
const ROD = s => s === 'H' || s === 'D';
const kortFarg = id => id[0] === 'J' ? null : id[0];
const kortValor = id => id[0] === 'J' ? 0 : parseInt(id.slice(1), 10);
function kortNamn(id) {
  if (id[0] === 'J') return 'Joker';
  const s = FARGNAMN[id[0]] + ' ' + (VALORNAMN[kortValor(id)] || kortValor(id));
  return s[0].toUpperCase() + s.slice(1);
}
/** Kortfärgernas symboler ritas som vektorbanor, inte som tecken. */
function fargBana(g, s) {
  g.beginPath();
  if (s === 'H') {
    g.moveTo(0, .45); g.bezierCurveTo(-.08, .33, -.52, .08, -.52, -.16); g.bezierCurveTo(-.52, -.4, -.3, -.5, -.18, -.5);
    g.bezierCurveTo(-.08, -.5, -.02, -.44, 0, -.35); g.bezierCurveTo(.02, -.44, .08, -.5, .18, -.5);
    g.bezierCurveTo(.3, -.5, .52, -.4, .52, -.16); g.bezierCurveTo(.52, .08, .08, .33, 0, .45);
  } else if (s === 'D') {
    g.moveTo(0, -.52); g.quadraticCurveTo(.15, -.22, .38, 0); g.quadraticCurveTo(.15, .22, 0, .52); g.quadraticCurveTo(-.15, .22, -.38, 0); g.quadraticCurveTo(-.15, -.22, 0, -.52);
  } else if (s === 'S') {
    g.moveTo(0, -.52); g.bezierCurveTo(.1, -.36, .52, -.14, .52, .1); g.bezierCurveTo(.52, .32, .33, .4, .2, .4);
    g.bezierCurveTo(.11, .4, .05, .36, .03, .31); g.quadraticCurveTo(.06, .44, .18, .52); g.lineTo(-.18, .52);
    g.quadraticCurveTo(-.06, .44, -.03, .31); g.bezierCurveTo(-.05, .36, -.11, .4, -.2, .4);
    g.bezierCurveTo(-.33, .4, -.52, .32, -.52, .1); g.bezierCurveTo(-.52, -.14, -.1, -.36, 0, -.52);
  } else if (s === 'C') {
    for (const [x, y] of [[0, -.25], [-.26, .07], [.26, .07]]) { g.moveTo(x + .23, y); g.arc(x, y, .23, 0, TAU); }
    g.moveTo(.12, .02); g.arc(0, .02, .12, 0, TAU);
    g.moveTo(-.035, .05); g.quadraticCurveTo(-.04, .4, -.19, .52); g.lineTo(.19, .52); g.quadraticCurveTo(.04, .4, .035, .05);
  }
  g.closePath();
}
function ritaFarg(g, s, x, y, size, color, rot = 0) {
  g.save(); g.translate(x, y); if (rot) g.rotate(rot); g.scale(size, size);
  g.fillStyle = color; fargBana(g, s); g.fill('nonzero'); g.restore();
}
const KORT_PX = [400, 560];
function kortBakCanvas() {
  const [W, H] = KORT_PX, c = mkCanvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#f4ecdc'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#7b1a2d'; g.beginPath(); g.roundRect(20, 20, W - 40, H - 40, 16); g.fill();
  g.save(); g.beginPath(); g.roundRect(28, 28, W - 56, H - 56, 12); g.clip();
  const gr = g.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, H * .6);
  gr.addColorStop(0, '#9a2438'); gr.addColorStop(1, '#6a1426');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(236, 200, 130, .32)'; g.lineWidth = 1.6;
  for (let k = -H; k < W + H; k += 20) {
    g.beginPath(); g.moveTo(k, 0); g.lineTo(k + H, H); g.stroke();
    g.beginPath(); g.moveTo(k, H); g.lineTo(k + H, 0); g.stroke();
  }
  g.restore();
  g.strokeStyle = 'rgba(236, 200, 130, .8)'; g.lineWidth = 2.5;
  g.beginPath(); g.roundRect(34, 34, W - 68, H - 68, 10); g.stroke();
  // medaljong med sajtens atomsymbol
  g.fillStyle = '#f4ecdc'; g.beginPath(); g.ellipse(W / 2, H / 2, 86, 108, 0, 0, TAU); g.fill();
  g.strokeStyle = '#c99a4c'; g.lineWidth = 4; g.beginPath(); g.ellipse(W / 2, H / 2, 78, 100, 0, 0, TAU); g.stroke();
  g.save(); g.translate(W / 2, H / 2); g.rotate(-24 * Math.PI / 180);
  g.strokeStyle = '#7b1a2d'; g.lineWidth = 5; g.beginPath(); g.ellipse(0, 0, 62, 25, 0, 0, TAU); g.stroke();
  g.fillStyle = '#c8324a'; g.beginPath(); g.arc(41.5, -18.5, 8, 0, TAU); g.fill();
  g.restore();
  g.fillStyle = '#c8324a'; g.beginPath(); g.arc(W / 2, H / 2, 12, 0, TAU); g.fill();
  return c;
}
function krona(g, x, y, w, fyll, kant) {
  const h = w * .62;
  g.save(); g.translate(x, y);
  g.beginPath();
  g.moveTo(-w / 2, h / 2); g.lineTo(-w / 2 - w * .04, -h / 2 + h * .1); g.lineTo(-w / 4, 0); g.lineTo(0, -h / 2 - h * .12);
  g.lineTo(w / 4, 0); g.lineTo(w / 2 + w * .04, -h / 2 + h * .1); g.lineTo(w / 2, h / 2); g.closePath();
  g.fillStyle = fyll; g.fill(); g.lineWidth = w * .035; g.strokeStyle = kant; g.stroke();
  for (const [px, py] of [[-w / 2 - w * .04, -h / 2 + h * .1], [0, -h / 2 - h * .12], [w / 2 + w * .04, -h / 2 + h * .1]]) {
    g.beginPath(); g.arc(px, py - w * .05, w * .06, 0, TAU); g.fill(); g.stroke();
  }
  g.fillRect(-w / 2, h / 2 + w * .03, w, w * .1); g.strokeRect(-w / 2, h / 2 + w * .03, w, w * .1);
  g.restore();
}
function kortFramCanvas(id) {
  const [W, H] = KORT_PX, S = 0.8, c = mkCanvas(W * S, H * S), g = c.getContext('2d');
  g.scale(S, S);
  const gr = g.createLinearGradient(0, 0, W, H);
  gr.addColorStop(0, '#fdfbf6'); gr.addColorStop(1, '#f1ebdf');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.strokeStyle = '#e4d9c6'; g.lineWidth = 2; g.beginPath(); g.roundRect(14, 14, W - 28, H - 28, 14); g.stroke();
  if (id[0] === 'J') {
    const col = id === 'J1' ? '#c0283a' : '#16181d';
    g.fillStyle = '#f6ecd5'; g.fillRect(70, 82, W - 140, H - 164);
    g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(70, 82, W - 140, H - 164); g.strokeRect(78, 90, W - 156, H - 180);
    // narrmössa
    g.save(); g.translate(W / 2, 230);
    g.fillStyle = col; g.beginPath();
    g.moveTo(-70, 40); g.quadraticCurveTo(-90, -30, -120, -40); g.quadraticCurveTo(-60, -40, -25, 10);
    g.quadraticCurveTo(-10, -70, 0, -80); g.quadraticCurveTo(10, -70, 25, 10);
    g.quadraticCurveTo(60, -40, 120, -40); g.quadraticCurveTo(90, -30, 70, 40); g.closePath(); g.fill();
    g.fillStyle = '#d4a23c';
    for (const [x, y] of [[-120, -40], [0, -80], [120, -40]]) { g.beginPath(); g.arc(x, y, 11, 0, TAU); g.fill(); }
    g.fillRect(-74, 38, 148, 16);
    g.restore();
    g.fillStyle = col; g.font = '400 84px "Instrument Serif", Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('Joker', W / 2, 372);
    for (const [x, y, r] of [[44, 56, 0], [W - 44, H - 56, Math.PI]]) {
      g.save(); g.translate(x, y); g.rotate(r); g.fillStyle = col;
      g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 9 : 21; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill();
      g.restore();
    }
    return c;
  }
  const s = id[0], v = kortValor(id), col = ROD(s) ? '#c0283a' : '#16181d';
  const idx = VALORINDEX[v] || String(v);
  for (const r of [0, Math.PI]) {
    g.save(); if (r) { g.translate(W, H); g.rotate(r); }
    g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.font = `600 ${idx.length > 1 ? 50 : 64}px Poppins, sans-serif`;
    g.fillText(idx, 46, 84);
    ritaFarg(g, s, 46, 122, 46, col);
    g.restore();
  }
  if (v === 1) {
    ritaFarg(g, s, W / 2, H / 2, s === 'S' ? 210 : 170, col);
  } else if (v <= 10) {
    const L = 132, C = 200, R = 268;
    const P = {
      2: [[C, 128], [C, 432]], 3: [[C, 128], [C, 280], [C, 432]],
      4: [[L, 128], [R, 128], [L, 432], [R, 432]], 5: [[L, 128], [R, 128], [C, 280], [L, 432], [R, 432]],
      6: [[L, 128], [R, 128], [L, 280], [R, 280], [L, 432], [R, 432]],
      7: [[L, 128], [R, 128], [C, 204], [L, 280], [R, 280], [L, 432], [R, 432]],
      8: [[L, 128], [R, 128], [C, 204], [L, 280], [R, 280], [C, 356], [L, 432], [R, 432]],
      9: [[L, 128], [R, 128], [L, 229], [R, 229], [C, 280], [L, 331], [R, 331], [L, 432], [R, 432]],
      10: [[L, 128], [R, 128], [C, 178], [L, 229], [R, 229], [L, 331], [R, 331], [C, 382], [L, 432], [R, 432]],
    }[v];
    for (const [x, y] of P) ritaFarg(g, s, x, y, 66, col, y > 285 ? Math.PI : 0);
  } else {
    // klädda kort: ram, emblem, stor bokstav
    g.fillStyle = '#f7edd6'; g.fillRect(84, 84, W - 168, H - 168);
    g.save(); g.beginPath(); g.rect(84, 84, W - 168, H - 168); g.clip();
    g.strokeStyle = ROD(s) ? 'rgba(192,40,58,.1)' : 'rgba(22,24,29,.08)'; g.lineWidth = 1.5;
    for (let k = -H; k < W + H; k += 14) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + H, H); g.stroke(); }
    g.restore();
    g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(84, 84, W - 168, H - 168);
    g.strokeStyle = '#c99a4c'; g.lineWidth = 2; g.strokeRect(93, 93, W - 186, H - 186);
    if (v === 13) krona(g, W / 2, 172, 120, '#d9ad4e', '#8a6420');
    else if (v === 12) {
      g.save(); g.translate(W / 2, 176); g.fillStyle = '#d9ad4e'; g.strokeStyle = '#8a6420'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(-58, 26); g.quadraticCurveTo(-60, -10, -30, -22); g.quadraticCurveTo(-18, 2, 0, -38); g.quadraticCurveTo(18, 2, 30, -22); g.quadraticCurveTo(60, -10, 58, 26); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = col; for (const x of [-30, 0, 30]) { g.beginPath(); g.arc(x, x ? -14 : -30, 7, 0, TAU); g.fill(); }
      g.restore();
    } else {
      g.save(); g.translate(W / 2, 180); g.rotate(-.5);
      g.fillStyle = '#d9ad4e'; g.strokeStyle = '#8a6420'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(0, 50); g.quadraticCurveTo(-34, 0, 0, -58); g.quadraticCurveTo(30, 0, 0, 50); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(0, 48); g.lineTo(0, -52); g.stroke();
      g.restore();
    }
    g.fillStyle = col; g.font = '400 176px "Instrument Serif", Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(idx, W / 2, 318);
    ritaFarg(g, s, W / 2, 426, 52, col);
  }
  return c;
}
const Kortlek = (() => {
  const CW = 3.9, CH = 5.45, CRAD = 0.3, TH = 0.018, MATY = 0.035;
  const DECK = new V3(-43.5, 0, -6.2), HOG = new V3(-43.5, 0, 0), PLATSER = 12;
  const slot = i => new V3(-36.5 + (i % 4) * 4.6, MATY + 0.01 + i * 0.0005, -6.2 + Math.floor(i / 4) * 6.2);
  const grp = new THREE.Group(); scene.add(grp);
  // filtmatta med mörk kant och tryckta kortplatser
  const matta = new THREE.Mesh(new THREE.ShapeGeometry(rundRekt(29.4, 19.8, 1.2), 8).rotateX(-Math.PI / 2), filtMat([4.6, 3.1]));
  matta.position.set(-34.2, MATY, 0); matta.receiveShadow = true; grp.add(matta);
  const mattKant = new THREE.Mesh(new THREE.ShapeGeometry(rundRekt(30.2, 20.6, 1.5), 8).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x0c2c20, roughness: .9 }));
  mattKant.position.set(-34.2, MATY - 0.012, 0); mattKant.receiveShadow = true; grp.add(mattKant);
  // uv-anpassning: ShapeGeometry ger kortets uv i kortets egna mått
  const uvKort = geo => { const uv = geo.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / CW + .5, uv.getY(i) / CH + .5); return geo; };
  const kortForm = rundRekt(CW, CH, CRAD);
  const framGeo = uvKort(new THREE.ShapeGeometry(kortForm, 6)).rotateX(-Math.PI / 2).translate(0, 0.005, 0);
  const bakGeo = framGeo.clone().rotateZ(Math.PI);
  const bakMat = new THREE.MeshPhysicalMaterial({ map: texOf(kortBakCanvas()), roughness: .45, clearcoat: .35, clearcoatRoughness: .3, envMapIntensity: .4 });
  const sidaTex = (() => { const c = mkCanvas(8, 16), g = c.getContext('2d'); g.fillStyle = '#efe6d3'; g.fillRect(0, 0, 8, 16); g.fillStyle = '#cbbd9f'; g.fillRect(0, 0, 8, 3); return texOf(c, { repeat: [0.3, 1 / (TH * 2)] }); })();
  const sidaMat = new THREE.MeshStandardMaterial({ map: sidaTex, roughness: .8 });
  for (const [p, lbl] of [[DECK, 'lek'], [HOG, 'hog']]) {
    const pts = kortForm.getPoints(8).map(q => new V3(q.x * 1.05, 0, -q.y * 1.05));
    const l = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xd8c08a, transparent: true, opacity: .35 }));
    l.position.set(p.x, MATY + 0.004, p.z); grp.add(l); l.userData.lbl = lbl;
  }
  const framMats = new Map();
  let iBruk = new Set();
  function framMat(id) {
    if (framMats.has(id)) { const m = framMats.get(id); framMats.delete(id); framMats.set(id, m); return m; }
    if (framMats.size > 26) {
      for (const [k, m] of framMats) { if (framMats.size <= 20) break; if (iBruk.has(k)) continue; m.map.dispose(); m.dispose(); framMats.delete(k); }
    }
    const m = new THREE.MeshPhysicalMaterial({ map: texOf(kortFramCanvas(id)), roughness: .5, clearcoat: .25, clearcoatRoughness: .35, envMapIntensity: .3 });
    framMats.set(id, m); return m;
  }
  function kortMesh(id) {
    const g = new THREE.Group();
    const f = new THREE.Mesh(framGeo, framMat(id)), b = new THREE.Mesh(bakGeo, bakMat);
    f.castShadow = b.castShadow = true; f.receiveShadow = true;
    g.add(f, b); g.userData.id = id; grp.add(g); return g;
  }
  function bunt(n, topMat) {
    const d = Math.max(n, 1) * TH;
    const geo = new THREE.ExtrudeGeometry(kortForm, { depth: d, bevelEnabled: false, curveSegments: 6 });
    const uv = geo.attributes.uv, gr0 = geo.groups[0];
    for (let i = gr0.start; i < gr0.start + gr0.count; i++) { const vi = geo.index ? geo.index.getX(i) : i; uv.setXY(vi, uv.getX(vi) / CW + .5, uv.getY(vi) / CH + .5); }
    geo.rotateX(-Math.PI / 2);
    return geo;
  }
  function nyBunt(topMat) { const m = new THREE.Mesh(bunt(1), [topMat, sidaMat]); m.castShadow = true; m.receiveShadow = true; m.userData.n = -1; grp.add(m); return m; }
  function setBunt(m, n) {
    if (m.userData.n === n) return;
    m.userData.n = n; m.visible = n > 0;
    if (n > 0) { m.geometry.dispose(); m.geometry = bunt(n); }
  }
  const lekMesh = nyBunt(bakMat); lekMesh.position.set(DECK.x, MATY, DECK.z);
  const hogMesh = nyBunt(bakMat); hogMesh.position.set(HOG.x, MATY, HOG.z);
  const halvA = nyBunt(bakMat), halvB = nyBunt(bakMat); halvA.visible = halvB.visible = false;

  let full = [], lek = [], bord = [], hog = [], busy = false;
  let onKort = () => {}, onAndring = () => {};
  const lekTopp = () => MATY + lek.length * TH;
  function visaHog() {
    setBunt(hogMesh, hog.length);
    if (hog.length) { hogMesh.material[0] = framMat(hog[hog.length - 1]); }
    iBruk = new Set([...bord.map(b => b.id), hog[hog.length - 1]]);
  }
  function setCfg(cfg) {
    for (const b of bord) grp.remove(b.mesh);
    bord = []; hog = [];
    full = [];
    for (const s of cfg.farger) for (const v of cfg.valorer) full.push(s + v);
    for (let j = 1; j <= cfg.jokrar; j++) full.push('J' + j);
    lek = shuffle(full.slice());
    setBunt(lekMesh, lek.length); visaHog();
    onAndring(); wake();
  }
  function bezier(p0, p1, p2, p3, t, out) {
    const u = 1 - t;
    return out.set(0, 0, 0).addScaledVector(p0, u * u * u).addScaledVector(p1, 3 * u * u * t).addScaledVector(p2, 3 * u * t * t).addScaledVector(p3, t * t * t);
  }
  async function draEtt(i, delay) {
    await sleep(delay * 1000);
    const id = lek.pop();
    const m = kortMesh(id);
    const p0 = new V3(DECK.x, lekTopp() + 0.02, DECK.z);
    setBunt(lekMesh, lek.length);
    const p3 = slot(i), yaw = (rnd() - .5) * .08;
    const dir = p3.clone().sub(p0).setY(0).normalize();
    const p1 = p0.clone().addScaledVector(dir, 2.6).add(new V3(0, 1.1, 0)), p2 = p3.clone().add(new V3(0, 2.8, 0));
    m.position.copy(p0); m.rotation.set(0, 0, Math.PI);
    Ljud.glid(0, .26);
    bord.push({ id, mesh: m, slot: i }); iBruk.add(id);
    onAndring();
    const tmp = new V3();
    await tween(.8, (e, k) => {
      m.position.copy(bezier(p0, p1, p2, p3, e, tmp));
      const f = clamp((k - .22) / .52, 0, 1);
      m.rotation.z = Math.PI * (1 - easeInOut(f));
      m.rotation.x = -Math.sin(Math.PI * f) * .22;
      m.rotation.y = yaw * e;
    }, { ease: easeInOut });
    Ljud.vand();
    onKort(id);
  }
  /** Kort från bordet tillbaka till leken eller till högen. */
  async function flytta(kort, mal) {
    const lista = kort.slice();
    const tmp = new V3();
    await Promise.all(lista.map((b, j) => (async () => {
      await sleep(j * 55);
      const p0 = b.mesh.position.clone(), r0 = b.mesh.rotation.z, y0 = b.mesh.rotation.y;
      const hojd = mal === 'lek' ? lekTopp() + 0.02 : MATY + hog.length * TH + 0.02;
      const p3 = new V3((mal === 'lek' ? DECK : HOG).x, hojd, (mal === 'lek' ? DECK : HOG).z);
      const p1 = p0.clone().add(new V3(0, 1.2, 0)), p2 = p3.clone().add(new V3(0, 1.4, 0));
      if (j % 2 === 0) Ljud.glid(0, .16, .6);
      await tween(.46, e => {
        b.mesh.position.copy(bezier(p0, p1, p2, p3, e, tmp));
        if (mal === 'lek') b.mesh.rotation.z = lerp(r0, Math.PI, e);
        b.mesh.rotation.y = lerp(y0, 0, e);
      }, { ease: easeInOut });
      grp.remove(b.mesh);
      if (mal === 'lek') { lek.push(b.id); setBunt(lekMesh, lek.length); }
      else { hog.push(b.id); visaHog(); }
    })()));
    bord = bord.filter(b => !lista.includes(b));
    onAndring();
  }
  async function blandaAnim() {
    const n = lek.length;
    shuffle(lek);
    if (n < 2) return;
    lekMesh.visible = false;
    let na = Math.ceil(n / 2), nb = n - na;
    halvA.position.copy(lekMesh.position); halvB.position.copy(lekMesh.position);
    setBunt(halvA, na); setBunt(halvB, nb); halvA.userData.n = halvB.userData.n = -1; setBunt(halvA, na); setBunt(halvB, nb);
    halvA.visible = halvB.visible = true;
    await tween(.28, e => {
      halvA.position.x = DECK.x - 2.2 * e; halvB.position.x = DECK.x + 2.2 * e;
      halvA.rotation.z = -.14 * e; halvB.rotation.z = .14 * e;
    }, { ease: easeOut });
    Ljud.blanda(0, .8);
    await tween(.8, e => {
      const flyttat = Math.round(n * e);
      setBunt(halvA, Math.max(0, na - Math.ceil(flyttat / 2)));
      setBunt(halvB, Math.max(0, nb - Math.floor(flyttat / 2)));
      setBunt(lekMesh, flyttat); lekMesh.visible = flyttat > 0;
      halvA.position.x = DECK.x - 2.2 + 1.2 * e; halvB.position.x = DECK.x + 2.2 - 1.2 * e;
    });
    halvA.visible = halvB.visible = false; halvA.rotation.z = halvB.rotation.z = 0;
    lekMesh.userData.n = -1; setBunt(lekMesh, n);
    await tween(.22, e => { lekMesh.position.y = MATY + Math.sin(Math.PI * e) * .25; });
    lekMesh.position.y = MATY;
  }
  async function dra(antal, ater) {
    if (busy) return false;
    busy = true;
    try {
      if (ater && bord.length) { await flytta(bord, 'lek'); await blandaAnim(); }
      const n = Math.min(antal, lek.length);
      if (!n) return false;
      if (bord.length + n > PLATSER) await flytta(bord, 'hog');
      const start = bord.length;
      await Promise.all(Array.from({ length: n }, (_, i) => draEtt(start + i, i * .2)));
      return true;
    } finally { busy = false; onAndring(); }
  }
  async function samla() {
    if (busy) return;
    busy = true;
    try {
      if (bord.length) await flytta(bord, 'lek');
      if (hog.length) {
        // högen glider tillbaka i ett svep
        const n = hog.length; Ljud.glid(0, .35, .9);
        const z0 = hogMesh.position.z;
        await tween(.45, e => { hogMesh.position.z = lerp(z0, DECK.z, e); hogMesh.position.y = MATY + Math.sin(Math.PI * e) * 1.2; hogMesh.rotation.z = Math.PI * e; }, { ease: easeInOut });
        lek.push(...hog); hog = []; hogMesh.position.set(HOG.x, MATY, HOG.z); hogMesh.rotation.z = 0; visaHog();
        setBunt(lekMesh, lek.length);
      }
      await blandaAnim();
    } finally { busy = false; onAndring(); }
  }
  async function blanda() { if (busy) return; busy = true; try { await blandaAnim(); } finally { busy = false; onAndring(); } }
  return {
    setCfg, dra, samla, blanda,
    get busy() { return busy; },
    get full() { return full; }, get lek() { return lek; }, get bord() { return bord.map(b => b.id); }, get hog() { return hog; },
    set onKort(f) { onKort = f; }, set onAndring(f) { onAndring = f; },
    klickbar: [lekMesh],
    grp,
  };
})();

// ============================================================================
// Station 3: Urna med kulor
// ============================================================================
const KULFARGER = [
  { key: 'rod', namn: 'Röd', hex: '#c62a3a' }, { key: 'bla', namn: 'Blå', hex: '#2256a8' },
  { key: 'gron', namn: 'Grön', hex: '#1f8a4c' }, { key: 'gul', namn: 'Gul', hex: '#eab41c' },
  { key: 'svart', namn: 'Svart', hex: '#1e2025' }, { key: 'vit', namn: 'Vit', hex: '#f1ede4' },
  { key: 'lila', namn: 'Lila', hex: '#6d3fa3' }, { key: 'orange', namn: 'Orange', hex: '#e0701f' },
  { key: 'rosa', namn: 'Rosa', hex: '#e27aa0' }, { key: 'turkos', namn: 'Turkos', hex: '#169aa0' },
];
const kulfarg = k => KULFARGER.find(f => f.key === k) || KULFARGER[0];
const Urna = (() => {
  const C = new V3(31, 0, -1.5), R_KULA = 0.66, GOLV = 0.14, RV = 3.62, MAX = 80;
  const BRICKA = i => new V3(31 + (i - 4.5) * 1.62, 0.62 + R_KULA * .8, 5.6);
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -240, 0) });
  world.allowSleep = true; world.solver.iterations = 10;
  const mK = new CANNON.Material(), mG = new CANNON.Material();
  world.addContactMaterial(new CANNON.ContactMaterial(mK, mK, { friction: 0.06, restitution: 0.38 }));
  world.addContactMaterial(new CANNON.ContactMaterial(mK, mG, { friction: 0.05, restitution: 0.3 }));
  const golv = new CANNON.Body({ mass: 0, material: mG, shape: new CANNON.Plane() });
  golv.quaternion.setFromEuler(-Math.PI / 2, 0, 0); golv.position.set(C.x, GOLV, C.z); world.addBody(golv);
  const N_V = 30, seg = TAU * (RV + .25) / N_V * 1.15;
  for (let i = 0; i < N_V; i++) {
    const a = i / N_V * TAU;
    const b = new CANNON.Body({ mass: 0, material: mG, shape: new CANNON.Box(new CANNON.Vec3(seg / 2, 7, .25)) });
    b.position.set(C.x + Math.cos(a) * (RV + .25), GOLV + 7, C.z + Math.sin(a) * (RV + .25));
    b.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2 - a);
    b.isGlas = true; world.addBody(b);
  }
  // Glasurnan
  const grp = new THREE.Group(); grp.position.copy(C); scene.add(grp);
  const glasGrp = new THREE.Group(); grp.add(glasGrp);
  const profil = [[0, .02], [2.9, .02], [3.45, .12], [3.82, .45], [4.02, 1.2], [4.06, 2.5], [4.0, 5.1], [3.72, 6.2], [3.36, 6.85], [3.3, 7.3], [3.44, 7.55], [3.62, 7.62]].map(([r, y]) => new THREE.Vector2(r, y));
  const glasMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6f2f0, metalness: 0, roughness: .04, transparent: true, opacity: .13,
    side: THREE.DoubleSide, depthWrite: false, clearcoat: 1, clearcoatRoughness: .02, envMapIntensity: 2.4, specularIntensity: 1,
  });
  const glas = new THREE.Mesh(new THREE.LatheGeometry(profil, 96), glasMat);
  glas.renderOrder = 5; glasGrp.add(glas);
  const kant = new THREE.Mesh(new THREE.TorusGeometry(3.55, .13, 14, 96).rotateX(Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: 0xcfe7e1, roughness: .05, transparent: true, opacity: .32, clearcoat: 1, envMapIntensity: 2.2, depthWrite: false }));
  kant.position.y = 7.62; kant.renderOrder = 6; glasGrp.add(kant);
  const botten = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.4, .14, 64), new THREE.MeshPhysicalMaterial({ color: 0x9fbdb6, roughness: .08, transparent: true, opacity: .22, clearcoat: 1, envMapIntensity: 1.2, depthWrite: false }));
  botten.position.y = .07; botten.renderOrder = 4;
  // Glansstrimmor som får glaset att läsas som glas
  const strimTex = (() => { const c = mkCanvas(32, 256), g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.25, 'rgba(255,255,255,1)'); gr.addColorStop(.8, 'rgba(255,255,255,.8)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 32, 256); const h = g.createLinearGradient(0, 0, 32, 0); h.addColorStop(0, 'rgba(0,0,0,1)'); h.addColorStop(.5, 'rgba(0,0,0,0)'); h.addColorStop(1, 'rgba(0,0,0,1)'); g.globalCompositeOperation = 'destination-out'; g.fillStyle = h; g.fillRect(0, 0, 32, 256); return texOf(c); })();
  for (const [a, w, o] of [[-.62, .42, .26], [-.42, .16, .18], [.9, .3, .12]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 4.6), new THREE.MeshBasicMaterial({ map: strimTex, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false }));
    m.position.set(Math.sin(a) * 4.1, 3.4, Math.cos(a) * 4.1); m.rotation.y = a; m.renderOrder = 7; glasGrp.add(m);
  }
  // Brickan för dragna kulor
  const bricka = new THREE.Mesh(new RoundedBoxGeometry(17.2, .62, 2.5, 3, .22), traMorkMat);
  bricka.position.set(C.x, .31, 5.6); bricka.castShadow = bricka.receiveShadow = true; scene.add(bricka);
  const gropMat = new THREE.MeshStandardMaterial({ color: 0x2c170a, roughness: .7 });
  for (let i = 0; i < 10; i++) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(.52, 28).rotateX(-Math.PI / 2), gropMat);
    const p = BRICKA(i); m.position.set(p.x, .625, p.z); scene.add(m);
  }
  // Kulorna: en instansierad mesh för alla
  const kulMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(R_KULA, 32, 20),
    new THREE.MeshPhysicalMaterial({ roughness: .15, clearcoat: 1, clearcoatRoughness: .05, envMapIntensity: 1.1 }), MAX);
  kulMesh.castShadow = true; kulMesh.receiveShadow = true; kulMesh.count = 0;
  // Avgränsningssfären räknas bara en gång, när kulorna ännu låg i origo.
  kulMesh.frustumCulled = false;
  kulMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(kulMesh);
  const col = new THREE.Color();
  let kulor = [], busy = false, aktiv = false, tSedan = 0, lugn = 0;
  const lyft = new Set();
  let onKula = () => {}, onAndring = () => {};
  const i_urna = () => kulor.filter(k => k.state === 'urna');
  function nyKropp(k, p) {
    const b = new CANNON.Body({ mass: .3, material: mK, shape: new CANNON.Sphere(R_KULA), linearDamping: .12, angularDamping: .3, allowSleep: true, sleepSpeedLimit: .25, sleepTimeLimit: .4 });
    b.position.set(p.x, p.y, p.z); b.isKula = true;
    b.addEventListener('collide', e => {
      const o = e.body; if (!o || (o.isKula && o.id < b.id)) return;
      const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (o.isKula) Ljud.kula(v); else Ljud.glas(v * (o.isGlas ? 1 : .6));
    });
    world.addBody(b); k.body = b; return b;
  }
  function uppdatera() {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new V3();
    kulMesh.count = kulor.length;
    kulor.forEach((k, i) => {
      const p = k.body ? k.body.position : k.pos;
      if (k.body) q.set(k.body.quaternion.x, k.body.quaternion.y, k.body.quaternion.z, k.body.quaternion.w); else q.identity();
      s.setScalar(k.skala ?? 1);
      m.compose(new V3(p.x, p.y, p.z), q, s);
      kulMesh.setMatrixAt(i, m);
    });
    kulMesh.instanceMatrix.needsUpdate = true;
  }
  function farga() {
    kulor.forEach((k, i) => kulMesh.setColorAt(i, col.set(kulfarg(k.farg).hex)));
    if (kulMesh.instanceColor) kulMesh.instanceColor.needsUpdate = true;
  }
  const koa = [];
  function laggTill(farg) {
    if (kulor.length >= MAX) return;
    const k = { farg, state: 'urna', pos: new V3(), skala: 0 };
    kulor.push(k); farga();
    koa.push(k);
  }
  function taBort(k) {
    if (k.body) { world.removeBody(k.body); k.body = null; }
    kulor = kulor.filter(x => x !== k); farga();
  }
  /** Ställ in urnans innehåll. Dragna kulor läggs tillbaka först. */
  function setInnehall(lista) {
    for (const k of kulor.filter(k => k.state !== 'urna')) taBort(k);
    for (const { key, n } of lista) {
      const har = kulor.filter(k => k.farg === key);
      if (har.length > n) {
        har.sort((a, b) => (b.body ? b.body.position.y : 0) - (a.body ? a.body.position.y : 0));
        har.slice(0, har.length - n).forEach(taBort);
      } else for (let i = har.length; i < n; i++) laggTill(key);
    }
    for (const k of kulor.slice()) if (!lista.some(l => l.key === k.farg && l.n > 0)) taBort(k);
    for (const k of kulor) if (k.body) k.body.wakeUp();
    aktiv = true; uppdatera(); onAndring(); wake();
  }
  function step(dt) {
    if (!aktiv && !koa.length && !lyft.size) return false;
    tSedan += dt;
    // häll i nya kulor en i taget
    if (koa.length && tSedan > 0.035) {
      tSedan = 0;
      const k = koa.shift();
      if (kulor.includes(k)) {
        const a = rnd() * TAU, r = rnd() * 2.0;
        const b = nyKropp(k, new V3(C.x + Math.cos(a) * r, 9.5, C.z + Math.sin(a) * r));
        b.velocity.set((rnd() - .5) * 3, -6, (rnd() - .5) * 3);
        k.skala = 1;
      }
      aktiv = true;
    }
    for (const L of lyft) {
      L.t += dt;
      const k = Math.min(1, L.t / L.dur), e = easeInOut(k);
      const mal = new V3(lerp(L.p0.x, C.x + (L.p0.x - C.x) * .25, e), lerp(L.p0.y, 9.6, e), lerp(L.p0.z, C.z + (L.p0.z - C.z) * .25, e));
      const b = L.k.body;
      b.velocity.set((mal.x - b.position.x) / dt, (mal.y - b.position.y) / dt, (mal.z - b.position.z) / dt);
      if (k >= 1) { lyft.delete(L); L.klar(); }
    }
    world.step(1 / 120, dt, 6);
    uppdatera();
    lugn = koa.length || lyft.size ? 0 : lugn + dt;
    if (!koa.length && !lyft.size && (kulor.every(k => !k.body || k.body.sleepState === CANNON.Body.SLEEPING) || lugn > 5)) {
      kulor.forEach(k => k.body && k.body.sleep()); aktiv = false; lugn = 0; return false;
    }
    return true;
  }
  stepFns.push(step);
  async function upp(k, plats, delay) {
    await sleep(delay * 1000);
    const b = k.body;
    b.wakeUp(); b.type = CANNON.Body.KINEMATIC; b.mass = 0; b.updateMassProperties();
    k.state = 'lyft'; aktiv = true; wake();
    for (const o of i_urna()) if (o.body) o.body.wakeUp();
    const p0 = new V3(b.position.x, b.position.y, b.position.z);
    await new Promise(res => lyft.add({ k, p0, t: 0, dur: 0.75 + (8 - p0.y) * 0.04, klar: res }));
    const ut = new V3(b.position.x, b.position.y, b.position.z);
    world.removeBody(b); k.body = null; k.pos.copy(ut); k.state = 'flyg';
    const mal = BRICKA(plats), mitt = ut.clone().lerp(mal, .5).add(new V3(0, 2.2, 0));
    Ljud.sus(0, .35);
    await tween(.62, e => {
      const u = 1 - e;
      k.pos.set(0, 0, 0).addScaledVector(ut, u * u).addScaledVector(mitt, 2 * u * e).addScaledVector(mal, e * e);
      uppdatera();
    }, { ease: easeInOut });
    await tween(.18, e => { k.pos.y = mal.y + Math.sin(Math.PI * e) * .22; uppdatera(); });
    Ljud.tock(7);
    k.state = 'bricka'; k.plats = plats; uppdatera();
    onKula(k.farg);
  }
  async function tillbaka(lista) {
    await Promise.all(lista.map((k, j) => (async () => {
      await sleep(j * 70);
      const p0 = k.pos.clone(), a = rnd() * TAU, r = rnd() * 1.6;
      const mal = new V3(C.x + Math.cos(a) * r, 9.8, C.z + Math.sin(a) * r), mitt = p0.clone().lerp(mal, .5).add(new V3(0, 2.5, 0));
      k.state = 'flyg';
      await tween(.5, e => { const u = 1 - e; k.pos.set(0, 0, 0).addScaledVector(p0, u * u).addScaledVector(mitt, 2 * u * e).addScaledVector(mal, e * e); uppdatera(); }, { ease: easeInOut });
      k.state = 'urna'; const b = nyKropp(k, mal); b.velocity.set(0, -4, 0); aktiv = true; wake();
    })()));
    onAndring();
  }
  async function rensaBricka() {
    const lista = kulor.filter(k => k.state === 'bricka');
    await tween(.3, e => { lista.forEach(k => { k.skala = 1 - e; k.pos.y += .02; }); uppdatera(); });
    lista.forEach(k => { k.state = 'ute'; k.skala = 0; });
    uppdatera();
  }
  async function dra(antal, ater) {
    if (busy) return false;
    busy = true;
    try {
      const pa = kulor.filter(k => k.state === 'bricka');
      if (ater && pa.length) await tillbaka(pa);
      else if (pa.length + antal > 10) await rensaBricka();
      const kvar = i_urna();
      const n = Math.min(antal, kvar.length);
      if (!n) return false;
      // Kulorna väljs likformigt bland dem som finns i urnan.
      const valda = shuffle(kvar.slice()).slice(0, n);
      const start = kulor.filter(k => k.state === 'bricka').length;
      onAndring();
      await Promise.all(valda.map((k, i) => { k.state = 'vald'; return upp(k, start + i, i * .45); }));
      return true;
    } finally { busy = false; onAndring(); }
  }
  async function laggTillbaka() {
    if (busy) return;
    busy = true;
    try {
      const ute = kulor.filter(k => k.state === 'bricka' || k.state === 'ute');
      ute.forEach(k => { if (k.state === 'ute') { k.skala = 1; k.pos.set(C.x, 11, C.z); } });
      await tillbaka(ute);
    } finally { busy = false; onAndring(); }
  }
  async function skaka() {
    if (busy) return;
    Ljud.init();
    for (const k of i_urna()) if (k.body) { k.body.wakeUp(); k.body.velocity.set((rnd() - .5) * 12, 10 + rnd() * 14, (rnd() - .5) * 12); }
    aktiv = true; wake();
    await tween(1.0, (e, k) => { const d = (1 - k); glasGrp.rotation.z = Math.sin(k * 34) * .07 * d; glasGrp.rotation.x = Math.sin(k * 27 + 1) * .05 * d; });
    glasGrp.rotation.set(0, 0, 0);
  }
  return {
    setInnehall, dra, laggTillbaka, skaka,
    get busy() { return busy; },
    iUrnan: () => i_urna().map(k => k.farg).concat(kulor.filter(k => k.state === 'vald' || k.state === 'lyft').map(k => k.farg)),
    utanfor: () => kulor.filter(k => k.state === 'bricka' || k.state === 'ute' || k.state === 'flyg').length,
    set onKula(f) { onKula = f; }, set onAndring(f) { onAndring = f; },
    klickbar: [glas],
  };
})();

// ============================================================================
// Station 4: Lyckohjul
// ============================================================================
const HJULFARGER = ['#c8324a', '#f0bf2c', '#2457a6', '#23874d', '#e0701f', '#7a4bb0', '#169aa0', '#e27aa0'];
const Hjul = (() => {
  const C = new V3(0, 9.3, -24), R = 7.4, S = 1536;
  const grp = new THREE.Group(); grp.position.copy(C); scene.add(grp);
  const rotor = new THREE.Group(); grp.add(rotor);
  const ytCanvas = mkCanvas(S, S), ytTex = texOf(ytCanvas);
  const yta = new THREE.Mesh(new THREE.CircleGeometry(R, 160), new THREE.MeshPhysicalMaterial({ map: ytTex, roughness: .42, clearcoat: .6, clearcoatRoughness: .2, envMapIntensity: .7 }));
  yta.position.z = .02; yta.receiveShadow = true; rotor.add(yta);
  const lack = new THREE.MeshPhysicalMaterial({ color: 0x6c1322, roughness: .35, clearcoat: .9, clearcoatRoughness: .12, envMapIntensity: .9 });
  const band = new THREE.Mesh(new THREE.CylinderGeometry(R + .05, R + .05, .6, 160, 1, true).rotateX(Math.PI / 2), lack);
  band.position.z = -.28; rotor.add(band);
  const bak = new THREE.Mesh(new THREE.CircleGeometry(R + .05, 96).rotateY(Math.PI), lack); bak.position.z = -.58; rotor.add(bak);
  const falg = new THREE.Mesh(new THREE.TorusGeometry(R + .02, .16, 14, 200), massingMat); falg.position.z = .03; rotor.add(falg);
  const nav = new THREE.Mesh(new THREE.CylinderGeometry(.95, 1.05, .45, 48).rotateX(Math.PI / 2), massingMat); nav.position.z = .24; rotor.add(nav);
  const navKnapp = new THREE.Mesh(new THREE.SphereGeometry(.55, 32, 16), massingMat); navKnapp.scale.z = .55; navKnapp.position.z = .46; rotor.add(navKnapp);
  const pinnar = new THREE.InstancedMesh(new THREE.CylinderGeometry(.075, .075, .62, 12).rotateX(Math.PI / 2), massingMat, 32);
  pinnar.castShadow = true; pinnar.frustumCulled = false; rotor.add(pinnar);
  for (const m of [yta, band, falg, nav]) m.castShadow = true;
  // Stativ och fast ytterring med lampor
  const ring = new THREE.Mesh(new THREE.TorusGeometry(R + .95, .38, 18, 200), lack); ring.castShadow = true; grp.add(ring);
  const ringKant = new THREE.Mesh(new THREE.TorusGeometry(R + .95, .1, 10, 200), massingMat); ringKant.position.z = .36; grp.add(ringKant);
  const NL = 40;
  const lampor = new THREE.InstancedMesh(new THREE.SphereGeometry(.17, 14, 10), new THREE.MeshBasicMaterial({ toneMapped: false }), NL);
  for (let i = 0; i < NL; i++) {
    const a = i / NL * TAU;
    lampor.setMatrixAt(i, new THREE.Matrix4().makeTranslation(Math.cos(a) * (R + .95), Math.sin(a) * (R + .95), .38));
  }
  lampor.frustumCulled = false; grp.add(lampor);
  const LAMPA_PA = new THREE.Color(1.6, 1.15, .55), LAMPA_AV = new THREE.Color(.25, .12, .05);
  function lampMonster(fn) { for (let i = 0; i < NL; i++) lampor.setColorAt(i, fn(i) ? LAMPA_PA : LAMPA_AV); lampor.instanceColor.needsUpdate = true; }
  lampMonster(() => true);
  const stativMat = traMorkMat;
  const sockel = new THREE.Mesh(new RoundedBoxGeometry(10, .9, 4.4, 3, .3), stativMat);
  sockel.position.set(0, .45 - C.y, -1.1); sockel.castShadow = sockel.receiveShadow = true; grp.add(sockel);
  for (const sx of [-1, 1]) {
    const a = new V3(sx * 3.6, .9 - C.y, -1.1), b = new V3(sx * .5, 0, -.9);
    const len = a.distanceTo(b);
    const ben = new THREE.Mesh(new THREE.BoxGeometry(.7, len, .6), stativMat);
    ben.position.copy(a).add(b).multiplyScalar(.5);
    ben.quaternion.setFromUnitVectors(new V3(0, 1, 0), b.clone().sub(a).normalize());
    ben.castShadow = true; grp.add(ben);
  }
  const axel = new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, 1.2, 20).rotateX(Math.PI / 2), massingMat); axel.position.z = -.9; grp.add(axel);
  // Klaffen som pinnarna slår mot
  const klaff = new THREE.Group(); klaff.position.set(0, R + .95, .5); grp.add(klaff);
  const klaffForm = new THREE.Shape(); klaffForm.moveTo(-.3, .1); klaffForm.lineTo(.3, .1); klaffForm.lineTo(.07, -1.62); klaffForm.quadraticCurveTo(0, -1.72, -.07, -1.62); klaffForm.closePath();
  const klaffMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(klaffForm, { depth: .12, bevelEnabled: true, bevelSize: .03, bevelThickness: .03, bevelSegments: 2 }), new THREE.MeshPhysicalMaterial({ color: 0xb8203a, roughness: .5, clearcoat: .4 }));
  klaffMesh.position.z = -.06; klaffMesh.castShadow = true; klaff.add(klaffMesh);
  const bult = new THREE.Mesh(new THREE.CylinderGeometry(.16, .16, .4, 16).rotateX(Math.PI / 2), massingMat); klaff.add(bult);

  let sektorer = [], granser = [], theta = 0, snurr = null, drag = null, onStopp = () => {};
  let klaffVinkel = 0, klaffFart = 0, senastePsi = null, omega = 0;
  const totalVikt = () => sektorer.reduce((s, x) => s + x.w, 0);
  function vinklar() {
    // sektor i går medurs från a[i] till a[i+1]; a[0] = rakt upp
    const W = totalVikt(), a = [Math.PI / 2];
    sektorer.forEach(s => a.push(a[a.length - 1] - TAU * s.w / W));
    return a;
  }
  function ritaYta() {
    const g = ytCanvas.getContext('2d'), c = S / 2, r = S / 2;
    g.clearRect(0, 0, S, S);
    g.fillStyle = '#3a0c16'; g.beginPath(); g.arc(c, c, r, 0, TAU); g.fill();
    const a = vinklar(), rs = r * .955;
    sektorer.forEach((s, i) => {
      const gr = g.createRadialGradient(c, c, r * .1, c, c, rs);
      gr.addColorStop(0, shade(s.farg, .2)); gr.addColorStop(.7, s.farg); gr.addColorStop(1, shade(s.farg, -.18));
      g.fillStyle = gr;
      g.beginPath(); g.moveTo(c, c); g.arc(c, c, rs, -a[i], -a[i + 1]); g.closePath(); g.fill();
    });
    if (sektorer.length > 1) {
      g.strokeStyle = '#e2bd62'; g.lineWidth = 7; g.lineCap = 'round';
      for (let i = 0; i < sektorer.length; i++) { g.beginPath(); g.moveTo(c, c); g.lineTo(c + Math.cos(-a[i]) * rs, c + Math.sin(-a[i]) * rs); g.stroke(); }
    }
    g.strokeStyle = '#e2bd62'; g.lineWidth = 9; g.beginPath(); g.arc(c, c, rs, 0, TAU); g.stroke();
    g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.beginPath(); g.arc(c, c, rs * .985, 0, TAU); g.stroke();
    // etiketter; 6 och 9 stryks under när båda finns, eftersom hjulet vänder dem
    const har69 = sektorer.some(s => s.text.trim() === '6') && sektorer.some(s => s.text.trim() === '9');
    sektorer.forEach((s, i) => {
      const text = s.text.trim(); if (!text) return;
      const mid = (a[i] + a[i + 1]) / 2, span = a[i] - a[i + 1], b = -mid;
      const ink = kontrast(s.farg);
      g.save(); g.translate(c, c);
      g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle';
      if (text.length <= 3) {
        const rr = rs * .74, maxW = Math.min(2 * rr * Math.sin(Math.min(span, 3) / 2) * .8, rs * .5);
        let fs = Math.min(rs * .19, maxW * (text.length === 1 ? 1.05 : .75));
        g.font = `700 ${fs}px Poppins, sans-serif`;
        while (g.measureText(text).width > maxW && fs > 14) { fs *= .92; g.font = `700 ${fs}px Poppins, sans-serif`; }
        g.rotate(b + Math.PI / 2); g.fillText(text, 0, -rr);
        if (har69 && (text === '6' || text === '9')) { const w = g.measureText(text).width; g.fillRect(-w * .45, -rr + fs * .48, w * .9, Math.max(4, fs * .08)); }
      } else {
        const len = rs * .56, hojd = 2 * rs * .62 * Math.sin(Math.min(span, 2.4) / 2) * .62;
        let fs = Math.min(rs * .14, hojd);
        g.font = `700 ${fs}px Poppins, sans-serif`;
        while (g.measureText(text).width > len && fs > 12) { fs *= .93; g.font = `700 ${fs}px Poppins, sans-serif`; }
        g.rotate(b); g.fillText(text, rs * .6, 0);
      }
      g.restore();
    });
    ytTex.needsUpdate = true;
    granser = sektorer.length > 1 ? a.slice(0, -1) : [];
    const m = new THREE.Matrix4();
    pinnar.count = granser.length;
    granser.forEach((v, i) => { m.makeTranslation(Math.cos(v) * (R - .38), Math.sin(v) * (R - .38), .32); pinnar.setMatrixAt(i, m); });
    pinnar.instanceMatrix.needsUpdate = true;
    wake();
  }
  function setSektorer(lista) { sektorer = lista.map(s => ({ ...s })); ritaYta(); }
  const psiAv = th => Math.PI / 2 - th;
  /** Index för sektorn som pekaren står i när hjulet har vinkeln th. */
  function sektorVid(th) {
    const a = vinklar(), x = (((a[0] - psiAv(th)) % TAU) + TAU) % TAU;
    const W = totalVikt(); let acc = 0;
    for (let i = 0; i < sektorer.length; i++) { acc += TAU * sektorer[i].w / W; if (x < acc) return i; }
    return sektorer.length - 1;
  }
  function sattVinkel(th, dt) {
    const psiF = psiAv(theta), psiN = psiAv(th);
    omega = dt > 0 ? (th - theta) / dt : 0;
    for (const b of granser) {
      if (Math.floor((psiF - b) / TAU) !== Math.floor((psiN - b) / TAU)) Ljud.tick(clamp(.35 + Math.abs(omega) / 9, .35, 1));
    }
    theta = th; rotor.rotation.z = th;
  }
  function klaffSteg(dt) {
    const psi = psiAv(theta);
    let kontakt = 0;
    const d0 = .06;
    for (const b of granser) {
      let d = ((psi - b) % TAU + TAU) % TAU; if (d > Math.PI) d -= TAU;
      if (Math.abs(d) < d0) { const k = 1 - Math.abs(d) / d0; if (k > Math.abs(kontakt)) kontakt = k; }
    }
    const riktning = -Math.sign(omega || 1);
    if (kontakt > 0 && Math.abs(omega) > .05) {
      const mal = riktning * kontakt * .6;
      if (Math.abs(mal) > Math.abs(klaffVinkel) || Math.sign(mal) !== Math.sign(klaffVinkel)) { klaffFart = (mal - klaffVinkel) / dt; klaffVinkel = mal; }
    } else {
      klaffFart += (-120 * klaffVinkel - 9 * klaffFart) * dt;
      klaffVinkel += klaffFart * dt;
    }
    klaff.rotation.z = klaffVinkel;
    return Math.abs(klaffVinkel) > .002 || Math.abs(klaffFart) > .01;
  }
  function step(dt, t) {
    let busy = false;
    if (snurr) {
      const k = Math.min(1, (t - snurr.t0) / (snurr.T * 1000));
      const e = 1 - Math.pow(1 - k, 3);
      sattVinkel(snurr.th0 + snurr.s * snurr.total * e, dt);
      lampMonster(i => (i + Math.floor(t / 70)) % 4 < 2);
      if (k >= 1) {
        const s = snurr; snurr = null; omega = 0;
        blinka(t);
        onStopp(s.idx);
      }
      busy = true;
    }
    if (blink) {
      const k = (t - blink) / 1300;
      if (k >= 1) { blink = 0; lampMonster(() => true); } else lampMonster(() => Math.floor(k * 8) % 2 === 0);
      busy = true;
    }
    if (klaffSteg(dt) || drag) busy = true;
    return busy;
  }
  let blink = 0;
  function blinka(t) { blink = t; Ljud.pling(); }
  stepFns.push(step);
  function snurra(riktning = -1, varv = 0) {
    if (snurr || !sektorer.length) return false;
    Ljud.init();
    // Slutvinkeln dras likformigt över varvet: P(sektor) = sektorns andel.
    const psiSlut = rnd() * TAU, thSlut = Math.PI / 2 - psiSlut;
    const delta = (((riktning * (thSlut - theta)) % TAU) + TAU) % TAU;
    const total = delta + TAU * (3 + rint(2) + varv);
    snurr = { th0: theta, s: riktning, total, T: 3.4 + total / TAU * .55, t0: performance.now(), idx: sektorVid(thSlut) };
    wake();
    return true;
  }
  // Dra i hjulet för att snurra det.
  function skarmVinkel(ev) {
    const r = canvas.getBoundingClientRect(), p = C.clone().project(camera);
    const cx = r.left + (p.x + 1) / 2 * r.width, cy = r.top + (1 - p.y) / 2 * r.height;
    return Math.atan2(-(ev.clientY - cy), ev.clientX - cx);
  }
  function dragStart(ev) {
    if (snurr) return false;
    drag = { a: skarmVinkel(ev), t: performance.now(), prov: [] };
    return true;
  }
  function dragFlytt(ev) {
    if (!drag) return;
    const a = skarmVinkel(ev), t = performance.now();
    let d = a - drag.a; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU;
    const dt = Math.max(.001, (t - drag.t) / 1000);
    sattVinkel(theta + d, dt);
    drag.prov.push({ t, w: d / dt }); drag.prov = drag.prov.filter(p => t - p.t < 90);
    drag.a = a; drag.t = t; wake();
  }
  function dragSlut() {
    if (!drag) return false;
    const pr = drag.prov, w = pr.length ? pr.reduce((s, p) => s + p.w, 0) / pr.length : 0;
    drag = null; omega = 0;
    if (Math.abs(w) > 2.5 && performance.now() - (pr.length ? pr[pr.length - 1].t : 0) < 120) {
      return snurra(Math.sign(w), clamp(Math.round(Math.abs(w) / 6), 0, 4));
    }
    return false;
  }
  return {
    setSektorer, snurra, dragStart, dragFlytt, dragSlut,
    get busy() { return !!snurr; },
    get sektorer() { return sektorer; },
    set onStopp(f) { onStopp = f; },
    klickbar: [yta, nav, navKnapp, falg],
  };
})();

// ============================================================================
// Inställningar (sparas i webbläsaren)
// ============================================================================
const HJULMALLAR = {
  lika: () => Array.from({ length: 6 }, (_, i) => ({ text: String(i + 1), farg: HJULFARGER[i], w: 1 })),
  olika: () => [{ text: 'Röd', farg: '#c8324a', w: 3 }, { text: 'Blå', farg: '#2457a6', w: 2 }, { text: 'Gul', farg: '#f0bf2c', w: 1 }],
  vinst: () => Array.from({ length: 10 }, (_, i) => i % 5 === 0 ? { text: 'Vinst', farg: '#e2ae2e', w: 1 } : { text: 'Nit', farg: i % 2 ? '#1f5e8f' : '#2b3a55', w: 1 }),
  tolv: () => Array.from({ length: 12 }, (_, i) => ({ text: String(i + 1), farg: i % 2 ? '#1f2127' : '#c8324a', w: 1 })),
};
const ALLA_VALORER = Array.from({ length: 13 }, (_, i) => i + 1);
function standardLage() {
  return {
    tarningar: { lista: [nyTarning(6, 'elfenben'), nyTarning(6, 'rod')], vy: 'summa' },
    kort: { farger: ['S', 'H', 'D', 'C'], valorer: ALLA_VALORER.slice(), jokrar: 0, antal: 1, ater: false, vy: 'farg' },
    urna: { innehall: [{ key: 'rod', n: 5 }, { key: 'bla', n: 3 }, { key: 'gul', n: 2 }], antal: 1, ater: true },
    hjul: { sektorer: HJULMALLAR.lika() },
  };
}
function lasLage() {
  const s = standardLage();
  try {
    const t = LS.get('tarningar', null);
    if (t && Array.isArray(t.lista) && t.lista.length >= 1 && t.lista.length <= 12 &&
        t.lista.every(d => [2, 4, 6, 8, 10, 12, 20].includes(d.sides) && Array.isArray(d.labels) && d.labels.length === d.sides && Array.isArray(d.sidfarg) && d.sidfarg.length === d.sides)) {
      s.tarningar = { lista: t.lista.map(d => ({ sides: d.sides, farg: tfarg(d.farg).key, labels: d.labels.map(l => String(l).slice(0, 6)), sidfarg: d.sidfarg.map(x => (typeof x === 'string' && /^#[0-9a-f]{6}$/i.test(x)) ? x : null) })), vy: t.vy === 'varje' ? 'varje' : 'summa' };
    }
    const k = LS.get('kort', null);
    if (k && Array.isArray(k.farger) && Array.isArray(k.valorer)) {
      s.kort = {
        farger: k.farger.filter(f => 'SHDC'.includes(f)), valorer: k.valorer.filter(v => v >= 1 && v <= 13),
        jokrar: clamp(k.jokrar | 0, 0, 2), antal: clamp(k.antal | 0, 1, 10), ater: !!k.ater, vy: ['farg', 'valor', 'rodsvart'].includes(k.vy) ? k.vy : 'farg',
      };
      if (!s.kort.farger.length || !s.kort.valorer.length) { s.kort.farger = ['S', 'H', 'D', 'C']; s.kort.valorer = ALLA_VALORER.slice(); }
    }
    const u = LS.get('urna', null);
    if (u && Array.isArray(u.innehall)) {
      const inn = u.innehall.filter(x => KULFARGER.some(f => f.key === x.key)).map(x => ({ key: x.key, n: clamp(x.n | 0, 0, 30) }));
      if (inn.length && inn.reduce((a, x) => a + x.n, 0) > 0) s.urna = { innehall: inn, antal: clamp(u.antal | 0, 1, 10), ater: u.ater !== false };
    }
    const h = LS.get('hjul', null);
    if (h && Array.isArray(h.sektorer) && h.sektorer.length >= 1 && h.sektorer.length <= 24) {
      s.hjul = { sektorer: h.sektorer.map((x, i) => ({ text: String(x.text ?? '').slice(0, 14), farg: /^#[0-9a-f]{6}$/i.test(x.farg) ? x.farg : HJULFARGER[i % 8], w: clamp(x.w | 0, 1, 12) })) };
    }
  } catch (e) { /* trasigt sparat läge: använd standard */ }
  return s;
}
const ST = lasLage();
let spTimer = 0;
function spara() {
  clearTimeout(spTimer);
  spTimer = setTimeout(() => { LS.set('mode', mode); LS.set('tarningar', ST.tarningar); LS.set('kort', ST.kort); LS.set('urna', ST.urna); LS.set('hjul', ST.hjul); }, 300);
}

// ============================================================================
// Statistik och teoretiska sannolikheter
// ============================================================================
const STAT = {};
function nollstall(m) {
  STAT[m] = { n: 0, obs: 0, c: { summa: new Map(), varje: new Map(), farg: new Map(), valor: new Map(), rodsvart: new Map(), kula: new Map(), sektor: new Map() }, nVarje: 0, senaste: [] };
}
['tarningar', 'kort', 'urna', 'hjul'].forEach(nollstall);
const inc = (m, k) => m.set(k, (m.get(k) || 0) + 1);
const talNyckel = v => { const r = Math.round(v * 1e6) / 1e6; return String(r).replace('.', ',').replace('-', '−'); };
const allaNumeriska = () => ST.tarningar.lista.every(d => d.labels.every(l => !isNaN(parseTal(l))));
function tarningVy() { return ST.tarningar.lista.length > 1 && allaNumeriska() && ST.tarningar.vy === 'summa' ? 'summa' : 'varje'; }
const HJUL_NYCKEL = (s, i) => s.text.trim() || 'Sektor ' + (i + 1);

/** Kategorierna i diagrammet: { key, label, num, den, farg? } i visningsordning. */
function kategorier() {
  if (mode === 'tarningar') {
    const lista = ST.tarningar.lista;
    if (tarningVy() === 'summa') {
      let dist = new Map([[0, 1]]), den = 1;
      for (const d of lista) {
        const nd = new Map();
        for (const [s, w] of dist) for (const l of d.labels) { const v = Math.round((s + parseTal(l)) * 1e6) / 1e6; nd.set(v, (nd.get(v) || 0) + w); }
        dist = nd; den *= d.sides;
      }
      return [...dist].sort((a, b) => a[0] - b[0]).map(([v, w]) => ({ key: talNyckel(v), label: talNyckel(v), num: w, den }));
    }
    const L = lista.map(d => d.sides).reduce(lcm, 1), map = new Map(), farg = new Map();
    for (const d of lista) d.labels.forEach((l, i) => { const u = utfallAv(d, i); map.set(u.key, (map.get(u.key) || 0) + L / d.sides); if (u.farg && !farg.has(u.key)) farg.set(u.key, u.farg); });
    let arr = [...map].map(([k, num]) => ({ key: k, label: k, num, den: L * lista.length, farg: farg.get(k) }));
    if (arr.every(a => !isNaN(parseTal(a.key)))) arr.sort((a, b) => parseTal(a.key) - parseTal(b.key));
    return arr;
  }
  if (mode === 'kort') {
    const full = Kortlek.full, N = full.length, vy = ST.kort.vy;
    const cnt = new Map();
    const nyckel = id => vy === 'farg' ? (kortFarg(id) || 'J') : vy === 'valor' ? (id[0] === 'J' ? 'J' : String(kortValor(id))) : (id[0] === 'J' ? 'J' : ROD(id[0]) ? 'rod' : 'svart');
    full.forEach(id => inc(cnt, nyckel(id)));
    const ordning = vy === 'farg' ? ['S', 'H', 'D', 'C', 'J'] : vy === 'valor' ? ALLA_VALORER.map(String).concat('J') : ['rod', 'svart', 'J'];
    const lbl = k => k === 'J' ? 'Joker' : vy === 'farg' ? FARGSYM[k] : vy === 'valor' ? (VALORINDEX[k] || k) : (k === 'rod' ? 'Röd' : 'Svart');
    return ordning.filter(k => cnt.has(k)).map(k => ({ key: k, label: lbl(k), num: cnt.get(k), den: N, rod: k === 'H' || k === 'D' || k === 'rod' }));
  }
  if (mode === 'urna') {
    const inn = ST.urna.innehall.filter(x => x.n > 0), N = inn.reduce((a, x) => a + x.n, 0);
    return inn.map(x => ({ key: x.key, label: kulfarg(x.key).namn, num: x.n, den: N, farg: kulfarg(x.key).hex }));
  }
  const sek = ST.hjul.sektorer, W = sek.reduce((a, s) => a + s.w, 0), map = new Map();
  sek.forEach((s, i) => { const k = HJUL_NYCKEL(s, i); if (!map.has(k)) map.set(k, { key: k, label: k, num: 0, den: W, farg: s.farg }); map.get(k).num += s.w; });
  return [...map.values()];
}
function aktuellaRakningar() {
  const S = STAT[mode];
  if (mode === 'tarningar') return tarningVy() === 'summa' ? { c: S.c.summa, obs: S.n } : { c: S.c.varje, obs: S.nVarje };
  if (mode === 'kort') return { c: S.c[ST.kort.vy], obs: S.n };
  if (mode === 'urna') return { c: S.c.kula, obs: S.n };
  return { c: S.c.sektor, obs: S.n };
}
function registrera(m, data, tyst = false) {
  const S = STAT[m];
  let chip = '', key = null;
  if (m === 'tarningar') {
    S.n++;
    data.forEach(u => inc(S.c.varje, u.key)); S.nVarje += data.length;
    if (data.every(u => !isNaN(u.num))) { const sum = data.reduce((a, u) => a + u.num, 0); inc(S.c.summa, talNyckel(sum)); if (tarningVy() === 'summa') key = talNyckel(sum); }
    if (!key && data.length === 1) key = data[0].key;
    chip = tarningVy() === 'summa' ? esc(talNyckel(data.reduce((a, u) => a + u.num, 0))) : data.map(u => (u.farg ? `<i style="background:${u.farg}"></i>` : '') + esc(u.text)).join(' · ');
  } else if (m === 'kort') {
    S.n++;
    const id = data, f = kortFarg(id) || 'J';
    inc(S.c.farg, f); inc(S.c.valor, id[0] === 'J' ? 'J' : String(kortValor(id))); inc(S.c.rodsvart, id[0] === 'J' ? 'J' : ROD(id[0]) ? 'rod' : 'svart');
    key = ST.kort.vy === 'farg' ? f : ST.kort.vy === 'valor' ? (id[0] === 'J' ? 'J' : String(kortValor(id))) : (id[0] === 'J' ? 'J' : ROD(id[0]) ? 'rod' : 'svart');
    chip = id[0] === 'J' ? 'Joker' : `<span style="color:${ROD(id[0]) ? '#c0283a' : 'inherit'}">${FARGSYM[id[0]]}</span>${VALORINDEX[kortValor(id)] || kortValor(id)}`;
  } else if (m === 'urna') {
    S.n++; inc(S.c.kula, data); key = data;
    chip = `<i style="background:${kulfarg(data).hex}"></i>${kulfarg(data).namn}`;
  } else {
    S.n++;
    const s = ST.hjul.sektorer[data]; key = HJUL_NYCKEL(s, data); inc(S.c.sektor, key);
    chip = `<i style="background:${s.farg}"></i>${esc(key)}`;
  }
  if (!tyst) { S.senaste.unshift(chip); S.senaste.length = Math.min(S.senaste.length, 14); if (m === mode) UI.valdKey = key; }
}

// ============================================================================
// Snabbsimulering: utfallen dras direkt ur modellen, utan 3D.
// ============================================================================
function snabb(n) {
  const m = mode;
  for (let i = 0; i < n; i++) {
    if (m === 'tarningar') registrera(m, ST.tarningar.lista.map(d => utfallAv(d, rint(d.sides))), true);
    else if (m === 'kort') { const f = Kortlek.full; registrera(m, f[rint(f.length)], true); }
    else if (m === 'urna') {
      const inn = ST.urna.innehall.filter(x => x.n > 0), N = inn.reduce((a, x) => a + x.n, 0);
      let r = rint(N); for (const x of inn) { if (r < x.n) { registrera(m, x.key, true); break; } r -= x.n; }
    } else {
      const sek = ST.hjul.sektorer, W = sek.reduce((a, s) => a + s.w, 0);
      let r = rnd() * W; for (let j = 0; j < sek.length; j++) { if (r < sek[j].w) { registrera(m, j, true); break; } r -= sek[j].w; }
    }
  }
  STAT[m].senaste.unshift(`+${fmtInt(n)}`); STAT[m].senaste.length = Math.min(STAT[m].senaste.length, 14);
  renderResultat();
}

// ============================================================================
// Gränssnittet
// ============================================================================
const UI = { sel: -1, valdKey: null };
const settingsEl = $('#settings'), resultsEl = $('#results'), utfallEl = $('#utfall');
const goBtn = $('#goBtn'), goTxt = $('#goTxt'), subGo = $('#subGo');
const X_IKON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
function stepper(act, val, min, max, extra = '') {
  return `<span class="stepper"><button type="button" data-act="${act}" data-d="-1" ${extra} ${val <= min ? 'disabled' : ''} aria-label="Minska">−</button><output>${val}</output><button type="button" data-act="${act}" data-d="1" ${extra} ${val >= max ? 'disabled' : ''} aria-label="Öka">+</button></span>`;
}
const tgl = (act, on, text) => `<label class="tgl"><span>${text}</span><input type="checkbox" data-act="${act}" ${on ? 'checked' : ''}><span class="sw"></span></label>`;
const sidorNamn = s => s === 2 ? 'Mynt' : s + ' sidor';

function renderSettings() {
  let h = '';
  if (mode === 'tarningar') {
    const L = ST.tarningar.lista, alla = L.every(d => d.sides === L[0].sides) ? L[0].sides : 0;
    h += `<div class="grp"><div class="grp-h"><span class="eyebrow">Tärningar</span></div>
      <div class="row"><b>Antal</b>${stepper('t-antal', L.length, 1, 12)}</div>
      <div class="row" style="margin-top:12px"><b>Sort för alla</b></div>
      <div class="seg">${[2, 4, 6, 8, 10, 12, 20].map(s => `<button type="button" data-act="t-typ" data-v="${s}" aria-pressed="${alla === s}">${s === 2 ? 'Mynt' : s}</button>`).join('')}</div>
      <p class="note">Siffrorna är antalet sidor. Klicka på en tärning nedan för att göra en specialtärning.</p>
      <div class="chips" style="margin-top:10px">${L.map((d, i) => { const F = tfarg(d.farg); return `<button type="button" class="chip" data-act="t-chip" data-i="${i}" aria-pressed="${UI.sel === i}"><i style="background:${d.sides === 2 ? '#c4c8cd' : F.bas};color:${d.sides === 2 ? '#222' : F.blakk}">${d.sides === 2 ? 'M' : d.sides}</i>${d.sides === 2 ? 'Mynt' : 'Tärning'} ${i + 1}${arStandard(d) ? '' : '*'}</button>`; }).join('')}</div>`;
    if (UI.sel >= 0 && UI.sel < L.length) {
      const d = L[UI.sel], farger = d.sides !== 2 && d.sides !== 4;
      h += `<div class="editor"><h3>${d.sides === 2 ? 'Mynt' : 'Tärning'} ${UI.sel + 1}</h3>
        <div class="seg">${[2, 4, 6, 8, 10, 12, 20].map(s => `<button type="button" data-act="t-sidor" data-v="${s}" aria-pressed="${d.sides === s}">${s === 2 ? 'Mynt' : s}</button>`).join('')}</div>
        ${d.sides === 2 ? '' : `<div class="row" style="margin-top:10px"><b>Färg</b></div><div class="swatches">${TFARGER.map(F => `<button type="button" class="swatch" data-act="t-farg" data-v="${F.key}" style="background:${F.bas}" title="${F.namn}" aria-label="${F.namn}" aria-pressed="${d.farg === F.key}"></button>`).join('')}</div>`}
        <div class="row" style="margin-top:10px"><b>${d.sides === 4 ? 'Hörnen' : 'Sidorna'}</b></div>
        <div class="faces">${d.labels.map((l, i) => `<label class="face"><small>${i + 1}</small><input type="text" maxlength="6" value="${esc(l)}" data-inp="t-lbl" data-i="${i}" aria-label="Sida ${i + 1}">${farger ? `<button type="button" data-act="t-sidfarg" data-i="${i}" title="Byt färg på sidan" aria-label="Byt färg på sida ${i + 1}" style="background:${d.sidfarg[i] || tfarg(d.farg).bas}"></button>` : ''}</label>`).join('')}</div>
        <div class="btns"><button type="button" class="btn liten" data-act="t-std">${d.sides === 2 ? 'Krona och klave' : 'Siffror 1–' + d.sides}</button>${farger && d.sides <= 8 ? '<button type="button" class="btn liten" data-act="t-fargtarning">Färgtärning</button>' : ''}</div>
        <p class="note">${d.sides === 4 ? 'På en tetraeder läses talet i hörnet som pekar uppåt.' : farger ? 'Lämna en sida tom och ge den en färg för att göra en färgtärning.' : 'Skriv vad som ska stå på myntets två sidor.'}</p></div>`;
    }
    h += `</div>`;
  } else if (mode === 'kort') {
    const K = ST.kort;
    h += `<div class="grp"><div class="grp-h"><span class="eyebrow">Kortleken</span></div>
      <div class="row"><b>Färger</b></div>
      <div class="seg suits">${['S', 'H', 'D', 'C'].map(f => `<button type="button" class="${ROD(f) ? 'rod' : ''}" data-act="k-farg" data-v="${f}" aria-pressed="${K.farger.includes(f)}" title="${FARGNAMN[f]}" aria-label="${FARGNAMN[f]}">${FARGSYM[f]}</button>`).join('')}</div>
      <div class="row" style="margin-top:12px"><b>Valörer</b></div>
      <div class="seg ranks">${ALLA_VALORER.map(v => `<button type="button" data-act="k-valor" data-v="${v}" aria-pressed="${K.valorer.includes(v)}" title="${VALORNAMN[v] || v}">${VALORINDEX[v] || v}</button>`).join('')}</div>
      <div class="btns"><button type="button" class="btn liten" data-act="k-valorer" data-v="alla">Alla</button><button type="button" class="btn liten" data-act="k-valorer" data-v="kladda">Bara klädda kort</button><button type="button" class="btn liten" data-act="k-valorer" data-v="siffror">Bara 2–10</button></div>
      <div class="row" style="margin-top:12px"><b>Jokrar</b>${stepper('k-jokrar', K.jokrar, 0, 2)}</div>
      <p class="note">E är ess, Kn knekt, D dam och K kung. Leken har ${Kortlek.full.length} kort.</p></div>
      <div class="grp"><div class="grp-h"><span class="eyebrow">Dragning</span></div>
      <div class="row"><b>Kort per dragning</b>${stepper('k-antal', K.antal, 1, 10)}</div>
      ${tgl('k-ater', K.ater, 'Lägg tillbaka korten före nästa dragning')}
      <div class="btns"><button type="button" class="btn" data-act="k-blanda">Blanda leken</button><button type="button" class="btn" data-act="k-samla">Samla ihop korten</button></div>
      <p class="note">Kvar i leken: <b id="kvarLek">${Kortlek.lek.length}</b> kort.</p></div>`;
  } else if (mode === 'urna') {
    const U = ST.urna, tot = U.innehall.reduce((a, x) => a + x.n, 0);
    const lediga = KULFARGER.filter(f => !U.innehall.some(x => x.key === f.key));
    h += `<div class="grp"><div class="grp-h"><span class="eyebrow">Kulor i urnan</span></div>
      <div class="lista">${U.innehall.map(x => `<div class="lrad"><span class="dot" style="background:${kulfarg(x.key).hex}"></span><span class="namn">${kulfarg(x.key).namn}</span>${stepper('u-n', x.n, 0, 30, `data-k="${x.key}"`)}<button type="button" class="x" data-act="u-bort" data-k="${x.key}" aria-label="Ta bort ${kulfarg(x.key).namn.toLowerCase()}" ${U.innehall.length <= 1 ? 'disabled' : ''}>${X_IKON}</button></div>`).join('')}</div>
      ${lediga.length ? `<div class="row" style="margin-top:10px"><b>Lägg till färg</b></div><div class="addcol">${lediga.map(f => `<button type="button" data-act="u-ny" data-k="${f.key}" style="background:${f.hex}" title="${f.namn}" aria-label="Lägg till ${f.namn.toLowerCase()}"></button>`).join('')}</div>` : ''}
      <p class="note">Totalt ${tot} ${tot === 1 ? 'kula' : 'kulor'}, högst 60.</p></div>
      <div class="grp"><div class="grp-h"><span class="eyebrow">Dragning</span></div>
      <div class="row"><b>Kulor per dragning</b>${stepper('u-antal', U.antal, 1, 10)}</div>
      ${tgl('u-ater', U.ater, 'Lägg tillbaka kulorna före nästa dragning')}
      <div class="btns"><button type="button" class="btn" data-act="u-skaka">Skaka urnan</button><button type="button" class="btn" data-act="u-tillbaka">Lägg tillbaka alla</button></div></div>`;
  } else {
    const S = ST.hjul.sektorer, W = S.reduce((a, s) => a + s.w, 0);
    h += `<div class="grp"><div class="grp-h"><span class="eyebrow">Sektorer</span></div>
      <div class="lista">${S.map((s, i) => `<div class="lrad"><input type="color" class="farg" value="${s.farg}" data-inp="h-farg" data-i="${i}" aria-label="Färg på sektor ${i + 1}"><input type="text" maxlength="14" value="${esc(s.text)}" data-inp="h-text" data-i="${i}" placeholder="Sektor ${i + 1}" aria-label="Text i sektor ${i + 1}">${stepper('h-w', s.w, 1, 12, `data-i="${i}"`)}<button type="button" class="x" data-act="h-bort" data-i="${i}" aria-label="Ta bort sektor ${i + 1}" ${S.length <= 1 ? 'disabled' : ''}>${X_IKON}</button></div>`).join('')}</div>
      <div class="btns"><button type="button" class="btn" data-act="h-ny" ${S.length >= 24 ? 'disabled' : ''}>Lägg till sektor</button></div>
      <p class="note">Talet till höger är sektorns storlek. En sektor med storleken 2 är dubbelt så stor som en med storleken 1. Hjulet är ${W} ${W === 1 ? 'del' : 'delar'} runt.</p></div>
      <div class="grp"><div class="grp-h"><span class="eyebrow">Färdiga hjul</span></div>
      <div class="btns"><button type="button" class="btn liten" data-act="h-mall" data-v="lika">Sex lika stora</button><button type="button" class="btn liten" data-act="h-mall" data-v="olika">Olika stora</button><button type="button" class="btn liten" data-act="h-mall" data-v="vinst">Vinst eller nit</button><button type="button" class="btn liten" data-act="h-mall" data-v="tolv">Tolv sektorer</button></div>
      <p class="note">Snurra med knappen, eller ta tag i hjulet och dra.</p></div>`;
  }
  settingsEl.innerHTML = h;
}

const ENHET = { tarningar: ['kast', 'kast'], kort: ['draget kort', 'dragna kort'], urna: ['dragen kula', 'dragna kulor'], hjul: ['snurr', 'snurr'] };
function renderResultat() {
  const S = STAT[mode];
  const vyer = mode === 'tarningar' && ST.tarningar.lista.length > 1 && allaNumeriska()
    ? [['summa', 'Summa'], ['varje', 'Varje tärning']]
    : mode === 'kort' ? [['farg', 'Färg'], ['valor', 'Valör'], ['rodsvart', 'Röd eller svart']] : null;
  const aktivVy = mode === 'tarningar' ? tarningVy() : mode === 'kort' ? ST.kort.vy : null;
  resultsEl.innerHTML = `
    <div class="grp-h"><span class="eyebrow">Senaste utfall</span><button type="button" class="btn liten" data-act="noll" ${S.n ? '' : 'disabled'}>Nollställ</button></div>
    <div class="res-last">${S.senaste.length ? S.senaste.map(c => `<span>${c}</span>`).join('') : '<span class="tom">Inga försök ännu.</span>'}</div>
    <div class="antal"><b>${fmtInt(S.n)}</b><span>${S.n === 1 ? ENHET[mode][0] : ENHET[mode][1]}</span></div>
    ${vyer ? `<div class="seg" style="margin-bottom:6px">${vyer.map(([k, t]) => `<button type="button" data-act="vy" data-v="${k}" aria-pressed="${aktivVy === k}">${t}</button>`).join('')}</div>` : ''}
    <div class="chartwrap"><svg id="chart" role="img" aria-label="Stapeldiagram över relativ frekvens och sannolikhet"></svg></div>
    <div class="legend"><span><i class="lb"></i>Relativ frekvens</span><span><i class="lt"></i>Sannolikhet</span></div>
    <div class="info" id="info"></div>
    <div class="grp"><div class="grp-h"><span class="eyebrow">Simulera snabbt</span></div>
      <div class="quick">${[10, 100, 1000].map(n => `<button type="button" class="btn" data-act="snabb" data-v="${n}">${fmtInt(n)}</button>`).join('')}</div>
      <p class="note">${mode === 'kort' ? 'Varje försök dras ur hela leken, som om kortet lades tillbaka.' : mode === 'urna' ? 'Varje försök dras ur den fulla urnan, som om kulan lades tillbaka.' : 'Utfallen slumpas direkt, utan animering.'}</p></div>
    <div class="grp nasta" id="nasta" ${mode === 'kort' || mode === 'urna' ? '' : 'hidden'}></div>`;
  ritaDiagram();
  renderNasta();
}
let visade = new Map();
function ritaDiagram() {
  const svg = $('#chart'); if (!svg) return;
  const kat = kategorier(), { c, obs } = aktuellaRakningar();
  const W = Math.max(200, svg.clientWidth || 270), H = 190, pl = 34, pr = 4, pt = 8, pb = 28;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const n = kat.length, bw = (W - pl - pr) / Math.max(n, 1);
  const pMax = Math.max(...kat.map(k => k.num / k.den), 0), fMax = obs ? Math.max(...kat.map(k => (c.get(k.key) || 0) / obs), 0) : 0;
  const raw = Math.max(pMax, fMax, 0.01) * 1.1;
  const steg = [0.01, 0.02, 0.025, 0.05, 0.1, 0.2, 0.25, 0.5, 1].find(s => raw / s <= 4) || 1;
  const ymax = Math.min(1, Math.ceil(raw / steg) * steg) || 1;
  const Y = v => pt + (H - pt - pb) * (1 - v / ymax);
  let s = '';
  for (let v = 0; v <= ymax + 1e-9; v += steg) {
    s += `<line class="grid" x1="${pl}" x2="${W - pr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ytxt" x="${pl - 5}" y="${Y(v) + 3}" text-anchor="end">${fmt(v, steg < .05 ? 3 : steg < .1 ? 2 : 1)}</text>`;
  }
  const g = Math.min(bw * .18, 6), vart = Math.max(1, Math.ceil(n / Math.floor((W - pl) / 26)));
  kat.forEach((k, i) => {
    const x = pl + i * bw, f = obs ? (c.get(k.key) || 0) / obs : 0, p = k.num / k.den;
    const hl = UI.valdKey === k.key;
    s += `<rect class="bar${hl ? ' hl' : ''}" data-k="${esc(k.key)}" x="${x + g}" width="${Math.max(1, bw - 2 * g)}" y="${Y(0)}" height="0" rx="${Math.min(3, bw / 6)}"/>`;
    s += `<line class="teori" x1="${x + g * .4}" x2="${x + bw - g * .4}" y1="${Y(p)}" y2="${Y(p)}"/>`;
    if (i % vart === 0) {
      if (k.farg) s += `<circle cx="${x + bw / 2}" cy="${H - pb + 9}" r="4.5" fill="${k.farg}" stroke="rgba(0,0,0,.2)"/>`;
      const t = k.label.length > 6 && n > 3 ? k.label.slice(0, 5) + '…' : k.label;
      s += `<text x="${x + bw / 2}" y="${H - pb + (k.farg ? 24 : 15)}" text-anchor="middle" ${k.rod ? 'style="fill:#c0283a"' : ''} ${hl ? 'font-weight="700"' : ''}>${esc(t)}</text>`;
    }
    s += `<rect class="hit" data-k="${esc(k.key)}" x="${x}" y="${pt}" width="${bw}" height="${H - pt - pb + 24}"/>`;
  });
  s += `<line class="axel" x1="${pl}" x2="${W - pr}" y1="${Y(0)}" y2="${Y(0)}"/>`;
  svg.innerHTML = s;
  // staplarna växer mjukt från förra höjden
  const mal = new Map(kat.map(k => [k.key, obs ? (c.get(k.key) || 0) / obs : 0]));
  const fran = visade; visade = mal;
  const bars = [...svg.querySelectorAll('rect.bar')];
  const t0 = performance.now();
  const anim = t => {
    const e = easeOut(Math.min(1, (t - t0) / 320));
    bars.forEach(b => { const k = b.getAttribute('data-k'), v = lerp(fran.get(k) || 0, mal.get(k) || 0, e); b.setAttribute('y', Y(v)); b.setAttribute('height', Math.max(0, Y(0) - Y(v))); });
    if (e < 1) requestAnimationFrame(anim);
  };
  requestAnimationFrame(anim);
  renderInfo();
}
function renderInfo() {
  const el = $('#info'); if (!el) return;
  const kat = kategorier(), { c, obs } = aktuellaRakningar();
  const k = kat.find(x => x.key === UI.valdKey);
  if (!k) { el.innerHTML = '<span class="tom">Klicka på en stapel för att se den relativa frekvensen och sannolikheten som bråk och decimaltal.</span>'; return; }
  const f = c.get(k.key) || 0, p = k.num / k.den;
  const namn = mode === 'tarningar' ? (tarningVy() === 'summa' ? 'Summan ' + esc(k.label) : 'Utfallet ' + esc(k.label))
    : mode === 'kort' ? (k.key === 'J' ? 'Joker' : ST.kort.vy === 'farg' ? FARGNAMN[k.key][0].toUpperCase() + FARGNAMN[k.key].slice(1) : ST.kort.vy === 'valor' ? (VALORNAMN[k.key] ? VALORNAMN[k.key][0].toUpperCase() + VALORNAMN[k.key].slice(1) : 'Valören ' + k.key) : (k.key === 'rod' ? 'Rött kort' : 'Svart kort'))
    : mode === 'urna' ? esc(k.label) + ' kula' : esc(k.label);
  el.innerHTML = `<b>${namn}</b><br>Relativ frekvens: ${obs ? `${fracHtml(f, obs)}${f === 0 || f === obs ? '' : ' ≈ ' + fmt(f / obs, 3)}` : 'inga försök ännu'}<br>Sannolikhet: ${fracHtml(k.num, k.den)}${Number.isInteger(k.num / k.den) ? '' : ' ≈ ' + fmt(p, 3)}`;
}
function renderNasta() {
  const el = $('#nasta'); if (!el || el.hidden) return;
  if (mode === 'kort') {
    const bas = ST.kort.ater ? Kortlek.full : Kortlek.lek, N = bas.length;
    if (!N) { el.innerHTML = '<div class="grp-h"><span class="eyebrow">Inför nästa kort</span></div><p class="note">Leken är slut. Samla ihop korten för att fortsätta.</p>'; return; }
    const rader = [];
    for (const f of ['S', 'H', 'D', 'C']) { if (!Kortlek.full.some(id => id[0] === f)) continue; const n = bas.filter(id => id[0] === f).length; rader.push([`<span style="color:${ROD(f) ? '#c0283a' : 'inherit'}">${FARGSYM[f]}</span> ${FARGNAMN[f][0].toUpperCase() + FARGNAMN[f].slice(1)}`, n]); }
    if (Kortlek.full.some(id => id[0] === 'H' || id[0] === 'D')) rader.push(['Rött kort', bas.filter(id => id[0] === 'H' || id[0] === 'D').length]);
    if (Kortlek.full.some(id => kortValor(id) === 1)) rader.push(['Ess', bas.filter(id => kortValor(id) === 1).length]);
    if (Kortlek.full.some(id => kortValor(id) >= 11)) rader.push(['Klätt kort', bas.filter(id => kortValor(id) >= 11).length]);
    if (Kortlek.full.some(id => id[0] === 'J')) rader.push(['Joker', bas.filter(id => id[0] === 'J').length]);
    el.innerHTML = `<div class="grp-h"><span class="eyebrow">Sannolikhet inför nästa kort</span></div>
      <p class="note" style="margin:0 0 6px">${ST.kort.ater ? 'Korten läggs tillbaka, så hela leken är med:' : 'Kvar i leken:'} ${N} kort.</p>
      <table>${rader.map(([t, n]) => `<tr><td>${t}</td><td>${fracHtml(n, N)}<span class="dec">≈ ${fmt(n / N, 3)}</span></td></tr>`).join('')}</table>`;
  } else if (mode === 'urna') {
    const inne = ST.urna.ater ? ST.urna.innehall.flatMap(x => Array(x.n).fill(x.key)) : Urna.iUrnan(), N = inne.length;
    if (!N) { el.innerHTML = '<div class="grp-h"><span class="eyebrow">Inför nästa kula</span></div><p class="note">Urnan är tom. Lägg tillbaka kulorna för att fortsätta.</p>'; return; }
    el.innerHTML = `<div class="grp-h"><span class="eyebrow">Sannolikhet inför nästa kula</span></div>
      <p class="note" style="margin:0 0 6px">${ST.urna.ater ? 'Kulorna läggs tillbaka, så alla är med:' : 'Kvar i urnan:'} ${N} ${N === 1 ? 'kula' : 'kulor'}.</p>
      <table>${ST.urna.innehall.filter(x => x.n > 0).map(x => { const n = inne.filter(k => k === x.key).length; return `<tr><td><i style="background:${kulfarg(x.key).hex}"></i>${kulfarg(x.key).namn}</td><td>${fracHtml(n, N)}<span class="dec">≈ ${fmt(n / N, 3)}</span></td></tr>`; }).join('')}</table>`;
  }
}
function uppdateraKnapp() {
  let t = '', av = false, sub = null;
  if (mode === 'tarningar') {
    const L = ST.tarningar.lista, mynt = L.every(d => d.sides === 2);
    t = mynt ? 'Singla slant' : L.length === 1 ? 'Kasta tärningen' : L.some(d => d.sides === 2) ? 'Kasta' : 'Kasta tärningarna';
    av = Tarningar.busy;
  } else if (mode === 'kort') {
    const n = ST.kort.antal;
    const kvar = ST.kort.ater ? Kortlek.full.length : Kortlek.lek.length;
    t = kvar ? (n === 1 ? 'Dra ett kort' : `Dra ${n} kort`) : 'Leken är slut';
    av = Kortlek.busy || !kvar;
    if (Kortlek.bord.length || Kortlek.hog.length) sub = ['k-samla', 'Samla ihop'];
  } else if (mode === 'urna') {
    const n = ST.urna.antal, kvar = ST.urna.ater ? 1 : Urna.iUrnan().length;
    t = kvar ? (n === 1 ? 'Dra en kula' : `Dra ${n} kulor`) : 'Urnan är tom';
    av = Urna.busy || !kvar;
    sub = kvar ? ['u-skaka', 'Skaka'] : ['u-tillbaka', 'Lägg tillbaka'];
  } else {
    t = 'Snurra hjulet'; av = Hjul.busy;
  }
  goTxt.textContent = t; goBtn.disabled = av && !!renderer;
  subGo.hidden = !sub || !renderer;
  if (sub) { subGo.textContent = sub[1]; subGo.dataset.act = sub[0]; subGo.disabled = av; }
}
function visaUtfall(html) { utfallEl.innerHTML = html; utfallEl.classList.add('on'); }
function doljUtfall() { utfallEl.classList.remove('on'); }

// ---- Utfall från scenen ----
Tarningar.onResult = utf => {
  registrera('tarningar', utf);
  if (utf.length === 1) visaUtfall(`<span class="u-lbl">${ST.tarningar.lista[0].sides === 2 ? 'Myntet visar' : 'Utfall'}</span><span class="u-val">${esc(utf[0].text)}</span>`);
  else {
    const chips = utf.map(u => `<span class="u-chip">${u.farg ? `<i style="background:${u.farg}"></i>` : ''}${esc(u.text)}</span>`).join('');
    const sum = utf.every(u => !isNaN(u.num)) ? `<span class="u-sum"><small>Summa</small>${esc(talNyckel(utf.reduce((a, u) => a + u.num, 0)))}</span>` : '';
    visaUtfall(`<span class="u-list">${chips}</span>${sum}`);
  }
  if (mode === 'tarningar') { renderResultat(); uppdateraKnapp(); }
};
let kortOmgang = [];
Kortlek.onKort = id => {
  registrera('kort', id);
  kortOmgang.push(id);
  visaUtfall(`<span class="u-list">${kortOmgang.map(k => `<span class="u-chip"><span class="${k[0] === 'H' || k[0] === 'D' ? 'rod' : ''}">${k[0] === 'J' ? '' : FARGSYM[k[0]]}</span>${kortNamn(k)}</span>`).join('')}</span>`);
  if (mode === 'kort') renderResultat();
};
Kortlek.onAndring = () => { if (mode === 'kort') { uppdateraKnapp(); renderNasta(); const kv = $('#kvarLek'); if (kv) kv.textContent = Kortlek.lek.length; } };
let kulOmgang = [];
Urna.onKula = key => {
  registrera('urna', key);
  kulOmgang.push(key);
  visaUtfall(`<span class="u-list">${kulOmgang.map(k => `<span class="u-chip"><i style="background:${kulfarg(k).hex}"></i>${kulfarg(k).namn}</span>`).join('')}</span>`);
  if (mode === 'urna') renderResultat();
};
Urna.onAndring = () => { if (mode === 'urna') { uppdateraKnapp(); renderNasta(); } };
Hjul.onStopp = idx => {
  registrera('hjul', idx);
  const s = ST.hjul.sektorer[idx];
  visaUtfall(`<span class="u-lbl">Hjulet stannade på</span><span class="u-chip" style="font-size:20px"><i style="background:${s.farg};width:16px;height:16px"></i>${esc(HJUL_NYCKEL(s, idx))}</span>`);
  if (mode === 'hjul') { renderResultat(); uppdateraKnapp(); }
};

// ---- Försöket ----
async function forsok() {
  Ljud.init();
  if (!renderer) { snabb(1); return; }
  if (mode === 'tarningar') { if (Tarningar.kasta()) { doljUtfall(); uppdateraKnapp(); } }
  else if (mode === 'kort') {
    if (Kortlek.busy) return;
    doljUtfall(); kortOmgang = [];
    const p = Kortlek.dra(ST.kort.antal, ST.kort.ater); uppdateraKnapp(); await p;
  } else if (mode === 'urna') {
    if (Urna.busy) return;
    doljUtfall(); kulOmgang = [];
    const p = Urna.dra(ST.urna.antal, ST.urna.ater); uppdateraKnapp(); await p;
  } else if (Hjul.snurra()) { doljUtfall(); uppdateraKnapp(); }
  uppdateraKnapp();
}
goBtn.addEventListener('click', forsok);
subGo.addEventListener('click', () => handling(subGo.dataset.act, subGo));

// ---- Ändringar i inställningarna ----
let tTimer = 0;
function tarningarAndrade(direkt = true) {
  nollstall('tarningar'); spara();
  clearTimeout(tTimer);
  const gor = () => { Tarningar.setDefs(ST.tarningar.lista); doljUtfall(); uppdateraKnapp(); };
  if (direkt) gor(); else tTimer = setTimeout(gor, 350);
  renderResultat();
}
function kortAndrade() { nollstall('kort'); Kortlek.setCfg(ST.kort); kortOmgang = []; doljUtfall(); spara(); renderSettings(); renderResultat(); uppdateraKnapp(); }
function urnaAndrad() { nollstall('urna'); Urna.setInnehall(ST.urna.innehall); kulOmgang = []; doljUtfall(); spara(); renderSettings(); renderResultat(); uppdateraKnapp(); }
let hTimer = 0;
function hjulAndrat(direkt = true, panel = true) {
  nollstall('hjul'); spara();
  clearTimeout(hTimer);
  if (direkt) Hjul.setSektorer(ST.hjul.sektorer); else hTimer = setTimeout(() => Hjul.setSektorer(ST.hjul.sektorer), 250);
  if (panel) renderSettings();
  renderResultat(); doljUtfall();
}
function handling(act, el) {
  const d = +(el.dataset.d || 0), v = el.dataset.v, i = +(el.dataset.i ?? -1), k = el.dataset.k;
  const L = ST.tarningar.lista;
  // Inställningar som ändrar pågående försök väntar tills försöket är klart.
  if (/^k-(farg|valor|valorer|jokrar)$/.test(act) && Kortlek.busy) return;
  if (/^u-(n|bort|ny)$/.test(act) && Urna.busy) return;
  if (/^h-(w|bort|ny|mall)$/.test(act) && Hjul.busy) return;
  switch (act) {
    case 't-antal': {
      if (Tarningar.busy) return;
      if (d > 0 && L.length < 12) { const s = L[L.length - 1]; L.push(nyTarning(s.sides, TFARGER[L.length % TFARGER.length].key)); }
      if (d < 0 && L.length > 1) L.pop();
      if (UI.sel >= L.length) UI.sel = -1;
      tarningarAndrade(); renderSettings(); break;
    }
    case 't-typ': if (Tarningar.busy) return; L.forEach((t, j) => { L[j] = nyTarning(+v, t.farg); }); tarningarAndrade(); renderSettings(); break;
    case 't-chip': UI.sel = UI.sel === i ? -1 : i; renderSettings(); break;
    case 't-sidor': if (Tarningar.busy) return; L[UI.sel] = nyTarning(+v, L[UI.sel].farg); tarningarAndrade(); renderSettings(); break;
    case 't-farg': L[UI.sel].farg = v; tarningarAndrade(); renderSettings(); break;
    case 't-sidfarg': {
      const t = L[UI.sel], cyk = [null, ...SIDFARGER.map(s => s.hex)];
      t.sidfarg[i] = cyk[(cyk.indexOf(t.sidfarg[i]) + 1) % cyk.length];
      el.style.background = t.sidfarg[i] || tfarg(t.farg).bas;
      tarningarAndrade(false); break;
    }
    case 't-std': { const t = L[UI.sel]; L[UI.sel] = nyTarning(t.sides, t.farg); tarningarAndrade(); renderSettings(); break; }
    case 't-fargtarning': { const t = L[UI.sel]; t.labels = t.labels.map(() => ''); t.sidfarg = t.labels.map((_, j) => SIDFARGER[j % SIDFARGER.length].hex); tarningarAndrade(); renderSettings(); break; }
    case 'k-farg': { const F = ST.kort.farger; if (F.includes(v)) { if (F.length > 1) F.splice(F.indexOf(v), 1); } else F.push(v); F.sort((a, b) => 'SHDC'.indexOf(a) - 'SHDC'.indexOf(b)); kortAndrade(); break; }
    case 'k-valor': { const V = ST.kort.valorer, n = +v; if (V.includes(n)) { if (V.length > 1) V.splice(V.indexOf(n), 1); } else V.push(n); V.sort((a, b) => a - b); kortAndrade(); break; }
    case 'k-valorer': ST.kort.valorer = v === 'alla' ? ALLA_VALORER.slice() : v === 'kladda' ? [11, 12, 13] : [2, 3, 4, 5, 6, 7, 8, 9, 10]; kortAndrade(); break;
    case 'k-jokrar': ST.kort.jokrar = clamp(ST.kort.jokrar + d, 0, 2); kortAndrade(); break;
    case 'k-antal': ST.kort.antal = clamp(ST.kort.antal + d, 1, 10); spara(); renderSettings(); uppdateraKnapp(); break;
    case 'k-ater': ST.kort.ater = el.checked; spara(); renderNasta(); uppdateraKnapp(); break;
    case 'k-blanda': Ljud.init(); Kortlek.blanda(); break;
    case 'k-samla': Ljud.init(); doljUtfall(); Kortlek.samla().then(uppdateraKnapp); uppdateraKnapp(); break;
    case 'u-n': {
      const x = ST.urna.innehall.find(y => y.key === k), tot = ST.urna.innehall.reduce((a, y) => a + y.n, 0);
      if (d > 0 && tot >= 60) return;
      if (d < 0 && tot <= 1) return;
      x.n = clamp(x.n + d, 0, 30); Ljud.init(); urnaAndrad(); break;
    }
    case 'u-bort': ST.urna.innehall = ST.urna.innehall.filter(y => y.key !== k); if (!ST.urna.innehall.some(y => y.n > 0)) ST.urna.innehall[0].n = 1; urnaAndrad(); break;
    case 'u-ny': { const tot = ST.urna.innehall.reduce((a, y) => a + y.n, 0); ST.urna.innehall.push({ key: k, n: tot + 3 <= 60 ? 3 : Math.max(0, 60 - tot) }); Ljud.init(); urnaAndrad(); break; }
    case 'u-antal': ST.urna.antal = clamp(ST.urna.antal + d, 1, 10); spara(); renderSettings(); uppdateraKnapp(); break;
    case 'u-ater': ST.urna.ater = el.checked; spara(); renderNasta(); uppdateraKnapp(); break;
    case 'u-skaka': Urna.skaka(); break;
    case 'u-tillbaka': Ljud.init(); doljUtfall(); Urna.laggTillbaka().then(uppdateraKnapp); break;
    case 'h-w': ST.hjul.sektorer[i].w = clamp(ST.hjul.sektorer[i].w + d, 1, 12); hjulAndrat(); break;
    case 'h-bort': ST.hjul.sektorer.splice(i, 1); hjulAndrat(); break;
    case 'h-ny': { const S = ST.hjul.sektorer; S.push({ text: String(S.length + 1), farg: HJULFARGER[S.length % HJULFARGER.length], w: 1 }); hjulAndrat(); break; }
    case 'h-mall': ST.hjul.sektorer = HJULMALLAR[v](); hjulAndrat(); break;
    case 'vy': if (mode === 'tarningar') ST.tarningar.vy = v; else ST.kort.vy = v; UI.valdKey = null; visade = new Map(); spara(); renderResultat(); break;
    case 'snabb': snabb(+v); break;
    case 'noll': nollstall(mode); UI.valdKey = null; renderResultat(); break;
  }
}
for (const el of [settingsEl, resultsEl]) {
  el.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b || b.disabled || b.type === 'checkbox') return; handling(b.dataset.act, b); });
  el.addEventListener('change', e => { const b = e.target.closest('input[type="checkbox"][data-act]'); if (b) handling(b.dataset.act, b); });
}
settingsEl.addEventListener('input', e => {
  const t = e.target, i = +t.dataset.i;
  if (t.dataset.inp === 't-lbl') { ST.tarningar.lista[UI.sel].labels[i] = t.value; tarningarAndrade(false); }
  else if (t.dataset.inp === 'h-text') { ST.hjul.sektorer[i].text = t.value; hjulAndrat(false, false); }
  else if (t.dataset.inp === 'h-farg') { ST.hjul.sektorer[i].farg = t.value; hjulAndrat(false, false); }
});
settingsEl.addEventListener('change', e => { if (e.target.dataset.inp === 't-lbl') renderSettings(); });
// Staplarna: peka eller klicka för exakta värden.
resultsEl.addEventListener('pointerover', e => { const r = e.target.closest('#chart .hit'); if (!r) return; UI.valdKey = r.dataset.k; $('#chart').querySelectorAll('rect.bar').forEach(b => b.classList.toggle('hl', b.dataset.k === UI.valdKey)); renderInfo(); });

// ---- Stationsbyte ----
function setMode(m, direkt = false) {
  mode = m; LS.set('mode', m);
  document.querySelectorAll('.mode').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
  UI.valdKey = null; visade = new Map();
  doljUtfall();
  Tarningar.visaEtiketter(m === 'tarningar');
  renderSettings(); renderResultat(); uppdateraKnapp();
  flygTill(m, direkt);
}
document.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => { if (b.dataset.mode !== mode) setMode(b.dataset.mode); }));

// ---- Pekare i scenen: klicka på föremålet eller dra i hjulet ----
const ray = new THREE.Raycaster(), pek = new THREE.Vector2();
function traff(ev, lista) {
  const r = canvas.getBoundingClientRect();
  pek.set((ev.clientX - r.left) / r.width * 2 - 1, -(ev.clientY - r.top) / r.height * 2 + 1);
  ray.setFromCamera(pek, camera);
  return ray.intersectObjects(lista, true).length > 0;
}
const klickMal = () => mode === 'tarningar' ? [Tarningar.grp] : mode === 'kort' ? Kortlek.klickbar : mode === 'urna' ? Urna.klickbar : Hjul.klickbar;
let ned = null;
canvas.addEventListener('pointerdown', ev => {
  if (!renderer) return;
  Ljud.init();
  ned = { x: ev.clientX, y: ev.clientY, t: performance.now(), hjul: false };
  if (mode === 'hjul' && traff(ev, Hjul.klickbar) && Hjul.dragStart(ev)) {
    ned.hjul = true; controls.enabled = false; stage.classList.add('greppa');
    canvas.setPointerCapture(ev.pointerId);
  }
});
canvas.addEventListener('pointermove', ev => {
  if (ned && ned.hjul) { Hjul.dragFlytt(ev); return; }
  if (ned || !renderer || ev.pointerType !== 'mouse') return;
  stage.classList.toggle('pek', traff(ev, klickMal()));
});
function slapp(ev) {
  if (!ned) return;
  const kort = Math.hypot(ev.clientX - ned.x, ev.clientY - ned.y) < 7 && performance.now() - ned.t < 450;
  if (ned.hjul) {
    stage.classList.remove('greppa');
    controls.enabled = !flyg;
    const snurrar = Hjul.dragSlut();
    if (snurrar) { doljUtfall(); uppdateraKnapp(); }
    else if (kort) forsok();
  } else if (kort && traff(ev, klickMal())) forsok();
  ned = null;
}
canvas.addEventListener('pointerup', slapp);
canvas.addEventListener('pointercancel', () => { if (ned && ned.hjul) { Hjul.dragSlut(); stage.classList.remove('greppa'); controls.enabled = true; } ned = null; });
document.addEventListener('keydown', e => {
  if (e.code !== 'Space' || e.repeat) return;
  const t = e.target;
  if (t.closest && t.closest('input, textarea, select, button, summary, a, [contenteditable]')) return;
  const r = stage.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  e.preventDefault(); forsok();
});

// ---- Knapparna i scenen ----
const ljudBtn = $('#ljudBtn');
const visaLjud = () => { ljudBtn.classList.toggle('tyst', !Ljud.on); ljudBtn.setAttribute('aria-pressed', String(Ljud.on)); ljudBtn.title = Ljud.on ? 'Stäng av ljudet' : 'Slå på ljudet'; };
ljudBtn.addEventListener('click', () => { Ljud.on = !Ljud.on; visaLjud(); });
visaLjud();
$('#vyBtn').addEventListener('click', () => flygTill(mode));
const verktyg = $('#verktyget');
const FS_IN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
const FS_UT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
$('#fsBtn').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (verktyg.requestFullscreen) verktyg.requestFullscreen().catch(() => {});
});
document.addEventListener('fullscreenchange', () => { const fs = !!document.fullscreenElement; $('#fsBtn').innerHTML = fs ? FS_UT : FS_IN; $('#fsBtn').title = fs ? 'Lämna helskärm' : 'Helskärm'; });
if (!document.fullscreenEnabled) $('#fsBtn').hidden = true;

// ---- Start ----
const siteHdr = document.querySelector('.lab-header');
const setHdr = () => document.documentElement.style.setProperty('--hdr', (siteHdr ? siteHdr.offsetHeight : 0) + 'px');
setHdr();
addEventListener('resize', () => { setHdr(); ritaDiagram(); });
new ResizeObserver(() => resize()).observe(stage);
new ResizeObserver(() => ritaDiagram()).observe(resultsEl);
document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });

(async function start() {
  resize();
  try {
    await Promise.race([
      Promise.all(['700 40px Poppins', '600 40px Poppins', '400 80px "Instrument Serif"'].map(f => document.fonts.load(f))),
      sleep(2500),
    ]);
  } catch (e) { /* teckensnitten får laddas senare */ }
  Tarningar.setDefs(ST.tarningar.lista);
  Kortlek.setCfg(ST.kort);
  Urna.setInnehall(ST.urna.innehall);
  Hjul.setSektorer(ST.hjul.sektorer);
  const m0 = LS.get('mode', 'tarningar');
  setMode(['tarningar', 'kort', 'urna', 'hjul'].includes(m0) ? m0 : 'tarningar', true);
  requestAnimationFrame(() => stage.classList.add('klar'));
  wake(3000);
})();

// För felsökning och automatiska tester (.shots/).
window.SANNOLIKHET = { ST, STAT, Tarningar, Kortlek, Urna, Hjul, setMode, forsok, snabb, kategorier, camera, controls, wake, get mode() { return mode; }, dbg: () => ({ rafOn, awakeUntil: Math.round(awakeUntil - performance.now()), tweens: tweens.size, ...Tarningar.dbg() }) };
