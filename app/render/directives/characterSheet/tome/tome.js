define(
    [
        'app/main',
        'angular',
        'services/CharacterService',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.directive('tome', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/tome/tome.html',
                    controller: ['$scope', 'Grimoire',
                        function ($scope, Grimoire) {

                            $scope.acSpell = {};
                            $scope.spells = [];

                            $scope.sortSpells = function (spells) {
                                for (var i = 0; i < spells.length; i++) {
                                    if ($scope.spells.length === 0) {
                                        $scope.spells.push(spells[i]);
                                        return;
                                    }
                                    for (var j = 0; j < $scope.spells; j++) {
                                        if ($scope.spells[j].tier >= spells[i].tier) {
                                            if ($scope.spells[j].tier === spells[i].tier &&
                                                $scope.spells[j].name < spells[i].name) {
                                                $scope.splice(j, 0, spells[i]);
                                                break;
                                            }
                                        }
                                        if (spells.length - 1 === j) {
                                            $scope.spells.push(spells[j]);
                                        }
                                    }
                                }
                            };

                            $scope.init = function () {
                                $scope.sortSpells(Grimoire.getSpells());


                            };

                            $scope.init();

                        }],
                }
            }
        ]);
    }
);
