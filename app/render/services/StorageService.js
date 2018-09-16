define([
        'app',
        'modules/module',
        'sqlLoader'
    ], function (app) {
        'use strict';

        app.factory('Storage', [
            function () {

                const _electron = require('electron');
                const _store = _electron.remote.app.getStore();
                const _sqlLoader = app.$sqlLoader;

                return {
                    Store: _store,
                    SQLLoader: _sqlLoader
                };
            }]);
    }
);
