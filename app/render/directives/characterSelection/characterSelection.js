define(
    [
        'app',
        'angular',
        'services/CharacterLoaderService'
    ],
    function (app) {
        'use strict';

        app.directive('characterSelection', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSelection/characterSelection.html',
                    controller: ['$scope', 'CharacterLoader',
                        function ($scope, CharacterLoader) {

                            $scope.characterList = [];
                            $scope.checked = false;

                            $scope.loadCharacterList = function() {
                                $scope.characterList = [];
                                $scope.checked = false;
                                return CharacterLoader.loadCharacters;
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

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
