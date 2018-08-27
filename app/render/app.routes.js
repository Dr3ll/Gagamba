define(
    [
        'modules/main/MainController',
        'modules/grimoire/GrimoireController',
        'modules/books/BooksController',
        'modules/navigation/NavigationController'
    ], function() {
        'use strict';

        return {
            initRoutes: function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider)
            {

                $urlRouterProvider.otherwise('/');

                $locationProvider.html5Mode(true);

                $locationProvider.hashPrefix('!');

                $routeProvider.otherwise('/');

                $stateProvider
                    .state('root', {
                        url: '',
                        abstract: true,
                        views:{
                            'navbar@': {
                                controller: 'NavigationController',
                                templateUrl: "modules/navigation/navigation.html"
                            }
                        }
                    })
                    .state('root.main', {
                        url: '/',
                        views:{
                            'content@': {
                                controller: 'MainController',
                                templateUrl: 'modules/main/main.html'
                            }
                        }
                    })
                    .state('root.grimoire', {
                        url: '/',
                        views: {
                            'content@': {
                                controller: 'GrimoireController',
                                templateUrl: 'modules/grimoire/grimoire.html'
                            }
                        }
                    })
                    .state('root.books', {
                        url: '/',
                        views: {
                            'content@': {
                                controller: 'BooksController',
                                templateUrl: 'modules/books/books.html'
                            }
                        }
                    })
                ;

            }
        }
    }
);
