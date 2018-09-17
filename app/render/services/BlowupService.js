define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Blowup', [
            function () {

                let _scopes = new Map();

                let _getScope = function (scopeId) {
                    let scope = _scopes.get(scopeId);
                    if (!scope) {
                        scope = { pin: undefined, blocker: { enabled: false } };
                        _scopes.set(scopeId, { pin: undefined, blocker: { enabled: false } } );
                    }
                    return scope;
                };

                return {
                    push: function (panel, scopeId) {
                        let scope = _getScope(scopeId);

                        if (scope.pin) {
                            scope.pin.toggled = false;
                        }
                        scope.pin = panel;
                        scope.blocker.enabled = true;
                    },
                    pop: function (scopeId) {
                        let scope = _getScope(scopeId);

                        if (scope.pin) {
                            scope.pin.toggled = false;
                        }
                        scope.pin = undefined;
                        scope.blocker.enabled = false;
                    },
                    blocker: function (scopeId) {
                        let scope = _getScope(scopeId);
                        if (scope) {
                            return scope.blocker;
                        }
                        return { enabled: false};
                    }
                };

            }]);
    }
);