/* =====================================================================
   melongele.js — rendering och interaktion för "Melon i gelé"
   Fysiken bor i melongele-sim.js; här finns Three.js-scenen, gelé-
   materialet, kniven, handen och panelen.
   ===================================================================== */
import * as THREE from 'three';
import { World, P, TIP, SEEDS, CELL } from './melongele-sim.js';

const $ = s => document.querySelector(s);
const fmt = (v, d) => {
    const s = v.toFixed(d);
    if (parseFloat(s) === 0) return '0';
    const [i, f] = s.split('.');
    const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return f !== undefined ? g + ',' + f : g;
};

/* ---------------------------------------------------------------------
   Sorter
   --------------------------------------------------------------------- */
const SORTER = {
    karmin: { flesh: 0xe0263a, deep: 0x9c0a1c, atten: 0xd11a2c, glow: 0x5a0610, seed: 0x1b120d },
    guld:   { flesh: 0xf29a12, deep: 0xc85f00, atten: 0xf08a00, glow: 0x5a2c00, seed: 0x24170c },
    rosa:   { flesh: 0xf06a86, deep: 0xc93a5c, atten: 0xee5a7a, glow: 0x5a1024, seed: 0x2a1614 },
};

/* ---------------------------------------------------------------------
   Renderare, scen, ljus
   --------------------------------------------------------------------- */
const canvas = $('#scen');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

const BG = new THREE.Color(0xe4e0da);
const scene = new THREE.Scene();
scene.background = BG;

/* Studiomiljö för reflexerna: dämpat rum, varmt bord nedanför och några
   ljusa softboxar. Mörka partier i reflexen ger gelén djup och glans;
   RoomEnvironment är för jämnt ljus och gör ytan mjölkig. */
function studioEnv() {
    const env = new THREE.Scene();
    const box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(0x2c2a28), side: THREE.BackSide }));
    env.add(box);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xb8b0a6) }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -1.2;
    env.add(floor);
    const panel = (w, h, pos, look, k, tint = 0xffffff) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(tint).multiplyScalar(k), side: THREE.DoubleSide }));
        m.position.set(...pos); m.lookAt(...look);
        env.add(m);
    };
    panel(3.2, 2.2, [-2.2, 3.4, 1.6], [0, 0, 0], 7, 0xfff4e8);   // huvudljus, snett ovanifrån vänster
    panel(0.7, 4.0, [4.2, 1.2, 1.4], [0, 0, 0], 4, 0xe8efff);    // smal remsa till höger
    panel(4.0, 0.5, [0.5, 2.4, -4.5], [0, 0, 0], 3.5);           // motljus bakom
    panel(2.0, 2.0, [0, 4.8, 0], [0, 0, 0], 2.2);                // tak
    return env;
}
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(studioEnv(), 0.02).texture;
scene.environmentIntensity = 0.9;
const hemi = new THREE.HemisphereLight(0xf2f0ec, 0x8f8880, 0.38);
scene.add(hemi);

const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 20);
const orbit = { az: 0.0, el: 0.74, dist: 0.62, target: new THREE.Vector3(0, 0.012, 0.004) };
function placeCamera() {
    const { az, el, dist, target } = orbit;
    camera.position.set(target.x + dist * Math.cos(el) * Math.sin(az), target.y + dist * Math.sin(el), target.z + dist * Math.cos(el) * Math.cos(az));
    camera.lookAt(target);
}

const key = new THREE.DirectionalLight(0xfffaf4, 1.6);
key.position.set(-0.28, 0.62, 0.16);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -0.26; key.shadow.camera.right = 0.26;
key.shadow.camera.top = 0.26; key.shadow.camera.bottom = -0.26;
key.shadow.camera.near = 0.2; key.shadow.camera.far = 1.4;
key.shadow.radius = 10;
key.shadow.blurSamples = 24;
key.shadow.bias = -0.0004;
scene.add(key);
const fill = new THREE.DirectionalLight(0xdfe8ff, 0.22);
fill.position.set(0.5, 0.3, 0.4);
scene.add(fill);
const rim = new THREE.DirectionalLight(0xffffff, 0.5);
rim.position.set(0.1, 0.35, -0.6);
scene.add(rim);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({ color: 0xc2beb8, roughness: 0.95, metalness: 0, envMapIntensity: 0.12 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* Färgat ljus som tränger igenom gelén: en mjuk, rödaktig glöd på bordet
   bredvid varje bit (på skuggsidan). Bara en dekal, ingen fysik. */
function glowTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.45, 'rgba(255,255,255,0.45)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
}
const GLOW_TEX = glowTexture();

/* ---------------------------------------------------------------------
   Gelématerialet: MeshPhysicalMaterial med regioner (fruktkött, vitt
   band, grönt skal) som räknas ut per pixel ur VILOLÄGETS position.
   --------------------------------------------------------------------- */
const uniforms = {
    uTip: { value: new THREE.Vector3(...TIP) },
    uR: { value: P.R },
    uRindG: { value: P.RIND_G },
    uRindW: { value: P.RIND_W },
    uT: { value: P.T },
    uHalf: { value: P.HALF },
    uRR: { value: P.RR },
    uFlesh: { value: new THREE.Color() },
    uDeep: { value: new THREE.Color() },
    uAttenFlesh: { value: new THREE.Color() },
    uGlow: { value: new THREE.Color() },
};
function setSort(name) {
    const s = SORTER[name];
    uniforms.uFlesh.value.set(s.flesh);
    uniforms.uDeep.value.set(s.deep);
    uniforms.uAttenFlesh.value.set(s.atten);
    uniforms.uGlow.value.set(s.glow);
    seedMat.color.set(s.seed);
    glowMat.color.set(s.flesh);
}

const jellyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.12,
    metalness: 0,
    transmission: 1,
    thickness: 0.045,
    ior: 1.36,
    attenuationDistance: 0.03,
    attenuationColor: new THREE.Color(0xffffff),
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    specularIntensity: 1,
    envMapIntensity: 1.6,
});
jellyMat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute vec3 aRest, aM0, aM1, aM2;\nvarying vec3 vRest, vM0, vM1, vM2;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRest = aRest; vM0 = aM0; vM1 = aM1; vM2 = aM2;');
    shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
