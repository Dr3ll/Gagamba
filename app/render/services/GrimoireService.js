define([
        'app',
        'modules/module',
        'services/DatabaseService'
    ], function (app) {
        'use strict';

        app.factory('Grimoire', ['$rootScope', '$sce', 'Database',
            function ($rootScope, $sce, Database) {

                let _sortSpells = function (spells) {
                    let tome = [];
                    for (let i = 0; i < spells.length; i++) {
                        if (tome.length === 0) {
                            tome.push(spells[i]);
                            continue;
                        }
                        for (let j = 0; j < tome.length; j++) {
                            if (tome[j].tier >= spells[i].tier) {
                                if (tome[j].tier === spells[i].tier &&
                                    tome[j].rawName < spells[i].rawName) {
                                    tome.splice(j, 0, spells[i]);
                                    break;
                                }
                            }
                            if (tome.length - 1 === j) {
                                tome.push(spells[i]);
                                break;
                            }
                        }
                    }
                    return tome;
                };

                return {
                    isGrimoireLoaded: function () {
                        return Database.isDataLoaded();
                    },
                    subscribeLoadingDone: Database.subscribeLoadingDone,
                    getSchools: function() {
                        return Database.getSchools();
                    },
                    getSpells: function () {
                        return Database.getSpells();
                    },
                    getSpell: function (id) {
                        return Database.getSpell(id);
                    },
                    sortTome(spells) {
                        return _sortSpells(spells);
                    }
                };

            }]);
    }
);