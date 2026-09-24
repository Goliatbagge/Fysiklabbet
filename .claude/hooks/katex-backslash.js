#!/usr/bin/env node
/*
 * PostToolUse-krok (registrerad i .claude/settings.json): efter varje Edit/
 * Write på en .js-fil under data/ körs verify-katex-backslash.js på filen.
 * Hittas en KaTeX-backslash som JS äter upp (\cdot i stället för \\cdot)
 * avslutas kroken med kod 2, och verifierarens utskrift går tillbaka till
 * agenten som måste rätta innan arbetet fortsätter.
 *
 * Varför en krok och inte bara en verifierare i CLAUDE.md: felet ser inte
 * trasigt ut i källan, och en kontroll som agenten ska komma ihåg att köra
 * hoppas över den dag den glöms (nyheten 2026-09-24 publicerades med
 * "E = BcdotAcdotomega"). Kroken körs oavsett, även för subagenter.
 */
const { spawnSync } = require('child_process');
const path = require('path');

let indata = '';
process.stdin.on('data', d => { indata += d; });
process.stdin.on('end', () => {
  let fil;
  try { fil = JSON.parse(indata).tool_input.file_path; } catch (e) { process.exit(0); }
  if (!fil || !/[\\/]data[\\/].*\.js$/.test(fil) || /(bundle|begrepp-sok)\.js$/.test(fil)) process.exit(0);
  const r = spawnSync(process.execPath, [path.join(__dirname, '..', 'verify-katex-backslash.js'), fil], { encoding: 'utf8' });
  if (r.status === 1) {
    process.stderr.write(r.stdout + '\nRätta med: node .claude/verify-katex-backslash.js --laga ' + fil + '\n');
    process.exit(2);
  }
  process.exit(0);
});
