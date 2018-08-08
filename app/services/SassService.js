'use strict';

app.factory('SassService', ['$rootScope',
    function($rootScope) {

        var _loaded = false;
        var _sass = new Sass();
        var _scss = "";

        var _loadingDone = function (args) {
            $rootScope.$emit('SassLoadingDone', args);
        };

        var _loadCss = function() {
            jQuery.get('../scss/style.scss', function(data) {
                _scss = data;

                _sass.compile(_scss, function (result) {
                    _loadingDone({ css: result.text });
                });
            });
        };

        return {
            subscribeLoadingDone: function (scope, handler) {
                var unsub = $rootScope.$on('SassLoadingDone', handler);
                scope.$on('$destroy', function () {
                    unsub();
                });
            },
            load: function () {
                if (!_loaded) {
                    _loaded = true;
                    _loadCss();
                }
            }

        };

    }]);
