'use strict';

app.factory('Character', ['$rootScope',
    function($rootScope) {

        var _character = {
            focus: {
                max: 21,
                fresh: 4,
                channeled: 4,
                exhausted: 5,
                consumed: 8
            }
        };

        var _cast = function (spell) {



        };

        return {
            getFocus: function () {
                return _character.focus;
            },
            cast: function (name) {
                var spell = _spells.get(name);
                if (spell !== undefined) {
                    _cast(spell);
                }
            },
            subscribeLoadingDone: function (scope, handler) {
                var unsub = $rootScope.$on('SassLoadingDone', handler);
                scope.$on('$destroy', function () {
                    unsub();
                });
            },
            load: function () {

            }

        };

    }]);