varying vec3 vRest, vM0, vM1, vM2;
uniform vec3 uTip; uniform float uR, uRindG, uRindW, uT;
uniform float uHalf, uRR;
// skivans avståndsfunktion (samma som sdShape i melongele-sim.js)
float mgPie(vec2 p){
  float sh = sin(uHalf), ch = cos(uHalf);
  float delta = uRR / sh, rin = uR - uRR - delta;
  p.y -= uTip.z + delta;
  p.x = abs(p.x);
  float l = length(p) - rin;
  float t = clamp(p.x*sh + p.y*ch, 0.0, rin);
  float m = length(p - vec2(sh, ch)*t);
  return max(l, m * sign(ch*p.x - sh*p.y));
}
float mgSd(vec3 q){
  float wx = mgPie(q.xz);
  float wy = abs(q.y - uT*0.5) - (uT*0.5 - uRR);
  return min(max(wx, wy), 0.0) + length(max(vec2(wx, wy), 0.0)) - uRR;
}
uniform vec3 uFlesh, uDeep, uAttenFlesh, uGlow;
float mgHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float mgNoise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mgHash(i), mgHash(i+vec2(1,0)), f.x), mix(mgHash(i+vec2(0,1)), mgHash(i+vec2(1,1)), f.x), f.y);
}
float mgFbm(vec2 p){ float s = 0.0, a = 0.5; for (int k = 0; k < 4; k++){ s += a*mgNoise(p); p *= 2.03; a *= 0.5; } return s; }`)
        .replace('#include <color_fragment>', `#include <color_fragment>
  vec2 mq = vRest.xz - uTip.xz;
  float mr = length(mq);
  float mang = atan(mq.x, mq.y);
  float dOut = uR - mr;                                   // avstånd in från skalets yta
  float wob = (mgFbm(vec2(mang*40.0, vRest.y*90.0)) - 0.5) * 0.0012;
  float tGreen = 1.0 - smoothstep(uRindG - 0.0012, uRindG + 0.0012, dOut + wob);
  float tWhite = 1.0 - smoothstep(uRindG + uRindW - 0.0018, uRindG + uRindW + 0.0012, dOut + wob);
  // fruktkött: djupare färg mot mitten, ljusare ut mot det vita bandet
  float depth = clamp(dOut / (uR*0.75), 0.0, 1.0);
  vec3 flesh = mix(uFlesh * 1.08, uDeep, smoothstep(0.1, 1.0, depth) * 0.55);
  flesh *= 0.92 + 0.16 * mgFbm(vRest.xz*260.0 + vRest.y*80.0);
  vec3 white = vec3(0.9, 0.93, 0.8);
  // skalets ränder: mörka flammiga band längs meridianerna
  float stripe = smoothstep(0.42, 0.62, 0.5 + 0.5*sin(mang*34.0 + 5.0*mgFbm(vec2(mang*5.0, vRest.y*45.0 + 3.1))));
  float speck = mgFbm(vec2(mang*160.0, vRest.y*260.0));
  vec3 greenLight = vec3(0.13, 0.33, 0.12);
  vec3 greenDark = vec3(0.02, 0.085, 0.03);
  float skin = smoothstep(0.0032, 0.0008, dOut + wob*0.4);   // yttersta millimetrarna
  vec3 green = mix(mix(vec3(0.42, 0.6, 0.3), greenLight, smoothstep(uRindG, 0.0045, dOut)), greenDark, stripe * skin);
  green *= 0.85 + 0.3 * speck;
  vec3 mgCol = mix(flesh, white, tWhite);
  mgCol = mix(mgCol, green, tGreen);
  diffuseColor.rgb = mgCol;
  float mgTrans = mix(mix(0.93, 0.55, tWhite), 0.22, tGreen);
  float mgRough = mix(mix(0.10, 0.16, tWhite), 0.2, tGreen);
  vec3 mgAtten = mix(mix(uAttenFlesh, vec3(0.92, 0.95, 0.85), tWhite), vec3(0.1, 0.35, 0.12), tGreen);
  float mgAttDist = mix(mix(0.011, 0.03, tWhite), 0.004, tGreen);`)
        .replace('float roughnessFactor = roughness;', 'float roughnessFactor = mgRough;')
        .replace('#include <normal_fragment_begin>', `#include <normal_fragment_begin>
  {
    // exakt normal per pixel på skivans ursprungliga yta (inte på snittytor),
    // vriden med den lokala deformationen cof(F)
    float mgS = mgSd(vRest);
    float mgW = smoothstep(-0.0016, -0.0005, mgS);
    if (mgW > 0.0) {
      const float e = 0.00025;
      vec3 g = vec3(mgSd(vRest + vec3(e,0,0)) - mgSd(vRest - vec3(e,0,0)),
                    mgSd(vRest + vec3(0,e,0)) - mgSd(vRest - vec3(0,e,0)),
                    mgSd(vRest + vec3(0,0,e)) - mgSd(vRest - vec3(0,0,e)));
      vec3 nw = mat3(vM0, vM1, vM2) * normalize(g);
      vec3 nv = normalize((viewMatrix * vec4(nw, 0.0)).xyz);
      // vid snittets rundade kant ligger punkten nära skivans ursprungliga yta
      // men vetter åt ett annat håll: använd bara den exakta normalen där den
      // stämmer med nätets egen normal
      mgW *= smoothstep(0.82, 0.96, dot(normal, nv));
      normal = normalize(mix(normal, nv, mgW));
      nonPerturbedNormal = normal;
    }
  }`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
  totalEmissiveRadiance += uGlow * (1.0 - tWhite) * (1.0 - tGreen) * 0.25;`)
        .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
  #if NUM_DIR_LIGHTS > 0
  {
    // falsk genomlysning: ljus som passerat genom gelén och kommer ut mot betraktaren
    vec3 mgLd = directionalLights[0].direction;
    float mgBack = pow(saturate(dot(geometryViewDir, -normalize(mgLd + normal * 0.45))), 2.2);
    float mgEdge = pow(1.0 - saturate(dot(normal, geometryViewDir)), 2.0);
    float mgFl = (1.0 - tGreen) * (1.0 - tWhite * 0.7);
    totalEmissiveRadiance += uFlesh * uFlesh * (mgBack * 1.1 + mgEdge * 0.35) * mgFl;
    totalEmissiveRadiance += vec3(0.25, 0.5, 0.2) * mgBack * 0.25 * tGreen;
  }
  #endif`)
        .replace('material.transmission = transmission;', 'material.transmission = transmission * mgTrans;')
        .replace('material.attenuationDistance = attenuationDistance;', 'material.attenuationDistance = mgAttDist;')
        .replace('material.attenuationColor = attenuationColor;', 'material.attenuationColor = mgAtten;');
};

