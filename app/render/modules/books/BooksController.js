define(
    [
        'app',
        'modules/module',
        'directives/book/book',
        'services/BooksService'
    ], function (app) {
        'use strict';

        app.controller('BooksController', ['$scope', 'Books',
                function ($scope, Books) {

                    Books.subscribeBookSelected($scope, function () {
                        $scope.selected = Books.selected();
                    });

                    $scope.init = function() {
                        if (Books.isLoaded()) {
                            $scope.books = Books.books();
                        } else {
                            Books.subscribeLoadingDone($scope, function () {
                                $scope.books = Books.books();
                            });
                        }
                        $scope.selected = Books.selected();
                    };

                    $scope.init();
                }
            ]
        );
    }
);
