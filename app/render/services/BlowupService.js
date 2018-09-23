define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Blowup', [
            function () {

                let _realms = new Map();

                let _getRealm = function (realmId) {
                    let realm = _realms.get(realmId);
                    if (!realm) {
                        realm = { pin: undefined, blocker: { enabled: false } };
                        _realms.set(realmId, { pin: undefined, blocker: { enabled: false } } );
                    }
                    return realm;
                };

                return {
                    push: function (panel, realmId) {
                        let realm = _getRealm(realmId);

                        if (realm.pin) {
                            realm.pin.toggled = false;
                            realm.pin.toggled = false;
                        }
                        realm.pin = panel;
                        realm.blocker.enabled = true;
                    },
                    pop: function (realmId) {
                        realmId = realmId || 'def';
                        let realm = _getRealm(realmId);

                        if (realm.pin) {
                            realm.pin.toggled = false;
                        }
                        realm.pin = undefined;
                        realm.blocker.enabled = false;
                    },
                    blocker: function (realmId) {
                        let realm = _getRealm(realmId);
                        if (realm) {
                            return realm.blocker;
                        }
                        return { enabled: false};
                    }
                };

            }]);
    }
);