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
                        'label': 'exlabel',
                        'content': 'excontent'
                    },
                    scope: {
                        toggled: '=?'
                    },
                    templateUrl: 'directives/utils/expanel/expanel.html',
                    controller: ['$scope',
                        function ($scope) {

                            $scope.toggled = $scope.toggled || false;

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
