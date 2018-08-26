define(
    [
        'app',
        'angular',
        'services/CharacterService',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.directive('spell', [
            function () {
                return {
                    scope: {
                        spellId: "<",
                        character: "<"
                    },
                    templateUrl: 'directives/spell/spell.html',
                    controller: ['$scope', '$sce', 'Character', 'Grimoire',
                        function ($scope, $sce, Character, Grimoire) {

                            $scope.spellData = {};

                            $scope.init = function () {
                                let uncleanSpell = Grimoire.getSpell($scope.spellId);
                                uncleanSpell.name = $sce.trustAsHtml(uncleanSpell.name);
                                uncleanSpell.description = $sce.trustAsHtml(uncleanSpell.description);
                                uncleanSpell.range = $sce.trustAsHtml(uncleanSpell.range);
                                uncleanSpell.empower_description = $sce.trustAsHtml(uncleanSpell.empower_description);
                                $scope.spellData = uncleanSpell;
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
