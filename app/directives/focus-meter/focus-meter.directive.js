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
                    templateUrl: 'directives/focus-meter/focus-meter.template.html',
                    controller: ['$scope', 'Character', 'Grimoire',
                        function ($scope, Character, Grimoire) {

                        var _updateBoxes = function () {
                            $scope.freshBox = [];
                            $scope.channeledBox = [];
                            $scope.exhaustedBox = [];
                            $scope.consumedBox = [];

                            var cap = Math.max(
                                $scope.focus.ch,
                                $scope.focus.ex,
                                $scope.focus.co);

                            for (var i = 0; i < cap; i++) {
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

                        $scope.init = function () {
                            $scope.focus = Character.getFocus();


                        };

                        $scope.load = function () {
                            Grimoire.load();
                            $scope.schools = Grimoire.SCHOOLS();
                        };

                        $scope.init();

                    }],
                }
            }
        ]);
    }
);
