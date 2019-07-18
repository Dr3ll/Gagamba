define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('Rules', ['$rootScope',
            function ($rootScope) {

                let _cheatsEnabled = false;
                let _levelingEnabled = false;

                return {
                    cheatEnabled: function () {
                        return _cheatsEnabled;
                    },
                    toggleCheats: function (state) {
                        if (state !== undefined) {
                            _cheatsEnabled = state;
                        } else {
                            _cheatsEnabled = !_cheatsEnabled;
                        }
                        $rootScope.$emit('cheatsToggledEvent', _cheatsEnabled);
                    },
                    subscribeCheats: function (scope, foo) {
                        if (scope) {
                            scope.onCheatsHandler$ = $rootScope.$on('cheatsToggledEvent', foo);
                            scope.$on('$destroy', scope.onCheatsHandler$);
                        }
                    },
                    levelingEnabled: function () {
                        return _levelingEnabled;
                    },
                    toggleLeveling: function (state) {
                        if (state !== undefined) {
                            _levelingEnabled = state;
                        } else {
                            _levelingEnabled = !_levelingEnabled;
                        }
                        $rootScope.$emit('levelingToggledEvent', _levelingEnabled);
                    },
                    subscribeLeveling: function (scope, foo) {
                        if (scope) {
                            scope.onLevelingHandler$ = $rootScope.$on('levelingToggledEvent', foo);
                            scope.$on('$destroy', scope.onLevelingHandler$);
                        }
                    },
                };

            }]);
    }
);