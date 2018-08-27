define(
    [
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.controller('BooksController', ['$scope',
                function ($scope) {

                    $scope.init = function() {
                        $scope.searchWindowOpen = false;
                        const searchInWebview = require('electron-in-page-search').default;
                        const webView = document.getElementById('rules');
                        //searchInWebview.customSearchWindowHtmlPath =
                        $scope.search = searchInWebview(webView);
                        $scope.search.openSearchWindow();
                    };

                    $scope.keypress = function($event) {
                        if (!$scope.searchWindowOpen) {
                            if ($event.ctrlKey && $event.key === 'f') {
                                $scope.openSearch();
                            }
                        }
                    };

                    $scope.openSearch = function() {
                        $scope.searchWindowOpen = !$scope.searchWindowOpen;
                    };

                    $scope.init();
                }
            ]
        );
    }
);
