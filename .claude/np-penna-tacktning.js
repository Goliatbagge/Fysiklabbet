#!/usr/bin/env node
/* np-penna-tackning.js — hur långt har pennlösningarna till de nationella
 * proven kommit?
 *
 * Kör:  node .claude/np-penna-tacktning.js
 *
 * Skriptet laddar handskrift.js, alla data/np/<prov>-penna.js och provens
 * egna datafiler med samma window-stubb som verify-handskrift.js, och
 * listar per prov vilka uppgifter som ännu saknar en registrerad scen
 * (<provId>-u<nr>). Sekretessbelagda uppgifter räknas inte — de har ingen
 * uppgiftstext att lösa.
 */
const fs=require('fs'),path=require('path');
const noop=()=>{};
const win={addEventListener:noop,requestAnimationFrame:noop,matchMedia:()=>({matches:false,addEventListener:noop})};
const doc={addEventListener:noop,getElementById:()=>null,createElement:()=>({setAttribute:noop,appendChild:noop,style:{}}),createElementNS:()=>({setAttribute:noop,appendChild:noop,style:{}}),head:{appendChild:noop}};
const R=path.resolve(__dirname,'..');
function run(f){ new Function('window','document','requestAnimationFrame',fs.readFileSync(path.join(R,f),'utf8'))(win,doc,noop); }
run('handskrift.js');
for (const f of fs.readdirSync(path.join(R,'data/np')).filter(n=>n.endsWith('-penna.js'))) run('data/np/'+f);
run('data/np/index.js');
for (const f of fs.readdirSync(path.join(R,'data/np')).filter(n=>/^[a-z0-9-]+\.js$/.test(n)&&!n.endsWith('-penna.js')&&!n.endsWith('-figurer.js')&&n!=='index.js')) run('data/np/'+f);
const typer=win.HANDSKRIFT.typer();
let tot=0, klara=0;
for (const prov of win.NP_INDEX) {
  const p = win.NP_PROV[prov.id];
  if (!p) { console.log(prov.id+': DATA SAKNAS'); continue; }
  const upp = p.uppgifter.filter(u=>!u.sekretess);
  const saknas = upp.filter(u=>typer.indexOf(prov.id+'-u'+u.nr)<0).map(u=>u.nr);
  tot += upp.length; klara += upp.length - saknas.length;
  console.log(prov.id.padEnd(14)+ (upp.length-saknas.length)+'/'+upp.length+
    (saknas.length? '  saknar: '+saknas.join(','):'  KLART'));
}
console.log('\nTOTALT '+klara+'/'+tot+' = '+Math.round(klara/tot*100)+' %');
