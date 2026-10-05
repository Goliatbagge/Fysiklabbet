/* mu-genomgang.js — genomgångar inuti Matematikens universum (utkast 2026-10-05)
 * ==========================================================================
 * En genomgång spelas upp som en berättelse i samma rymd som universumet:
 * ett textkort till vänster (nederkant på mobil), en 3D-scen bakom, och en
 * tidslinje med alla steg i nederkanten. Partiklarna i scenen flyttar sig
 * mellan formationer (moln → talmängdernas ringar → tallinje → termometer →
 * spiral), så att genomgången upplevs som en sammanhängande resa.
 *
 * Huvudsidan (matematikuniversum.html) laddar modulen med import() när man
 * trycker på "Starta genomgången" och anropar starta(ctx). Modulen tar över
 * RenderPass-scenen och -kameran tills ctx.slut(klar) anropas, och stang()
 * lämnar tillbaka allt.
 *
 * Innehållet följer data/teori/<id>.md. Ändras genomgången där ska stegen
 * här ses över (samma beteckningar, samma exempel, samma svar).
 * Exemplen har knappen "Se lösningen med penna", som laddar handskrift.js
 * först när den behövs och visar samma pennscen som teorin använder.
 */

const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/';
const TAU = Math.PI * 2;

function laddaSkript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}
let katexP = null;
function laddaKatex() {
  if (!katexP) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = KATEX + 'katex.min.css';
    document.head.appendChild(l);
    katexP = laddaSkript(KATEX + 'katex.min.js').then(() => laddaSkript(KATEX + 'contrib/auto-render.min.js'));
  }
  return katexP;
}
let hkP = null;
function laddaHandskrift() {
  if (!hkP) hkP = window.HANDSKRIFT ? Promise.resolve() : laddaSkript('../handskrift.js');
  return hkP;
}
const tex = (s) => window.katex.renderToString(s, { throwOnError: false });
function matte(el) {
  window.renderMathInElement(el, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    throwOnError: false,
  });
}
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); };
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* ------------------------------------------------------------------------
   Utseende
   ------------------------------------------------------------------------ */
const CSS = `
.lek { position: fixed; inset: 0; z-index: 8; pointer-events: none; color: var(--ink); font-family: var(--sans); opacity: 0; transition: opacity .9s var(--ease); }
.lek.pa { opacity: 1; }
.lek > * { pointer-events: auto; }
.lek-etiketter { position: fixed !important; inset: 0; pointer-events: none; z-index: 6; }

.lek-topp { position: absolute; top: 20px; left: 24px; right: 24px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; pointer-events: none; }
.lek-topp > * { pointer-events: auto; }
.lek-id { font: 500 11px/1.6 var(--mono); letter-spacing: .14em; color: var(--dim); }
.lek-id b { font-weight: 500; color: var(--lc); }
.lek-titel { font: 300 17px/1.3 var(--disp); margin-top: 4px; letter-spacing: .01em; }
.lek-ut { display: inline-flex; align-items: center; gap: 10px; padding: 10px 14px 10px 16px; border-radius: 99px; background: var(--glas); border: 1px solid var(--kant); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font: 500 13px/1 var(--sans); color: var(--ink); cursor: pointer; }
.lek-ut:hover { border-color: rgba(255,255,255,.4); }
.lek-ut kbd { font: 500 10.5px/1 var(--mono); padding: 4px 6px; border-radius: 5px; border: 1px solid var(--kant); color: var(--dim); }

.lek-kort { position: absolute; left: 24px; top: 92px; bottom: 96px; width: min(440px, calc(100vw - 48px)); display: flex; flex-direction: column; justify-content: center; pointer-events: none; transition: width .6s var(--ease); }
.lek-kort.bred { width: min(940px, calc(100vw - 48px)); }
.lek-ruta { pointer-events: auto; max-height: 100%; overflow-y: auto; background: rgba(7, 9, 20, .74); border: 1px solid var(--kant); border-radius: 22px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); padding: 28px 28px 26px; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.15) transparent; position: relative; }
.lek-ruta::before { content: ''; position: absolute; left: 28px; right: 28px; top: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--lc), transparent); opacity: .6; }
.lek-inne { transition: opacity .35s var(--ease), transform .35s var(--ease), filter .35s var(--ease); }
.lek-inne.byter { opacity: 0; transform: translateY(10px); filter: blur(5px); }
.lek-del { font: 500 11px/1.4 var(--mono); letter-spacing: .14em; color: var(--lc); display: flex; justify-content: space-between; gap: 12px; }
.lek-del span:last-child { color: var(--faint); }
.lek-ruta h2 { font: 300 clamp(24px, 2.3vw, 31px)/1.12 var(--disp); margin: 12px 0 18px; letter-spacing: -.01em; }
.lek-text { font-size: 15.5px; line-height: 1.72; color: #c4cbe0; }
.lek-text p { margin: 0 0 14px; }
.lek-text strong { color: #fff; font-weight: 600; }
.lek-text ul { margin: 0 0 14px; padding-left: 20px; }
.lek-text li { margin: 4px 0; }
.lek-text .katex { color: #fff; font-size: 1.07em; }
.lek-text .katex-display { margin: 16px 0; padding: 4px 0 6px; overflow-x: auto; overflow-y: hidden; }
.lek-text .katex-display .katex { font-size: 1.22em; }
.lek-fraga { font-size: 17px; color: #fff !important; font-weight: 500; padding: 14px 16px; border-radius: 14px; background: rgba(255,255,255,.05); border: 1px solid var(--kant); }
.lek-uppmaning { color: var(--lc) !important; font: 500 13px/1.5 var(--mono) !important; letter-spacing: .04em; }
.lek-obs { border-left: 2px solid var(--lc); padding: 4px 0 4px 14px; }
.lek-pi { font: 400 15px/1.5 var(--mono); color: #fff; white-space: nowrap; overflow: hidden; direction: rtl; text-align: left; margin: 0 0 14px; padding: 10px 14px; border-radius: 10px; background: rgba(255,255,255,.04); border: 1px solid var(--kant); -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%); mask-image: linear-gradient(90deg, transparent, #000 18%); }
.lek-pi span { direction: ltr; unicode-bidi: bidi-override; }
.lek-avlas { min-height: 52px; padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,.04); border: 1px dashed var(--kant); color: var(--dim); font-size: 14.5px; }
.lek-avlas.full { border-style: solid; color: #dde3f3; }

.lek-chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 4px 0 16px; }
.lek-chip { min-width: 54px; padding: 10px 14px; border-radius: 12px; background: rgba(255,255,255,.05); border: 1px solid var(--kant); color: #fff; cursor: pointer; font-size: 16px; transition: border-color .25s, background .25s, transform .25s; }
.lek-chip:hover { border-color: rgba(255,255,255,.45); transform: translateY(-1px); }
.lek-chip.ja { border-color: #6fe3a2; background: rgba(111,227,162,.12); }
.lek-chip.nej { border-color: rgba(255,120,140,.7); background: rgba(255,120,140,.08); }
.lek-svar { min-height: 0; }
.lek-svar .rad { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: start; padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,.04); margin-bottom: 12px; font-size: 14.5px; line-height: 1.6; }
.lek-svar .bricka { font: 500 11px/1 var(--mono); letter-spacing: .08em; padding: 6px 8px; border-radius: 6px; margin-top: 2px; white-space: nowrap; }
.bricka.ja { background: rgba(111,227,162,.16); color: #8ff0b8; }
.bricka.nej { background: rgba(255,120,140,.14); color: #ff9fb0; }
.lek-dold { display: none; }

.lek-val { display: grid; grid-template-columns: 30px 1fr; gap: 10px; align-items: center; margin: 0 0 12px; }
.lek-val .bok { font: 500 13px/1 var(--mono); color: var(--dim); }
.lek-val .uttr { display: flex; align-items: center; gap: 10px; font-size: 19px; color: #fff; }
.lek-val button { width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--kant); background: rgba(255,255,255,.05); color: #fff; font: 500 20px/1 var(--sans); cursor: pointer; }
.lek-val button:hover { border-color: rgba(255,255,255,.45); }
.lek-val button.ja { border-color: #6fe3a2; background: rgba(111,227,162,.14); }
.lek-val button.nej { border-color: rgba(255,120,140,.7); }

.lek-knappar { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
.lek-knapp { display: inline-flex; align-items: center; gap: 8px; padding: 11px 16px; border-radius: 99px; border: 1px solid var(--kant); background: rgba(255,255,255,.04); color: var(--ink); font: 500 13px/1 var(--sans); cursor: pointer; text-decoration: none; transition: border-color .25s, background .25s; }
.lek-knapp:hover { border-color: rgba(255,255,255,.45); }
.lek-knapp.prim { background: linear-gradient(135deg, #ffe2a3, #ffb547); color: #1a1205; border-color: transparent; }
.lek-knapp svg { width: 15px; height: 15px; }

.lek-plattor { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 4px 0 16px; }
.lek-platta { text-align: left; padding: 14px; border-radius: 14px; border: 1px solid var(--kant); background: rgba(255,255,255,.04); color: #fff; cursor: pointer; min-height: 92px; font-size: 14px; line-height: 1.55; transition: border-color .25s, background .25s; }
.lek-platta:hover { border-color: rgba(255,255,255,.4); }
.lek-platta .bok { font: 500 11px/1 var(--mono); color: var(--faint); display: block; margin-bottom: 8px; }
.lek-platta .upp { font-size: 17px; }
.lek-platta .los { display: none; color: #c4cbe0; }
.lek-platta.vand { border-color: var(--lc); background: rgba(255,210,122,.06); }
.lek-platta.vand .los { display: block; margin-top: 8px; }
.lek-platta .tryck { display: block; margin-top: 8px; font: 400 11px/1 var(--mono); color: var(--faint); }
.lek-platta.vand .tryck { display: none; }

.lek-sam { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 0 0 18px; }
.lek-sam > div { padding: 14px 16px; border-radius: 14px; background: rgba(255,255,255,.04); border: 1px solid var(--kant); font-size: 13.5px; line-height: 1.6; }
.lek-sam h4 { font: 500 11px/1.4 var(--mono); letter-spacing: .1em; color: var(--lc); margin: 0 0 8px; }
.lek-sam ul { margin: 0; padding-left: 16px; }

.lek-nav { position: absolute; left: 24px; right: 24px; bottom: 22px; display: flex; align-items: center; gap: 14px; }
.lek-tid { flex: 1; display: flex; gap: 10px; align-items: flex-end; height: 34px; min-width: 0; }
.lek-grupp { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.lek-grupp .dl { font: 500 10px/1 var(--mono); letter-spacing: .12em; color: var(--faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .3s; }
.lek-grupp.nu .dl { color: var(--ink); }
.lek-grupp .segs { display: flex; gap: 4px; align-items: center; height: 5px; }
.lek-seg { flex: 1; height: 3px; border-radius: 3px; background: rgba(255,255,255,.12); cursor: pointer; position: relative; transition: background .4s, height .3s; }
.lek-seg::after { content: ''; position: absolute; left: 0; right: 0; top: -10px; bottom: -10px; }
.lek-seg.gjord { background: rgba(255, 210, 122, .45); }
.lek-seg.nu { background: var(--lc); height: 5px; box-shadow: 0 0 12px var(--lc); }
.lek-nr { font: 500 12px/1 var(--mono); color: var(--dim); min-width: 58px; text-align: center; }
.lek-pil { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; background: var(--glas); border: 1px solid var(--kant); color: var(--ink); cursor: pointer; }
.lek-pil:hover { border-color: rgba(255,255,255,.4); }
.lek-pil[disabled] { opacity: .3; pointer-events: none; }
.lek-pil svg { width: 18px; height: 18px; }
.lek-fram { display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 20px 0 22px; border-radius: 99px; border: 0; background: linear-gradient(135deg, #ffe2a3, #ffb547); color: #1a1205; font: 600 14px/1 var(--sans); cursor: pointer; transition: transform .25s, box-shadow .25s; }
.lek-fram:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(255, 181, 71, .35); }
.lek-fram svg { width: 16px; height: 16px; }

/* etiketter i 3D */
.lt { font: 500 18px/1 var(--sans); color: #fff; opacity: 0; transition: opacity .7s var(--ease), color .3s, font-size .3s; text-shadow: 0 0 14px rgba(0,0,0,.95), 0 0 4px rgba(0,0,0,.9); pointer-events: none; padding: 4px 6px; border-radius: 8px; }
.lt.syns { opacity: 1; }
.lt.klick { pointer-events: auto; cursor: pointer; }
.lt.klick:hover { background: rgba(255,255,255,.08); }
/* OBS: aldrig transform eller scale här. CSS2DRenderer äger transform, och scale skalar då hela positionen. */
.lt.vald { color: var(--lc); font-size: 23px; }
.lt.puls { animation: lekpuls 1.2s ease-in-out 2; }
@keyframes lekpuls { 50% { font-size: 25px; color: var(--lc); } }
.mt { display: inline-flex; align-items: center; gap: 8px; padding: 5px 11px 5px 8px; border-radius: 99px; font: 500 12.5px/1 var(--sans); color: #fff; background: rgba(5, 7, 16, .78); border: 1px solid var(--rc); opacity: 0; transition: opacity .7s var(--ease), border-color .3s; white-space: nowrap; pointer-events: none; }
.mt .katex { font-size: 1.25em; color: var(--rc); }
.mt.syns { opacity: 1; }
.mt.syns.utan { opacity: .28; }
.mt.med { box-shadow: 0 0 18px var(--rc); }
.tl { font: 500 13px/1 var(--sans); color: #aeb7cf; opacity: 0; transition: opacity .6s, color .3s, font-size .3s; text-shadow: 0 0 8px #000; pointer-events: none; }
.tl.syns { opacity: 1; }
.tl.noll { color: #fff; font-weight: 600; }
.tl.mark { color: var(--lc); font-size: 17px; font-weight: 600; }
.rk { font: 500 13px/1 var(--sans); opacity: 0; transition: opacity .7s; white-space: nowrap; pointer-events: none; }
.rk.syns { opacity: 1; }
.rk.neg { color: #8fb3ff; }
.rk.pos { color: #ffc069; }
.mk { font: 600 14px/1 var(--sans); color: #1a1205; background: var(--lc); padding: 6px 10px; border-radius: 99px; opacity: 0; transition: opacity .4s; white-space: nowrap; pointer-events: none; box-shadow: 0 0 22px rgba(255, 190, 90, .55); }
.mk.syns { opacity: 1; }
.hp { font: 500 16px/1 var(--sans); color: #fff; opacity: 0; transition: opacity .4s; white-space: nowrap; pointer-events: none; text-shadow: 0 0 10px #000; }
.hp .katex { font-size: 1.1em; }
.hp.syns { opacity: 1; }

/* pennlösningen */
.lek-penna { position: fixed; inset: 0; z-index: 30; display: grid; place-items: center; padding: 24px; background: rgba(2, 3, 8, .72); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: lekin .4s var(--ease); }
@keyframes lekin { from { opacity: 0; } }
.lek-penna .ark { position: relative; width: min(780px, 100%); max-height: calc(100vh - 48px); overflow-y: auto; background: linear-gradient(160deg, #f2ecdf, #e9e0cd); color: #0f1620; border-radius: 18px; padding: 26px 24px 20px; box-shadow: 0 30px 90px rgba(0,0,0,.6); }
.lek-penna .ark > .rubrik { font: 500 11px/1 var(--mono); letter-spacing: .14em; color: #6b6253; margin: 0 40px 14px 0; }
.lek-penna .ark .uppg > p { background: rgba(255,255,255,.55); border: 1px solid rgba(15,22,32,.14); border-radius: 10px; padding: 14px 18px; margin: 0 0 18px; font-size: 16px; line-height: 1.55; }
.lek-penna .stang { position: absolute; top: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%; border: 1px solid rgba(15,22,32,.2); background: rgba(255,255,255,.5); cursor: pointer; display: grid; place-items: center; color: #0f1620; }

@media (max-width: 760px) {
  .lek-topp { top: 12px; left: 14px; right: 14px; }
  .lek-titel { font-size: 14px; }
  .lek-id { font-size: 10px; }
  .lek-ut span { display: none; }
  .lek-ut { padding: 10px 12px; }
  .lek-kort, .lek-kort.bred { left: 10px; right: 10px; width: auto; top: auto; bottom: 74px; max-height: 50vh; }
  .lek-ruta { padding: 20px 18px 18px; border-radius: 18px; }
  .lek-ruta h2 { font-size: 21px; margin: 8px 0 12px; }
  .lek-text { font-size: 14.5px; }
  .lek-nav { left: 10px; right: 10px; bottom: 12px; gap: 8px; }
  .lek-grupp .dl { display: none; }
  .lek-tid { gap: 6px; }
  .lek-tid { height: 20px; }
  .lek-nr { display: none; }
  .lek-fram { padding: 0 16px; }
  .lek-sam { grid-template-columns: 1fr; }
  .lek-plattor { grid-template-columns: 1fr 1fr; }
  .lt { font-size: 15px; }
  .mt { padding: 4px 7px; gap: 0; }
  .mt span { display: none; }
  .lek-id .niva { display: none; }
}
`;

