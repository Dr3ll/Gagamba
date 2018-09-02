define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Database', ['$rootScope', '$q', '$sce',
            function ($rootScope, $q, $sce) {

                const _SQLITE3 = require('sqlite3');

                let _db = new _SQLITE3.Database('../app/assets/db/gagamba.db');

                let _schools = new Map();
                let _spells = new Map();
                let _isLoaded = false;

                let _trust = function(value) {
                    if (value !== null && value !== undefined) {
                        return $sce.trustAsHtml(value);
                    } else {
                        return undefined;
                    }
                };

                let _loadData = function () {
                    return $q(function (resolve, reject) {
                        _db.serialize(
                            function () {
                                _db.each("SELECT * FROM Craft AS c WHERE c.type = 3 ORDER BY c.name", function (err, row) {
                                    row.spells = [];
                                    row.name = _trust(row.name);
                                    _schools.set(row.id, row);
                                }, function () {
                                    _db.each("SELECT * FROM Spell AS s ORDER BY s.tier", function (err, row) {
                                        let s = _schools.get(row.school);
                                        s.spells.push(row.id);
                                        if (row.cast_time !== null) { row.ticking = row.cast_time.match('[0-9]+'); }
                                        row.schoolName = s.name;
                                        row.rawName = row.name;
                                        row.name = _trust(row.name);
                                        row.description = $sce.trustAsHtml(row.description);
                                        row.range = $sce.trustAsHtml(row.range);
                                        row.empower_description = $sce.trustAsHtml(row.empower_description);
                                        _spells.set(row.id, row);
                                    }, function () {
                                        console.log("db loaded");
                                        _isLoaded = true;
                                        $rootScope.$emit('dbLoadingDone');
                                        resolve();
                                        _db.close();
                                    });
                                });
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
                    getSpell: function (id) {
                        return _spells.get(id);
                    }
                };

            }]);
    }
);
