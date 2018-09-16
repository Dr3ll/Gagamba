define([
        'app',
        'modules/module',
        'services/StorageService'
    ], function (app) {
        'use strict';

        app.factory('Database', ['$rootScope', '$q', '$sce', 'Storage',
            function ($rootScope, $q, $sce, Storage) {

                const Future = require('../main/classes/Future/_future');
                const _dbPath = '../app/assets/db/gagamba.db';

                let _QUERRIES = {
                    GENERAL_CRAFTS: "SELECT * FROM Craft AS c WHERE c.type = 1 ORDER BY c.name",
                    WEAPON_TYPES: "SELECT * FROM Craft AS c WHERE c.type = 2 ORDER BY c.name",
                    SCHOOLS: "SELECT * FROM Craft AS c WHERE c.type = 3 ORDER BY c.name",
                    SPELLS: "SELECT * FROM Spell AS s ORDER BY s.tier"
                };

                let _schools = new Map();
                let _spells = new Map();
                let _crafts = new Map();
                let _isLoaded = false;

                let _trust = function(value) {
                    if (value !== null && value !== undefined) {
                        return $sce.trustAsHtml(value);
                    } else {
                        return undefined;
                    }
                };

                let _packMagic = function () {
                    let magic = Storage.SQLLoader.getPack(_dbPath);
                    magic.push(_QUERRIES.SCHOOLS, 'SCHOOLS', 'id',
                        function (row, ct) {
                            row.spells = [];
                            row.name = _trust(row.name)
                        });
                    magic.push(_QUERRIES.SPELLS, 'SPELLS', 'id',
                        function (row, ct) {
                            let ss = ct.get('SCHOOLS');
                            let s = ss.get(row.school);
                            s.spells.push(row.id);
                            if (row.cast_time !== null) { row.ticking = row.cast_time.match('[0-9]+'); }
                            row.schoolName = s.name;
                            row.rawName = row.name;
                            row.name = _trust(row.name);
                            row.description = $sce.trustAsHtml(row.description);
                            row.range = $sce.trustAsHtml(row.range);
                            row.empower_description = $sce.trustAsHtml(row.empower_description);
                        }
                    );
                    return magic;
                };

                let _packCrafts = function () {
                    let crafts = Storage.SQLLoader.getPack(_dbPath);
                    Storage.SQLLoader.getPack(_dbPath);
                    crafts.push(_QUERRIES.GENERAL_CRAFTS, 'CRAFTS', 'id',
                        function (row, ct) {
                            row.name = _trust(row.name);
                        });
                    return crafts;
                };

                let _loadData = function () {
                    return $q(function (resolve, reject) {
                        let loader = new Future();

                        let magic = _packMagic();
                        loader.asynch(magic.load,undefined,
                            function (container) {
                                console.log('magic loaded');
                                _schools = container.get('SCHOOLS');
                                _spells = container.get('SPELLS');
                            },
                            magic, this
                        );

                        let crafts = _packCrafts();
                        loader.asynch(crafts.load,undefined,
                            function (container) {
                                console.log('general crafts loaded');
                                _crafts = container.get('CRAFTS');
                            },
                            crafts, this
                        );

                        loader.unify(undefined, () => {
                            console.log("SQLite db loaded");
                            _isLoaded = true;
                            $rootScope.$emit('dbLoadingDone');
                            resolve();
                        });
                    });
                };

                _loadData();

                return {
                    load: _loadData,
                    isDataLoaded: _isLoaded,
                    subscribeLoadingDone: function (service, handler) {
                        return $rootScope.$on('dbLoadingDone', handler);
                    },
                    getSchools: function () {
                        return _schools;
                    },
                    getSpells: function () {
                        return _spells;
                    },
                    getCrafts: function () {
                        return _crafts;
                    },
                    getSpell: function (id) {
                        return _spells.get(id);
                    }
                };

            }]);
    }
);