/* ------------------------------------------------------------------------
   Genomgången 1.1 Talmängder och negativa tal (data/teori/ma1c-1.1.md)
   ------------------------------------------------------------------------ */
const RINGAR = [
  { m: 'N', rx: 5, ry: 3.2, farg: '#ffd27a', tex: '\\mathbb{N}', namn: 'Naturliga tal', ett: 'ett naturligt tal' },
  { m: 'Z', rx: 9, ry: 5.6, farg: '#ff9a5c', tex: '\\mathbb{Z}', namn: 'Heltal', ett: 'ett heltal' },
  { m: 'Q', rx: 13.5, ry: 8.2, farg: '#5fe0d2', tex: '\\mathbb{Q}', namn: 'Rationella tal', ett: 'ett rationellt tal' },
  { m: 'R', rx: 18.5, ry: 11, farg: '#a9b8ff', tex: '\\mathbb{R}', namn: 'Reella tal', ett: 'ett reellt tal' },
];
const MI = { N: 0, Z: 1, Q: 2, R: 3 };
const TAL = [
  { id: '0', tex: '0', m: 'N', p: [-2.6, 0.5] }, { id: '1', tex: '1', m: 'N', p: [-1, 1.7] },
  { id: '2', tex: '2', m: 'N', p: [1, 1.8] }, { id: '3', tex: '3', m: 'N', p: [2.7, 0.3] },
  { id: '5', tex: '5', m: 'N', p: [-1.2, -1.6] }, { id: '25', tex: '25', m: 'N', p: [1.4, -1.6] },
  { id: '-1', tex: '-1', m: 'Z', p: [-6.8, 1.6] }, { id: '-2', tex: '-2', m: 'Z', p: [6.6, -2.4] },
  { id: '-3', tex: '-3', m: 'Z', p: [-5.4, -3.5] },
  { id: '1/3', tex: '\\dfrac{1}{3}', m: 'Q', p: [-10.6, 3.2] }, { id: '-0,25', tex: '-0{,}25', m: 'Q', p: [10.6, 2.8] },
  { id: 'pi', tex: '\\pi', m: 'R', p: [-15.6, 2.8] }, { id: 'rot2', tex: '\\sqrt{2}', m: 'R', p: [15, -4.4] },
  // talen i exempel 1 (flyger in när de väljs)
  { id: '5/2', tex: '\\dfrac{5}{2}', m: 'Q', p: [0, -6.9], ex: 1 }, { id: '-3/4', tex: '-\\dfrac{3}{4}', m: 'Q', p: [-8, -5.6], ex: 1 },
  { id: '0,7', tex: '0{,}7', m: 'Q', p: [9, -5], ex: 1 }, { id: '4', tex: '4', m: 'N', p: [0, 0.1], ex: 1 },
  { id: '8/2', tex: '\\dfrac{8}{2}', m: 'N', p: [-3.7, -0.9], ex: 1 }, { id: '-6', tex: '-6', m: 'Z', p: [6.2, 2.6], ex: 1 },
];
const GRUND = TAL.filter((t) => !t.ex);
const upTill = (k) => GRUND.filter((t) => MI[t.m] < k).map((t) => t.id);

