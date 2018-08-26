define(
    [
        'app',
        'angular',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';

        app.directive('characterBaseProps', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/characterBaseProps/characterBaseProps.html',
                    controller: ['$scope', 'Character',
                        function ($scope, Character) {

                            $scope.init = function () {
                                $scope.name = undefined;
                                $scope.properties = {};
                                $scope.experience = {};
                                $scope.languages = [];
                                $scope.level = 0;
                                $scope.battle = {};
                                $scope.attributes = {};

                                let char = Character.getCharacter();
                                if (char === undefined || char === null) {
                                    return;
                                }

                                $scope.name = Character.name();
                                $scope.properties = Character.properties();
                                $scope.experience = Character.experience();
                                $scope.languages = Character.languages();
                                $scope.level = Character.level();
                                $scope.battle = Character.battle();
                                $scope.attributes = Character.attributes();
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
