define(
    [
        'app',
        'angular',
        'services/SummonsBuilderService'
    ],
    function (app) {
        'use strict';

        app.directive('summonMilestones', [
            function () {
                return {
                    scope: {
                    },
                    templateUrl: 'directives/summonsBuilder/summonMilestones/summonMilestones.html',
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