const EX1 = {
  ordning: ['4', '1/3', 'rot2', '-6', '0,7', '8/2', 'pi', '-3/4', '5/2'],
  svar: {
    '1/3': [1, 'Ett bråk som inte går jämnt ut. Talet ligger mellan heltalen 0 och 1, så det är rationellt men inte ett heltal.'],
    '5/2': [1, '$\\dfrac{5}{2}$ är samma tal som 2,5, och bråket går inte jämnt ut.'],
    '-3/4': [1, 'Negativa tal kan också vara rationella, och $-\\dfrac{3}{4}$ är inte ett heltal.'],
    '0,7': [1, 'Det spelar ingen roll om talet skrivs som decimaltal: 0,7 kan skrivas $\\dfrac{7}{10}$.'],
    '4': [0, '4 är ett heltal (och dessutom ett naturligt tal).'],
    '-6': [0, '$-6$ är ett heltal.'],
    '8/2': [0, 'Bråket går jämnt ut, så $\\dfrac{8}{2}$ är heltalet 4.'],
    'rot2': [0, '$\\sqrt{2}$ går inte att skriva som ett bråk med heltal och är därför inte ens rationellt.'],
    'pi': [0, '$\\pi$ går inte att skriva som ett bråk med heltal och är därför inte ens rationellt.'],
  },
};

const PI_DEC = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

const FRAGOR = {
  talmangd: 'Ange ett rationellt tal som inte är ett heltal.',
  olikhet: 'Sätt ut korrekt olikhetstecken, &lt; eller &gt;, mellan talen.<br>a) 23&emsp;19&emsp;&emsp;&emsp;&emsp;b) −20&emsp;−3',
  negadd: 'Beräkna<br>a)&nbsp;$4 - (-9)$&emsp;&emsp;b)&nbsp;$25 + (-10)$',
  negmult: 'Beräkna<br>a)&nbsp;$4 \\cdot (-3)$&emsp;&emsp;b)&nbsp;$(-5) \\cdot (-9)$&emsp;&emsp;c)&nbsp;$\\dfrac{35}{(-7)}$&emsp;&emsp;d)&nbsp;$\\dfrac{(-42)}{(-7)}$',
  termometer: 'Beräkna $(-5) - 3$',
};

const PENNA_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
const pennKnapp = (typ) => `<button class="lek-knapp" data-penna="${typ}">${PENNA_SVG}Se lösningen med penna</button>`;
const PIL_H = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const PIL_V = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';

