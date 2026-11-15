#!/usr/bin/env node
// Provar ett avsnitts nya övningar innan de sammanfogas med data/ovningar.js.
//
//   node .claude/ovningar-nya/testa.js <id>            kontroller
//   node .claude/ovningar-nya/testa.js <id> --bilder   även skärmdumpar
//
// Läser fragmentet .claude/ovningar-nya/<id>.js (se lib.js), lägger det i en
// kopia av data/ovningar.js under .shots/ovn-tmp/ och kör där:
//   - syntax och antal per nivå (mål: minst 7 Grund, 7 Mellan, 7 Avancerad)
//   - grundkontroller på varje ny uppgift (fält, **Svar:**, \tfrac, emoji,
//     tankstreck, spår av omräkning, deluppgifter med delsvar)
//   - verify-rakning.js (räkningen och facit) för avsnittet
//   - verify-ovningar-flerval.js (flervalsbalansen) på kopian
//   - verify-sprak.js på fragmentet
// Med --bilder skrivs .shots/ovn-<id>.html (alla nya uppgifter med lösning,
// renderade med marked + KaTeX) och en skärmdump per uppgift med figur:
// .shots/ovn-<id>-<n>.png (n = nummer bland de nya uppgifterna, från 1).
// Kräver dev-servern på port 8000 för bilderna.
//
// Utdata slutar med raden RESULTAT: OK eller RESULTAT: FEL (antal).

const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');
const { ROOT, OVN, insertFragment, applyRattelser, loadOvningar, levelCount } = require('./lib.js');

const id = process.argv[2];
const bilder = process.argv.includes('--bilder');
if (!id) { console.error('Ange avsnitts-id.'); process.exit(2); }
const fragFile = path.join(__dirname, id + '.js');
if (!fs.existsSync(fragFile)) { console.error('Saknar ' + fragFile); process.exit(2); }

const fel = [];
const varn = [];
const frag = fs.readFileSync(fragFile, 'utf8');
const tmpDir = path.join(ROOT, '.shots', 'ovn-tmp');
fs.mkdirSync(tmpDir, { recursive: true });
const tmp = path.join(tmpDir, 'ovningar-' + id + '.js');

const before = loadOvningar(OVN)[id] || [];
const rattFile = path.join(__dirname, id + '.rattelser.json');
let after;
try {
    let src = fs.readFileSync(OVN, 'utf8');
    if (fs.existsSync(rattFile)) {
        const par = JSON.parse(fs.readFileSync(rattFile, 'utf8'));
        src = applyRattelser(src, id, par);
        console.log(`rättelser: ${par.length} par tillämpade på befintliga uppgifter`);
    }
    fs.writeFileSync(tmp, insertFragment(src, id, frag));
    after = loadOvningar(tmp)[id] || [];
} catch (e) {
    console.log('FEL: ' + e.message);
    console.log('RESULTAT: FEL (1)');
    process.exit(1);
}
const nya = after.slice(before.length);
const L0 = levelCount(before), L1 = levelCount(after);
console.log(`${id}: före ${L0.join('/')}, efter ${L1.join('/')} (Grund/Mellan/Avancerad), ${nya.length} nya`);
L1.forEach((n, i) => { if (n < 7) fel.push(`nivå ${i + 1} har bara ${n} uppgifter (minst 7)`); });
if (after.length - nya.length !== before.length) fel.push('antalet befintliga uppgifter har ändrats');
after.slice(0, before.length).forEach((u, k) => {
    const t = [u.question, u.solution, ...(u.choices || [])].join('\n').replace(/<svg[\s\S]*?<\/svg>/g, '');
    if (/—/.test(t)) fel.push(`befintlig uppgift ${k + 1}: tankstreck (—) kvar, rätta i ${id}.rattelser.json`);
});

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\uFE0F?|\uFE0F/u;
nya.forEach((u, k) => {
    const w = `ny uppgift ${k + 1} (nr ${before.length + k + 1})`;
    if (![1, 2, 3].includes(u.level)) fel.push(`${w}: level saknas/fel`);
    if (typeof u.question !== 'string' || u.question.length < 20) fel.push(`${w}: question saknas`);
    if (typeof u.solution !== 'string' || u.solution.length < 40) fel.push(`${w}: solution saknas`);
    const t = (u.question || '') + '\n' + (u.solution || '') + '\n' + (u.choices || []).join('\n');
    if (/\\tfrac/.test(t)) fel.push(`${w}: \\tfrac (skriv \\dfrac)`);
    if (EMOJI.test(t)) fel.push(`${w}: emoji`);
    if (/—/.test(t.replace(/<svg[\s\S]*?<\/svg>/g, ''))) fel.push(`${w}: tankstreck (—)`);
    if (/\b(Vänta|Hmm|låt mig räkna om|räknar om)\b/i.test(u.solution || '')) fel.push(`${w}: spår av omräkning`);
    if (/\bθ|\\theta/.test(t)) fel.push(`${w}: θ (vinklar betecknas α)`);
    if (/F_g\b|F_\{g\}/.test(t)) fel.push(`${w}: F_g (tyngdkraften är F_G)`);
    if (/Svar [a-f]:/.test(t)) fel.push(`${w}: "Svar a:" (skriv Svar: utan bokstav)`);
    if (/\b(t\.ex\.|bl\.a\.|d\.v\.s\.|dvs\.|osv\.|ca)\s/.test(t)) varn.push(`${w}: förkortning`);
    const ritning = /^\s*(\*\*)?\s*(Rita|Skissa|Skugga|Konstruera|Visa att|Bevisa|Härled)/.test(u.question || '');
    if (!ritning && !/\*\*Svar:?\*\*/.test(u.solution || '')) fel.push(`${w}: lösningen saknar **Svar:**`);
    if (!u.answer && !u.choices && !u.delsvar) varn.push(`${w}: öppen uppgift utan auto-rättning`);
    if (u.choices && (typeof u.correct !== 'number' || u.correct < 0 || u.correct >= u.choices.length)) fel.push(`${w}: correct utanför choices`);
    const harDelar = /(^|<br>|\n)\s*\*{0,2}b\)/.test(u.question || '');
    if (harDelar && u.answer && !u.delsvar) varn.push(`${w}: deluppgifter med numeriskt svar men utan delsvar`);
    if (u.answer && typeof u.answer.value !== 'number') fel.push(`${w}: answer.value är inte ett tal`);
});

