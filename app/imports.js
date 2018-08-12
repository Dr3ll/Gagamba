requirejs.config({
    baseUrl: './',
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery.min',
        'angular': '../node_modules/angular/angular',
        'angular-animate': '../node_modules/angular-animate/angular-animate',
        'ngRoute': '../node_modules/angular-route/angular-route.min',
        'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap.min',
        'uiRouter': '../node_modules/angular-ui-router/release/angular-ui-router.min'
    },
    shim: {
        'domReady': {
            deps: ['jquery']
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ngRoute': {
            deps: ['angular'],
            exports: 'ngRoute'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'uiRouter': {
            deps: ['angular']
        },
        'jquery': {
            exports: 'jQuery'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    },
    waitSeconds: 25,
    urlArgs: "bust=" + (new Date()).getTime()
});

define([
    'require',
    'angular',
    'app',
    'app.settings',
    'app.config'
], function (require, ng) {
    'use strict';

    ng.bootstrap(document, ['app']);
});