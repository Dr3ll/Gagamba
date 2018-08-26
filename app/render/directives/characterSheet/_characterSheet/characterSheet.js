define(
    [
        'app',
        'angular',
        'directives/characterSheet/focusMeter/focusMeter',
        'directives/characterSheet/healthMeter/healthMeter',
        'directives/characterSheet/characterBaseProps/characterBaseProps',
        'directives/characterSheet/moonshards/moonshards',
        'services/CharacterService'
    ],
    function (app) {
        'use strict';

        app.directive('characterSheet', [
            function () {
                return {
                    scope: {},
                    templateUrl: 'directives/characterSheet/characterBaseProps/characterBaseProps.html',
                    controller: ['$scope', 'Character',
                        function ($scope, Character) {


                        }],
                }
            }
        ]);
    }
);
