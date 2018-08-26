define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Storage', [
            function () {

                const _electron = require('electron');
                const _store = _electron.remote.app.getStore();

                return {
                    Store: _store
                };
            }]);
    }
);
