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

                            $scope.init = function () {
                                $scope.shardBox = [];

                                let char = Character.getCharacter();
                                if (char === undefined || char === null) {
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
                                    $scope.shardBox.push(_shard(i <= $scope.moonshards.spent));
                                }
                            };

                            $scope.$watch('moonshards', function () {
                                _updateBoxes();
                            }, true);

                            $scope.spend = function () {
                                Character.spendMoonshard();
                                $scope.moonshards = Character.moonshards();
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
