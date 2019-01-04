define(
    [
        'app',
        'angular',
        'services/SummonsBuilderService'
    ],
    function (app) {
        'use strict';

        app.directive('summonStats', [
            function () {
                return {
                    scope: {
                    },
                    templateUrl: 'directives/summonsBuilder/summonStats/summonStats.html',
                    controller: ['$scope', 'SummonsBuilder',
                        function ($scope, SummonsBuilder) {


                            $scope.init = function () {
                            };


                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