const seedMat = new THREE.MeshPhysicalMaterial({ color: 0x1b120d, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 });
const glowMat = new THREE.MeshBasicMaterial({ color: 0xe0263a, map: GLOW_TEX, transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.MultiplyBlending, premultipliedAlpha: true });
glowMat.blending = THREE.NormalBlending;

/* Fröets mall: en tillplattad droppe, spetsen mot melonens mitt (+z lokalt) */
const SEED_TEMPLATE = (() => {
    const g = new THREE.SphereGeometry(1, 14, 10);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const taper = 1 - 0.55 * Math.max(0, z) ** 1.3;
        p.setXYZ(i, x * 0.0021 * taper, y * 0.0009 * (0.7 + 0.3 * taper), z * 0.0036);
    }
    return g;
})();

/* ---------------------------------------------------------------------
   Värld och grafik per bit
   --------------------------------------------------------------------- */
const world = new World();
const group = new THREE.Group();
scene.add(group);
const views = new Map();      // Piece -> { mesh, seeds, glow, lattice }
let showLattice = false;

function buildView(p) {
    const g = new THREE.BufferGeometry();
    p.updateSurface();
    g.setAttribute('position', new THREE.BufferAttribute(p.surfPos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('normal', new THREE.BufferAttribute(p.surfNrm, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aRest', new THREE.BufferAttribute(p.surfRest, 3));
    const ib = new THREE.InterleavedBuffer(p.surfM, 9).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aM0', new THREE.InterleavedBufferAttribute(ib, 3, 0));
    g.setAttribute('aM1', new THREE.InterleavedBufferAttribute(ib, 3, 3));
    g.setAttribute('aM2', new THREE.InterleavedBufferAttribute(ib, 3, 6));
    g.setIndex(new THREE.BufferAttribute(p.surfIdx, 1));
    const mesh = new THREE.Mesh(g, jellyMat);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    mesh.frustumCulled = false;
    mesh.userData.piece = p;
    group.add(mesh);

    // frön
    let seeds = null;
    if (p.seeds.length) {
        const tpl = SEED_TEMPLATE.attributes.position;
        const idxT = SEED_TEMPLATE.index.array;
        const nPer = tpl.count;
        const rest = new Float32Array(3 * nPer * p.seeds.length);
        const idx = new Uint32Array(idxT.length * p.seeds.length);
        const cells = [];
        const m = new THREE.Matrix4(), v = new THREE.Vector3();
        p.seeds.forEach((s, q) => {
            const sd = SEEDS[s];
            const c = new THREE.Vector3(...sd.c);
            const toTip = new THREE.Vector3(TIP[0] - c.x, 0, TIP[2] - c.z).normalize();
            const ez = toTip.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), sd.roll);
            let ey = new THREE.Vector3(0, 1, 0).applyAxisAngle(ez, sd.tilt);
            const ex = new THREE.Vector3().crossVectors(ey, ez).normalize();
            ey = new THREE.Vector3().crossVectors(ez, ex);
            m.makeBasis(ex, ey, ez).scale(new THREE.Vector3(sd.size, sd.size, sd.size)).setPosition(c);
            for (let i = 0; i < nPer; i++) {
                v.fromBufferAttribute(tpl, i).applyMatrix4(m);
                rest.set([v.x, v.y, v.z], 3 * (q * nPer + i));
            }
            for (let i = 0; i < idxT.length; i++) idx[q * idxT.length + i] = idxT[i] + q * nPer;
            cells.push(p.locate(c.x, c.y, c.z, null));
        });
        // alla hörn i ett frö följer fröets mittcell
        const nodes = new Int32Array(8 * nPer * p.seeds.length), w = new Float32Array(8 * nPer * p.seeds.length);
        p.seeds.forEach((s, q) => {
            const e = p.embed(rest.subarray(3 * q * nPer, 3 * (q + 1) * nPer), cells[q] < 0 ? 0 : cells[q]);
            nodes.set(e.nodes, 8 * q * nPer); w.set(e.w, 8 * q * nPer);
        });
        const pos = new Float32Array(rest.length);
        const sg = new THREE.BufferGeometry();
        sg.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
        sg.setIndex(new THREE.BufferAttribute(idx, 1));
        const sm = new THREE.Mesh(sg, seedMat);
        sm.frustumCulled = false;
        group.add(sm);
        seeds = { mesh: sm, nodes, w, pos, count: rest.length / 3 };
    }

    const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.renderOrder = 1;
    group.add(glow);

    const view = { mesh, seeds, glow, lattice: null, ib };
    views.set(p, view);
    if (showLattice) addLattice(p, view);
    return view;
}

function addLattice(p, view) {
    const set = new Set(), segs = [];
    for (let c = 0; c < p.nc; c++) {
        for (const [a, b] of [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]]) {
            const i = p.cellNodes[8 * c + a], j = p.cellNodes[8 * c + b];
            const k = Math.min(i, j) * p.n + Math.max(i, j);
            if (!set.has(k)) { set.add(k); segs.push(i, j); }
        }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p.x, 3).setUsage(THREE.DynamicDrawUsage));
    g.setIndex(segs);
    const lines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x1c1a17, transparent: true, opacity: 0.28, depthTest: false }));
    lines.renderOrder = 5;
    lines.frustumCulled = false;
    group.add(lines);
    view.lattice = lines;
}
function removeLattice(view) {
    if (!view.lattice) return;
    group.remove(view.lattice);
    view.lattice.geometry.dispose();
    view.lattice.material.dispose();
    view.lattice = null;
}

