define(
    [
        'app',
        'app.routes'
    ], function(app, routes) {
        'use strict';

        return app.config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider',
            function config($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
                routes.initRoutes($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider);
            }
        ])
    }
);
