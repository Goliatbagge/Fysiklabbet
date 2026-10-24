#!/usr/bin/env node
/*
 * verify-glidare-remount.js — fångar React-mönster som monterar om en glidare
 * mitt i ett drag, så att den inte går att ta tag i (se CLAUDE.md, "Glidare
 * får aldrig monteras om under ett drag").
 *
 * 1. En pilfunktion skickas som komponent: sliderSet((p) => <StSlider {...p} />).
 *    Funktionen är ny vid varje render, React ser en ny komponenttyp och
 *    byter ut hela underträdet, input-elementet inräknat.
 * 2. En komponent (Versal = (...) => / function Versal(...)) som innehåller
 *    <input definieras INUTI en annan komponent. Samma sak: ny typ varje render.
 *    Hjälpfunktioner med gemen begynnelsebokstav som ANROPAS ({sliderRow()})
 *    är ofarliga och flaggas inte.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const filer = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let fel = 0;

for (const f of filer) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const rader = src.split(/\r?\n/);

  // 1. Inline-pilfunktion som returnerar JSX och skickas som argument
  rader.forEach((r, i) => {
    if (/\w+\(\s*\(?\s*\w*\s*\)?\s*=>\s*<[A-Z]/.test(r) && /\(\s*\(?\s*\w*\s*\)?\s*=>\s*<[A-Z]\w*\s*\{\.\.\./.test(r)) {
      console.log(`FEL ${f}:${i + 1}  pilfunktion skickas som komponent: ${r.trim()}`);
      fel++;
    }
  });

  // 2. Komponent med <input definierad inuti en annan komponent.
  //    Heuristik: definitionen är indragen djupare än toppnivån i skriptet
  //    och står efter att en yttre komponent (const App = …) öppnats.
  const defRe = /^(\s*)(?:const\s+([A-Z]\w*)\s*=\s*(?:\([^)]*\)|\w+)\s*=>|function\s+([A-Z]\w*)\s*\()/;
  const djup = [];   // indrag för öppna komponenter
  rader.forEach((r, i) => {
    const m = r.match(defRe);
    if (!m) return;
    const ind = m[1].replace(/\t/g, '    ').length;
    const namn = m[2] || m[3];
    while (djup.length && djup[djup.length - 1].ind >= ind) djup.pop();
    if (djup.length) {
      // Hitta kroppens slut: nästa rad med samma eller mindre indrag som börjar med ) eller }
      let slut = i + 1;
      for (; slut < rader.length; slut++) {
        const rr = rader[slut];
        if (rr.trim() === '') continue;
        const ii = rr.match(/^\s*/)[0].replace(/\t/g, '    ').length;
        if (ii <= ind && /^\s*[)}]/.test(rr)) break;
        if (ii < ind) break;
      }
      const kropp = rader.slice(i, slut + 1).join('\n');
      const somJsx = new RegExp('<' + namn + '[\\s/>]').test(src);   // används som <Namn …/>
      if (somJsx && /<input\b|<select\b|<textarea\b/.test(kropp)) {
        console.log(`FEL ${f}:${i + 1}  komponenten ${namn} med <input> definieras inuti ${djup[djup.length - 1].namn}`);
        fel++;
      }
    }
    djup.push({ ind, namn });
  });
}

if (fel) { console.log(`\n${fel} fel. Flytta komponenten till toppnivån (utanför App), eller döp om den med gemen och anropa den som funktion: {sceneToggles()}.`); process.exit(1); }
console.log(`OK: ${filer.length} sidor, inga glidare som monteras om vid varje render.`);
