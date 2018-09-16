define(
    [
        'app',
        'angular',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';

        app.directive('craftsTable', [
            function () {
                return {
                    scope: {
                        showZeros: '<',
                        type: '<'
                    },
                    templateUrl: 'directives/characterSheet/craftsTable/craftsTable.html',
                    controller: ['$scope', 'Character',
                        function ($scope, Character) {

                            Character.subscribeCharacterSelected($scope, function() {
                                if (Character.isCharacterLoaded()) {
                                    $scope.init();
                                }
                            });

                            let _kickZeros = function () {
                                let swap = [];
                                for (let att of $scope.crafts) {
                                    if ($scope.crafts[att].skill.value > 0) {
                                        swap.push($scope.crafts[att]);
                                    }
                                }
                                $scope.crafts = swap;
                            };

                            $scope.init = function () {
                                $scope.crafts = [];

                                if (!Character.isLoaded()) {
                                    return;
                                }

                                $scope.crafts = Character.crafts($scope.type);

                                if (!$scope.showZeros) {
                                    _kickZeros();
                                }
                            };
                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
