define(
    [
        'app',
        'modules/module',
        'angular',
        'directives/characterSheet/_sheetComponent/sheetComponent',
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
                    controller: ['$scope', '$controller', 'Character', 'Grimoire',
                        function ($scope, $controller, Character, Grimoire) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.FOCUS);

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

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $scope.focus = Character.focus();
                                $scope.reg = Character.focusReg();
                                _updateBoxes();
                            };

                            let _updateBoxes = function () {
                                $scope.freshBox = [];
                                $scope.channeledBox = [];
                                $scope.exhaustedBox = [];
                                $scope.consumedBox = [];

                                let fresh = $scope.focus.t - ($scope.focus.ex + $scope.focus.ch + $scope.focus.co);
                                let cap = Math.max(fresh, $scope.focus.ex, $scope.focus.ch, $scope.focus.co);

                                for (let i = 0; i < cap; i++) {
                                    if (fresh > i) {
                                        $scope.freshBox.push(1);
                                    }
                                    if ($scope.focus.ch > i) {
                                        $scope.channeledBox.push(2);
                                    }
                                    if ($scope.focus.ex > i) {
                                        $scope.exhaustedBox.push(3);
                                    }
                                    if ($scope.focus.co > i) {
                                        $scope.consumedBox.push(4);
                                    }
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
