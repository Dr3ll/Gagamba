define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Rules', [
            function () {

                let _cheatsEnabled = true;

                return {
                    cheatEnabled: function () {
                        return _cheatsEnabled;
                    },
                    toggleCheats: function (state) {
                        if (state !== undefined) {
                            _cheatsEnabled = state;
                        } else {
                            _cheatsEnabled = !_cheatsEnabled;
                        }
                    }
                };

            }]);
    }
);