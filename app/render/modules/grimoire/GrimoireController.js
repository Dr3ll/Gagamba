define(
    [
        'app',
        'modules/module',
        'directives/spell/spell',
        'directives/utils/expanel/expanel',
        'services/GrimoireService',
        'services/SettingsService'
    ], function (app) {
        'use strict';

        app.controller('GrimoireController', ['$scope', 'Settings', 'Grimoire',
                function ($scope, Settings, Grimoire) {

                    $scope.spells = [];

                    $scope.init = function() {
                        let tempSchools = Grimoire.getSchools();
                        $scope.schools = Array.from(tempSchools.values());
                    };

                    $scope.init();
                }
            ]
        );
    }
);
