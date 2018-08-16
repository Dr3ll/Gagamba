define(
    [
        'app',
        'angular',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.factory('Character', ['$rootScope', 'Grimoire',
            function ($rootScope, Grimoire) {

                const _RSTATES = {
                    FRESH: 'fresh',
                    CHANNELED: 'channeled',
                    EXHAUSTED: 'exhausted',
                    CONSUMED: 'consumed'
                };
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

                var _debugCharacter = {
                    name: "Bameth",
                    level: 1,
                    properties: {
                        education: "Frei erschaffen",
                        culture: "Frei erschaffen",
                        race: _RACES.GNOME,
                        hair: "dunkelbraun",
                        eyes: "schwarz",
                        skin: "",
                        gender: _GENDERS.MALE,
                        weight: 22,
                        height: 108
                    },
                    moonSign: _LUNIAC.STRENGTH_OF_MIND,
                    languages: [
                        _LANGUAGES.BGNOME, _LANGUAGES.DRAGO
                    ],
                    experience: {
                        total: 32,
                        spend: 31
                    },
                    moonshards: {
                        total: 3,
                        spent: 0
                    },
                    attributes: {
                        CHARISMA: {base: 2, value: 2},
                        AGILITY: {base: 3, value: 3},
                        INTUITION: {base: 2, value: 2},
                        CONSTITUTION: {base: 2, value: 2},
                        MYSTIC: {base: 5, value: 5},
                        STRENGTH: {base: 0, value: 0},
                        WIT: {base: 3, value: 3},
                        WILLPOWER: {base: 3, value: 3}
                    },
                    battle: {
                        dr: 2,
                        speed: 7,
                        initiative: 8,
                        defense: 20,
                        will: 20,
                        body: 17
                    },
                    focus: {
                        max: 21,
                        f: 4,
                        ch: 4,
                        ex: 5,
                        co: 8
                    },
                    health: {
                        h: 7,
                        ch: 0,
                        ex: 0,
                        co: 0
                    },
                    magic: {
                        ILLUSION: {
                            value: {base: 7, value: 13},
                            //expertise: new Map[ [Grimoire.SCHOOLS.ILLUSION.MIRAGE], [1] ],
                            masteries: [{name: "Sparsamer Zauberer", description: "Illusion Kosten -1"}],
                            discount: 1
                        }
                    },
                    abilities: { },
                    weaknesses: [],
                    resources: {
                        public_image: { value: -1, description: "" },
                        rank: { value: 1, description: "" },
                        contacts: { value: 3, description: "" },
                        fortune: { value: 1, description: "" },
                        relic: { value: 4, item: { name: "Stimmgabel" } }
                    },
                    strengths: [
                        _STRENGTHS.FAIRYSENSE,
                        _STRENGTHS.HIGH_WILL,
                        _STRENGTHS.NIMBLE,
                        _STRENGTHS.NIGHT_VISION,
                        _STRENGTHS.FOCUS_REG,
                        _STRENGTHS.FOCUS_POOL,
                        _STRENGTHS.STABLE_MAGIC,
                        _STRENGTHS.LITERATE
                    ]
                };

                var _character = undefined;

                var _channelList = [];

                var _load = function () {
                    _character = _debugCharacter;

                    $rootScope.$emit('CharacterLoadingDone');
                };

                var _calcSpellCost = function (spell, magic, successDiscount) {
                    successDiscount = successDiscount | {co: 0, ex: 0, ch: 0};
                    var skillDiscount = {co: 0, ex: 0, ch: 0};
                    var skillDiscountValue = magic[spell.school].discount;
                    var cost = {ex: spell.cost.ex, ch: spell.cost.ch, co: spell.cost.co};

                    // Substract consumed
                    if (cost.ex !== 0) {
                        cost.ex - cost.co;
                    } else if (cost.ch !== 0) {
                        cost.ch - cost.co;
                    }

                    if (cost.ex !== 0) {
                        cost.ex - spell.discount;
                        skillDiscount.ex = skillDiscountValue;
                    } else if (cost.ch !== 0) {
                        cost.ch - spell.discount;
                        skillDiscount.ch = skillDiscountValue;
                    }

                    cost.ch -= skillDiscount.ch - successDiscount.ch;
                    cost.ex -= skillDiscount.ex - successDiscount.ex;
                    cost.co -= skillDiscount.co - successDiscount.co;

                    if (cost.ex < 0) {
                        cost.ex = 0;
                    }
                    if (cost.ch < 0) {
                        cost.ch = 0;
                    }
                    if (cost.co < 0) {
                        cost.co = 0;
                    }

                    // Min spell cost is 1 for channeled and exhausted focus
                    if (cost.ch <= 0 && cost.ex <= 0) {
                        if (spell.cost.ch > spell.cost.ex) {
                            cost.ch = 1;
                        } else {
                            cost.ex = 1;
                        }
                    }

                    return cost;
                };

                var _applyFocusCost = function (cost) {
                    if (_character.focus.f < cost.ex + cost.ch + cost.co) {
                        return false; // not enough focus
                    }

                    _character.focus.f -= cost.ex + cost.ch + cost.co;
                    _character.focus.ex += cost.ex;
                    _character.focus.ch += cost.ch;
                    _character.focus.co += cost.co;

                    return true;
                };

                var _cast = function (spell, successDiscount) {
                    var cost = _calcSpellCost(spell, _character.magic, successDiscount);
                    _applyFocusCost(cost);
                    if (cost.ch > 0) {
                        _channelList.push({spell: spell, value: cost.ch});
                    }
                };

                var _takeDamage = function(damage) {
                    if (_character.health.h * 5 <=
                        damage.ex + damage.ch + damage.co +
                        _character.health.ch + _character.health.ex + _character.health.co) {
                        _character.health.ch = 0;
                        _character.health.ex = 0;
                        _character.health.co = _character.health.h * 5;
                        return false; // you died
                    }

                    _character.health.ch += damage.ch;
                    _character.health.ex += damage.ex;
                    _character.health.co += damage.co;

                    return true;
                };

                var _takeHit = function (damage) {
                    var dr = _character.battle.dr;
                    while (dr > 0) {
                        if (damage.ch > 0) {
                            if (dr >= damage.ch) {
                                dr -= damage.ch;
                                damage.ch = 0;
                            } else {
                                damage.ch -= dr;
                                dr = 0;
                            }
                        } else if (damage.ex > 0) {
                            if (dr >= damage.ex) {
                                dr -= damage.ex;
                                damage.ex = 0;
                            } else {
                                damage.ex -= dr;
                                dr = 0;
                            }
                        } else if (damage.co > 0) {
                            if (dr >= damage.co) {
                                dr -= damage.co;
                                damage.co = 0;
                            } else {
                                damage.co -= dr;
                                dr = 0;
                            }
                        }
                    }

                    _takeDamage(damage);
                };

                var _spendMoonshard = function () {
                    if (_character.moonshards.spent >= _character.moonshards.total ) {
                        return false;
                    }

                    _character.moonshards.spent++;
                    return false;
                };

                return {
                    RSTATES: _RSTATES,
                    name: function () {
                        return _character.name;
                    },
                    level: function () {
                        return _character.level;
                    },
                    focus: function () {
                        return _character.focus;
                    },
                    health: function () {
                        return _character.health;
                    },
                    properties: function () {
                        return _character.properties;
                    },
                    attributes: function () {
                        return _character.attributes;
                    },
                    moonSign: function () {
                        return _character.moonSign;
                    },
                    languages: function () {
                        return _character.languages;
                    },
                    experience: function () {
                        return _character.experience;
                    },
                    moonshards: function () {
                        return _character.moonshards;
                    },
                    battle: function () {
                        return _character.battle;
                    },
                    magic: function () {
                        return _character.magic;
                    },
                    abilities: function () {
                        return _character.abilities;
                    },
                    weaknesses: function () {
                        return _character.health;
                    },
                    strengths: function () {
                        return _character.health;
                    },
                    hit: function (damage) {
                        _takeHit(damage);
                    },
                    cast: function (id) {
                        _cast(Grimoire.getSpell(id));
                    },
                    spendMoonshard: function () {
                        _spendMoonshard();
                    },
                    subscribeLoadingDone: function (scope, handler) {
                        scope.handler$loadingDone = $rootScope.$on('CharacterLoadingDone', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$loadingDone();
                        });
                    },
                    load: function () {
                        _load();
                    }

                };

            }]);
    }
);