function genomgang11() {
  return {
    id: 'ma1c-1.1',
    num: '1.1',
    titel: 'Talmängder och negativa tal',
    steg: [
      { del: 'Introduktion', rubrik: 'Alla tal har ett hem',
        text: `<p>Alla tal kan delas in i så kallade <strong>talmängder</strong>: samlingar av tal med en gemensam egenskap, till exempel alla heltal eller alla tal på tallinjen.</p>
<p>Vi börjar i mitten, med de tal du räknade med allra först, och bygger sedan utåt, mängd för mängd.</p>`,
        scen(L) { L.form('moln'); L.kamera([0, 6, 58], [0, 0, 0]); } },

      { del: 'Talmängder', rubrik: 'Naturliga tal',
        text: `<p><strong>Naturliga tal</strong> är alla icke-negativa heltal, till exempel 0, 1, 2, 3 och så vidare.</p>
<p>Mängden naturliga tal betecknas $\\mathbb{N}$ och kan skrivas</p>
$$\\mathbb{N} = \\{0,\\ 1,\\ 2,\\ 3,\\ \\ldots\\}$$`,
        scen(L) { L.mangder(1, upTill(1)); L.kamera([0, 3, 19], [0, 0.4, 0]); } },

      { del: 'Talmängder', rubrik: 'Heltal',
        text: `<p><strong>Heltal</strong> är samtliga heltal, även de negativa, till exempel −3, 0, 5 och 25.</p>
<p>Mängden heltal betecknas $\\mathbb{Z}$ och kan skrivas</p>
$$\\mathbb{Z} = \\{\\ldots,\\ -2,\\ -1,\\ 0,\\ 1,\\ 2,\\ \\ldots\\}$$
<p>De naturliga talen ligger kvar i mitten. De negativa heltalen får plats i ringen runt dem.</p>`,
        scen(L) { L.mangder(2, upTill(2)); L.kamera([0, 4, 27], [0, 0.6, 0]); } },

      { del: 'Talmängder', rubrik: 'Rationella tal',
        text: `<p><strong>Rationella tal</strong> är alla tal som kan skrivas som ett bråk, till exempel $\\dfrac{1}{3}$, $-0{,}25$ och 5.</p>
<p>Mängden rationella tal betecknas $\\mathbb{Q}$ och består av alla tal som kan skrivas på formen</p>
$$\\frac{a}{b}$$
<p>där $a$ och $b$ är heltal och $b \\neq 0$. Även 5 hör hit, eftersom $5 = \\dfrac{5}{1}$.</p>`,
        scen(L) { L.mangder(3, upTill(3)); L.kamera([0, 5, 35], [0, 0.8, 0]); } },

      { del: 'Talmängder', rubrik: 'Reella tal',
        text: `<p><strong>Reella tal</strong> är samtliga tal som finns på tallinjen. Här ingår även de <strong>irrationella talen</strong>, det vill säga tal som <em>inte</em> kan skrivas som ett bråk, till exempel $\\pi$ och $\\sqrt{2}$.</p>
<p>Ett irrationellt tal har en oändlig decimalutveckling som aldrig upprepar sig:</p>
<div class="lek-pi"><span>π = 3,</span></div>
<p>Mängden reella tal betecknas $\\mathbb{R}$ och kan skrivas $\\mathbb{R} = \\{\\text{alla tal på tallinjen}\\}$.</p>`,
        scen(L) { L.mangder(4, upTill(4)); L.kamera([0, 6, 42], [0, 1, 0]); },
        aktiv(L, el) {
          const pi = el.querySelector('.lek-pi span');
          let n = 0;
          const id = setInterval(() => { if (n < PI_DEC.length) { pi.textContent += PI_DEC[n++]; } else { pi.textContent += '…'; clearInterval(id); } }, 110);
          return () => clearInterval(id);
        } },

      { del: 'Talmängder', rubrik: 'Mängderna ligger inuti varandra',
        text: `<p>Alla naturliga tal är alltså även heltal, rationella tal och reella tal. Alla heltal är även rationella tal och reella tal, men inte nödvändigtvis naturliga tal.</p>
<p class="lek-uppmaning">Klicka på ett tal i rymden, så ser du vilka mängder det tillhör.</p>
<div class="lek-avlas">Inget tal valt än.</div>`,
        scen(L) { L.mangder(4, upTill(4)); L.kamera([0, 6, 42], [0, 1, 0]); },
        aktiv(L, el) {
          const ruta = el.querySelector('.lek-avlas');
          L.klickbaraTal(upTill(4), (t) => {
            const i = MI[t.m];
            const med = RINGAR.slice(i).map((r) => r.ett);
            const utan = RINGAR.slice(0, i).map((r) => r.ett);
            const lista = (a) => (a.length > 1 ? a.slice(0, -1).join(', ') + ' och ' + a[a.length - 1] : a[0]);
            ruta.classList.add('full');
            ruta.innerHTML = `$${t.tex}$ är ${lista(med)}` + (utan.length ? `, men inte ${utan.length > 1 ? lista(utan).replace(' och ', ' eller ') : utan[0]}.` : '.');
            matte(ruta);
            L.lysMangder(t.m);
          });
          return () => L.lysMangder(null);
        } },

      { del: 'Talmängder', rubrik: 'Exempel 1', penna: 'talmangd',
        text: `<p class="lek-fraga">Ange ett rationellt tal som inte är ett heltal.</p>
<p>Välj bland talen nedan. Varje tal du väljer flyger till sin plats bland mängderna.</p>
<div class="lek-chips"></div>
<div class="lek-svar"></div>
<div class="lek-mer lek-dold"><p>Uppgiften har oändligt många rätta svar: varje bråk som <strong>inte går jämnt ut</strong> duger, och det spelar ingen roll om talet skrivs som bråk eller som decimaltal.</p>
<p><strong>Svar:</strong> Till exempel $\\dfrac{1}{3}$ (även $\\dfrac{5}{2}$, $-\\dfrac{3}{4}$ och 0,7 är rätta svar)</p></div>
<div class="lek-knappar">${pennKnapp('talmangd')}</div>`,
        scen(L) { L.mangder(4, upTill(4)); L.kamera([0, 6, 42], [0, 1, 0]); },
        aktiv(L, el) {
          const chips = el.querySelector('.lek-chips'), svar = el.querySelector('.lek-svar'), mer = el.querySelector('.lek-mer');
          chips.innerHTML = EX1.ordning.map((id) => `<button class="lek-chip" data-id="${id}">${tex(TAL.find((t) => t.id === id).tex)}</button>`).join('');
          chips.querySelectorAll('.lek-chip').forEach((b) => b.addEventListener('click', () => {
            const id = b.dataset.id, [ok, txt] = EX1.svar[id];
            b.classList.add(ok ? 'ja' : 'nej');
            svar.innerHTML = `<div class="rad"><span class="bricka ${ok ? 'ja' : 'nej'}">${ok ? 'DUGER' : 'DUGER INTE'}</span><span>${txt}</span></div>`;
            matte(svar);
            L.flygIn(id, b);
            if (ok) { L.ljud('ja'); mer.classList.remove('lek-dold'); } else L.ljud('nej');
          }));
        } },

      { del: 'Negativa tal', rubrik: 'Till vänster om noll',
        text: `<p>Tal som är mindre än 0 kallas <strong>negativa tal</strong>. På tallinjen ligger de till vänster om 0.</p>
<p>Negativa tal skrivs med minustecken och ofta inom parentes vid beräkningar, till exempel $(-3)$.</p>
<p class="lek-obs"><strong>0 är varken positivt eller negativt.</strong></p>`,
        scen(L) { L.linje({ tal: L.intervall(-4, 4), riktning: true }); L.kamera([0, 2.6, 11.5], [0, -0.4, 0]); } },

      { del: 'Negativa tal', rubrik: 'Olikhetstecken',
        text: `<p>Tecken som anger att två led är olika stora kallas <strong>olikhetstecken</strong> och skrivs $<$ eller $>$.</p>
<ul><li>$<$ betyder mindre än</li><li>$>$ betyder större än</li></ul>
<p>En kom ihåg-regel är att olikhetstecknet <strong>gapar</strong> åt det större värdet. På tallinjen ligger det större talet alltid längre till höger, som $-3 < 2$.</p>`,
        scen(L) { L.linje({ tal: L.intervall(-4, 4), mark: [-3, 2] }); L.svavande('-3 < 2', [-0.5, 1.7, 0]); L.kamera([0, 2.6, 11.5], [0, 0, 0]); } },

      { del: 'Negativa tal', rubrik: 'Exempel 2', penna: 'olikhet',
        text: `<p class="lek-fraga">Sätt ut korrekt olikhetstecken, $<$ eller $>$, mellan talen.</p>
<div class="lek-val" data-del="a"><span class="bok">a)</span><span class="uttr">23 <button data-v="<">&lt;</button><button data-v=">">&gt;</button> 19</span></div>
<div class="lek-val" data-del="b"><span class="bok">b)</span><span class="uttr">−20 <button data-v="<">&lt;</button><button data-v=">">&gt;</button> −3</span></div>
<div class="lek-svar"></div>
<div class="lek-knappar">${pennKnapp('olikhet')}</div>`,
        scen(L) { L.linje({ tal: L.femtal(-25, 25).concat([23, 19, -20, -3]), mark: [23, 19, -20, -3] }); L.kamera([1.5, 7, 46], [1.5, 0, 0]); },
        aktiv(L, el) {
          const svar = el.querySelector('.lek-svar');
          const RATT = { a: '>', b: '<' };
          const TXT = {
            a: ['Talet längst till höger på tallinjen är det största talet.', '$23 > 19$'],
            b: ['Ju längre till vänster på tallinjen ett tal ligger, desto mindre är det, och −20 ligger till vänster om −3.', '$(-20) < (-3)$'],
          };
          const visat = {};
          el.querySelectorAll('.lek-val').forEach((rad) => rad.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
            const d = rad.dataset.del, ok = b.dataset.v === RATT[d];
            rad.querySelectorAll('button').forEach((x) => x.classList.remove('ja', 'nej'));
            b.classList.add(ok ? 'ja' : 'nej');
            L.ljud(ok ? 'ja' : 'nej');
            if (ok) visat[d] = `<div class="rad"><span class="bricka ja">${d.toUpperCase()}</span><span>${TXT[d][0]}<br><strong>Svar:</strong> ${TXT[d][1]}</span></div>`;
            else visat[d] = `<div class="rad"><span class="bricka nej">${d.toUpperCase()}</span><span>Inte riktigt. Titta på tallinjen: vilket av talen ligger längst till höger?</span></div>`;
            svar.innerHTML = (visat.a || '') + (visat.b || '');
            matte(svar);
          })));
        } },

      { del: 'Räkneregler', rubrik: 'Addition och subtraktion',
        text: `$$a + (-b) = a - b \\qquad a - (-b) = a + b$$
<p>Med ord: <strong>lika tecken</strong> (minus och minus eller plus och plus) ihop kan ersättas med ett plustecken. <strong>Olika tecken</strong> (plus och minus eller minus och plus) ihop kan ersättas med ett minustecken.</p>
<p>Minnesregel: ”minus minus ger plus” och ”plus minus ger minus”.</p>`,
        scen(L) { L.linje({ tal: L.intervall(-5, 15) }); L.kamera([5, 3.5, 22], [5, 0, 0]); } },

      { del: 'Räkneregler', rubrik: 'Exempel 3a', penna: 'negadd',
        text: `<p class="lek-fraga">Beräkna $4 - (-9)$</p>
<p>Tänk efter först. Tryck sedan på Visa, så tar markören steget längs tallinjen.</p>
<div class="lek-knappar"><button class="lek-knapp prim" data-visa>Visa</button></div>
<div class="lek-losning lek-dold"><p>Två minustecken ihop ersätts med ett plustecken:</p>$$4 - (-9) = 4 + 9 = 13$$<p><strong>Svar:</strong> 13</p></div>
<div class="lek-knappar">${pennKnapp('negadd')}</div>`,
        scen(L) { L.linje({ tal: L.intervall(-1, 16) }); L.markor(4, '4'); L.kamera([8, 3.5, 19], [8, 0.8, 0]); },
        aktiv(L, el) { L.visaKnapp(el, () => L.hoppa(4, 13, '+9', '13')); } },

      { del: 'Räkneregler', rubrik: 'Exempel 3b', penna: 'negadd',
        text: `<p class="lek-fraga">Beräkna $25 + (-10)$</p>
<p>Tänk efter först. Tryck sedan på Visa.</p>
<div class="lek-knappar"><button class="lek-knapp prim" data-visa>Visa</button></div>
<div class="lek-losning lek-dold"><p>Plus och minus ihop ersätts med ett minustecken:</p>$$25 + (-10) = 25 - 10 = 15$$<p><strong>Svar:</strong> 15</p></div>
<div class="lek-knappar">${pennKnapp('negadd')}</div>`,
        scen(L) { L.linje({ tal: L.intervall(12, 26) }); L.markor(25, '25'); L.kamera([19.5, 3.5, 18], [19.5, 0.8, 0]); },
        aktiv(L, el) { L.visaKnapp(el, () => L.hoppa(25, 15, '-10', '15')); } },

      { del: 'Räkneregler', rubrik: 'Multiplikation och division',
        text: `$$a \\cdot (-b) = (-a) \\cdot b = -(a \\cdot b)$$
$$(-a) \\cdot (-b) = a \\cdot b$$
$$\\frac{a}{(-b)} = \\frac{(-a)}{b} = -\\frac{a}{b} \\qquad \\frac{(-a)}{(-b)} = \\frac{a}{b}$$
<p>Med ord: <strong>lika tecken</strong> multiplicerat eller dividerat med varandra ger ett <strong>positivt</strong> värde. <strong>Olika tecken</strong> multiplicerat eller dividerat med varandra ger ett <strong>negativt</strong> värde.</p>
<p>Minnesregel: ”minus gånger minus ger plus” och ”plus gånger minus ger minus”.</p>
<p class="lek-uppmaning">I rymden: varje faktor $-1$ vänder pilen ett halvt varv runt noll. Två minustecken vänder den tillbaka.</p>`,
        scen(L) { L.linje({ tal: L.intervall(-4, 4) }); L.pil(true); L.kamera([0, 3.2, 12], [0, 0.6, 0]); } },

      { del: 'Räkneregler', rubrik: 'Exempel 4', penna: 'negmult',
        text: `<p class="lek-fraga">Beräkna</p>
<div class="lek-plattor">
<button class="lek-platta"><span class="bok">a)</span><span class="upp">$4 \\cdot (-3)$</span><span class="los">Olika tecken ger minus: $4 \\cdot (-3) = -12$<br><strong>Svar:</strong> −12</span><span class="tryck">Tryck för lösning</span></button>
<button class="lek-platta"><span class="bok">b)</span><span class="upp">$(-5) \\cdot (-9)$</span><span class="los">Lika tecken ger plus: $(-5) \\cdot (-9) = 45$<br><strong>Svar:</strong> 45</span><span class="tryck">Tryck för lösning</span></button>
<button class="lek-platta"><span class="bok">c)</span><span class="upp">$\\dfrac{35}{(-7)}$</span><span class="los">Olika tecken ger minus: $\\dfrac{35}{-7} = -5$<br><strong>Svar:</strong> −5</span><span class="tryck">Tryck för lösning</span></button>
<button class="lek-platta"><span class="bok">d)</span><span class="upp">$\\dfrac{(-42)}{(-7)}$</span><span class="los">Lika tecken ger plus: $\\dfrac{-42}{-7} = 6$<br><strong>Svar:</strong> 6</span><span class="tryck">Tryck för lösning</span></button>
</div>
<div class="lek-knappar">${pennKnapp('negmult')}</div>`,
        scen(L) { L.linje({ tal: L.intervall(-4, 4) }); L.pil(true); L.kamera([0, 3.2, 12], [0, 0.6, 0]); },
        aktiv(L, el) { el.querySelectorAll('.lek-platta').forEach((p) => p.addEventListener('click', () => { if (!p.classList.contains('vand')) L.ljud('ja'); p.classList.add('vand'); })); } },

      { del: 'Räkneregler', rubrik: 'Exempel 5: se upp med subtraktionen', penna: 'termometer',
        text: `<p class="lek-fraga">Beräkna $(-5) - 3$</p>
<p>Tänk efter först. Tryck sedan på Visa.</p>
<div class="lek-knappar"><button class="lek-knapp prim" data-visa>Visa</button></div>
<div class="lek-losning lek-dold">$$(-5) - 3 = -8$$<p><strong>Svar:</strong> −8</p>
<p class="lek-obs"><strong>OBS!</strong> Svaret blir inte 8. Det är inte två minustecken <em>ihop</em> och inte heller minus <em>gånger</em> minus. Tänk termometern: −5 grader, och så sjunker temperaturen 3 grader. Då blir det −8 grader.</p></div>
<div class="lek-knappar">${pennKnapp('termometer')}</div>`,
        scen(L) { L.termometer(); L.markor(-5, '−5 °C', 'y'); L.kamera([3, -1.5, 19], [0, -4.5, 0]); },
        aktiv(L, el) { L.visaKnapp(el, () => L.hoppa(-5, -8, '-3', '−8 °C', 'y')); } },

      { del: 'Sammanfattning', rubrik: 'Sammanfattning', bred: true,
        text: `<div class="lek-sam">
<div><h4>Talmängderna</h4><ul><li><strong>Naturliga tal</strong> $\\mathbb{N}$: alla icke-negativa heltal, alltså $0, 1, 2, 3, \\ldots$</li><li><strong>Heltal</strong> $\\mathbb{Z}$: även de negativa, $\\ldots, -2, -1, 0, 1, 2, \\ldots$</li><li><strong>Rationella tal</strong> $\\mathbb{Q}$: alla tal som kan skrivas som ett bråk $\\dfrac{a}{b}$ med heltal och $b \\neq 0$.</li><li><strong>Reella tal</strong> $\\mathbb{R}$: alla tal på tallinjen.</li></ul></div>
<div><h4>Irrationella tal</h4><ul><li>Tal som <strong>inte</strong> går att skriva som ett bråk, till exempel $\\pi$ och $\\sqrt{2}$.</li><li>Deras decimalutveckling är oändlig <strong>utan att upprepa sig</strong>.</li><li>De ingår i de reella talen men inte i de rationella.</li></ul></div>
<div><h4>Mängderna ligger inuti varandra</h4><ul><li>Varje naturligt tal är också heltal, rationellt och reellt.</li><li>Varje heltal är rationellt och reellt, men inte nödvändigtvis naturligt.</li></ul></div>
<div><h4>Olikhetstecken</h4><ul><li>$<$ betyder mindre än, $>$ betyder större än.</li><li>Tecknet <strong>gapar</strong> åt det större värdet.</li><li>Bland negativa tal är det med <strong>störst belopp</strong> minst: $-20 < -3$.</li></ul></div>
<div><h4>Addition och subtraktion med tecken</h4><ul><li>$a + (-b) = a - b$</li><li>$a - (-b) = a + b$</li><li><strong>Lika tecken ihop blir plus, olika tecken ihop blir minus.</strong></li></ul></div>
<div><h4>Multiplikation och division med tecken</h4><ul><li>$(-a) \\cdot (-b) = a \\cdot b$ och $a \\cdot (-b) = -(a \\cdot b)$.</li><li>$\\dfrac{-a}{-b} = \\dfrac{a}{b}$ och $\\dfrac{a}{-b} = -\\dfrac{a}{b}$.</li><li><strong>Lika tecken ger positivt, olika tecken ger negativt.</strong></li></ul></div>
</div>
<div class="lek-knappar"><button class="lek-knapp prim" data-klar>Tänd stjärnan och återvänd</button><a class="lek-knapp" href="../katalog.html?id=ma1c-1.1">Läs genomgången som vanlig text</a></div>`,
        scen(L) { L.form('spiral'); L.kamera([0, 22, 30], [0, 0, 0]); },
        aktiv(L, el) { el.querySelector('[data-klar]').addEventListener('click', () => L.avsluta(true)); } },
    ],
  };
}

