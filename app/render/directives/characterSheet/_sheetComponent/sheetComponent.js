define(
    [
        'app',
        'modules/module',
        'angular',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';
        app.controller('sheetComponentController',
            ['$scope', 'Character',
                function sheetComponentController ($scope, Character) {
                    Character.subscribeCharacterSelected($scope, function () {
                        if (Character.isCharacterLoaded()) {
                            $scope.init();
                        }
                    });

                    $scope.field = undefined;

                    $scope.refresh = function() {
                        Character.refresh($scope.field);
                    };

                    $scope.setField = function (field) {
                        $scope.field = field;
                        Character.subscribeCharacterChanged($scope, function () {
                            if (Character.isCharacterLoaded()) {
                                $scope.init();
                            }
                        }, field);
                    };

                    $scope.init = function () { /* abstract */
                    };
                }
            ]);
    }
);

