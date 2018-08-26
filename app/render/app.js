define([
        'angular',
        'uiRouter',
        'angular-sanitize',
        'ngRoute',
        'modules/module'
    ],
    function(ng) {
        'use strict';

        let app = ng.module('app', [
            'ngRoute',
            'ui.router',
            'ngSanitize'
        ]);
        app.run([
            '$rootScope',
            '$state',
            '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

                });
            }
        ]);

        return app;
    }
);