define([
    'app'
    ], function (app) {
        'use strict';

        app.$sqlLoader = {};

        const _SQLITE3 = require('sqlite3');
        const databases = new Map();

        // hashing constants
        const _hashPrime = 73;
        const _m = 1000000009;

        let hashDat = function (s) {
            let pow = 1;
            let hash = 0;
            for (let i=0; i<s; i++) {
                hash = (hash + (s[i] - 'a' + 1) * pow) % _m;
                pow = (pow * _hashPrime) % _m;
            }
            return hash.toString(10);
        };

        let getDB = function (filePath) {
            let key = hashDat(filePath);
            let dbConnection = databases.get(key);
            if (dbConnection === undefined) {
                let connection = new _SQLITE3.Database(filePath);
                dbConnection = {db: connection, count: 1};
                databases.set(key, dbConnection);
            } else {
                dbConnection.count++;
            }
            return dbConnection;
        };

        app.$sqlLoader.getPack = function (dbFile) {
            let pack = {
                db: dbFile,
                q: [],
            };

            pack.push = function (query, alias, keyField, f) {
                this.q.push( { query: query, alias: alias, keyField: keyField, f: f });
            };

            pack.load = function (undefined, callback) {
                if (this.q.length <= 0) {
                    return undefined;
                }
                let dbCon = getDB(this.db);
                let db = dbCon.db;
                let i = 0;
                let container = new Map();
                this.q.forEach(function (set) {
                    container.set(set.alias, new Map());
                });

                let self = this;

                let processQuery = function (query, setAlias, f, keyField, ct, cb) {
                    db.serialize(
                        function () {
                            db.each(query, function (err, row) {
                                f(row, ct);
                                let dataSet = ct.get(setAlias);
                                dataSet.set(row[keyField], row);
                            }, function () {
                                cb();
                            });
                        }
                    );
                };

                let next = function() {
                    if(self.q.length > i) {
                        let j = i++;
                        processQuery(self.q[j].query, self.q[j].alias, self.q[j].f, self.q[j].keyField, container, next);
                    } else {
                        dbCon.count--;
                        if (dbCon.count <= 0) {
                            db.close();
                        }

                        callback(container);
                    }
                };

                next();
            };

            return pack;
        };

    }
);