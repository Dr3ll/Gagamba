define(
    [
        'app',
        'angular',
        'directives/utils/expanel/expanel',
        'directives/utils/blowup/blowup',
        'services/CharacterService',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.directive('tome', [
            function () {
                return {
                    scope: {
                    },
                    templateUrl: 'directives/characterSheet/tome/tome.html',
                    controller: ['$scope', '$timeout', 'Character', 'Grimoire',
                        function ($scope, $timeout, Character, Grimoire) {

                            Character.subscribeCharacterSelected($scope, function() {
                                if (Character.isCharacterLoaded()) {
                                    $scope.init();
                                }
                            });

                            $scope.init = function () {
                                $scope.tome = [];

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $timeout(function() {
                                    $scope.tome = Character.tome();
                                    }
                                );
                            };

                            $scope.init();

                        }],
                }
            }
        ]);
    }
);
