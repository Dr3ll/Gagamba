define(
    [
        'app',
        'angular',
        'services/CharacterLoaderService',
        'services/CharacterService',
        'services/SettingsService'
    ],
    function (app) {
        'use strict';

        app.directive('characterSelection', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSelection/characterSelection.html',
                    controller: ['$scope', 'CharacterLoader', 'Character', 'Settings',
                        function ($scope, CharacterLoader, Character, Settings) {

                            $scope.characterList = [];
                            $scope.checked = false;

                            $scope.loadCharacterList = function() {
                                $scope.characterList = [];
                                $scope.checked = false;
                                return CharacterLoader.loadCharacters();
                            };

                            $scope.init = function () {
                                $scope.loadCharacterList().then(
                                    function () {
                                        let charList = CharacterLoader.getCharacters();
                                        if (charList !== undefined) {
                                            $scope.characterList = charList;
                                            $scope.checked = true;
                                        }
                                    }
                                );
                            };

                            $scope.select = function(char) {
                                Character.setCharacter(char);
                                Settings.setDefaultCharacter(char.fileName);
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
