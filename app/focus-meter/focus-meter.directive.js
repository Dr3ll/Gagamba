'use strict';


app.directive('focusMeter', [
    function () {
        return {
            scope: {},
            templateUrl: 'focus-meter/focus-meter.template.html',
            controller: ['$scope', function ($scope) {
              $scope.kek = "ixde";
            }],
        }
    }
]);
