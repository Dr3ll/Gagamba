define(
    [
        'app',
        'angular',
        'services/BooksService'
    ],
    function (app) {
        'use strict';

        app.directive('book', [
            function () {
                return {
                    scope: {
                        file: '=',
                        id: '<'
                    },
                    templateUrl: 'directives/book/book.html',
                    controller: ['$scope', 'Books',
                        function ($scope, Books) {

                            $scope.searchInitialized = false;

                            Books.subscribeBookSelected($scope, function () {
                                if (Books.selected() === $scope.id) {
                                    $scope.totalBooks = Books.books().length;
                                    if (!$scope.searchInitialized) {
                                        $scope.init();
                                        //$scope.search.searcher.style.visibility = 'hidden';
                                    }
                                    $scope.search.openSearchWindow();
                                    //$scope.search.searcher.style.display = 'block';
                                } else {
                                    if ($scope.searchInitialized) {
                                        //$scope.search.closeSearchWindow();
                                        console.log("close");

                                        //$scope.search.searcher.style.display = 'none';
                                    }
                                }
                            });

                            $scope.init = function() {
                                $scope.searchWindowOpen = false;



                                /*const searchInWebview = Books.search();
                                if (webView !== null) {
                                    $scope.searchInitialized = true;
                                    $scope.search = searchInWebview(webView);
                                    //$scope.search.openSearchWindow();
                                }*/
                                const webView = document.getElementById('pdf_' + $scope.file.fileName);

                                $scope.search = Books.searcher(webView);
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
                                if ($scope.searchWindowOpen) {
                                    console.log("open");


/*
                                    const searchInWebview = Books.search();
                                    const webView = document.getElementById('pdf_' + $scope.file.fileName);
                                    if (webView !== null) {
                                        debugger;
                                        let ops = { searchWindowWebview: $scope.search.searchTarget};
                                        $scope.search = searcher;
                                        $scope.search.openSearchWindow();
                                        $scope.search.searcher.style.visibility = 'unset';
                                        $scope.search.searcher.style.display = 'block';
                                    }
                                } else {
                                    console.log("close");
                                    debugger;
                                    $scope.search.searcher.style.visibility = 'hidden';
                                    $scope.search.closeSearchWindow();
                                    $scope.search.searchTarget = undefined;
                                    let parent = $scope.search.searcher.parentNode;
                                    parent.removeChild($scope.search.searcher);
                                    //$scope.search.closeSearchWindow();
                                }*/
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
