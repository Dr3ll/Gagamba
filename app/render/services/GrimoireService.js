define([
        'app',
        'modules/module',
        'services/DatabaseService'
    ], function (app) {
        'use strict';

        app.factory('Grimoire', ['$rootScope', 'Database',
            function ($rootScope, Database) {

                return {
                    getSchools: function() {
                        return Database.getSchools();
                    },
                    getSpells: function () {
                        return Database.getSpells();
                    },
                    getSpell: function (id) {
                        return Database.getSpell(id);
                    },
                    subscribeLoadingDone: function (scope, handler) {
                        scope.handler$grimoireLoadingDone = $rootScope.$on('grimoireLoadingDone', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$grimoireLoadingDone();
                        });
                    }
                };

            }]);
    }
);