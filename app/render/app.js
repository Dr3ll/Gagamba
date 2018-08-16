define([
        'angular',
        'uiRouter',
        'ngRoute',
        'modules/module'
    ],
    function(ng) {
        'use strict';

        var app = ng.module('app', [
            'ngRoute',
            'ui.router'
        ]);
        app.run([
            "$rootScope",
            "$state",
            "$stateParams",
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
                    console.log("sadsfsdf");
                });
            }
        ]);

        return app;
    }
);