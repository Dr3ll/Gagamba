define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Database', ['$rootScope', '$q',
            function ($rootScope, $q) {

                const _SQLITE3 = require('sqlite3');

                var _db = new _SQLITE3.Database('app/assets/db/gagamba.s3db');

                var _schools = [];

                var _loadData = function () {
                    return $q(function (resolve, reject) {
                        _db.serialize(
                            function () {
                                _db.each("SELECT * FROM Craft AS c WHERE c.type = 3", function (err, row) {
                                    _schools.push(row);
                                });
                            });
                        resolve();
                        _db.close();
                    });
                };

                return {
                    load: _loadData,
                    getSchools: function () {
                        return _schools;
                    }
                };

            }]);
    }
);
