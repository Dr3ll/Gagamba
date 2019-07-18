define(
    [
        'app',
        'angular',
        'directives/utils/expanel/expanel',
        'services/CharacterService',
        'services/DatabaseService',
        'services/RulesService'
    ],
    function (app) {
        'use strict';

        app.directive('craftsTable', [
            function () {
                return {
                    scope: {
                        showZeros: '<',
                        type: '<',
                        label: '<'
                    },
                    templateUrl: 'directives/characterSheet/craftsTable/craftsTable.html',
                    controller: ['$scope', '$controller', 'Character', 'Database', 'Rules',
                        function ($scope, $controller, Character, Database, Rules) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.ATTRIBUTES);

                            let _fetchCraftInfo = function () {
                                let craftsData = Database.getCrafts($scope.type);
                                for (let craftId in $scope.craftsWithZeroes) {
                                    let data = craftsData.get(parseInt(craftId));
                                    let c = $scope.craftsWithZeroes[craftId];
                                    for(let att in data) {
                                        c[att] = data[att];
                                    }
                                }
                            };

                            let _kickZeros = function () {
                                $scope.craftsNoZeroes = [];
                                for (let att in $scope.craftsWithZeroes) {
                                    if ($scope.craftsWithZeroes[att].skill.value > 0) {
                                        $scope.craftsNoZeroes.push($scope.craftsWithZeroes[att]);
                                    }
                                }
                            };

                            $scope.init = function () {
                                $scope.crafts = undefined;
                                $scope.craftsWithZeroes = undefined;
                                $scope.craftsNoZeroes = undefined;
                                $scope.leveling = false;

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $scope.craftsWithZeroes = Character.crafts($scope.type);
                                _fetchCraftInfo();
                                _kickZeros();

                                if (!$scope.showZeros) {
                                    $scope.crafts  = $scope.craftsNoZeroes;
                                } else {
                                    $scope.crafts = $scope.craftsWithZeroes;
                                }
                            };
                            $scope.init();

                            $scope.sub = function (craft) {

                            };

                            $scope.add = function (craft) {

                            };

                            $scope.lowest = function (craft) {

                            };

                            $scope.highest = function (craft) {

                            };

                            Rules.subscribeLeveling($scope,
                                function (e, state) {
                                    $scope.leveling = state;
                                    if ($scope.showZeros) {
                                        return;
                                    }

                                    if (state) {
                                        $scope.crafts = $scope.craftsWithZeroes;
                                    } else {
                                        $scope.crafts = $scope.craftsNoZeroes;
                                    }
                                });
                        }],
                }
            }
        ]);
    }
);
