define(
    [
        'app',
        'angular',
        'services/CharacterService',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.directive('focusMeter', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/focusMeter/focusMeter.html',
                    controller: ['$scope', 'Character', 'Grimoire',
                        function ($scope, Character, Grimoire) {

                            Character.subscribeCharacterSelected($scope, function() {
                                if (Character.characterLoaded()) {
                                    $scope.init();
                                }
                            });

                            $scope.init = function () {
                                $scope.freshBox = [];
                                $scope.channeledBox = [];
                                $scope.exhaustedBox = [];
                                $scope.consumedBox = [];
                                $scope.focus = {
                                    ch: 0,
                                    ex: 0,
                                    co: 0
                                };

                                if (!Character.characterLoaded()) {
                                    return;
                                }

                                $scope.focus = Character.focus();
                            };

                            let _updateBoxes = function () {
                                $scope.freshBox = [];
                                $scope.channeledBox = [];
                                $scope.exhaustedBox = [];
                                $scope.consumedBox = [];

                                let cap = Math.max(
                                    $scope.focus.ch,
                                    $scope.focus.ex,
                                    $scope.focus.co);

                                for (let i = 0; i < cap; i++) {
                                    if ($scope.focus.f > i) {
                                        $scope.freshBox.push(2);
                                    }
                                    if ($scope.focus.ch > i) {
                                        $scope.channeledBox.push(2);
                                    }
                                    if ($scope.focus.ex > i) {
                                        $scope.exhaustedBox.push(2);
                                    }
                                    if ($scope.focus.co > i) {
                                        $scope.consumedBox.push(2);
                                    }
                                }
                            };

                            $scope.$watch('focus', function () {
                                _updateBoxes();
                            }, true);

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
