define(
    [
        'app',
        'angular',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';

        app.directive('healthMeter', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/healthMeter/healthMeter.html',
                    controller: ['$scope', 'Character',
                        function ($scope, Character) {

                            $scope.init = function () {
                                $scope.unharmedBox = [];
                                $scope.hurtBox = [];
                                $scope.injuredBox = [];
                                $scope.badlyInjuredBox = [];
                                $scope.dyingBox = [];
                                $scope.remaining = 0;

                                $scope.health = Character.health();
                            };

                            var _point = function (state) {
                                return {
                                    state: state
                                };
                            };

                            var _updateBoxes = function () {

                                var tempHealth = {
                                    ch: $scope.health.ch,
                                    ex: $scope.health.ex,
                                    co: $scope.health.co
                                };

                                $scope.remaining = $scope.health.h * 5 - ($scope.health.ch + $scope.health.ex + $scope.health.co);
                                $scope.unharmedBox = [];
                                $scope.hurtBox = [];
                                $scope.injuredBox = [];
                                $scope.badlyInjuredBox = [];
                                $scope.dyingBox = [];

                                for (var m = 0; m < 5; m++) {
                                    for (var p = $scope.health.h * m; p < $scope.health.h * (m + 1); p++) {
                                        var point = { };
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

                            $scope.$watch('health', function () {
                                _updateBoxes();
                            }, true);

                            Character.subscribeLoadingDone($scope, function () {
                                $scope.init();
                            });

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
