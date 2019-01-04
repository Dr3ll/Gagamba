define([
        'app',
        'modules/module',
        'services/StorageService'
    ], function (app) {
        'use strict';

        app.factory('SummonsBuilder', ['$rootScope', 'Storage',
            function ($rootScope, Storage) {

                let _builderSetup = {
                    buildingBlocks: {
                        body: [
                            { t: 's', label: 'Klein'},
                            { t: 'm', label: 'Mittel'},
                            { t: 'l', label: 'Groß'}],
                        kind: [
                            { t: 'f', label: 'Feenwesen'},
                            { t: 'g', label: 'Geist'},
                            { t: 's', label: 'Götterdiener'}],
                        element: [
                            { t: 'f', label: 'Fels'},
                            { t: 'l', label: 'Licht'},
                            { t: 'n', label: 'Natur'},
                            { t: 'h', label: 'Schatten'},
                            { t: 'w', label: 'Wasser'},
                            { t: 'i', label: 'Wind'}],
                        ability: [
                            { t: 'i', label: 'Bedrohlich'},
                            { t: 'b', label: 'Blutrausch'},
                            { t: 'd', label: 'Dämmerbote'},
                            { t: 'f', label: 'Fliegend'},
                            { t: 'n', label: 'Flink'},
                            { t: 'l', label: 'Hände'},
                            { t: 'm', label: 'Immunität'},
                            { t: 'y', label: 'Körperlos'},
                            { t: 'a', label: 'Prächtig'},
                            { t: 's', label: 'Verhüllt'},
                            { t: 'e', label: 'Vernunftbegabt'},
                            { t: 't', label: 'Zäh'}],
                        role: [
                            { t: 's', label: 'Helfer'},
                            { t: 'f', label: 'Kämpfer'},
                            { t: 'c', label: 'Zauberer'}]
                    }

                };

                let _summon;

                let _setBody = function(index) {
                    _summon.body = _builderSetup.buildingBlocks['body'][index];
                };

                let _setKind = function(index) {
                    _summon.kind = _builderSetup.buildingBlocks['kind'][index];
                };

                let _setElement = function(index) {

                };

                let _setAbility = function(index) {

                };

                let _setRole = function(index) {

                };

                return {
                    buildingBlocks: _builderSetup.buildingBlocks,
                    initBuild: function() {
                        _summon = {};
                    },
                    setBody: function (body) {
                        _summon.body = body;
                    },
                    subscribeSummonBuildingBlockHover: function (scope, handler) {
                        scope.handler$summonBuildingBlockHover = $rootScope.$on('summonBuildingBlockHover', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$summonBuildingBlockHover();
                        })
                    },
                    callBuildingBlockHover: function(type, index) {
                        $rootScope.$emit('summonBuildingBlockHover', { type:type, index: index});
                    },
                    subscribeSummonBuildingBlockSelect: function (scope, handler) {
                        scope.handler$summonBuildingBlockSelect = $rootScope.$on('summonBuildingBlockSelect', handler);
                        scope.$on('$destroy', function () {
                            scope.handler$summonBuildingBlockSelect();
                        })
                    },
                    callBuildingBlockSelect: function(type, index) {
                        $rootScope.$emit('summonBuildingBlockSelect', { type:type, index: index});
                    }
                };

            }]);
    }
);