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
                    templateUrl: 'directives/moonshards/moonshards.html',
                    controller: ['$scope', 'Character',
                        function ($scope, Character) {

                            $scope.init = function () {
                                $scope.shardBox = [];
                                $scope.moonshards = Character.moonshards();
                            };

                            var _shard = function(spent) {
                                return { spent: spent };
                            };

                            var _updateBoxes = function () {
                                $scope.shardBox = [];
                                for (var i = 0; i < $scope.moonshards.total; i++) {
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

                            Character.subscribeLoadingDone($scope, function () {
                                $scope.init();
                            });

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
