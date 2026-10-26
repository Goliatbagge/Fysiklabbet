/* i18n/nb/sidor/fysik2-vinkelhastighet-app.js — norska (bokmål) för
 * simuleringen Period, frekvens och vinkelhastighet. Löptexten är delad i
 * textnoder runt <em>/<strong>, en nyckel per textnod. */
(function () {
    I18N.add({
        // Sidhuvud och metadata
        'Period, frekvens och vinkelhastighet — Fysiklabbet': 'Periode, frekvens og vinkelfart — Fysiklabbet',
        'Period, frekvens och vinkelhastighet — Fysik nivå 2': 'Periode, frekvens og vinkelfart — Fysikk nivå 2',
        'En punkt i cirkelbana kopplad till en svängande punkt och en y–t-graf. Dra i de sammanlänkade reglagen för T, f och ω och se hur de hänger ihop (T = 1/f, ω = 2π/T), visa vinkeln i radianer, cirkelbågen och farten v = ω · r.':
            'Et punkt i sirkelbane koblet til et svingende punkt og en y–t-graf. Dra i de sammenkoblede kontrollene for T, f og ω og se hvordan de henger sammen (T = 1/f, ω = 2π/T), vis vinkelen i radianer, sirkelbuen og farten v = ω · r.',
        '/ Period, frekvens och vinkelhastighet': '/ Periode, frekvens og vinkelfart',
        'Period, frekvens, radianer och vinkelhastighet': 'Periode, frekvens, radianer og vinkelfart',

        // Ingressen
        'En punkt rör sig i en cirkelbana. Dess höjdläge utför samtidigt en': 'Et punkt beveger seg i en sirkelbane. Høyden til punktet utfører samtidig en',
        'harmonisk svängning': 'harmonisk svingning',
        'som ritar en sinuskurva i grafen. De tre reglagen för perioden': 'som tegner en sinuskurve i grafen. De tre kontrollene for perioden',
        ', frekvensen': ', frekvensen',
        'och vinkelhastigheten': 'og vinkelfarten',
        'är sammanlänkade — ändra ett av dem och se hur de andra två följer med. Visa vinkeln i radianer, cirkelbågen och farten':
            'henger sammen. Endre én av dem og se hvordan de to andre følger med. Vis vinkelen i radianer, sirkelbuen og farten',

        // Formelkortet och avläsningarna
        'Period': 'Periode',
        'Frekvens': 'Frekvens',
        'Vinkelhastighet': 'Vinkelfart',
        'Fart': 'Fart',
        'Banradie': 'Baneradius',
        'Vinkel': 'Vinkel',
        'I grader:': 'I grader:',
        'Båglängd': 'Buelengde',
        'Antal varv': 'Antall omdreininger',
        'rad': 'rad',
        'rad ≈': 'rad ≈',
        'rad/s': 'rad/s',
        'och': 'og',
        'eller': 'eller',

        // Scenen
        'Cirkulär rörelse': 'Sirkelbevegelse',
        '(skala i radianer)': '(skala i radianer)',
        'Svängning': 'Svingning',
        'Reglagen för': 'Kontrollene for',
        'hänger ihop — ändra ett så följer de andra': 'henger sammen. Endre én, så følger de andre med',
        'Vinkeln': 'Vinkelen',
        'och bågen': 'og buen',
        'Radianskala': 'Radianskala',
        'Svängande punkt': 'Svingende punkt',
        '-graf': '-graf',
        'Inre punkt (': 'Indre punkt (',

        // Reglagen
        'De tre översta reglagen beskriver': 'De tre øverste kontrollene beskriver',
        'samma sak': 'det samme',
        'på tre sätt — ändrar du ett, följer de andra två med.': 'på tre måter. Endrer du én, følger de to andre med.',
        'Period (': 'Periode (',
        'Frekvens (': 'Frekvens (',
        'Vinkelhastighet (': 'Vinkelfart (',
        'Banradie (': 'Baneradius (',
        'Tiden för ett helt varv.': 'Tiden for én hel omdreining.',
        'Antal varv per sekund —': 'Antall omdreininger per sekund:',
        'Vinkel per sekund —': 'Vinkel per sekund:',
        'Påverkar varken': 'Påvirker verken',
        '— men farten': '(men farten',
        'växer med radien.': 'øker med radiusen).',

        // Avläsningsrutan
        'Avläsning': 'Avlesning',
        'Ett varv är 2π rad ≈ 6,28 rad och tar tiden': 'Én omdreining er 2π rad ≈ 6,28 rad og tar tiden',
        '. Alltså:': '. Altså:',

        // Insikten
        'Tre bilder av samma rörelse': 'Tre bilder av samme bevegelse',
        'Punkten i cirkelbanan, den': 'Punktet i sirkelbanen, det',
        'svängande punkten': 'svingende punktet',
        'och kurvan i grafen har exakt samma period': 'og kurven i grafen har nøyaktig samme periode',
        ', frekvens': ', frekvens',
        'och vinkelhastighet': 'og vinkelfart',
        '. Den streckade linjen visar att de hela tiden ligger på samma höjd — en harmonisk svängning är helt enkelt en cirkelrörelse sedd från sidan.':
            '. Den stiplede linjen viser at de hele tiden ligger i samme høyde. En harmonisk svingning er rett og slett en sirkelbevegelse sett fra siden.',

        // Period och frekvens
        'Period och frekvens': 'Periode og frekvens',
        'En rörelse som upprepas kallas': 'En bevegelse som gjentar seg, kalles',
        'periodisk': 'periodisk',
        '. Tiden för en upprepning — ett varv eller en svängning — är': '. Tiden for én gjentakelse (én omdreining eller én svingning) er',
        'perioden': 'perioden',
        '(enhet s), och antalet upprepningar per sekund är': '(enhet s), og antall gjentakelser per sekund er',
        'frekvensen': 'frekvensen',
        '(enhet Hz). De är varandras inverser:': '(enhet Hz). De er hverandres inverse:',
        '. Roterar något med frekvensen 10 Hz tar ett varv 1/10 sekund.': '. Roterer noe med frekvensen 10 Hz, tar én omdreining 1/10 sekund.',

        // Radianer
        'Radianer': 'Radianer',
        'I radianmåttet är vinkeln lika med': 'I radianmål er vinkelen lik',
        'cirkelbågens längd mätt i radier': 'lengden av sirkelbuen målt i radier',
        '— bågen för 1 rad är exakt en radie lång (1 rad ≈ 57,3°). Slå på radianskalan och jämför med den röda bågen: båglängden är alltid':
            '(buen for 1 rad er nøyaktig én radius lang, og 1 rad ≈ 57,3°). Slå på radianskalaen og sammenlign med den røde buen: buelengden er alltid',
        '. Ett helt varv är 2π rad, eftersom omkretsen är 2π ·': '. Én hel omdreining er 2π rad, fordi omkretsen er 2π ·',

        // Vinkelhastighet och fart
        'Vinkelhastighet och fart': 'Vinkelfart og fart',
        'Vinkelhastigheten': 'Vinkelfarten',
        'anger hur stor vinkel som hinns med per sekund (rad/s). Farten i banan är': 'angir hvor stor vinkel som tilbakelegges per sekund (rad/s). Farten i banen er',
        '— slå på den inre punkten och se att alla punkter på samma skiva har': '(slå på det indre punktet og se at alle punkter på samme skive har',
        'samma': 'samme',
        'men olika fart: längre ut hinner punkten en längre båge på samma tid.': 'og likevel ulik fart: lenger ut rekker punktet en lengre bue på samme tid).',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Frekvens och vinkelhastighet är samma sak."': '«Frekvens og vinkelfart er det samme.»',
        'Nästan — men inte riktigt. Frekvensen räknar': 'Nesten, men ikke helt. Frekvensen teller',
        'varv': 'omdreininger',
        'per sekund (Hz), vinkelhastigheten räknar': 'per sekund (Hz), vinkelfarten teller',
        'radianer': 'radianer',
        'per sekund. Eftersom ett varv är 2π rad gäller': 'per sekund. Siden én omdreining er 2π rad, gjelder',
        '"Vinkelhastigheten beror på radien."': '«Vinkelfarten avhenger av radiusen.»',
        'Nej. Alla punkter på en roterande skiva sveper samma vinkel på samma tid — samma': 'Nei. Alle punkter på en roterende skive sveiper over samme vinkel på samme tid: samme',
        '. Det är farten': '. Det er farten',
        'som växer med radien.': 'som øker med radiusen.',
        '"Hastigheten är konstant i en jämn cirkelrörelse."': '«Hastigheten er konstant i en jevn sirkelbevegelse.»',
        'Farten (beloppet) är konstant, men hastigheten är en vektor med riktning — och riktningen ändras hela tiden. Titta på':
            'Farten (absoluttverdien) er konstant, men hastigheten er en vektor med retning, og retningen endres hele tiden. Se på',
        '-pilen: den pekar alltid längs banan, vinkelrätt mot radien.': '-pilen: den peker alltid langs banen, vinkelrett på radiusen.',
        '"Radianer är en godtycklig gradskala."': '«Radianer er en vilkårlig gradskala.»',
        'Radianen är definierad direkt ur cirkelns geometri: vinkeln vars båge är lika lång som radien. Därför blir båglängden så enkel som':
            'Radianen er definert direkte ut fra sirkelens geometri: vinkelen der buen er like lang som radiusen. Derfor blir buelengden så enkel som',
        '— det fungerar bara i radianer, inte i grader.': '(det fungerer bare i radianer, ikke i grader).'
    });
})();
