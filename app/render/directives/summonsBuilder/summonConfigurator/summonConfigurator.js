define(
    [
        'app',
        'angular',
        'directives/summonsBuilder/summonBuildingBlock/summonBuildingBlock',
        'services/SummonsBuilderService'
    ],
    function (app) {
        'use strict';

        app.directive('summonConfigurator', [
            function () {
                return {
                    scope: {
                    },
                    templateUrl: 'directives/summonsBuilder/summonConfigurator/summonConfigurator.html',
                    controller: ['$scope', 'SummonsBuilder',
                        function ($scope, SummonsBuilder) {

                            $scope.isStep = function (check) {
                                return $scope.step === check;
                            };

                            $scope.toStep = function (step) {
                                $scope.step = step;
                            };

                            $scope.callHover = function(type, index) {

                            };

                            $scope.callSelect = function(type, index) {

                            };

                            $scope.init = function () {
                                $scope.step = 0;

                                $scope.buildingBlocks = SummonsBuilder.buildingBlocks;

                            };


                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
