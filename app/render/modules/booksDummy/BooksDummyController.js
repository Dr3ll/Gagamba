define(
    [
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.controller('BooksDummyController', ['$scope',
                function ($scope) {

                    $scope.init = function() {
                    };

                    $scope.init();
                }
            ]
        );
    }
);