function disposeView(view) {
    group.remove(view.mesh); view.mesh.geometry.dispose();
    if (view.seeds) { group.remove(view.seeds.mesh); view.seeds.mesh.geometry.dispose(); }
    group.remove(view.glow); view.glow.geometry.dispose();
    removeLattice(view);
}

function syncViews() {
    for (const [p, view] of views) if (!world.pieces.includes(p)) { disposeView(view); views.delete(p); }
    for (const p of world.pieces) if (!views.has(p)) buildView(p);
}
world.onChange = () => syncViews();
syncViews();

const _lightDir = new THREE.Vector3();
function updateViews() {
    _lightDir.copy(key.position).normalize();
    for (const p of world.pieces) {
        const view = views.get(p);
        if (!view) continue;
        p.updateSurface();
        const g = view.mesh.geometry;
        g.attributes.position.needsUpdate = true;
        g.attributes.normal.needsUpdate = true;
        view.ib.needsUpdate = true;
        if (view.seeds) {
            const s = view.seeds;
            p.deform(s.nodes, s.w, s.pos, s.count);
            s.mesh.geometry.attributes.position.needsUpdate = true;
            s.mesh.geometry.computeVertexNormals();
        }
        if (view.lattice) view.lattice.geometry.attributes.position.needsUpdate = true;
        // glöden: skuggsidan, storlek efter bitens utbredning
        let cx = 0, cz = 0, ymin = 1, n = 0, r2 = 0;
        const sp = p.surfPos;
        for (let q = 0; q < p.nv; q += 7) { cx += sp[3 * q]; cz += sp[3 * q + 2]; ymin = Math.min(ymin, sp[3 * q + 1]); n++; }
        cx /= n; cz /= n;
        for (let q = 0; q < p.nv; q += 7) r2 = Math.max(r2, (sp[3 * q] - cx) ** 2 + (sp[3 * q + 2] - cz) ** 2);
        const r = Math.sqrt(r2);
        view.glow.position.set(cx - _lightDir.x * 0.018, 0.0004, cz - _lightDir.z * 0.018);
        view.glow.scale.set(r * 2.1, r * 2.1, 1);
        view.glow.material.opacity = 0.16 * Math.max(0, 1 - ymin / 0.05);
    }
}

