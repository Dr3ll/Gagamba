define(
    [
        'app',
        'angular',
        'services/CharacterService',
        'services/DatabaseService'
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
                    controller: ['$scope', '$controller', 'Character', 'Database',
                        function ($scope, $controller, Character, Database) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.ATTRIBUTES);

                            let _fetchCraftInfo = function () {
                                let craftsData = Database.getCrafts();
                                for(let craftId in $scope.crafts) {
                                    let data = craftsData.get(parseInt(craftId));
                                    let c = $scope.crafts[craftId];
                                    for(let att in data) {
                                        c[att] = data[att];
                                    }
                                };
                            };

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
                                $scope.crafts = undefined;

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $scope.crafts = Character.crafts($scope.type);
                                _fetchCraftInfo();

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
