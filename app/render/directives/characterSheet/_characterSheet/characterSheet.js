define(
    [
        'app',
        'angular',
        'directives/characterSheet/focusMeter/focusMeter',
        'directives/characterSheet/healthMeter/healthMeter',
        'directives/characterSheet/channelList/channelList',
        'directives/characterSheet/characterBaseProps/characterBaseProps',
        'directives/characterSheet/moonshards/moonshards',
        'directives/characterSheet/craftsTable/craftsTable',
        'directives/characterSheet/tome/tome',
        'services/CharacterService',
        'services/SettingsService',
        'services/CharacterLoaderService'
    ],
    function (app) {
        'use strict';

        app.directive('characterSheet', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/_characterSheet/characterSheet.html',
                    controller: ['$scope', 'Character', 'CharacterLoader', 'Settings',
                        function ($scope, Character, CharacterLoader, Settings) {

                            $scope.init = function() {
                                let char = Character.getCharacter();
                                if (char === undefined || char === null) {
                                    let defaultChar = Settings.getDefaultCharacter();
                                    if (defaultChar !== undefined && defaultChar !== null) {
                                        CharacterLoader.loadCharacter(defaultChar).then(
                                            function () {
                                                let char = CharacterLoader.getActiveCharacter();
                                                if (char !== undefined && char !== null) {
                                                    Character.setCharacter(char);
                                                } else {
                                                    Character.setCharacter(undefined);
                                                }
                                            }
                                        );
                                    } else {
                                        Character.setCharacter(undefined);
                                    }
                                }
                            };

                            $scope.init();

                        }],
                }
            }
        ]);
    }
);
