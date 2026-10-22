// Bygger i18n/manifest.js: vilka engelska överlägg (data/en/**/*.js) och
// sidordlistor (i18n/sidor/*.js) som finns. Körs av data/teori/build.js och
// för hand efter att en ny översättningsfil lagts till:
//   node .claude/i18n/bygg-manifest.js
const fs = require('fs'), path = require('path');
const ROT = path.join(__dirname, '..', '..');
function lista(dir, bas = '') {
    const p = path.join(ROT, dir, bas);
    if (!fs.existsSync(p)) return [];
    let ut = [];
    for (const f of fs.readdirSync(p).sort()) {
        const full = path.join(p, f);
        if (fs.statSync(full).isDirectory()) ut = ut.concat(lista(dir, path.posix.join(bas, f)));
        else if (f.endsWith('.js')) ut.push(path.posix.join(bas, f.replace(/\.js$/, '')));
    }
    return ut;
}
const overlays = lista('data/en');
const sidor = lista('i18n/sidor');
const gemensamt = lista('i18n/gemensamt');
const src = `/* i18n/manifest.js — GENERERAD av .claude/i18n/bygg-manifest.js. Redigera inte.
 * Räknar upp de engelska överlägg och sidordlistor som finns, så att
 * i18n.js bara hämtar filer som verkligen finns. */
window.I18N_OVERLAYS = ${JSON.stringify(overlays)};
(function () {
    // i18n/gemensamt/*.js: ordlistor för delade skript (section-nav.js,
    // feedback.js …) — laddas på varje sida.
    ${gemensamt.length ? "window.I18N.skript('i18n/gemensamt.js');" : ''}
    var SIDOR = ${JSON.stringify(sidor)};
    var s = window.I18N && window.I18N._sida;
    if (s && SIDOR.indexOf(s) >= 0) window.I18N.skript('i18n/sidor/' + s + '.js');
})();
`;
fs.writeFileSync(path.join(ROT, 'i18n/manifest.js'), src);
// De gemensamma ordlistorna slås ihop till EN fil (en förfrågan per sida i
// stället för en per delat skript). Redigera delfilerna i i18n/gemensamt/.
fs.writeFileSync(path.join(ROT, 'i18n/gemensamt.js'),
    '/* GENERERAD av .claude/i18n/bygg-manifest.js ur i18n/gemensamt/*.js. Redigera delfilerna. */\n' +
    gemensamt.map(g => '/* ---- ' + g + ' ---- */\n' + fs.readFileSync(path.join(ROT, 'i18n/gemensamt', g + '.js'), 'utf8')).join('\n'));
console.log('i18n/manifest.js:', overlays.length, 'överlägg,', sidor.length, 'sidordlistor,', gemensamt.length, 'gemensamma');
module.exports = { lista };
