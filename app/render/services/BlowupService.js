define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Blowup', [
            function () {

                let _pinnedPanel = undefined;
                let _blocker = {
                    enabled: false
                };

                return {
                    push: function (scope) {
                        if (_pinnedPanel) {
                            _pinnedPanel.toggled = false;
                        }
                        _pinnedPanel = scope;
                        _blocker.enabled = true;
                    },
                    pop: function () {
                        if (_pinnedPanel) {
                            _pinnedPanel.toggled = false;
                        }
                        _pinnedPanel = undefined;
                        _blocker.enabled = false;
                    },
                    blocker: function () {
                        return _blocker;
                    }
                };

            }]);
    }
);