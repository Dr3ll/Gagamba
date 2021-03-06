define(
    [
        'app',
        'angular',
        'directives/characterSheet/_sheetComponent/sheetComponent',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';

        app.directive('healthMeter', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/healthMeter/healthMeter.html',
                    controller: ['$scope','$controller', 'Character',
                        function ($scope, $controller, Character) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.HEALTH);

                            $scope.init = function () {
                                $scope.unharmedBox = [];
                                $scope.hurtBox = [];
                                $scope.injuredBox = [];
                                $scope.badlyInjuredBox = [];
                                $scope.dyingBox = [];
                                $scope.remaining = 0;

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $scope.health = Character.health();
                                _updateBoxes();
                            };

                            let _point = function (state) {
                                return {
                                    state: state
                                };
                            };

                            let _updateBoxes = function () {

                                let tempHealth = {
                                    ch: $scope.health.ch,
                                    ex: $scope.health.ex,
                                    co: $scope.health.co
                                };

                                $scope.remaining = $scope.health.pt * 5 - ($scope.health.ch + $scope.health.ex + $scope.health.co);
                                $scope.unharmedBox = [];
                                $scope.hurtBox = [];
                                $scope.injuredBox = [];
                                $scope.badlyInjuredBox = [];
                                $scope.dyingBox = [];

                                for (let m = 0; m < 5; m++) {
                                    for (let p = $scope.health.pt * m; p < $scope.health.pt * (m + 1); p++) {
                                        let point = { };
                                        if (tempHealth.co > 0) {
                                            tempHealth.co--;
                                            point = _point(Character.RSTATES.CONSUMED);
                                        } else if (tempHealth.ex > 0) {
                                            tempHealth.ex--;
                                            point = _point(Character.RSTATES.EXHAUSTED);
                                        } else if (tempHealth.ch > 0) {
                                            tempHealth.ch--;
                                            point = _point(Character.RSTATES.CHANNELED);
                                        } else {
                                            point = _point(Character.RSTATES.FRESH);
                                        }

                                        switch (m) {
                                            case 0: {
                                                $scope.unharmedBox.push(point);
                                                break;}
                                            case 1: {
                                                $scope.hurtBox.push(point);
                                                break;}
                                            case 2: {
                                                $scope.injuredBox.push(point);
                                                break;}
                                            case 3: {
                                                $scope.badlyInjuredBox.push(point);
                                                break;}
                                            case 4: {
                                                $scope.dyingBox.push(point);
                                                break;}
                                        }
                                    }
                                }

                            };

                            $scope.hit = function () {
                                Character.hit({ ch: 2, ex: 1, co: 3 });

                                $scope.health = Character.health();
                            };

                            $scope.init();

                        }],
                }
            }
        ]);
    }
);
