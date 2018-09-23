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
                        realm: '@?'
                    },
                    templateUrl: 'directives/utils/blowup/blowup.html',
                    controller: ['$scope', 'Blowup',
                        function ($scope, Blowup) {

                            $scope.toggled = false;
                            $scope.realm = $scope.realm || 'def';

                            $scope.init = function () {
                                $scope.blocker = Blowup.blocker($scope.realm);
                                $scope.$on('$destroy', function () {
                                    if ($scope.toggled) {
                                        Blowup.pop($scope.realm);
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
                                    Blowup.push($scope, $scope.realm);
                                } else {
                                    Blowup.pop($scope.realm);
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
