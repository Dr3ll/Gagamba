define(
    [
        'app',
        'angular',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';

        app.directive('moonshards', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/moonshards/moonshards.html',
                    controller: ['$scope', 'Character',
                        function ($scope, Character) {

                            Character.subscribeCharacterSelected($scope, function() {
                                if (Character.characterLoaded()) {
                                    $scope.init();
                                }
                            });

                            $scope.init = function () {
                                $scope.shardBox = [];

                                if (!Character.characterLoaded()) {
                                    return;
                                }

                                $scope.moonshards = Character.moonshards();
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

                            $scope.$watch('moonshards', function () {
                                _updateBoxes();
                            }, true);

                            $scope.spend = function () {
                                Character.spendMoonshard();
                                $scope.moonshards = Character.moonshards();
                            };

                            $scope.refresh = function () {
                                Character.refreshMoonshards();
                                $scope.moonshards = Character.moonshards();
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
