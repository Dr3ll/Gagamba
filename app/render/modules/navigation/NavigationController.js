define(
    [
        'app',
        'modules/module',
        'services/CharacterService',
        'services/RulesService',
        'services/BooksService',
        'services/DatabaseService'
    ], function (app) {
        'use strict';

        app.controller('NavigationController', ['$scope', 'Character', 'Rules', 'Books', 'Database',
                function ($scope, Character, Rules, Books, Database) {

                    $scope.init = function () {
                        $scope.cheatsOn = Rules.cheatEnabled();

                        if (Books.isLoaded()) {
                            $scope.books = Books.books();
                        } else {
                            Books.subscribeLoadingDone($scope, function () {
                                $scope.books = Books.books();
                            });
                        }

                    };

                    $scope.init();

                    $scope.backToCharSelection = function () {
                        Character.setCharacter();
                    };

                    $scope.rest = function () {
                        Character.rest();
                    };

                    $scope.sleep = function () {
                        Character.sleep();
                    };

                    $scope.setBook = function (index) {
                        Books.setSelected(index);
                    };

                    $scope.debug = function() {
                        debugger;
                        Database.load();
                    };

                    $scope.toggleCheats = function () {
                        Rules.toggleCheats();
                        $scope.cheatsOn = Rules.cheatEnabled();
                    };
                }
            ]
        );
    }
);