const GENOMGANGAR = { 'ma1c-1.1': genomgang11 };
export const finns = (id) => id in GENOMGANGAR;

/* ------------------------------------------------------------------------
   Motorn
   ------------------------------------------------------------------------ */
const PARTIKEL_VERT = `
  uniform float uTime, uPR, uScale;
  attribute float aSize, aSeed;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vec3 p = position + 0.05 * vec3(sin(uTime * 0.7 + aSeed * 31.0), cos(uTime * 0.9 + aSeed * 17.0), sin(uTime * 0.6 + aSeed * 7.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vColor = color * (0.82 + 0.18 * sin(uTime * (0.8 + aSeed) + aSeed * 50.0));
    gl_PointSize = min(aSize * uScale / -mv.z, 36.0) * uPR;
    gl_Position = projectionMatrix * mv;
  }`;
const PARTIKEL_FRAG = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = pow(1.0 - d * 2.0, 1.7);
    gl_FragColor = vec4(vColor * a, a);
  }`;

export async function starta(ctx) {
  await laddaKatex();
  const def = GENOMGANGAR[ctx.avsnitt.id]();
  return new Genomgang(ctx, def);
}

class Genomgang {
  constructor(ctx, def) {
    this.ctx = ctx; this.def = def;
    const T = this.T = ctx.THREE;
    this.V = (x, y, z) => new T.Vector3(x, y, z);
    this.lc = ctx.farg;
    this.stadare = [];
    this.anim = [];
    this.tid = 0;

    if (!document.getElementById('lek-css')) {
      const st = document.createElement('style'); st.id = 'lek-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    this.byggScen();
    this.byggDom();
    this.byggMangder();
    this.byggLinje();
    this.byggTermometer();
    this.byggPil();
    this.byggMarkor();

    ctx.renderPass.scene = this.scen;
    ctx.renderPass.camera = this.kam;

    let start = 0;
    try { start = Math.min(def.steg.length - 1, +localStorage.getItem('mu-lek-' + def.id) || 0); } catch (e) {}
    this.i = -1;
    this.visa(start, true);
    requestAnimationFrame(() => this.dom.classList.add('pa'));

    this.onKey = (e) => {
      if (this.penna) { if (e.key === 'Escape') this.stangPenna(); return; }
      if (e.key === 'Escape') this.avsluta(false);
      else if (e.key === 'ArrowRight') this.visa(this.i + 1);
      else if (e.key === 'ArrowLeft') this.visa(this.i - 1);
    };
    this.onMus = (e) => { this.musMal = [e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1]; };
    this.onResize = () => { this.kam.aspect = innerWidth / innerHeight; this.kam.updateProjectionMatrix(); this.etiketter.setSize(innerWidth, innerHeight); this.uScale.value = this.pxSkala(); };
    addEventListener('keydown', this.onKey);
    addEventListener('pointermove', this.onMus);
    addEventListener('resize', this.onResize);
    this.mus = [0, 0]; this.musMal = [0, 0];
  }

  /* ---------------- grund ---------------- */
  byggScen() {
    const T = this.T;
    this.scen = new T.Scene();
    this.scen.background = new T.Color('#03040a');
    this.kam = new T.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 4000);
    this.scen.add(this.kam);
    this.pxSkala = () => innerHeight / (2 * Math.tan(T.MathUtils.degToRad(this.kam.fov) / 2));
    this.uTime = { value: 0 }; this.uScale = { value: this.pxSkala() };
    const uPR = { value: this.ctx.renderer.getPixelRatio() };
    this.uPR = uPR;

    // stjärnhimmel
    const NS = 2400, sp = new Float32Array(NS * 3), sc = new Float32Array(NS * 3), ss = new Float32Array(NS), sd = new Float32Array(NS);
    for (let i = 0; i < NS; i++) {
      const r = 300 + Math.random() * 900, u = Math.random() * 2 - 1, f = Math.random() * TAU, s = Math.sqrt(1 - u * u);
      sp.set([r * s * Math.cos(f), r * u, r * s * Math.sin(f)], i * 3);
      const k = 0.25 + Math.random() * 0.5; sc.set([k * 0.85, k * 0.9, k], i * 3);
      ss[i] = 3 + Math.random() * 6; sd[i] = Math.random();
    }
    const sg = new T.BufferGeometry();
    sg.setAttribute('position', new T.BufferAttribute(sp, 3)); sg.setAttribute('color', new T.BufferAttribute(sc, 3));
    sg.setAttribute('aSize', new T.BufferAttribute(ss, 1)); sg.setAttribute('aSeed', new T.BufferAttribute(sd, 1));
    this.scen.add(new T.Points(sg, new T.ShaderMaterial({ uniforms: { uTime: this.uTime, uPR, uScale: this.uScale }, vertexShader: PARTIKEL_VERT, fragmentShader: PARTIKEL_FRAG, transparent: true, depthWrite: false, blending: T.AdditiveBlending })));

    // nebulosor
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.3)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    const glod = new T.CanvasTexture(c); glod.colorSpace = T.SRGBColorSpace;
    [[[-60, 20, -160], this.lc, 260, 0.09], [[90, -40, -220], '#3a4cff', 340, 0.07], [[0, 0, -40], '#ff7a3d', 120, 0.04]].forEach(([p, f, s, o]) => {
      const sprite = new T.Sprite(new T.SpriteMaterial({ map: glod, color: new T.Color(f), transparent: true, opacity: o, depthWrite: false, blending: T.AdditiveBlending }));
      sprite.position.set(...p); sprite.scale.setScalar(s); this.scen.add(sprite);
    });

    // partiklarna som flyttar sig mellan formationerna
    const N = this.N = 2800;
    this.pPos = new Float32Array(N * 3); this.pMal = new Float32Array(N * 3);
    this.pCol = new Float32Array(N * 3); this.pColMal = new Float32Array(N * 3);
    this.pSize = new Float32Array(N); this.pSizeMal = new Float32Array(N);
    this.pFart = new Float32Array(N);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const r = 60 + Math.random() * 60, u = Math.random() * 2 - 1, f = Math.random() * TAU, s = Math.sqrt(1 - u * u);
      this.pPos.set([r * s * Math.cos(f), r * u, r * s * Math.sin(f)], i * 3);
      this.pFart[i] = 0.9 + Math.random() * 1.6; seed[i] = Math.random();
    }
    const pg = this.pGeo = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(this.pPos, 3));
    pg.setAttribute('color', new T.BufferAttribute(this.pCol, 3));
    pg.setAttribute('aSize', new T.BufferAttribute(this.pSize, 1));
    pg.setAttribute('aSeed', new T.BufferAttribute(seed, 1));
    const pts = new T.Points(pg, new T.ShaderMaterial({ uniforms: { uTime: this.uTime, uPR, uScale: this.uScale }, vertexShader: PARTIKEL_VERT, fragmentShader: PARTIKEL_FRAG, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    pts.frustumCulled = false;
    this.scen.add(pts);

    this.etiketter = new this.ctx.CSS2DRenderer();
    this.etiketter.setSize(innerWidth, innerHeight);
    this.etiketter.domElement.className = 'lek-etiketter';
    this.etiketter.domElement.style.setProperty('--lc', this.lc);
    document.body.appendChild(this.etiketter.domElement);

    this.kamMal = { pos: this.V(0, 10, 90), mal: this.V(0, 0, 0) };
    this.kamNu = { pos: this.V(0, 0, 3), mal: this.V(0, 0, 0) };
  }

  byggDom() {
    const d = this.def, el = this.dom = document.createElement('div');
    el.className = 'lek'; el.style.setProperty('--lc', this.lc);
    // tidslinjen: en grupp per del, bredd efter antalet steg
    const delar = [...new Set(d.steg.map((s) => s.del))];
    const seg = delar.map((del) => {
      const steg = d.steg.map((s, i) => [s, i]).filter(([s]) => s.del === del);
      return `<div class="lek-grupp" data-del="${del}" style="flex:${steg.length}"><span class="dl">${del.toUpperCase()}</span><div class="segs">${steg.map(([s, i]) => `<div class="lek-seg" data-i="${i}" title="${s.rubrik}" style="flex:1"></div>`).join('')}</div></div>`;
    }).join('');
    el.innerHTML = `
      <div class="lek-topp">
        <div><div class="lek-id">Avsnitt ${d.num} · <b>${this.ctx.avsnitt.w.namn}</b><span class="niva"> · ${this.ctx.avsnitt.w.niva}</span></div><div class="lek-titel">${d.titel}</div></div>
        <button class="lek-ut" aria-label="Tillbaka till universum"><span>Tillbaka till universum</span><kbd>Esc</kbd></button>
      </div>
      <div class="lek-kort"><div class="lek-ruta"><div class="lek-inne"></div></div></div>
      <nav class="lek-nav">
        <button class="lek-pil" data-bak aria-label="Föregående steg">${PIL_V}</button>
        <div class="lek-tid">${seg}</div>
        <span class="lek-nr"></span>
        <button class="lek-fram" data-fram><span>Fortsätt</span>${PIL_H}</button>
      </nav>`;
    document.body.appendChild(el);
    el.querySelector('.lek-ut').addEventListener('click', () => this.avsluta(false));
    el.querySelector('[data-bak]').addEventListener('click', () => this.visa(this.i - 1));
    el.querySelector('[data-fram]').addEventListener('click', () => { if (this.i === d.steg.length - 1) this.avsluta(true); else this.visa(this.i + 1); });
    el.querySelectorAll('.lek-seg').forEach((s) => s.addEventListener('click', () => this.visa(+s.dataset.i)));
    this.kort = el.querySelector('.lek-kort');
    this.inne = el.querySelector('.lek-inne');
  }

  etikett(html, cls, foralder, pos, center) {
    const e = document.createElement('div');
    e.className = cls; e.innerHTML = html;
    const o = new this.ctx.CSS2DObject(e);
    if (pos) o.position.copy(pos);
    if (center) o.center.set(center[0], center[1]);
    (foralder || this.scen).add(o);
    return { o, e };
  }

  /* ---------------- talmängderna ---------------- */
  byggMangder() {
    const T = this.T;
    const g = this.mGrupp = new T.Group();
    g.rotation.set(-0.42, 0.1, 0);
    this.scen.add(g);
    g.updateMatrixWorld(true);
    this.taggar = {};
    RINGAR.forEach((r) => {
      const t = this.etikett(`${tex(r.tex)}<span>${r.namn}</span>`, 'mt', g, this.V(0, r.ry, 0));
      t.e.style.setProperty('--rc', r.farg);
      this.taggar[r.m] = t;
    });
    this.tal = {};
    TAL.forEach((t) => {
      const l = this.etikett(tex(t.tex), 'lt', g, this.V(t.p[0], t.p[1], 0));
      l.e.style.setProperty('--lc', RINGAR[MI[t.m]].farg);
      this.tal[t.id] = { ...t, ...l };
    });
    this.ringLjus = { N: 1, Z: 1, Q: 1, R: 1 };
  }
  mangder(k, ids) {
    this.mK = k;
    this.form('mangder', { k });
    RINGAR.forEach((r, i) => this.taggar[r.m].e.classList.toggle('syns', i < k));
    ids.forEach((id) => this.tal[id].e.classList.add('syns'));
  }
  klickbaraTal(ids, fn) {
    ids.forEach((id) => {
      const t = this.tal[id];
      t.e.classList.add('klick');
      const h = () => {
        Object.values(this.tal).forEach((x) => x.e.classList.remove('vald'));
        t.e.classList.add('vald'); this.ljud('ja'); fn(t);
      };
      t.e.addEventListener('click', h);
      this.stadare.push(() => { t.e.removeEventListener('click', h); t.e.classList.remove('klick', 'vald'); });
    });
  }
  lysMangder(m) {
    RINGAR.forEach((r, i) => {
      const med = m && i >= MI[m];
      this.taggar[r.m].e.classList.toggle('med', !!med);
      this.taggar[r.m].e.classList.toggle('utan', !!m && !med);
      this.ringLjus[r.m] = !m ? 1 : med ? 1.5 : 0.25;
    });
    this.form('mangder', { k: this.mK || 4 });
  }
  flygIn(id, knapp) {
    // finns talet redan i scenen: låt det pulsera i stället för att dubbleras
    const t = this.tal[id];
    if (!t.ex) { t.e.classList.remove('puls'); void t.e.offsetWidth; t.e.classList.add('puls'); return; }
    if (t.e.classList.contains('syns')) { t.e.classList.remove('puls'); void t.e.offsetWidth; t.e.classList.add('puls'); return; }
    // startpunkt: knappens position på skärmen, projicerad in i ringarnas plan
    const r = knapp.getBoundingClientRect();
    const ndc = this.V((r.left + r.width / 2) / innerWidth * 2 - 1, -((r.top + r.height / 2) / innerHeight) * 2 + 1, 0.5);
    ndc.unproject(this.kam);
    const rikt = ndc.sub(this.kam.position).normalize();
    const start = this.kam.position.clone().addScaledVector(rikt, 12);
    this.mGrupp.worldToLocal(start);
    const mal = this.V(t.p[0], t.p[1], 0);
    t.o.position.copy(start);
    t.e.classList.add('syns');
    this.anim.push({ t: 0, tid: 1.3, steg: (k) => { t.o.position.lerpVectors(start, mal, ease(k)); }, slut: () => { t.e.classList.remove('puls'); void t.e.offsetWidth; t.e.classList.add('puls'); } });
  }

  /* ---------------- tallinjen ---------------- */
  byggLinje() {
    const T = this.T, g = this.lGrupp = new T.Group();
    this.scen.add(g);
    const MIN = -27, MAX = 27;
    const mat = this.lMat = new T.LineBasicMaterial({ color: new T.Color('#dfe6ff'), transparent: true, opacity: 0 });
    g.add(new T.Line(new T.BufferGeometry().setFromPoints([this.V(MIN, 0, 0), this.V(MAX, 0, 0)]), mat));
    const tp = [];
    for (let x = -26; x <= 26; x++) { const h = x === 0 ? 0.32 : x % 5 === 0 ? 0.24 : 0.16; tp.push(this.V(x, -h, 0), this.V(x, h, 0)); }
    g.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(tp), mat));
    // pilspets bara åt det positiva hållet
    this.lSpets = new T.Mesh(new T.ConeGeometry(0.16, 0.55, 20), new T.MeshBasicMaterial({ color: new T.Color('#dfe6ff'), transparent: true, opacity: 0 }));
    this.lSpets.rotation.z = -Math.PI / 2; this.lSpets.position.x = MAX + 0.2;
    g.add(this.lSpets);
    this.lOpac = 0; this.lOpacMal = 0;
    this.tl = {};
    for (let x = -26; x <= 26; x++) {
      const l = this.etikett(x < 0 ? '−' + -x : String(x), 'tl' + (x === 0 ? ' noll' : ''), g, this.V(x, -0.62, 0), [0.5, 0]);
      this.tl[x] = l;
    }
    this.rk = [this.etikett('← negativa tal', 'rk neg', g, this.V(-0.6, -1.7, 0), [1, 0.5]), this.etikett('positiva tal →', 'rk pos', g, this.V(0.6, -1.7, 0), [0, 0.5])];
    this.svav = this.etikett('', 'hp', this.scen, this.V(0, 0, 0));
    // små ljuspunkter på markerade tal
    this.prickar = [0, 1, 2, 3].map(() => {
      const m = new T.Mesh(new T.SphereGeometry(0.13, 16, 12), new T.MeshBasicMaterial({ color: new T.Color(this.lc).multiplyScalar(3), toneMapped: false }));
      m.visible = false; g.add(m); return m;
    });
  }
  intervall(a, b) { const r = []; for (let x = a; x <= b; x++) r.push(x); return r; }
  femtal(a, b) { return this.intervall(a, b).filter((x) => x % 5 === 0); }
  linje(o) {
    this.lOpacMal = 1;
    this.form('linje', o);
    (o.tal || []).forEach((x) => this.tl[x] && this.tl[x].e.classList.add('syns'));
    (o.mark || []).forEach((x, i) => {
      if (this.tl[x]) this.tl[x].e.classList.add('mark');
      if (this.prickar[i]) { this.prickar[i].visible = true; this.prickar[i].position.set(x, 0, 0); }
    });
    if (o.riktning) this.rk.forEach((r) => r.e.classList.add('syns'));
  }
  svavande(texstr, p) {
    this.svav.e.innerHTML = tex(texstr);
    this.svav.o.position.set(...p);
    this.svav.e.classList.add('syns');
  }

  /* ---------------- termometern ---------------- */
  byggTermometer() {
    const T = this.T, g = this.tGrupp = new T.Group();
    this.scen.add(g);
    const mat = this.tMat = new T.LineBasicMaterial({ color: new T.Color('#dfe6ff'), transparent: true, opacity: 0 });
    g.add(new T.Line(new T.BufferGeometry().setFromPoints([this.V(0, -12, 0), this.V(0, 9, 0)]), mat));
    const tp = [];
    for (let y = -12; y <= 8; y++) { const h = y === 0 ? 0.36 : y % 5 === 0 ? 0.26 : 0.16; tp.push(this.V(-h, y, 0), this.V(h, y, 0)); }
    g.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(tp), mat));
    this.tSpets = new T.Mesh(new T.ConeGeometry(0.16, 0.55, 20), new T.MeshBasicMaterial({ color: new T.Color('#dfe6ff'), transparent: true, opacity: 0 }));
    this.tSpets.position.y = 9.25; g.add(this.tSpets);
    this.tOpac = 0; this.tOpacMal = 0;
    this.ttl = {};
    for (let y = -12; y <= 8; y++) {
      if (y % 1) continue;
      this.ttl[y] = this.etikett((y < 0 ? '−' + -y : String(y)) + '\u00a0°C', 'tl' + (y === 0 ? ' noll' : ''), g, this.V(0.7, y, 0), [0, 0.5]);
    }
  }
  termometer() {
    this.tOpacMal = 1;
    this.form('termometer');
    for (let y = -10; y <= 3; y++) this.ttl[y].e.classList.add('syns');
  }

  /* ---------------- pilen (teckenregler) ---------------- */
  byggPil() {
    const T = this.T, g = this.pGrupp = new T.Group();
    g.position.y = 0.55;
    this.scen.add(g);
    const farg = new T.Color(this.lc).multiplyScalar(2.2);
    const mat = this.pMat = new T.MeshBasicMaterial({ color: farg, toneMapped: false, transparent: true, opacity: 0 });
    const skaft = new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 2.6, 12), mat);
    skaft.rotation.z = -Math.PI / 2; skaft.position.x = 1.3;
    const spets = new T.Mesh(new T.ConeGeometry(0.17, 0.5, 20), mat);
    spets.rotation.z = -Math.PI / 2; spets.position.x = 2.75;
    g.add(skaft, spets);
    this.pSpets = spets;
    this.pVarde = this.etikett('', 'mk', this.scen, this.V(0, 0, 0), [0.5, 1]);
    this.pOp = this.etikett(tex('\\cdot\\,(-1)'), 'hp', this.scen, this.V(0, 2.1, 0));
    this.pAktiv = false; this.pOpac = 0;
  }
  pil(pa) { this.pAktiv = pa; this.pT = 0; }

  /* ---------------- markören (hopp på tallinje eller termometer) ---------------- */
  byggMarkor() {
    const T = this.T;
    this.mk = new T.Mesh(new T.SphereGeometry(0.24, 24, 16), new T.MeshBasicMaterial({ color: new T.Color(this.lc).multiplyScalar(3.2), toneMapped: false }));
    this.mk.visible = false; this.scen.add(this.mk);
    this.mkEtikett = this.etikett('', 'mk', this.scen, this.V(0, 0, 0), [0.5, 1]);
    this.hoppEtikett = this.etikett('', 'hp', this.scen, this.V(0, 0, 0));
    const N = 80;
    this.spar = new T.Line(new T.BufferGeometry().setFromPoints(new Array(N).fill(0).map(() => this.V(0, 0, 0))), new T.LineBasicMaterial({ color: new T.Color(this.lc).multiplyScalar(1.8), toneMapped: false, transparent: true, opacity: 0.9 }));
    this.spar.frustumCulled = false; this.spar.visible = false; this.scen.add(this.spar);
  }
  mkPos(v, axel) { return axel === 'y' ? this.V(0, v, 0) : this.V(v, 0, 0); }
  markor(v, text, axel = 'x') {
    this.mk.visible = true;
    this.mk.position.copy(this.mkPos(v, axel));
    this.mkEtikett.o.position.copy(this.mk.position).add(axel === 'y' ? this.V(-0.9, 0.35, 0) : this.V(0, 0.45, 0));
    this.mkEtikett.o.center.set(axel === 'y' ? 1 : 0.5, axel === 'y' ? 0.5 : 1);
    this.mkEtikett.e.textContent = text;
    this.mkEtikett.e.classList.add('syns');
  }
  hoppa(fran, till, op, slutText, axel = 'x') {
    const a = this.mkPos(fran, axel), b = this.mkPos(till, axel);
    const h = Math.min(4, Math.abs(till - fran) * 0.4);
    const norm = axel === 'y' ? this.V(-1, 0, 0) : this.V(0, 1, 0);
    const punkt = (k) => a.clone().lerp(b, k).addScaledVector(norm, Math.sin(Math.PI * k) * h);
    const pos = this.spar.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) { const p = punkt(i / (pos.count - 1)); pos.setXYZ(i, p.x, p.y, p.z); }
    pos.needsUpdate = true;
    this.spar.geometry.setDrawRange(0, 0); this.spar.visible = true;
    this.hoppEtikett.e.innerHTML = tex(op);
    this.hoppEtikett.o.position.copy(punkt(0.5)).addScaledVector(norm, 0.75);
    this.mkEtikett.e.classList.remove('syns');
    this.ljud('svisch');
    this.anim.push({
      t: 0, tid: 1.5,
      steg: (k) => {
        const e = ease(k);
        this.mk.position.copy(punkt(e));
        this.spar.geometry.setDrawRange(0, Math.max(2, Math.round(e * pos.count)));
        if (k > 0.25) this.hoppEtikett.e.classList.add('syns');
      },
      slut: () => { this.markor(till, slutText, axel); this.ljud('ja'); },
    });
  }
  visaKnapp(el, fn) {
    const b = el.querySelector('[data-visa]'), los = el.querySelector('.lek-losning');
    b.addEventListener('click', () => { b.disabled = true; b.style.opacity = '.4'; los.classList.remove('lek-dold'); fn(); });
  }

  /* ---------------- formationer ---------------- */
  form(namn, o = {}) {
    const T = this.T, N = this.N, c = new T.Color(), tmp = new T.Vector3();
    let i = 0;
    const satt = (x, y, z, col, s, ljus = 1) => {
      if (i >= N) return;
      this.pMal[i * 3] = x; this.pMal[i * 3 + 1] = y; this.pMal[i * 3 + 2] = z;
      c.copy(col).multiplyScalar(ljus);
      this.pColMal[i * 3] = c.r; this.pColMal[i * 3 + 1] = c.g; this.pColMal[i * 3 + 2] = c.b;
      this.pSizeMal[i] = s; i++;
    };
    const DIM = new T.Color('#4a5370'), VIT = new T.Color('#fff4dc'), NEG = new T.Color('#7fa8ff'), POS = new T.Color('#ffc069');
    const omgivning = (rmin = 40, rmax = 110, ljus = 0.35) => {
      while (i < N) {
        const r = rmin + Math.random() * (rmax - rmin), u = Math.random() * 2 - 1, f = Math.random() * TAU, s = Math.sqrt(1 - u * u);
        satt(r * s * Math.cos(f), r * u * 0.6, r * s * Math.sin(f) - 20, DIM, 0.45, ljus);
      }
    };
    if (namn === 'moln') {
      // en tät kärna av tal som ännu inte sorterats
      for (let j = 0; j < 1500; j++) { const r = Math.pow(Math.random(), 0.7) * 16; const u = Math.random() * 2 - 1, f = Math.random() * TAU, s = Math.sqrt(1 - u * u); satt(r * s * Math.cos(f), r * u * 0.55, r * s * Math.sin(f), Math.random() < 0.5 ? VIT : new T.Color(this.lc), 0.34, 0.55 + Math.random() * 0.6); }
      omgivning(30, 100);
    } else if (namn === 'mangder') {
      this.mGrupp.updateMatrixWorld(true);
      const M = this.mGrupp.matrixWorld;
      for (let r = 0; r < o.k; r++) {
        const R = RINGAR[r], col = new T.Color(R.farg), lj = this.ringLjus[R.m];
        for (let j = 0; j < 330; j++) {
          const a = j / 330 * TAU;
          tmp.set(R.rx * Math.cos(a) + gauss() * 0.05, R.ry * Math.sin(a) + gauss() * 0.05, gauss() * 0.05).applyMatrix4(M);
          satt(tmp.x, tmp.y, tmp.z, col, 0.3, 1.25 * lj);
        }
        const inre = r ? RINGAR[r - 1] : null;
        for (let j = 0; j < 140; j++) {
          const a = Math.random() * TAU;
          const u0 = inre ? inre.rx / R.rx + 0.06 : 0;
          const u = u0 + Math.random() * (0.96 - u0);
          tmp.set(R.rx * u * Math.cos(a), R.ry * u * Math.sin(a), gauss() * 0.25).applyMatrix4(M);
          satt(tmp.x, tmp.y, tmp.z, col, 0.24, 0.32 * lj);
        }
      }
      omgivning();
    } else if (namn === 'linje') {
      for (let j = 0; j < 1500; j++) {
        const x = -27 + Math.random() * 54;
        const col = x < -0.4 ? NEG : x > 0.4 ? POS : VIT;
        satt(x, gauss() * 0.05, gauss() * 0.05, col, 0.2, 0.42);
      }
      for (let j = 0; j < 420; j++) { const x = -27 + Math.random() * 54; satt(x, gauss() * 2.4, gauss() * 2.4 - 1, x < 0 ? NEG : POS, 0.22, 0.22); }
      omgivning();
    } else if (namn === 'termometer') {
      for (let j = 0; j < 1100; j++) {
        const y = -12 + Math.random() * 21;
        satt(gauss() * 0.05, y, gauss() * 0.05, y < -0.3 ? NEG : y > 0.3 ? POS : VIT, 0.2, 0.42);
      }
      for (let j = 0; j < 300; j++) { const r = Math.pow(Math.random(), 0.5) * 0.9, u = Math.random() * 2 - 1, f = Math.random() * TAU, s = Math.sqrt(1 - u * u); satt(r * s * Math.cos(f), -13.1 + r * u, r * s * Math.sin(f), NEG, 0.26, 0.9); }
      for (let j = 0; j < 300; j++) { satt(gauss() * 2.6, -12 + Math.random() * 21, gauss() * 2.6 - 1, DIM, 0.22, 0.4); }
      omgivning();
    } else if (namn === 'spiral') {
      const G = Math.PI * (3 - Math.sqrt(5));
      for (let n = 1; n <= 2000; n++) {
        const r = 0.4 * Math.sqrt(n), f = n * G;
        const ring = RINGAR[Math.min(3, Math.floor(r / 4.6))];
        satt(r * Math.cos(f), 1.4 * Math.cos(r * 0.25) + gauss() * 0.1, r * Math.sin(f), new T.Color(ring.farg), 0.32, 0.9);
      }
      omgivning();
    }
    omgivning();
  }

  kamera(pos, mal) { this.kamMal.pos.set(...pos); this.kamMal.mal.set(...mal); }

  /* ---------------- stegen ---------------- */
  nollstall() {
    this.stadare.forEach((f) => f()); this.stadare = [];
    this.anim = [];
    Object.values(this.taggar).forEach((t) => t.e.classList.remove('syns', 'med', 'utan'));
    Object.values(this.tal).forEach((t) => { t.e.classList.remove('syns', 'vald', 'puls', 'klick'); t.o.position.set(t.p[0], t.p[1], 0); });
    this.ringLjus = { N: 1, Z: 1, Q: 1, R: 1 };
    Object.values(this.tl).forEach((t) => t.e.classList.remove('syns', 'mark'));
    Object.values(this.ttl).forEach((t) => t.e.classList.remove('syns'));
    this.rk.forEach((r) => r.e.classList.remove('syns'));
    this.svav.e.classList.remove('syns');
    this.prickar.forEach((p) => { p.visible = false; });
    this.lOpacMal = 0; this.tOpacMal = 0;
    this.pAktiv = false;
    this.mk.visible = false; this.spar.visible = false;
    this.mkEtikett.e.classList.remove('syns'); this.hoppEtikett.e.classList.remove('syns');
    this.pVarde.e.classList.remove('syns'); this.pOp.e.classList.remove('syns');
  }

  visa(i, forsta) {
    const S = this.def.steg;
    if (i < 0 || i >= S.length || i === this.i) return;
    this.i = i;
    try { localStorage.setItem('mu-lek-' + this.def.id, String(i)); } catch (e) {}
    const s = S[i];
    if (!forsta) this.ljud('steg');
    this.nollstall();
    s.scen(this);

    // tidslinjen
    this.dom.querySelectorAll('.lek-seg').forEach((seg) => {
      const j = +seg.dataset.i;
      seg.classList.toggle('gjord', j < i); seg.classList.toggle('nu', j === i);
    });
    this.dom.querySelectorAll('.lek-grupp').forEach((g) => g.classList.toggle('nu', g.dataset.del === s.del));
    this.dom.querySelector('.lek-nr').textContent = `${String(i + 1).padStart(2, '0')} / ${String(S.length).padStart(2, '0')}`;
    this.dom.querySelector('[data-bak]').disabled = i === 0;
    this.dom.querySelector('[data-fram] span').textContent = i === S.length - 1 ? 'Återvänd' : 'Fortsätt';

    // kortet byter innehåll med en kort övertoning
    const fyll = () => {
      this.kort.classList.toggle('bred', !!s.bred);
      const delNr = [...new Set(S.map((x) => x.del))].indexOf(s.del) + 1;
      this.inne.innerHTML = `<div class="lek-del"><span>${String(delNr).padStart(2, '0')} · ${s.del.toUpperCase()}</span><span>${String(i + 1).padStart(2, '0')}</span></div><h2>${s.rubrik}</h2><div class="lek-text">${s.text}</div>`;
      matte(this.inne);
      this.inne.querySelectorAll('[data-penna]').forEach((b) => b.addEventListener('click', () => this.oppnaPenna(b.dataset.penna)));
      if (s.aktiv) { const f = s.aktiv(this, this.inne); if (f) this.stadare.push(f); }
      this.inne.parentElement.scrollTop = 0;
      this.inne.classList.remove('byter');
    };
    if (forsta) fyll();
    else { this.inne.classList.add('byter'); clearTimeout(this.byteT); this.byteT = setTimeout(fyll, 260); }
  }

  /* ---------------- pennlösningen ---------------- */
  async oppnaPenna(typ) {
    if (this.penna) return;
    const m = this.penna = document.createElement('div');
    m.className = 'lek-penna';
    m.innerHTML = `<div class="ark"><button class="stang" aria-label="Stäng pennlösningen"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="rubrik">LÖSNINGEN MED PENNA</div>
      <div class="uppg lab-block-exempel"><p><strong>${FRAGOR[typ]}</strong></p><div class="lab-handskrift"></div></div></div>`;
    document.body.appendChild(m);
    matte(m);
    m.addEventListener('click', (e) => { if (e.target === m) this.stangPenna(); });
    m.querySelector('.stang').addEventListener('click', () => this.stangPenna());
    await laddaHandskrift();
    if (this.penna === m) window.HANDSKRIFT.mount(m.querySelector('.lab-handskrift'), { typ }, { autostart: true });
  }
  stangPenna() { if (this.penna) { this.penna.remove(); this.penna = null; } }

  ljud(typ) {
    const L = this.ctx.Ljud;
    if (!L || !L.pa) return;
    if (typ === 'ja') L.klang(4 + Math.floor(Math.random() * 4));
    else if (typ === 'nej') L.ton(196, 0, 0.08, 0.6, 'triangle');
    else if (typ === 'steg') L.svisch(0.9, 0.35);
    else if (typ === 'svisch') L.svisch(1.4, 0.5);
  }

  /* ---------------- varje bildruta ---------------- */
  tick(dt) {
    this.tid += dt;
    this.uTime.value = this.tid;
    const T = this.T;

    // partiklarna glider mot sin formation, var och en i egen takt
    const N = this.N, P = this.pPos, M = this.pMal, C = this.pCol, CM = this.pColMal;
    for (let i = 0; i < N; i++) {
      const f = 1 - Math.exp(-dt * this.pFart[i]);
      const j = i * 3;
      P[j] += (M[j] - P[j]) * f; P[j + 1] += (M[j + 1] - P[j + 1]) * f; P[j + 2] += (M[j + 2] - P[j + 2]) * f;
      C[j] += (CM[j] - C[j]) * f; C[j + 1] += (CM[j + 1] - C[j + 1]) * f; C[j + 2] += (CM[j + 2] - C[j + 2]) * f;
      this.pSize[i] += (this.pSizeMal[i] - this.pSize[i]) * f;
    }
    this.pGeo.attributes.position.needsUpdate = true;
    this.pGeo.attributes.color.needsUpdate = true;
    this.pGeo.attributes.aSize.needsUpdate = true;

    // tallinje och termometer tonar in och ut
    const ton = (nu, mal) => nu + (mal - nu) * Math.min(1, dt * 2.5);
    this.lOpac = ton(this.lOpac, this.lOpacMal);
    this.lMat.opacity = this.lOpac * 0.85; this.lSpets.material.opacity = this.lOpac * 0.85; this.lGrupp.visible = this.lOpac > 0.01;
    this.tOpac = ton(this.tOpac, this.tOpacMal);
    this.tMat.opacity = this.tOpac * 0.85; this.tSpets.material.opacity = this.tOpac * 0.85; this.tGrupp.visible = this.tOpac > 0.01;

    // pilen som vänds ett halvt varv för varje faktor −1
    this.pOpac = ton(this.pOpac, this.pAktiv ? 1 : 0);
    this.pMat.opacity = this.pOpac; this.pGrupp.visible = this.pOpac > 0.01;
    if (this.pAktiv) {
      this.pT += dt;
      const t = this.pT % 6;
      let rot = 0, op = false;
      if (t < 1.2) rot = 0;
      else if (t < 2.4) { rot = ease((t - 1.2) / 1.2) * Math.PI; op = true; }
      else if (t < 3.6) rot = Math.PI;
      else if (t < 4.8) { rot = Math.PI + ease((t - 3.6) / 1.2) * Math.PI; op = true; }
      else rot = 0;
      this.pGrupp.rotation.y = rot;
      const tip = this.pSpets.getWorldPosition(this.V(0, 0, 0));
      this.pVarde.o.position.copy(tip).add(this.V(0, 0.4, 0));
      const c = Math.cos(rot);
      this.pVarde.e.textContent = c > 0 ? '3' : '−3';
      this.pVarde.e.classList.toggle('syns', Math.abs(c) > 0.97);
      this.pOp.e.classList.toggle('syns', op);
    }

    // engångsanimationer (talen som flyger in, markörens hopp)
    for (let k = this.anim.length - 1; k >= 0; k--) {
      const a = this.anim[k];
      a.t = Math.min(1, a.t + dt / a.tid);
      a.steg(a.t);
      if (a.t >= 1) { this.anim.splice(k, 1); if (a.slut) a.slut(); }
    }

    // kameran: mjuk förflyttning, lite parallax efter musen, avstånd efter skärmformat
    const f = 1 - Math.exp(-dt * 1.7);
    this.kamNu.pos.lerp(this.kamMal.pos, f);
    this.kamNu.mal.lerp(this.kamMal.mal, f);
    this.mus[0] += (this.musMal[0] - this.mus[0]) * Math.min(1, dt * 2);
    this.mus[1] += (this.musMal[1] - this.mus[1]) * Math.min(1, dt * 2);
    const avstF = Math.min(2.2, Math.max(1, 1.15 / this.kam.aspect));
    const d = this.kamNu.pos.clone().sub(this.kamNu.mal);
    const L = d.length();
    this.kam.position.copy(this.kamNu.mal).addScaledVector(d, avstF)
      .add(this.V(this.mus[0] * L * 0.035, -this.mus[1] * L * 0.025, 0))
      .add(this.V(Math.sin(this.tid * 0.13) * L * 0.02, Math.sin(this.tid * 0.17) * L * 0.012, 0));
    this.kam.lookAt(this.kamNu.mal);

    // bilden skjuts åt sidan så att scenen hamnar i ytan bredvid kortet
    const bred = innerWidth > 760;
    const kb = this.kort.offsetWidth, kh = this.kort.querySelector('.lek-ruta').offsetHeight;
    const fx = bred && !this.kort.classList.contains('bred') ? -(kb + 40) / 2 : 0;
    const fy = !bred ? kh * 0.48 : 0;
    this.fx = (this.fx || 0) + (fx - (this.fx || 0)) * Math.min(1, dt * 3);
    this.fy = (this.fy || 0) + (fy - (this.fy || 0)) * Math.min(1, dt * 3);
    this.kam.setViewOffset(innerWidth, innerHeight, this.fx, this.fy, innerWidth, innerHeight);
    this.kam.updateProjectionMatrix();
  }
  ritaEtiketter() { this.etiketter.render(this.scen, this.kam); }

  avsluta(klar) { if (this.slutar) return; this.slutar = true; this.ctx.slut(klar); }
  stang() {
    this.stadare.forEach((f) => f());
    this.stangPenna();
    removeEventListener('keydown', this.onKey);
    removeEventListener('pointermove', this.onMus);
    removeEventListener('resize', this.onResize);
    this.dom.remove();
    this.etiketter.domElement.remove();
    this.scen.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
  }
}
