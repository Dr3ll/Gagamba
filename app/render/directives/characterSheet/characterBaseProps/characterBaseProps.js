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

                            Character.subscribeCharacterSelected($scope, function() {
                                if (Character.characterLoaded()) {
                                    $scope.init();
                                }
                            });

                            $scope.init = function () {
                                $scope.name = undefined;
                                $scope.properties = {};
                                $scope.experience = {};
                                $scope.languages = [];
                                $scope.level = 0;
                                $scope.battle = {};
                                $scope.attributes = {};

                                if (!Character.characterLoaded()) {
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