/* ---------------------------------------------------------------------
   Kniven: mörkt kolstål med ljus slipfas, svart skaft med nitar
   --------------------------------------------------------------------- */
const knife = (() => {
    const grp = new THREE.Group();
    const L = 0.2, Hb = 0.046, th = 0.0016;
    const blade = new THREE.Shape();
    blade.moveTo(0, 0.004);
    blade.lineTo(0, Hb);                                  // hälen
    blade.lineTo(L * 0.72, Hb);                           // ryggen
    blade.quadraticCurveTo(L * 0.93, Hb * 0.86, L, 0.006); // mot spetsen
    blade.quadraticCurveTo(L * 0.86, -0.0015, L * 0.55, -0.0005); // bukens egg
    blade.lineTo(0.012, 0);
    blade.quadraticCurveTo(0.002, 0.0002, 0, 0.004);
    const bg = new THREE.ExtrudeGeometry(blade, { depth: th, bevelEnabled: true, bevelThickness: 0.0003, bevelSize: 0.0005, bevelSegments: 2, curveSegments: 24 });
    bg.translate(0, 0, -th / 2);
    const steel = new THREE.MeshPhysicalMaterial({ color: 0x2b2e33, metalness: 0.85, roughness: 0.32, clearcoat: 0.4, clearcoatRoughness: 0.2 });
    const bm = new THREE.Mesh(bg, steel);
    bm.castShadow = true;
    grp.add(bm);
    // slipfasen
    const edge = new THREE.Shape();
    edge.moveTo(0.012, 0);
    edge.lineTo(L * 0.55, -0.0005);
    edge.quadraticCurveTo(L * 0.86, -0.0015, L, 0.006);
    edge.lineTo(L - 0.004, 0.0085);
    edge.quadraticCurveTo(L * 0.86, 0.0045, L * 0.55, 0.0055);
    edge.lineTo(0.012, 0.006);
    edge.lineTo(0.012, 0);
    const eg = new THREE.ExtrudeGeometry(edge, { depth: th * 1.25, bevelEnabled: false, curveSegments: 24 });
    eg.translate(0, 0, -th * 0.625);
    const em = new THREE.Mesh(eg, new THREE.MeshPhysicalMaterial({ color: 0xb9bec4, metalness: 1, roughness: 0.18 }));
    grp.add(em);
    // bolster
    const bol = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.03, 0.011), new THREE.MeshPhysicalMaterial({ color: 0x8d9298, metalness: 1, roughness: 0.25 }));
    bol.position.set(-0.004, 0.028, 0);
    grp.add(bol);
    // skaft
    const hs = new THREE.Shape();
    const hl = 0.11, hh = 0.024, rr = 0.008;
    hs.moveTo(0, rr); hs.lineTo(0, hh - rr); hs.quadraticCurveTo(0, hh, rr, hh);
    hs.lineTo(hl - rr, hh + 0.002); hs.quadraticCurveTo(hl, hh + 0.002, hl, hh - rr + 0.002);
    hs.lineTo(hl, rr - 0.002); hs.quadraticCurveTo(hl, -0.002, hl - rr, -0.002);
    hs.lineTo(rr, 0); hs.quadraticCurveTo(0, 0, 0, rr);
    const hg = new THREE.ExtrudeGeometry(hs, { depth: 0.011, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.003, bevelSegments: 4, curveSegments: 16 });
    hg.translate(-hl - 0.008, 0.016, -0.0055);
    const hm = new THREE.Mesh(hg, new THREE.MeshPhysicalMaterial({ color: 0x151516, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.3 }));
    hm.castShadow = true;
    grp.add(hm);
    const rivMat = new THREE.MeshPhysicalMaterial({ color: 0xc7ccd1, metalness: 1, roughness: 0.2 });
    for (const x of [-0.03, -0.062, -0.094]) {
        const rv = new THREE.Mesh(new THREE.CylinderGeometry(0.0028, 0.0028, 0.0175, 20), rivMat);
        rv.rotation.x = Math.PI / 2;
        rv.position.set(x, 0.028, 0);
        grp.add(rv);
    }
    grp.visible = false;
    grp.scale.setScalar(0.82);
    scene.add(grp);
    return { grp, L: L * 0.82 };
})();

