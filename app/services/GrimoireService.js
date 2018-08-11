'use strict';

app.factory('Grimoire', ['$rootScope', 'Database',
    function($rootScope, Database) {

        const _SCHOOLS_ = {
            "COUNTER": 0,"DOMINATION": 1,"KINETIC": 2,"COGNITION": 3,"STONE": 4,"FIRE": 5,"HEALING": 6,"ILLUSION": 7,"FIGHT": 8,"LIGHT": 9,
            "NATURE": 10,"SHADOW": 11,"FATE": 12,"PROTECTION": 13,"EMPOWER": 14,"DEATH": 15,"TRANSFORMATION": 16,"WATER": 17,"WIND": 18
        };
        const _TYPES = {
            "COUNTER": {
                "AURA": 0,"FAIRY": 1,"CURSE": 2,"GHOST": 3,"GODLY": 4,"CLAIRVOYANCE": 5,"COUNTER": 6,"NECROMANCY": 7,"DAMAGE": 8,"PROTECTION": 9,
                "DEBUFF": 10,"SENSES": 11,"EXORCISE": 12,"DESPELL": 13
            },
            "DOMINATION": {
                "MESSAGE": 0,"ATTITUDE": 1,"FAIRY": 2,"RECOGNITION": 3,"THOUGHT": 4,"NOISE": 5,"GODLY": 6,"HALLUCINATION": 7,"CONTROL": 8,"EMPOWER": 9,
                "MIND": 10,"MORALE": 11,"DEBUFF": 12,"CLOAK": 13,"ANIMALS": 14,"DESPELL": 15
            },
            "KINETIC": {
                "AURA": 0,"KINETIC_BUFF": 1,"ELEMENTS": 2,"GODLY": 3,"SUMMON": 4,"EMPOWER": 5,"OBJECT": 6,"DEBUFF": 7,"TELEKINETIC": 8,"ANIMALS": 9,
                "FAMILIAR": 10,"WALL": 11,"WILDERNESS": 12
            },
            "COGNITION": {
                "LIMBO": 0,"MESSAGE": 1,"ATTITUDE": 2,"FAIRY": 3,"RECOGNITION": 4,"THOUGHT": 5,"GHOST": 6,"POISON": 7,"GODLY": 8,"CLAIRVOYANCE": 9,
                "COUNTER": 10,"PROPHECY": 11,"SENSES": 12,"ANIMALS": 10,"COMMUNICATION": 11,"COGNITION": 12,"WALL": 13,"WILDERNESS": 14
            },
            "STONE": {
                "SUMMON": 0,"ELEMENTS": 1,"STONE_ENTITY": 2,"GESTALT": 3,"HAND": 4,"ARTISAN_BUFF": 5,"SKIN": 6,"CONJURE": 7,"EMPOWER": 8,"MAGIC_ENTITY": 9,
                "OBJECT": 10,"ARMOUR": 11,"DAMAGE": 12,"WALL": 10,"WILDERNESS": 11
            },
            "FIRE": {
                "AURA": 0,"ELEMENTS": 1,"EXPLOSION": 2,"GESTALT": 3,"HAND": 4,"ARTISAN_BUFF": 5,"OBJECT": 6,"DAMAGE": 7,"SHIELD": 8,"PROTECTION": 9,
                "WEAPON": 10,"WALL": 11
            },
            "HEALING": {
                "AURA": 0,"KINETIC_BUFF": 1,"POISON": 2,"CLAIRVOYANCE": 3,"EMPOWER": 4,"LIFE": 5,"OBJECT": 6,"PLANT": 7,"REGENERATION": 8,"COMMUNICATION": 9
            },
            "ILLUSION": {
                "THOUGHT": 0,"NOISE": 1,"SMELL": 2,"GODLY": 3,"HALLUCINATION": 4,"CLAIRVOYANCE": 5,"IMPERSONATION": 6,"COUNTER": 7,"EMPOWER": 8,"RADIANCE": 9,
                "MORALE": 10,"OBJECT": 11,"SENSES": 12,"SYMBOL": 10,"CLOAK": 11,"MIRAGE": 12
            },
            "FIGHT": {
                "ICE": 0,"ELECTRICITY": 1,"EXPLOSION": 2,"HAND": 3,"SUMMON": 4,"RADIANCE": 5,"OBJECT": 6,"ARROW": 7,"PLANT": 8,"ARMOUR": 9,
                "ACID": 10,"DAMAGE": 11,"DEBUFF": 12,"WEAPON": 10
            },
            "LIGHT": {
                "AURA": 0,"GESTALT": 1,"SUMMON": 2,"RADIANCE": 3,"NECROMANCY": 4,"DAMAGE": 5,"SHIELD": 6,"PROTECTION": 7,"DEBUFF": 8,"BLESSING": 9,
                "WEAPON": 10,"WALL": 11,"EXORCISE": 12,"DESPELL": 10
            },
            "SHADOW": {
                "AURA": 0,"VITALISATION": 1,"KINETIC_BUFF": 2,"GESTALT": 3,"SUMMON": 4,"OBJECT": 5,"DAMAGE": 6,"SENSES": 7,"MIRAGE": 8,"VEIL": 9,
                "FAMILIAR": 10,"WEAPON": 11,"WALL": 12,"DESPELL": 10
            },
        };

        var _SCHOOLS = [];

        var _loaded = false;

        var _spells = new Map();

        var _debugSpells = [
            {
                id: 0,
                tier: 2,
                name: "Schattenpfeil",
                school: _SCHOOLS.SHADOW,
                //types: [_SCHOOLS.SHADOW.DAMAGE],
                difficulty: Math.NaN,
                castTime: 7,
                range: 10,
                duration: "",
                empower: {
                    requirement: 2,
                    cost: {
                        ex: 1,
                        ch: 0,
                        co: 1
                    },
                    description: "Das Ziel erhält zusätzlich für 30 Ticks den Zustand [Blutend] 1"
                },
                cost: {
                    ex: 4,
                    ch: 0,
                    co: 2
                },
            },
        ];

        var _load = function () {
            _loaded = true;
            var loaded = _debugSpells;

            Database.load().then( function () {
                _SCHOOLS = Database.getSchools();
            });

            _spells = new Map();

            for (var i = 0; i < loaded; i++) {
                _spells.set(loaded[i].id, loaded[i]);
            }
        };

        return {
            SCHOOLS: function () {
                return _SCHOOLS;
            },
            getSpells: function () {
                return _spells;
            },
            getSpell: function (id) {
                return _spells.get(id);
            },
            subscribeLoadingDone: function (scope, handler) {
                var unsub = $rootScope.$on('SassLoadingDone', handler);
                scope.$on('$destroy', function () {
                    unsub();
                });
            },
            load: function () {
                if (!_loaded) {
                    _load();
                }
            }

        };

    }]
);
