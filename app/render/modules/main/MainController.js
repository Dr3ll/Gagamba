define(
    [
        'app',
        'modules/module',
        'directives/characterSheet/_characterSheet/characterSheet',
        'directives/characterSelection/characterSelection',
        'services/SettingsService',
        'services/CharacterService'
    ], function (app) {
        'use strict';

        app.controller('MainController', ['$scope', 'Settings', 'Character',
                function ($scope, Settings, Character) {

                    $scope.activeCharacter = undefined;
                    $scope.characterList = [];
                    $scope.checked = false;

                    $scope.loadDefault = function() {
                        $scope.activeCharacter = undefined;
                        return Settings.loadSettings();
                    };

                    Character.subscribeCharacterSelected($scope, function () {
                        $scope.characterList = [];
                        let char = Character.getCharacter();
                        if (char !== undefined) {
                            $scope.activeCharacter = char.fileName;
                        } else {
                            $scope.activeCharacter = undefined;
                            $scope.init();
                        }
                    });

                    $scope.init = function() {
                        if ($scope.activeCharacter === undefined || $scope.activeCharacter === null) {
                            $scope.loadDefault().then(
                                function() {
                                    let defaultChar = Settings.getDefaultCharacter();
                                    if (defaultChar === null || defaultChar === undefined) {
                                        $scope.activeCharacter = undefined;
                                    } else {
                                        $scope.activeCharacter = defaultChar;
                                    }

                                    $scope.checked = true;
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
