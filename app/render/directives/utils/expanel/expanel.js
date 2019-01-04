define(
    [
        'app',
        'angular',
        'services/ToggleService'
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
                        toggled: '=?',
                        realm: '@?'
                    },
                    templateUrl: 'directives/utils/expanel/expanel.html',
                    controller: ['$scope', 'Toggle',
                        function ($scope, Toggle) {

                            $scope.toggled = $scope.toggled || false;

                            $scope.init = function () {
                            };

                            $scope.toggle = function (state) {
                                if (state !== undefined) {
                                    $scope.toggled = state;
                                } else {
                                    $scope.toggled = !$scope.toggled;
                                }
                                if ($scope.toggled) {
                                    Toggle.push($scope, $scope.realm);
                                } else {
                                    Toggle.pop($scope.realm);
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
