'use strict';

angular.
module('gagambaApp').
config(['$locationProvider' ,'$routeProvider', '$stateProvider',
    function config($locationProvider, $routeProvider, $stateProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/phones', {
            template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
            template: '<phone-detail></phone-detail>'
        }).
        otherwise('');

        $stateProvider
            .state('root', {
                url: '',
                views:{
                    'main@': {
                        controller: 'MainController',
                        templateUrl: 'main/main.template.html'
                    },
                    'spells@': {
                        controller: 'SpellsController',
                        templateUrl: 'spell/spell.template.html'
                    },
                    'navbar@': {
                        controller: 'NavigationController',
                        templateUrl: "navigation/navigation.template.html"
                    }
                }
            })
            .state('root.kek', {
            url: '/kek',
            views: {
                'content@': {
                    controller: 'SpellController',
                    templateUrl: 'spell/spell.template.html'
                }
            }
        })
        ;

    }
]);
