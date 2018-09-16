define(
    [
        'app',
        'modules/module',
        'angular',
        'directives/characterSheet/_sheetComponent/sheetComponent',
        'directives/utils/expanel/expanel',
        'services/CharacterService',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.directive('channelList', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/channelList/channelList.html',
                    controller: ['$scope', '$timeout', '$controller', 'Character', 'Grimoire',
                        function ($scope, $timeout, $controller, Character, Grimoire) {

                            angular.extend(this, $controller('sheetComponentController', { $scope: $scope } ));
                            $scope.setField(Character.FIELD.CHANNELS);

                            $scope.init = function () {
                                $scope.channels = [];

                                if (!Character.isCharacterLoaded()) {
                                    return;
                                }

                                $timeout(function() {
                                    $scope.channels = Character.channels();
                                });
                            };

                            $scope.dropChannel = function (index) {
                                Character.dropChannel(index);
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
