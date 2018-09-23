define(
    [
        'app',
        'angular'
    ],
    function (app) {
        'use strict';

        app.directive('modal', [
            function () {
                return {
                    scope: {
                        modalScope: '=',
                        template: '@',
                        modalId: '<'
                    },
                    templateUrl: 'directives/utils/modal/modal.html',
                    controller: ['$scope',
                        function ($scope) {

                        $scope.show = function () {
                            $scope.visible = true;
                            if ($scope.onShow) {
                                $scope.onShow();
                            }
                        };

                        $scope.hide = function () {
                            $scope.visible = false;

                            if ($scope.onHide) {
                                $scope.onHide();
                            }
                        };

                        $scope.init = function () {
                            $scope.visible = false;

                            if ($scope.modalScope) {
                                for (let att in $scope.modalScope) {
                                    $scope[att] = $scope.modalScope[att];
                                }
                                $scope.modalScope.show = $scope.show;
                                $scope.modalScope.hide = $scope.hide;

                            }
                        };
                        $scope.init();

                        }],
                }
            }
        ]);
    }
);
