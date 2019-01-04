define(
    [
        'modules/main/MainController',
        'modules/grimoire/GrimoireController',
        'modules/books/BooksController',
        'modules/booksDummy/BooksDummyController',
        'modules/navigation/NavigationController',
        'modules/summonsBuilder/SummonsBuilderController'
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
                            },
                            'books@': {
                                controller: 'BooksController',
                                templateUrl: "modules/books/books.html"
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
                                controller: 'BooksDummyController',
                                templateUrl: 'modules/booksDummy/booksDummy.html'
                            }
                        }
                    })
                    .state('root.summonsbuilder', {
                        url: '/',
                        views: {
                            'content@': {
                                controller: 'SummonsBuilderController',
                                templateUrl: 'modules/summonsBuilder/summonsBuilder.html'
                            }
                        }
                    })
                ;
            }
        }
    }
);
