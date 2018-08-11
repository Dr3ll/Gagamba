'use strict';

angular.
module('gagambaApp').
config(['$locationProvider' ,'$routeProvider', '$stateProvider', '$urlRouterProvider', '$provide',
    function config($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider, $provide) {

        /*$provide.decorator('$sniffer', function($delegate) {
            $delegate.history = false;
            return $delegate;
        });*/

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
                    'main@': {
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
]);
