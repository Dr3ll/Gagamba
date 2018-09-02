define(
    [
        'app',
        'angular',
        'directives/characterSheet/_sheetComponent/sheetComponent',
        'services/CharacterService',
        'services/GlossaryService'
    ],
    function (app) {
        'use strict';

        app.directive('moonshards', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/moonshards/moonshards.html',
                    controller: ['$scope', '$controller', 'Character', 'Glossary',
                        function ($scope, $controller, Character, Glossary) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.MOONSHARDS);

                            $scope.init = function () {
                                $scope.shardBox = [];

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $scope.moonshards = Character.moonshards();
                                $scope.level = Character.level();
                                $scope.moonSign = Glossary.LUNIAC[Character.moonSign()];
                                _updateBoxes();
                            };

                            let _shard = function(spent) {
                                return { spent: spent };
                            };

                            let _updateBoxes = function () {
                                $scope.shardBox = [];
                                for (let i = 0; i < $scope.moonshards.total; i++) {
                                    $scope.shardBox.push(_shard(i < $scope.moonshards.spent));
                                }
                            };

                            $scope.spend = function () {
                                Character.spendMoonshard();
                            };

                            $scope.refresh = function () {
                                Character.refreshMoonshards();
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
