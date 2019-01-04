define(
    [
        'app',
        'modules/module',
        'directives/summonsBuilder/summonConfigurator/summonConfigurator',
        'directives/summonsBuilder/summonStats/summonStats',
        'directives/summonsBuilder/summonMilestones/summonMilestones',
        'services/SummonsBuilderService'
    ], function (app) {
        'use strict';

        app.controller('SummonsBuilderController', ['$scope',
                function ($scope) {


                    $scope.init = function() {

                    };

                    $scope.init();
                }
            ]
        );
    }
);
