define(
    [
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.controller('BooksController', ['$scope',
                function ($scope) {


                    $scope.init = function() {
                    };

                    $scope.init();
                }
            ]
        );
    }
);
