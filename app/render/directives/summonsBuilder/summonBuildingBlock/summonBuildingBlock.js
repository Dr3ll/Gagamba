define(
    [
        'app',
        'angular',
        'services/SummonsBuilderService'
    ],
    function (app) {
        'use strict';

        app.directive('summonBuildingBlock', [
            function () {
                return {
                    scope: {
                        type: "@",
                        label: "<",
                        index: "<"
                    },
                    templateUrl: 'directives/summonsBuilder/summonBuildingBlock/summonBuildingBlock.html',
                    controller: ['$scope',
                        function ($scope, SummonsBuilder) {

                            $scope.callHover = function() {
                                SummonsBuilder.callBuildingBlockHover($scope.type, $scope.index);
                            };

                            $scope.callSelect = function() {
                                SummonsBuilder.callBuildingBlockSelect($scope.type, $scope.index);
                            };

                            $scope.init = function () {
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
