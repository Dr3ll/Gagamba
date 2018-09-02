define(
    [
        'app',
        'angular',
        'directives/utils/blowup/blowup',
        'services/CharacterService',
        'services/GrimoireService',
        'services/BlowupService'
    ],
    function (app) {
        'use strict';

        app.directive('spell', [
            function () {
                return {
                    scope: {
                        spellId: '<',
                        view: '@'
                    },
                    templateUrl: 'directives/spell/spell.html',
                    controller: ['$scope', 'Character', 'Grimoire', 'Blowup',
                        function ($scope, Character, Grimoire, Blowup) {

                            $scope.spellData = {};
                            $scope.stickyToggled = false;

                            $scope.isTome = $scope.view === 'TOME';
                            $scope.isGrimoire = $scope.view === 'GRIMOIRE';

                            $scope.init = function () {
                                $scope.spellData = Grimoire.getSpell($scope.spellId);
                            };

                            $scope.closeSticky = function () {
                                Blowup.pop();
                            };

                            $scope.cast = function () {
                                Character.cast($scope.spellId);
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
