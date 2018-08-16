define(
    [
        'modules/main/MainController',
        'modules/spell/SpellController',
        'modules/navigation/NavigationController'
    ], function() {
        'use strict';

        return {
            initRoutes: function($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider)
            {

                $urlRouterProvider.otherwise('/');

                $locationProvider.html5Mode(true);

                $locationProvider.hashPrefix('!');

                $routeProvider.
                when('/phones', {
                    template: '<phone-list></phone-list>'
                }).
                when('/phones/:phoneId', {
                    template: '<phone-detail></phone-detail>'
                }).
                otherwise('/');

                $stateProvider
                    .state('root', {
                        url: '/',
                        views:{
                            'content@': {
                                controller: 'MainController',
                                templateUrl: 'modules/main/main.template.html'
                            },
                            'spells@': {
                                controller: 'SpellsController',
                                templateUrl: 'modules/spell/spell.template.html'
                            },
                            'navbar@': {
                                controller: 'NavigationController',
                                templateUrl: "modules/navigation/navigation.template.html"
                            }
                        }
                    })
                    .state('root.kek', {
                        url: '/kek',
                        views: {
                            'content@': {
                                controller: 'SpellController',
                                templateUrl: 'modules/spell/spell.template.html'
                            }
                        }
                    })
                ;

            }
        }
    }
);
