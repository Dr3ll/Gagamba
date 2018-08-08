'use strict';


app.directive('focusMeter', [
    function () {
        return {
            scope: {},
            templateUrl: 'focus-meter/focus-meter.template.html',
            controller: ['$scope', function ($scope) {

                $scope.max = 21;

                $scope.fresh = 4;
                $scope.exhausted = 9;
                $scope.consumed = 8;

                $scope.freshBox = [];
                $scope.exhaustedBox = [];
                $scope.consumedBox = [];

                var _updateBoxes = function () {
                    var cap = Math.max($scope.fresh, $scope.exhausted, $scope.consumed);
                    for (var i = 0; i < cap; i++) {
                        if ($scope.fresh > i) {
                            $scope.freshBox.push(undefined);
                        }
                        if ($scope.exhausted > i) {
                            $scope.exhaustedBox.push(undefined);
                        }
                        if ($scope.consumed > i) {
                            $scope.consumedBox.push(undefined);
                        }
                    }
                };

                $scope.init = function () {
                    _updateBoxes();


                };

            }],
        }
    }
]);
