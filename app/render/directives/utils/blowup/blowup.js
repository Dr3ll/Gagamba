define(
    [
        'app',
        'angular',
        'services/ToggleService'
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
                        realm: '@?'
                    },
                    templateUrl: 'directives/utils/blowup/blowup.html',
                    controller: ['$scope', 'Toggle',
                        function ($scope, Toggle) {

                            $scope.toggled = false;
                            $scope.realm = $scope.realm || 'def';

                            $scope.init = function () {
                                $scope.blocker = Toggle.blocker($scope.realm);
                                $scope.$on('$destroy', function () {
                                    if ($scope.toggled) {
                                        Toggle.pop($scope.realm);
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
