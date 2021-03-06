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
                let _activeCharacter = undefined;

                let _loadCharacters = function () {
                    return $q(function (resolve, reject) {
                        _store.loadCharacters(characters => {
                            _characters = characters;

                            resolve();
                        }, this);
                    });
                };

                let _loadCharacter = function(fileName) {
                    return $q( function (resolve, reject) {
                        _store.loadCharacter(fileName, character => {
                            _activeCharacter = character;
                            resolve();
                        }, this);
                    });
                };

                let _saveCharacter = function (character) {
                    let self = this;
                    return $q( function (resolve, reject) {
                        _store.saveCharacter(character,
                            () => {
                                resolve();
                            }, self);
                    });
                };

                return {
                    loadCharacters: _loadCharacters,
                    loadCharacter: _loadCharacter,
                    saveCharacter: _saveCharacter,
                    getActiveCharacter: function() {
                        return _activeCharacter;
                    },
                    getCharacters: function() {
                        return _characters;
                    }
                };

            }]);
    }
);