/* Snittlinjen som ritas medan man drar med kniven */
const guide = (() => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(g, new THREE.LineDashedMaterial({ color: 0x1c1a17, dashSize: 0.006, gapSize: 0.004, transparent: true, opacity: 0.55, depthTest: false }));
    line.renderOrder = 6;
    line.visible = false;
    scene.add(line);
    return line;
})();

/* ---------------------------------------------------------------------
   Ljud (syntetiserat, ingen ljudfil)
   --------------------------------------------------------------------- */
const sound = { on: false, ctx: null };
function audio() {
    if (!sound.on) return null;
    if (!sound.ctx) sound.ctx = new (window.AudioContext || window.webkitAudioContext)();
    return sound.ctx;
}
function noiseBuf(ctx, dur) {
    const b = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
}
function squelch(strength = 1) {
    const ctx = audio(); if (!ctx) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = noiseBuf(ctx, 0.25);
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 4;
    bp.frequency.setValueAtTime(900, t); bp.frequency.exponentialRampToValueAtTime(260, t + 0.2);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18 * strength, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    src.connect(bp).connect(g).connect(ctx.destination); src.start(t);
}
function chop() {
    const ctx = audio(); if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.2);
    const src = ctx.createBufferSource(); src.buffer = noiseBuf(ctx, 0.05);
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500;
    const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.12, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    src.connect(hp).connect(g2).connect(ctx.destination); src.start(t);
    squelch(0.8);
}

/* ---------------------------------------------------------------------
   Interaktion
   --------------------------------------------------------------------- */
const state = { tool: 'hand', paused: false, slow: false };
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const pointers = new Map();
let drag = null;          // { kind: 'grab'|'orbit'|'knife', ... }
let chopAnim = null;

function setNdc(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
}
function hitJelly(e) {
    setNdc(e);
    const meshes = [];
    for (const [, v] of views) {
        v.mesh.geometry.computeBoundingSphere();
        v.mesh.geometry.computeBoundingBox();
        meshes.push(v.mesh);
    }
    return ray.intersectObjects(meshes, false)[0] || null;
}
function groundPoint(e, y = 0) {
    setNdc(e);
    const pl = new THREE.Plane(new THREE.Vector3(0, 1, 0), -y);
    const out = new THREE.Vector3();
    return ray.ray.intersectPlane(pl, out) ? out : null;
}

canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (chopAnim) return;
    // andra fingret medan man håller: vrid
    if (pointers.size === 2 && drag && drag.kind === 'grab') {
        const pts = [...pointers.values()];
        drag.twist0 = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x) - drag.angle;
        return;
    }
    if (pointers.size > 1) return;
    if (state.tool === 'hand') {
        const hit = hitJelly(e);
        if (hit) {
            const p = hit.object.userData.piece;
            const f = hit.face;
            // närmaste av triangelns hörn → vilolägespunkt
            let best = f.a, bd = Infinity;
            for (const vi of [f.a, f.b, f.c]) {
                const d = Math.hypot(p.surfPos[3 * vi] - hit.point.x, p.surfPos[3 * vi + 1] - hit.point.y, p.surfPos[3 * vi + 2] - hit.point.z);
                if (d < bd) { bd = d; best = vi; }
            }
            const rest = [p.surfRest[3 * best], p.surfRest[3 * best + 1], p.surfRest[3 * best + 2]];
            if (world.startGrab(p, rest, hit.point.toArray())) {
                const n = camera.getWorldDirection(new THREE.Vector3());
                drag = { kind: 'grab', plane: new THREE.Plane().setFromNormalAndCoplanarPoint(n, hit.point), angle: 0, axis: n.clone().negate() };
                canvas.style.cursor = 'grabbing';
                squelch(0.7);
            }
        } else {
            drag = { kind: 'orbit', x: e.clientX, y: e.clientY, az: orbit.az, el: orbit.el };
        }
    } else {
        const g = groundPoint(e, 0);
        if (g) {
            drag = { kind: 'knife', a: g.clone(), b: g.clone() };
            guide.visible = true;
        }
    }
});

