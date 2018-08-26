define(
    [
        'app',
        'modules/module',
        'directives/spell/spell',
        'services/GrimoireService',
        'services/SettingsService'
    ], function (app) {
        'use strict';

        app.controller('GrimoireController', ['$scope', '$sce', 'Settings', 'Grimoire',
                function ($scope, $sce, Settings, Grimoire) {

                    $scope.spells = [];

                    $scope.init = function() {
                        let tempSchools = Grimoire.getSchools();
                        $scope.schools = Array.from(tempSchools.values());
                        $scope.schools.forEach(function(school) {
                            school.name = $sce.trustAsHtml(school.name);
                        });
                    };

                    $scope.init();
                }
            ]
        );
    }
);
