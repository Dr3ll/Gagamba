define(
    [
        'app',
        'angular'
    ],
    function (app) {
        'use strict';

        app.directive('expanel', [
            function () {
                return {
                    transclude: {
                        'label': 'exLabel',
                        'content': 'exContent'
                    },
                    scope: {
                    },
                    templateUrl: 'directives/utils/expanel/expanel.html',
                    controller: ['$scope',
                        function ($scope) {

                            $scope.toggled = false;

                            $scope.init = function () {
                            };

                            $scope.toggle = function () {
                                $scope.toggled = !$scope.toggled;
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
