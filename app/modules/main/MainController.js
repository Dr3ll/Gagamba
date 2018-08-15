define(
    [
        'app',
        'modules/module',
        'directives/focusMeter/focusMeter',
        'directives/healthMeter/healthMeter',
        'directives/characterBaseProps/characterBaseProps',
        'services/CharacterService'
    ], function (app) {
        'use strict';

        app.controller('MainController', ['Character',
                function (Character) {
                    Character.load();
                }
            ]
        );
    }
);
