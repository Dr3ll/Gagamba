'use strict';


app.directive('sass', [
    function () {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'sass/sass.template.html',
            controller: ['$scope', 'SassService', function ($scope, SassService) {

                SassService.subscribeLoadingDone($scope, function (event, args) {
                        $scope.$apply(function () {
                            $scope.style = args['css'];
                        })
                    }
                );

                SassService.load();

            }],
        }
    }
]);
