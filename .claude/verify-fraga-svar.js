#!/usr/bin/env node
/*
 * verify-fraga-svar.js — stämmer frågan med svaret som facit väntar sig?
 *
 * En fråga ska be om just den storhet som facit (answer.unit i
 * data/ovningar.js) anger. Felet som utlöste regeln (påpekat 2026-11-13,
 * uppgift 2 i fy1-4.6): "Hur stor del av dess energiförbrukning blir
 * nyttigt ljus …?" har facit 10 J. "Hur stor del" ber om en andel (ett
 * bråk eller procent), så en elev som svarar 40 % svarar rätt på frågan
 * men får fel av sidan.
 *
 * Reglerna (bara frågor UTAN deluppgifter, där facit hör till hela frågan):
 *   - "hur stor del/andel", "vilken andel" → facit i % eller utan enhet
 *   - "hur många procent", "i procent"     → facit i %
 *   - facit i % eller utan enhet får inte frågas med "hur mycket energi",
 *     "hur många joule" och liknande (omvända felet).
 *
 * Användning: node .claude/verify-fraga-svar.js
 */
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', 'data', 'ovningar.js'));
const D = Object.values(window).find(v => v && typeof v === 'object' && v['fy1-4.6']);
if (!D) { console.error('Hittar inte övningsdatat.'); process.exit(2); }

const ANDEL = /\b(hur stor (?:\*\*)?(?:del|andel)|vilken (?:\*\*)?andel)\b/i;
const PROCENT = /\b(hur många procent|i procent)\b/i;
const MANGD = /\b(hur mycket (?:energi|värme|arbete)|hur många (?:joule|kilojoule|watt))\b/i;
const harDeluppgifter = q => /(^|<br>|\n)\s*\**[a-f]\)/.test(q);

const fel = [];
for (const [id, lista] of Object.entries(D)) {
  (lista || []).forEach((u, i) => {
    const q = u.question || '';
    const a = u.answer;
    if (!a || harDeluppgifter(q)) return;
    const enhet = (a.unit || '').trim();
    const andelsSvar = enhet === '%' || enhet === '';
    const var_ = `${id} uppgift ${i + 1}`;
    if (ANDEL.test(q) && !andelsSvar)
      fel.push(`${var_}: frågan ber om en andel ("${q.match(ANDEL)[0]}") men facit är i ${enhet}`);
    else if (PROCENT.test(q) && enhet !== '%')
      fel.push(`${var_}: frågan ber om procent men facit är i ${enhet || '(utan enhet)'}`);
    else if (MANGD.test(q) && andelsSvar)
      fel.push(`${var_}: frågan ber om en mängd ("${q.match(MANGD)[0]}") men facit är ${enhet || 'utan enhet'}`);
  });
}

if (fel.length) {
  console.log(`FEL: ${fel.length} fråga(or) där frågan och facit inte ber om samma sak:\n`);
  fel.forEach(f => console.log('  ' + f));
  process.exit(1);
}
console.log('OK: frågorna ber om samma sak som facit anger.');
