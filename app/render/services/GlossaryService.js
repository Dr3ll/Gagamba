define(
    [
        'app',
        'angular'
    ], function (app) {
        'use strict';

        app.factory('Glossary', [
            function () {

                const _RACES = {
                    HUMAN: "Mensch",
                    GNOME: "Gnom",
                    WARG: "Warg",
                    ALB: "Alb",
                    DWARF: "Zwerg",
                };
                const _GENDERS = { MALE: "männlich", FEMALE: "weiblich" };
                const _LANGUAGES = { BGNOME: "Basargnomisch", DRAGO: "Dragoreisch" };
                const _LUNIAC = {
                    OMEN_OTBM: "Omen des schwarzen Mondes",
                    SECOND_FACE: "Das zweite Gesicht",
                    FRIENDLY_SATELLITES: "Freunschaft der Trabanten",
                    GAMBLER: "Der Spieler",
                    SUGERDADDY: "Gunst des reichen Mannes",
                    MOONS_BLESSING: "Segen der Mondkraft",
                    THE_FLASH: "Der Blitz",
                    BLOODMOON: "Blutiges Antlitz des Mondes",
                    STRENGTH_OF_MIND: "Geist der Gedanken",
                    DWAYNE_JOHNSON: "Der Fels"
                };
                const _STRENGTHS = {
                    FAIRYSENSE: { name: "Feensinn", description: "+6 Orientierung Feenwelten; +2 GW gegen Magie von Feenwesen" },
                    HIGH_WILL: { name: "Hoher Geistiger Widerstand", description: "GW +2", tier: 1 },
                    NIMBLE: { name: "Flink", description: "GSW +1" },
                    NIGHT_VISION: { name: "Dämmersicht", description: "Lichtverhältn. um 2 Stufen besser; Ausnahme Finsternis" },
                    FOCUS_REG: { name: "Erhöhte Fokusregeneration", description: "WILx3 Regeneration verz. Fokus" },
                    FOCUS_POOL: { name: "Erhöhter Fokuspool", description: "jeweils +5 Fokus", tier: 1 },
                    STABLE_MAGIC: { name: "Stabile Magie", description: "-1 Stufe f. verheerende Zauberauswirkungstabelle" },
                    LITERATE: { name: "Literat", description: "Lesen/Schreiben" },
                };

                return {
                    LUNIAC: _LUNIAC,
                    LANGUAGES: _LANGUAGES,
                    RACES: _RACES,
                    STRENGTHS: _STRENGTHS

                };

            }]);
    }
);