canvas.addEventListener('pointermove', e => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!drag) {
        if (state.tool === 'knife' && !chopAnim) hoverKnife(e);
        else if (state.tool === 'hand' && e.pointerType === 'mouse') throttleHover(e);
        return;
    }
    if (drag.kind === 'grab') {
        if (pointers.size === 2 && drag.twist0 !== undefined) {
            const pts = [...pointers.values()];
            drag.angle = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x) - drag.twist0;
            world.moveGrab(world.grab.target, -drag.angle, drag.axis.toArray());
            return;
        }
        setNdc(e);
        const out = new THREE.Vector3();
        if (ray.ray.intersectPlane(drag.plane, out)) world.moveGrab(out.toArray(), drag.angle, drag.axis.toArray());
    } else if (drag.kind === 'orbit') {
        orbit.az = drag.az - (e.clientX - drag.x) * 0.006;
        orbit.el = Math.min(1.35, Math.max(0.25, drag.el + (e.clientY - drag.y) * 0.004));
        placeCamera();
    } else if (drag.kind === 'knife') {
        const g = groundPoint(e, 0);
        if (g) {
            drag.b.copy(g);
            const pos = guide.geometry.attributes.position;
            pos.setXYZ(0, drag.a.x, 0.001, drag.a.z); pos.setXYZ(1, g.x, 0.001, g.z);
            pos.needsUpdate = true;
            guide.computeLineDistances();
            poseKnifeOnLine(drag.a, drag.b, 0.075);
        }
    }
});

function endPointer(e) {
    pointers.delete(e.pointerId);
    if (!drag) return;
    if (drag.kind === 'grab') {
        if (pointers.size >= 1) { drag.twist0 = undefined; return; }
        world.endGrab();
        canvas.style.cursor = '';
        squelch(0.4);
    } else if (drag.kind === 'knife') {
        guide.visible = false;
        const len = drag.a.distanceTo(drag.b);
        if (len > 0.02) startChop(drag.a.clone(), drag.b.clone());
    }
    drag = null;
}
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);

canvas.addEventListener('wheel', e => {
    e.preventDefault();
    if (drag && drag.kind === 'grab') {
        drag.angle += e.deltaY * 0.004;
        world.moveGrab(world.grab.target, drag.angle, drag.axis.toArray());
    } else {
        orbit.dist = Math.min(1.1, Math.max(0.32, orbit.dist * (1 + e.deltaY * 0.001)));
        placeCamera();
    }
}, { passive: false });

let hoverT = 0;
function throttleHover(e) {
    const now = performance.now();
    if (now - hoverT < 60) return;
    hoverT = now;
    canvas.style.cursor = hitJelly(e) ? 'grab' : '';
}

function poseKnifeOnLine(a, b, y) {
    const dx = b.x - a.x, dz = b.z - a.z, L = Math.hypot(dx, dz) || 1;
    const ux = dx / L, uz = dz / L;
    // bladets mitt över linjens mitt, skaftet åt det håll som vänder mot kameran-höger
    const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2;
    knife.grp.rotation.set(0, Math.atan2(-uz, ux), 0);
    knife.grp.position.set(mx - ux * knife.L * 0.52, y, mz - uz * knife.L * 0.52);
    knife.grp.visible = true;
}
function hoverKnife(e) {
    const g = groundPoint(e, 0);
    if (!g) return;
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    right.y = 0; right.normalize();
    const a = g.clone().addScaledVector(right, -0.05), b = g.clone().addScaledVector(right, 0.05);
    poseKnifeOnLine(a, b, 0.06);
}

/* Hugget: kniven faller, trycker ned gelén, skär igenom och lyfts */
function startChop(a, b) {
    // orientera linjen så att skaftet hamnar till höger på skärmen
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    if ((b.x - a.x) * right.x + (b.z - a.z) * right.z > 0) { const t = a; a = b; b = t; }
    // förläng linjen så att bladet täcker hela snittet
    const dir = new THREE.Vector3(b.x - a.x, 0, b.z - a.z).normalize();
    const n = new THREE.Vector3(-dir.z, 0, dir.x);
    const d = n.x * a.x + n.z * a.z;
    chopAnim = { a, b, dir, n, d, t: 0, cut: false, y0: 0.075 };
    world.setBlade({ press: true, n: [n.x, 0, n.z], d, slab: CELL * 0.85, edgeY: 1, ax: a.x, az: a.z, bx: b.x, bz: b.z });
    poseKnifeOnLine(a, b, chopAnim.y0);
}
function stepChop(dt) {
    const c = chopAnim;
    c.t += dt;
    const T1 = 0.34, T2 = 0.46, T3 = 0.8;
    let y;
    if (c.t < T1) { const s = c.t / T1; y = c.y0 + (-0.001 - c.y0) * s * s * (3 - 2 * s) ** 0.6; }
    else if (c.t < T2) y = -0.001;
    else if (c.t < T3) { const s = (c.t - T2) / (T3 - T2); y = -0.001 + (c.y0 + 0.001) * (1 - (1 - s) ** 3); }
    else {
        chopAnim = null;
        world.setBlade(null);
        if (state.tool === 'knife') knife.grp.visible = true; else knife.grp.visible = false;
        return;
    }
    poseKnifeOnLine(c.a, c.b, y);
    const b = world.blade;
    if (b && !c.cut) {
        b.edgeY = y;
        const pressedEnough = b.contactY !== undefined && y < b.contactY - 0.011;
        if (pressedEnough || y <= 0.0005) {
            c.cut = true;
            b.press = false;
            const added = world.cut([c.n.x, 0, c.n.z], c.d, { ax: c.a.x, az: c.a.z, bx: c.b.x, bz: c.b.z });
            if (added) chop();
        }
    }
}

