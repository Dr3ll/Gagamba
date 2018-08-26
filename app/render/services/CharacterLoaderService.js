define(
    [
        'app',
        'angular',
        'services/StorageService'
    ],
    function (app, angular) {
        'use strict';

        app.factory('CharacterLoader', [ '$q', 'Storage',
            function ($q, Storage) {
                let _store = Storage.Store;
                let _characters = [];

                let _loadCharacters = $q( function (resolve, reject) {
                    _store.loadCharacters(characters => {
                        _characters = characters;

                        resolve();
                    }, this);
                });

                return {
                    loadCharacters: _loadCharacters,
                    getCharacters: function() {
                        return _characters;
                    }
                };

            }]);
    }
);