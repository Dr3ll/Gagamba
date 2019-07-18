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
                    controller: ['$scope', '$controller', 'Character',
                        function ($scope, $controller, Character) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.ATTRIBUTES);

                            $scope.init = function () {
                                $scope.name = undefined;
                                $scope.properties = {};
                                $scope.experience = {};
                                $scope.languages = [];
                                $scope.level = 0;
                                $scope.battle = {};
                                $scope.attributes = {};

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $scope.name = Character.name();
                                $scope.properties = Character.properties();
                                $scope.experience = Character.experienceTotals();
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
