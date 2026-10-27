// .claude/i18n/nb/bygg-manifest.js — skriver i18n/nb/manifest.js, som talar
// om för i18n.js vilka simuleringar som har en norsk ordlista
// (i18n/nb/sidor/<sida>.js). Kör efter att en ny ordlista lagts till:
//
//   node .claude/i18n/nb/bygg-manifest.js
'use strict';
const fs = require('fs');
const path = require('path');
const ROT = path.join(__dirname, '..', '..', '..');
const DIR = path.join(ROT, 'i18n', 'nb', 'sidor');

const sidor = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, '')).sort()
    : [];

const ut = `/* i18n/nb/manifest.js — GENERERAD av .claude/i18n/nb/bygg-manifest.js. Redigera inte.
 * Räknar upp simuleringarna som har en norsk ordlista, så att i18n.js bara
 * hämtar filer som finns. */
(function () {
    var SIDOR = ${JSON.stringify(sidor)};
    var s = window.I18N && window.I18N._sida;
    if (s && SIDOR.indexOf(s) >= 0) window.I18N.skript('i18n/nb/sidor/' + s + '.js');
})();
`;
fs.mkdirSync(path.join(ROT, 'i18n', 'nb'), { recursive: true });
fs.writeFileSync(path.join(ROT, 'i18n', 'nb', 'manifest.js'), ut);
// Samma lista i i18n.js, som avgör vilka sidor som alls finns på norska.
const i18nFil = path.join(ROT, 'i18n.js');
const i18n = fs.readFileSync(i18nFil, 'utf8');
const nyI18n = i18n.replace(/var NB_SIDOR = (?:\/\*@nb-sidor\*\/)?\[[^\]]*\];/, () => 'var NB_SIDOR = /*@nb-sidor*/' + JSON.stringify(sidor) + ';');
if (!/var NB_SIDOR = /.test(i18n)) throw new Error('NB_SIDOR saknas i i18n.js');
fs.writeFileSync(i18nFil, nyI18n);
console.log('i18n/nb/manifest.js: ' + sidor.length + ' simuleringar');
