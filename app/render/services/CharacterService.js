define(
    [
        'app',
        'angular',
        'services/GrimoireService',
        'services/CharacterLoaderService',
        'services/SettingsService',
        'services/RulesService',
        'enums/CharacterProperties',
        'submodules/character/CastingModule',
        'submodules/character/BattleModule',
        'submodules/character/AnotherModule'
    ],
    function (app) {
        'use strict';

        app.factory('Character', ['$rootScope', '$timeout', 'Grimoire', 'Settings', 'CharacterLoader', 'Rules',
            function ($rootScope, $timeout, Grimoire, Settings, CharacterLoader, Rules) {

                let _saveDelay = undefined;
                let _character = undefined;

                let _castingModule = CastingModule();
                let _battleModule = BattleModule();
                let _anotherModule = AnotherModule();

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
                    if (_character && _character.spells) {
                        let spellIds = _character.spells;
                        let spells = [];
                        for (let i = 0; i < spellIds.length; i++) {
                            spells.push(Grimoire.getSpell(spellIds[i]));
                        }
                        _character.tome = Grimoire.sortTome(spells);
                    }
                };

                let _callFieldChange = function (field) {
                    $rootScope.$emit(field + 'characterChanged');
                    _characterQuicksave();
                };

                return {
                    RSTATES: _RSTATES,
                    FIELD: _FIELD,
                    CRAFT_TYPES: _CRAFT_TYPES,
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

                        if (Grimoire.isGrimoireLoaded()) {
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
                    crafts: function (type) {
                        return _character.crafts[type];
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
                    focusReg: function() {
                        return _castingModule.focusRegen(_character);
                    },
                    health: function () {
                        return _character.health;
                    },
                    healthReg: function () {
                        return _battleModule.healthRegen(_character);
                    },
                    channels: function () {
                        return _character.status.channels;
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
                    experienceTotals: function () {
                        return _character.experience;
                    },
                    moonshards: function () {
                        return _character.moonshards;
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
                        _battleModule.takeHit(_character, damage, _callFieldChange);
                    },
                    cast: function (id, empowered, discount) {
                        _castingModule.cast(
                            _character,
                            Grimoire.getSpell(id),
                            empowered,
                            discount);
                        _callFieldChange(_FIELD.FOCUS);
                        _callFieldChange(_FIELD.CHANNELS);
                    },
                    spellCost: function (id, empowered, discount) {
                        return _castingModule.calcSpellCost(
                            Grimoire.getSpell(id),
                            empowered,
                            _character.crafts[_CRAFT_TYPES.MAGIC],
                            discount)
                    },
                    sleep: function () {
                        if(_anotherModule.sleep(_character, _castingModule, _battleModule, _callFieldChange)) {
                            _callFieldChange(_FIELD.FOCUS);
                            _callFieldChange(_FIELD.HEALTH);
                            _callFieldChange(_FIELD.CHANNELS);
                        }
                    },
                    rest: function () {
                        _anotherModule.rest(_callFieldChange);
                    },
                    takeBreath: function () {
                        if (_battleModule.takeBreath(_character)) {
                            _callFieldChange(_FIELD.HEALTH);
                        }
                    },
                    dropChannel: function (index) {
                        if (_castingModule.dropChannel(index)) {
                            _callFieldChange(_FIELD.CHANNELS);
                            _callFieldChange(_FIELD.FOCUS);
                        }
                    },
                    getSkillLevel: function (craftId) {
                        return _character.crafts[_CRAFT_TYPES.MAGIC][craftId].skill.value;
                    },
                    refresh: function (field) {
                        _anotherModule.refreshField(Rules.cheatEnabled(), _character, field, _callFieldChange);
                    },
                    spendMoonshard: function () {
                        _anotherModule.spendMoonshard(_character, _callFieldChange);
                    },
                    refreshMoonshards: function (amount) {
                        _anotherModule.refreshMoonshards(_character, amount, _callFieldChange);
                    }
                };

            }]);
    }
);