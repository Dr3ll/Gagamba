define(
    [
        'app',
        'angular',
        'services/StorageService'
    ],
    function (app, angular) {
        'use strict';

        app.factory('Settings', ['$q', 'Storage',
            function ($q, Storage) {
                const _K = { DEFAULT_CHARACTER: 'character' }

                let _store = Storage.Store;
                let _settings = [];

                let _loadSettings = function () {
                    return $q(function (resolve, reject) {
                        _store.loadAppSettings(settings => {
                            _settings = settings;
                            resolve();
                        }, this);
                    });
                };

                let _persistSetting = function (key, value) {
                    if (value === undefined) {
                        value = null;
                    }
                    _settings[key] = value;
                    _store.saveAppSetting(key, value)
                };

                return {
                    loadSettings: _loadSettings,
                    getSettings: function() {
                        return _settings;
                    },
                    getDefaultCharacter: function() {
                        return _settings[_K.DEFAULT_CHARACTER];
                    },
                    setDefaultCharacter: function(fileName) {
                        _persistSetting(_K.DEFAULT_CHARACTER, fileName);
                    }
                };
            }]);
    }
);