define(
    [
        'app',
        'angular',
        'services/GrimoireService'
    ],
    function (app) {
        'use strict';

        app.factory('Character', ['$rootScope', 'Grimoire',
            function ($rootScope, Grimoire) {

                var _character = {
                    attributes: {
                        CHARISMA: {base: 2, value: 2},
                        KINETIC: {base: 3, value: 3},
                        INTUITION: {base: 2, value: 2},
                        CONSTITUTION: {base: 2, value: 2},
                        MYSTIC: {base: 5, value: 5},
                        STRENGTH: {base: 0, value: 0},
                        INTELLECT: {base: 3, value: 3},
                        WILL: {base: 3, value: 3}
                    },
                    focus: {
                        max: 21,
                        f: 4,
                        ch: 4,
                        ex: 5,
                        co: 8
                    },
                    magic: {
                        ILLUSION: {
                            value: {base: 7, value: 13},
                            //expertise: new Map[ [Grimoire.SCHOOLS.ILLUSION.MIRAGE], [1] ],
                            masteries: [{name: "Sparsamer Zauberer", description: "Illusion Kosten -1"}],
                            discount: 1
                        }
                    }
                };

                var _channelList = [];

                var _calcSpellCost = function (spell, magic, successDiscount) {
                    successDiscount = successDiscount | {co: 0, ex: 0, ch: 0};
                    var skillDiscount = {co: 0, ex: 0, ch: 0};
                    var skillDiscountValue = magic[spell.school].discount;
                    var cost = {ex: spell.cost.ex, ch: spell.cost.ch, co: spell.cost.co};

                    if (cost.ex !== 0) {
                        cost.ex - spell.discount;
                        skillDiscount.ex = skillDiscountValue;
                    } else if (cost.ch !== 0) {
                        cost.ch - spell.discount;
                        skillDiscount.ch = skillDiscountValue;
                    }

                    // TODO: mincost per focus type or global?

                    cost.ch -= skillDiscount.ch - successDiscount.ch;
                    cost.ex -= skillDiscount.ex - successDiscount.ex;
                    cost.co -= skillDiscount.co - successDiscount.co;

                    if (cost.ex < 0) {
                        cost.ex = 0;
                    }
                    if (cost.ch < 0) {
                        cost.ch = 0;
                    }
                    if (cost.co < 0) {
                        cost.co = 0;
                    }

                    if (cost.ex === 0 && cost.ch === 0 && cost.co === 0) {
                        cost.ex = 1;
                    }

                    /*if (cost.ex !== 0) {
                        cost.ex - cost.co;
                    } else if (cost.ch !== 0) {
                        cost.ch - cost.co;
                    }*/

                    return cost;
                };

                var _applyFocusCost = function (cost) {
                    if (_character.focus.f < cost.ex + cost.ch + cost.co) {
                        return; // not enough focus
                    }

                    _character.focus.f -= cost.ex + cost.ch + cost.co;
                    _character.focus.ex += cost.ex;
                    _character.focus.ch += cost.ch;
                    _character.focus.co += cost.co;
                };

                var _cast = function (spell, successDiscount) {
                    var cost = _calcSpellCost(spell, _character.magic, successDiscount);
                    _applyFocusCost(cost);
                    if (cost.ch > 0) {
                        _channelList.push({spell: spell, value: cost.ch});
                    }
                };

                return {
                    getFocus: function () {
                        return _character.focus;
                    },
                    cast: function (id) {
                        _cast(Grimoire.getSpell(id));
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
    }
);