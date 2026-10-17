#!/usr/bin/env node
// Förbereder testmejlet med veckans nyhetsbrevsutkast (körs av
// .claude/server/nyhetsbrev-test.ps1 på lördagsmorgonen, se
// .claude/commands/nyhetsbrev-testmejl.md).
//
// Utkastet skrivs av en molnroutine och pushas till main, så det hämtas ur
// origin/main med `git show` — arbetskopian rörs inte.
//
//   node .claude/nyhetsbrev/testmejl.js [ÅÅÅÅ-MM-DD]
//
// Utan datum: närmaste söndag (i dag om det är söndag). Skriver
// %TEMP%\nyhetsbrev-test.html (brevet som det ska skickas) och
// %TEMP%\nyhetsbrev-test.json ({ datum, amne, fil }). Exitkod 2 = utkastet
// finns inte på main ännu.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

function nastaSondag() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const datum = process.argv[2] || nastaSondag();
const repo = path.resolve(__dirname, '..', '..');
const sokvag = `.claude/nyhetsbrev/utkast/${datum}.html`;

try {
  execFileSync('git', ['fetch', '-q', 'origin', 'main'], { cwd: repo, stdio: 'ignore' });
} catch (e) { /* offline: försök ändå med det som redan är hämtat */ }

let html;
try {
  html = execFileSync('git', ['show', `origin/main:${sokvag}`], { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
} catch (e) {
  console.error(`Inget utkast på main: ${sokvag}`);
  process.exit(2);
}

const amne = (html.match(/ÄMNESRAD:\s*(.+)/) || [])[1];
const pre = (html.match(/PREHEADER:\s*(.+)/) || [])[1];
if (!amne || !pre) { console.error('ÄMNESRAD eller PREHEADER saknas i utkastets kommentar.'); process.exit(1); }

html = html.replace(/<!--[\s\S]*?-->\s*/g, '');
html = html.replace(/(<body[^>]*>)/, (m) => m + '<div style="display:none;max-height:0px;overflow:hidden;">' + pre.trim() + '&nbsp;'.repeat(90) + '</div>');
// EmailOctopus-taggarna fungerar bara i tjänsten; i testet blir de vanliga länkar.
html = html.replace(/\{\{UnsubscribeURL\}\}/g, 'https://fysiklabbet.se/')
           .replace(/\{\{RewardsURL\}\}/g, 'https://emailoctopus.com/')
           .replace(/\{\{SenderInfo\}\}/g, 'Fysiklabbet');
const kvar = html.match(/\{\{[^}]*\}\}/g);
if (kvar) { console.error('Okända taggar kvar: ' + kvar.join(', ')); process.exit(1); }

const fil = path.join(os.tmpdir(), 'nyhetsbrev-test.html');
fs.writeFileSync(fil, html);
const info = { datum, amne: '[TEST] ' + amne.trim(), fil };
fs.writeFileSync(path.join(os.tmpdir(), 'nyhetsbrev-test.json'), JSON.stringify(info, null, 2));
console.log(JSON.stringify(info));
