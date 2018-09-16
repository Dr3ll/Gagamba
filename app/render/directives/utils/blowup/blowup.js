define(
    [
        'app',
        'angular',
        'services/BlowupService'
    ],
    function (app) {
        'use strict';

        app.directive('blowup', [
            function () {
                return {
                    transclude: {
                        'label': 'blowLabel',
                        'content': 'blowContent'
                    },
                    scope: {
                        toggled: '='
                    },
                    templateUrl: 'directives/utils/blowup/blowup.html',
                    controller: ['$scope', 'Blowup',
                        function ($scope, Blowup) {

                            $scope.toggled = false;

                            $scope.init = function () {
                                $scope.blocker = Blowup.blocker();
                                $scope.$on('$destroy', function () {
                                    if ($scope.toggled) {
                                        Blowup.pop();
                                    }
                                });
                            };

                            $scope.toggle = function (state) {
                                if (state !== undefined) {
                                    $scope.toggled = state;
                                } else {
                                    $scope.toggled = !$scope.toggled;
                                }
                                if ($scope.toggled) {
                                    Blowup.push($scope);
                                } else {
                                    Blowup.pop();
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