function kor(args, env) {
    const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', env: Object.assign({}, process.env, env || {}) });
    return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

const rak = kor([path.join(ROOT, '.claude', 'verify-rakning.js'), id], { OVNINGAR_FIL: tmp });
const nyaNr = new Set(nya.map((_, k) => before.length + k + 1));
rak.out.split(/\r?\n(?=\S)/).forEach(block => {
    const m = block.match(/övningar \S+ uppgift (\d+)/);
    if (m && block.startsWith('FEL') && nyaNr.has(+m[1])) fel.push('räkning (ny ' + (+m[1] - before.length) + '): ' + block.trim().replace(/\s*\r?\n\s*/g, ' | '));
});

const fv = kor([path.join(ROOT, '.claude', 'verify-ovningar-flerval.js'), tmp]);
fv.out.split(/\r?\n/).filter(l => l.includes(id) && /FEL|fel/.test(l)).forEach(l => fel.push('flerval: ' + l.trim()));
const kurs = id.split('-')[0];
fv.out.split(/\r?\n/).filter(l => /45 ?%/.test(l) && l.includes(kurs)).forEach(l => varn.push('flervalsbalans i kursen: ' + l.trim()));

const sp = kor([path.join(ROOT, '.claude', 'verify-sprak.js'), fragFile]);
sp.out.split(/\r?\n/).filter(l => /FEL|VARNING|✗|⚠/.test(l)).slice(0, 40).forEach(l => (/FEL|✗/.test(l) ? fel : varn).push('språk: ' + l.trim()));

if (bilder) {
    const rel = '/.shots/ovn-tmp/ovningar-' + id + '.js';
    const html = `<!doctype html><html lang="sv"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/styles-laborans.css">
<script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="${rel}"></script>
<style>body{background:#f7f2e8;font-family:Poppins,system-ui,sans-serif;font-size:17px;color:#0f1620;margin:0;padding:20px}
.u{background:#fffdf8;border:1px solid #d8cdb8;border-radius:10px;padding:18px 22px;margin:0 auto 26px;max-width:720px}
.u h3{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#7a6a55;margin:0 0 8px}
.sol{border-top:1px dashed #cbbfa8;margin-top:14px;padding-top:10px}
.katex-display{overflow-x:auto;overflow-y:hidden}
svg{max-width:100%;height:auto}</style></head><body><div id="r"></div>
<script>
const NIV=['','Grund','Mellan','Avancerad'];
const list=(window.OVNINGAR['${id}']||[]).slice(${before.length});
const only=new URLSearchParams(location.search).get('i');
function md(s){const m=[];s=s.replace(/\\$\\$([\\s\\S]+?)\\$\\$|\\$([^$\\n]+?)\\$/g,(a,d,i)=>{m.push([d!=null,d!=null?d:i]);return '@@M'+(m.length-1)+'@@';});
let h=marked.parse(s);return h.replace(/@@M(\\d+)@@/g,(a,k)=>{const[x,t]=m[+k];try{return katex.renderToString(t,{displayMode:x,throwOnError:false})}catch(e){return '<b style="color:red">KaTeX-fel</b>'}});}
const r=document.getElementById('r');
list.forEach((u,k)=>{if(only&&+only!==k+1)return;const d=document.createElement('div');d.className='u';
d.innerHTML='<h3>Ny '+(k+1)+' · '+NIV[u.level]+'</h3>'+md(u.question)+(u.choices?'<ol type="A">'+u.choices.map(c=>'<li>'+md(c)+'</li>').join('')+'</ol>':'')+'<div class="sol">'+md(u.solution)+'</div>';r.appendChild(d);});
document.querySelectorAll('.katex-error').forEach(e=>e.style.background='#fdd');
</script></body></html>`;
    fs.writeFileSync(path.join(ROOT, '.shots', 'ovn-' + id + '.html'), html);
    const bildNr = nya.map((u, k) => /<svg/.test((u.question || '') + (u.solution || '')) ? k + 1 : 0).filter(Boolean);
    if (bildNr.length) {
        const r = spawnSync(process.execPath, [path.join(__dirname, 'bilder.js'), id, ...bildNr.map(String)],
            { cwd: ROOT, encoding: 'utf8', timeout: 180000 });
        ((r.stdout || '') + (r.stderr || '')).split(/\r?\n/).filter(Boolean).forEach(l =>
            /^bild:/.test(l) ? console.log(l) : varn.push('skärmdump: ' + l));
        if (r.error) varn.push('skärmdump: ' + r.error.message);
    }
    console.log('förhandsvisning: http://localhost:8000/.shots/ovn-' + id + '.html');
}

varn.forEach(v => console.log('VARNING ' + v));
fel.forEach(f => console.log('FEL ' + f));
console.log(fel.length ? `RESULTAT: FEL (${fel.length})` : 'RESULTAT: OK');
process.exit(fel.length ? 1 : 0);
