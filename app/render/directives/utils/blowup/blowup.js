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
                        'label': 'blowlabel',
                        'content': 'blowcontent'
                    },
                    scope: {
                        toggled: '=?',
                        scope: '@?'
                    },
                    templateUrl: 'directives/utils/blowup/blowup.html',
                    controller: ['$scope', 'Blowup',
                        function ($scope, Blowup) {

                            $scope.toggled = false;
                            $scope.scope = $scope.scope || 'def';

                            $scope.init = function () {
                                $scope.blocker = Blowup.blocker($scope.scope);
                                $scope.$on('$destroy', function () {
                                    if ($scope.toggled) {
                                        Blowup.pop($scope.scope);
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
                                    Blowup.push($scope, $scope.scope);
                                } else {
                                    Blowup.pop($scope.scope);
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);