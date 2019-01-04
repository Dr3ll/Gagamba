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

                    $scope.fields = [];

                    $scope.refresh = function() {
                        for (let i = 0; i < $scope.fields.length; i++) {
                            Character.refresh($scope.fields[i]);
                        }
                    };

                    $scope.setField = function (field) {
                        $scope.fields.push(field);
                        Character.subscribeCharacterChanged($scope, function () {
                            if (Character.isCharacterLoaded()) {
                                $scope.init();
                            }
                        }, field);
                    };

                    $scope.init = function () {}; /* abstract */
                }
            ]);
    }
);

