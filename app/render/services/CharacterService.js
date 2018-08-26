define(
    [
        'app',
        'angular',
        'services/GrimoireService',
        'services/CharacterLoaderService',
        'services/SettingsService'
    ],
    function (app) {
        'use strict';

        app.factory('Character', ['$rootScope', '$timeout', 'Grimoire', 'Settings', 'CharacterLoader',
            function ($rootScope, $timeout, Grimoire, Settings, CharacterLoader) {

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

                let _character = undefined;

                let _channelList = [];

                let _calcSpellCost = function (spell, magic, successDiscount) {
                    successDiscount = successDiscount | {co: 0, ex: 0, ch: 0};
                    let skillDiscount = {co: 0, ex: 0, ch: 0};
                    let skillDiscountValue = magic[spell.school].discount;
                    let cost = {ex: spell.cost.ex, ch: spell.cost.ch, co: spell.cost.co};

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

                let _applyFocusCost = function (cost) {
                    if (_character.focus.f < cost.ex + cost.ch + cost.co) {
                        return false; // not enough focus
                    }

                    _character.focus.f -= cost.ex + cost.ch + cost.co;
                    _character.focus.ex += cost.ex;
                    _character.focus.ch += cost.ch;
                    _character.focus.co += cost.co;

                    return true;
                };

                let _cast = function (spell, successDiscount) {
                    let cost = _calcSpellCost(spell, _character.magic, successDiscount);
                    _applyFocusCost(cost);
                    if (cost.ch > 0) {
                        _channelList.push({spell: spell, value: cost.ch});
                    }
                };

                let _takeDamage = function(damage) {
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

                let _takeHit = function (damage) {
                    let dr = _character.battle.dr;
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

                let _spendMoonshard = function () {
                    if (_character.moonshards.spent >= _character.moonshards.total ) {
                        return false;
                    }

                    _character.moonshards.spent++;
                    return false;
                };

                let _saveDelay = undefined;

                let _characterChanged = function () {
                    if (Settings.quicksaveEnabled() &&
                        _character !== undefined && _character !== null) {
                        if (_saveDelay !== undefined) {
                            $timeout.cancel(_saveDelay);
                            _saveDelay = undefined;
                        }
                        _saveDelay = $timeout(
                            function () {
                                CharacterLoader.saveCharacter(_character);
                            }, 500
                        );
                    }
                };

                return {
                    RSTATES: _RSTATES,
                    characterLoaded: function() {
                        return _character !== undefined && _character !== null;
                    },
                    getCharacter: function() {
                        return _character;
                    },
                    setCharacter: function(character) {
                        _character = character;

                        $rootScope.$emit('characterSelected');
                    },
                    subscribeCharacterSelected: function(scope, handler) {
                        scope.handler$characterSelected = $rootScope.$on('characterSelected', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$characterSelected();
                        });
                    },
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
                        _characterChanged();
                    },
                    cast: function (id) {
                        _cast(Grimoire.getSpell(id));
                        _characterChanged();
                    },
                    spendMoonshard: function () {
                        _spendMoonshard();
                        _characterChanged();
                    },
                    subscribeLoadingDone: function (scope, handler) {
                        scope.handler$loadingDone = $rootScope.$on('CharacterLoadingDone', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$loadingDone();
                        });
                    }
                };

            }]);
    }
);