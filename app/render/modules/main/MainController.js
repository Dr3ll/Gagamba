define(
    [
        'app',
        'modules/module',
        'directives/characterSheet/_characterSheet/characterSheet',
        'directives/characterSelection/characterSelection',
        'services/SettingsService'
    ], function (app) {
        'use strict';

        app.controller('MainController', ['$scope', 'Settings',
                function ($scope, Settings) {

                    $scope.activeCharacter = undefined;
                    $scope.characterList = [];
                    $scope.checked = false;

                    $scope.loadDefault = function() {
                        $scope.activeCharacter = undefined;
                        return Settings.loadSettings;
                    };

                    $scope.init = function() {
                        if ($scope.activeCharacter === undefined || $scope.activeCharacter === null) {
                            $scope.loadDefault().then(
                                function() {
                                    let defaultChar = Settings.getDefaultCharacter();
                                    if (defaultChar === null || defaultChar === undefined) {
                                        $scope.loadCharacterList().then(
                                            function () {
                                                let charList = CharacterLoader.getCharacters();
                                                if (charList !== undefined) {
                                                    $scope.characterList = charList;
                                                    $scope.checked = true;
                                                }
                                            }
                                        );
                                    } else {
                                        $scope.checked = true;
                                    }
                                }
                            );
                        } else {
                            $scope.checked = true;
                        }

                        $scope.characterList = [];
                    };

                    $scope.init();
                }
            ]
        );
    }
);
