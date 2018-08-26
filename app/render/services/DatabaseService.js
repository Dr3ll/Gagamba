define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Database', ['$rootScope', '$q',
            function ($rootScope, $q) {

                const _SQLITE3 = require('sqlite3');

                let _db = new _SQLITE3.Database('../app/assets/db/gagamba.db');

                let _schools = new Map();
                let _spells = new Map();

                let _loadData = function () {
                    return $q(function (resolve, reject) {
                        _db.serialize(
                            function () {
                                _db.each("SELECT * FROM Craft AS c WHERE c.type = 3", function (err, row) {
                                    row.spells = [];
                                    _schools.set(row.id, row);
                                });
                                _db.each("SELECT * FROM Spell", function (err, row) {
                                    let s = _schools.get(row.school);
                                    s.spells.push(row.id);
                                    _spells.set(row.id, row);
                                });
                            });
                        resolve();
                        _db.close();
                    });
                };

                _loadData();

                return {
                    load: _loadData,
                    subscribeLoadingDone: function (service, handler) {
                        service.handler$dbLoadingDone = $rootScope.$on('dbLoadingDone', handler);
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
