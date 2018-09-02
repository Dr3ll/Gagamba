define(
    [
        'app',
        'angular',
        'services/GrimoireService',
        'services/CharacterLoaderService',
        'services/SettingsService',
        'services/RulesService'
    ],
    function (app) {
        'use strict';

        app.factory('Character', ['$rootScope', '$timeout', 'Grimoire', 'Settings', 'CharacterLoader', 'Rules',
            function ($rootScope, $timeout, Grimoire, Settings, CharacterLoader, Rules) {

                const _RSTATES = {
                    FRESH: 'fresh',
                    CHANNELED: 'channeled',
                    EXHAUSTED: 'exhausted',
                    CONSUMED: 'consumed'
                };
                const _FIELD = {
                    FOCUS: 'FOCUS',
                    HEALTH: 'HEALTH',
                    MOONSHARDS: 'MOONSHARDS',
                    MAGIC: 'MAGIC',
                    CHANNELS: 'CHANNELS'
                };
                const _ATTRIBUTES = {
                    AGILITY: 'AGILITY',
                    CHARISMA: 'CHARISMA',
                    CONSTITUTION: 'CONSTITUTION',
                    INTUITION: 'INTUITION',
                    MYSTIC: 'MYSTIC',
                    STRENGTH: 'STRENGTH',
                    WILLPOWER: 'WILLPOWER',
                    WIT: 'WIT'
                };

                let _character = undefined;

                let _calcSpellCost = function (spell, magic, successDiscount) {
                    successDiscount = successDiscount || {co: 0, ex: 0, ch: 0};
                    let skillDiscount = {co: 0, ex: 0, ch: 0};
                    let skillDiscountValue = magic[spell.school].discount;
                    let cost = {ex: spell.cost_ex, ch: spell.cost_ch, co: spell.cost_co};

                    // Substract consumed
                    if (cost.ex !== 0) {
                        cost.ex - cost.co;
                    } else if (cost.ch !== 0) {
                        cost.ch - cost.co;
                    }

                    if (cost.ex !== 0) {
                        skillDiscount.ex = skillDiscountValue;
                    } else if (cost.ch !== 0) {
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
                        if (spell.cost_ch > spell.cost_ex) {
                            cost.ch = 1;
                        } else {
                            cost.ex = 1;
                        }
                    }

                    return cost;
                };

                let _applyFocusCost = function (cost) {
                    if (_character.focus.t < (cost.ex + cost.ch + cost.co) + (_character.focus.ch + _character.focus.ex + _character.focus.co)) {
                        return false; // not enough focus
                    }

                    _character.focus.ex += cost.ex;
                    _character.focus.ch += cost.ch;
                    _character.focus.co += cost.co;

                    return true;
                };

                let _cast = function (spell, successDiscount) {
                    let cost = _calcSpellCost(spell, _character.magic, successDiscount);
                    _applyFocusCost(cost);
                    if (cost.ch > 0) {
                        let temp = _character.status.channels;
                        temp.push({spellId: spell.id, value: cost.ch, index: _character.status.channels.length});
                        _character.status.channels = temp;
                    }

                    _callFieldChange(_FIELD.FOCUS);
                };

                let _dropAllChannels = function () {
                    if (_character) {
                        _character.status.channels = [];
                        _callFieldChange(_FIELD.CHANNELS);
                    }
                };

                let _dropChannel = function (index) {
                    if (_character) {
                        _character.status.channels.splice(index, 1);
                        _callFieldChange(_FIELD.CHANNELS);
                    }};

                let _takeDamage = function(damage) {
                    if (_character.health.pt * 5 <=
                        damage.ex + damage.ch + damage.co +
                        _character.health.ch + _character.health.ex + _character.health.co) {
                        _character.health.ch = 0;
                        _character.health.ex = 0;
                        _character.health.co = _character.health.pt * 5;
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
                    _callFieldChange(_FIELD.HEALTH);
                };

                let _spendMoonshard = function () {
                    if (_character.moonshards.spent >= _character.moonshards.total ) {
                        return;
                    }

                    _character.moonshards.spent++;
                    _callFieldChange(_FIELD.MOONSHARDS);
                };

                let _refreshMoonshards = function () {
                    _character.moonshards.spent = 0;
                    _callFieldChange(_FIELD.MOONSHARDS);
                };

                let _saveDelay = undefined;

                let _characterQuicksave = function () {
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

                let _prepData = function () {
                    let spellIds = _character.spells;
                    let spells = [];
                    for(let i = 0; i < spellIds.length; i++) {
                        spells.push(Grimoire.getSpell(spellIds[i]));
                    }
                    _character.tome = Grimoire.sortTome(spells);
                };

                let _callFieldChange = function (field) {
                    $rootScope.$emit(field + 'characterChanged');
                    _characterQuicksave();
                };

                let _sleep = function () {
                    if (_character) {
                        // Focus
                        let will = (_character.attributes[_ATTRIBUTES.WILLPOWER] || 0);
                        let multiplierf = 2;
                        if (_character.strengths.contains('FOCUS_REG')) { // TODO: Item strengths
                            multiplierf = 3;
                        }
                        let regf  = multiplierf * will;
                        if (regf <= 0) { regf = 1; }

                        _character.focus.ex = 0;
                        _character.focus.ch = 0;
                        _character.focus.co = _character.focus.co - regf > 0 ? _character.focus.co - regf : 0;

                        _dropAllChannels();

                        // Health
                        let con = (_character.attributes[_ATTRIBUTES.WILLPOWER] || 0);
                        let multiplierh = 2;
                        if (_character.strengths.contains('HEALTH_REG')) { // TODO: Item strengths
                            multiplierh = 3;
                        }
                        let regh  = multiplierh * will;
                        if (regh <= 0) { regh = 1; }

                        _character.health.ex = 0;
                        //_character.health.ch = 0; // TODO: poison and such
                        _character.health.co = _character.health.co - regh > 0 ? _character.health.co - regh : 0;

                        _character.status.tookBreath = false;

                        _callFieldChange(_FIELD.FOCUS);
                        _callFieldChange(_FIELD.HEALTH);
                    }
                };

                let _rest = function () {
                    if (_character) {
                        _character.focus.ex = 0;
                        _character.health.ex = 0;
                        _character.status.tookBreath = false;

                        _callFieldChange(_FIELD.FOCUS);
                        _callFieldChange(_FIELD.HEALTH);
                    }
                };

                let _takeBreath = function () {
                    if (_character && !_character.status.tookBreath) {
                        _character.health.ex =
                            10 + _character.attributes[_ATTRIBUTES.CONSTITUTION] < _character.health.ex
                            ? _character.health.ex - 10 + _character.attributes[_ATTRIBUTES.CONSTITUTION]
                            : 0;
                        _character.status.tookBreath = true;

                        _callFieldChange(_FIELD.HEALTH);
                    }
                };

                let _refreshField = function (field) {
                    if (Rules.cheatEnabled() && _character) {
                        switch (field) {
                            case _FIELD.FOCUS: {
                                if (_character.focus) {
                                    _character.focus.ch = 0;
                                    _character.focus.ex = 0;
                                    _character.focus.co = 0;
                                }
                                break;
                            }
                            case _FIELD.HEALTH: {
                                if (_character.health) {
                                    _character.health.ch = 0;
                                    _character.health.ex = 0;
                                    _character.health.co = 0;
                                }
                                break;
                            }
                            case _FIELD.MOONSHARDS: {
                                if (_character.moonshards) {
                                    _character.moonshards.spent = 0;
                                }
                                break;
                            }
                        }
                        _callFieldChange(field);
                    }
                };

                return {
                    RSTATES: _RSTATES,
                    FIELD: _FIELD,
                    isCharacterLoaded: function() {
                        return _character !== undefined && _character !== null;
                    },
                    getCharacter: function() {
                        return _character;
                    },
                    setCharacter: function(character) {
                        _character = character;

                        if (_character !== null && _character !== undefined) {
                            Settings.setDefaultCharacter(_character.fileName);
                        } else {
                            Settings.setDefaultCharacter(null);
                        }

                        if (Grimoire.isGrimoireLoaded) {
                            _prepData();
                            $rootScope.$emit('characterSelected');
                        } else {
                            let _handler$grimoireLoadingDone = Grimoire.subscribeLoadingDone(this, function () {
                                _prepData();
                                $rootScope.$emit('characterSelected');
                                _handler$grimoireLoadingDone();
                            });
                        }
                    },
                    subscribeCharacterSelected: function(scope, handler) {
                        scope.handler$characterSelected = $rootScope.$on('characterSelected', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$characterSelected();
                        });
                    },
                    subscribeCharacterChanged: function(scope, handler, field) {
                        scope.handler$characterChanged = $rootScope.$on(field + 'characterChanged', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$characterChanged();
                        });
                    },
                    abilities: function () {
                        return _character.abilities;
                    },
                    attributes: function () {
                        return _character.attributes;
                    },
                    battle: function () {
                        return _character.battle;
                    },
                    tookBreath: function () {
                        return _character.status.tookBreath;
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
                    magic: function () {
                        return _character.magic;
                    },
                    tome: function () {
                        return _character.tome;
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
                    sleep: function () {
                        _sleep();
                    },
                    rest: function () {
                        _rest();
                    },
                    takeBreath: function () {
                        _takeBreath();
                    },
                    refresh: function (field) {
                        _refreshField(field);
                    },
                    spendMoonshard: function () {
                        _spendMoonshard();
                    },
                    refreshMoonshards: function () {
                        _refreshMoonshards();
                    }
                };

            }]);
    }
);