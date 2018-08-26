define(
    [
        'app',
        'modules/module',
        'services/CharacterService'
    ], function (app) {
        'use strict';

        app.controller('NavigationController', ['$scope', 'Character',
                function ($scope, Character) {

                    $scope.backToCharSelection = function () {
                        Character.setCharacter(undefined);
                    };
                }
            ]
        );
    }
);