/* ---------------------------------------------------------------------
   Panelen
   --------------------------------------------------------------------- */
function setTool(t) {
    state.tool = t;
    document.querySelectorAll('[data-tool]').forEach(b => b.setAttribute('aria-pressed', b.dataset.tool === t));
    knife.grp.visible = t === 'knife';
    canvas.style.cursor = t === 'knife' ? 'crosshair' : '';
    document.body.dataset.tool = t;
}
document.querySelectorAll('[data-tool]').forEach(b => b.addEventListener('click', () => setTool(b.dataset.tool)));
document.querySelectorAll('[data-sort]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-sort]').forEach(x => x.setAttribute('aria-pressed', x === b));
    setSort(b.dataset.sort);
    squelch(0.5);
}));

// fasthet: E från 800 Pa (darrig) till 16 000 Pa (stadig), logaritmiskt
const firm = $('#fasthet'), damp = $('#dampning');
function readSliders() {
    const f = +firm.value / 100, d = +damp.value / 100;
    world.E = 800 * Math.pow(20, f);
    world.damping = 0.6 * Math.pow(60, d);
    $('#fasthet-v').textContent = fmt(world.E / 1000, 1) + ' kPa';
    $('#dampning-v').textContent = fmt(world.damping, 1) + ' s⁻¹';
}
firm.addEventListener('input', readSliders);
damp.addEventListener('input', readSliders);
readSliders();

$('#knuff').addEventListener('click', () => { world.nudge(); squelch(1); });
$('#aterstall').addEventListener('click', () => { world.reset(); syncViews(); });
$('#halvfart').addEventListener('change', e => { state.slow = e.target.checked; });
$('#visanat').addEventListener('change', e => {
    showLattice = e.target.checked;
    for (const [p, v] of views) showLattice ? addLattice(p, v) : removeLattice(v);
});
$('#paus').addEventListener('click', e => {
    state.paused = !state.paused;
    e.currentTarget.textContent = state.paused ? 'Fortsätt' : 'Paus';
    e.currentTarget.setAttribute('aria-pressed', state.paused);
});
$('#ljud').addEventListener('click', e => {
    sound.on = !sound.on;
    e.currentTarget.setAttribute('aria-pressed', sound.on);
    e.currentTarget.querySelector('span').textContent = sound.on ? 'Ljud på' : 'Ljud av';
    if (sound.on) { audio(); sound.ctx.resume(); squelch(0.6); }
});
window.addEventListener('keydown', e => {
    if (e.target.closest('input, button')) return;
    if (e.key === 'h' || e.key === 'H') setTool('hand');
    if (e.key === 'k' || e.key === 'K') setTool('knife');
    if (e.key === ' ') { e.preventDefault(); $('#paus').click(); }
    if (e.key === 'r' || e.key === 'R') $('#aterstall').click();
});

/* ---------------------------------------------------------------------
   Storlek och vy
   --------------------------------------------------------------------- */
function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // på bred skärm: skjut bilden så att melonen hamnar mitt i den fria ytan
    const panel = document.querySelector('.panel');
    const wide = w > 900;
    if (wide && panel) {
        const pw = panel.getBoundingClientRect().width + 40;
        camera.setViewOffset(w + pw, h, pw * 0.72, 0, w, h);
        camera.aspect = (w + pw) / h;
    } else camera.clearViewOffset();
    orbit.dist = w < 600 ? 0.8 : 0.62;
    placeCamera();
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

/* ---------------------------------------------------------------------
   Loop
   --------------------------------------------------------------------- */
setSort('karmin');
let last = performance.now(), statT = 0, fpsAcc = 0, fpsN = 0;
function frame(now) {
    const real = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    let dt = real * (state.slow ? 0.5 : 1);
    if (chopAnim) stepChop(dt);
    const t0 = performance.now();
    if (!state.paused) world.step(dt);
    fpsAcc += performance.now() - t0; fpsN++;
    updateViews();
    renderer.render(scene, camera);
    statT += real;
    if (statT > 0.2) {
        statT = 0;
        const s = world.stats();
        $('#s-massa').textContent = fmt(s.mass * 1000, 0);
        $('#s-volym').textContent = fmt(s.volume * 100, 1);
        $('#s-energi').textContent = fmt(s.kinetic * 1000, 2);
        $('#s-bitar').textContent = s.pieces;
        const parts = world.pieces.reduce((a, p) => a + p.n, 0), tets = world.pieces.reduce((a, p) => a + p.nt, 0);
        $('#s-modell').textContent = `${fmt(parts, 0)} partiklar, ${fmt(tets, 0)} tetraedrar, fysik ${fmt(fpsAcc / fpsN, 1)} ms per bildruta`;
        fpsAcc = 0; fpsN = 0;
    }
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.__melon = { world, renderer, camera, orbit, setTool, views };
