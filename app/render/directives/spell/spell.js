define(
    [
        'app',
        'angular',
        'directives/utils/blowup/blowup',
        'directives/utils/modal/modal',
        'services/CharacterService',
        'services/GrimoireService',
        'services/ToggleService'
    ],
    function (app) {
        'use strict';

        app.directive('spell', [
            function () {
                return {
                    scope: {
                        spellId: '<',
                        view: '@'
                    },
                    templateUrl: 'directives/spell/spell.html',
                    controller: ['$scope', 'Character', 'Grimoire', 'Toggle',
                        function ($scope, Character, Grimoire, Toggle) {

                            $scope.spellData = {};
                            $scope.stickyToggled = false;

                            $scope.isTome = $scope.view === 'TOME';
                            $scope.isGrimoire = $scope.view === 'GRIMOIRE';
                            $scope.RSTATES = Character.RSTATES;

                            let _resetCast = function (cast) {
                                cast.discount.ch = 0;
                                cast.discount.co = 0;
                                cast.discount.ex = 0;
                                cast.potentialDiscount.ch = 0;
                                cast.potentialDiscount.co = 0;
                                cast.potentialDiscount.ex = 0;
                                cast.successTiers = 0;
                                cast.remainingSuccessTiers = 0;
                                cast.empowered = false;
                            };

                            $scope.init = function () {
                                $scope.spellData = Grimoire.getSpell($scope.spellId);

                                $scope.castBox = {};
                                $scope.castBox.discount = { ch: 0, co: 0, ex: 0 };
                                $scope.castBox.successTiers = 0;
                                $scope.castBox.empowered = false;
                                $scope.castBox.remainingSuccessTiers = 0;
                                $scope.castBox.potentialDiscount = { ch: 0, co: 0, ex: 0 };

                                $scope.modalCast.castBox = $scope.castBox;
                                $scope.modalCast.RSTATES = $scope.RSTATES;
                                $scope.modalCast.cast = $scope.cast;

                                if (!$scope.spellData) {
                                    return;
                                }

                                $scope.modalCast.spellData = $scope.spellData;

                                let personalCost = Character.spellCost($scope.spellData.id, false, { ch: 0, co: 0, ex: 0 });

                                $scope.modalCast.spellData.cost_ch = personalCost.ch;
                                $scope.modalCast.spellData.cost_ex = personalCost.ex;
                                $scope.modalCast.spellData.cost_co = personalCost.co;

                                if ($scope.isTome) {
                                    let spell = Grimoire.getSpell($scope.spellId);
                                    $scope.charSkill = Character.getSkillLevel(spell.school);
                                }
                            };

                            $scope.closeSticky = function () {
                                Toggle.pop();
                            };

                            $scope.preCast = function () {
                                _resetCast($scope.castBox);
                                $scope.castBox.costDisplay = Character.spellCost($scope.spellData.id, $scope.castBox.empowered, $scope.castBox.discount);
                                $scope.modalCast.show();
                            };

                            $scope.cast = function () {
                                Character.cast($scope.spellId, $scope.castBox.empowered, $scope.castBox.discount);
                                $scope.modalCast.hide();
                            };

                            // Cast Modal
                            $scope.modalCast = {};

                            $scope.modalCast.onHide = function () {

                            };

                            $scope.modalCast.decrementSuccessTier = function() {
                                if ($scope.castBox.successTiers > 0) {
                                    $scope.castBox.successTiers--;
                                    $scope.modalCast.recalculatePotentialDiscounts();
                                }
                            };

                            $scope.modalCast.incrementSuccessTier = function() {
                                $scope.castBox.successTiers++;
                                $scope.modalCast.recalculatePotentialDiscounts();
                            };

                            $scope.modalCast.decrementDiscount = function(type) {
                                if ($scope.castBox.discount[type] > 0) {
                                    $scope.castBox.discount[type]--;
                                    $scope.modalCast.fetchSpellCost();
                                    $scope.modalCast.recalculatePotentialDiscounts();
                                }
                            };

                            $scope.modalCast.incrementDiscount = function(type) {
                                if ($scope.castBox.potentialDiscount[type] > 0) {
                                    $scope.castBox.discount[type]++;
                                    $scope.modalCast.fetchSpellCost();
                                    $scope.modalCast.recalculatePotentialDiscounts();
                                }
                            };

                            $scope.modalCast.fetchSpellCost = function () {
                                if (!$scope.castBox.empowered) {
                                    if ($scope.castBox.discount.ex > $scope.spellData.cost_ex - 1) {
                                        $scope.castBox.discount.ex = $scope.spellData.cost_ex - 1;
                                    }
                                    if ($scope.castBox.discount.ch > $scope.spellData.cost_ch - 1) {
                                        $scope.castBox.discount.ch = $scope.spellData.cost_ch - 1;
                                    }
                                    if ($scope.castBox.discount.co > $scope.spellData.cost_co - 1) {
                                        $scope.castBox.discount.co = $scope.spellData.cost_co - 1;
                                    }
                                }
                                $scope.castBox.discount.ex = $scope.castBox.discount.ex > 0 ? $scope.castBox.discount.ex : 0;
                                $scope.castBox.discount.ch = $scope.castBox.discount.ch > 0 ? $scope.castBox.discount.ch : 0;
                                $scope.castBox.discount.co = $scope.castBox.discount.co > 0 ? $scope.castBox.discount.co : 0;

                                $scope.castBox.costDisplay = Character.spellCost($scope.spellData.id, $scope.castBox.empowered, $scope.castBox.discount);
                            };

                            $scope.modalCast.empowerChanged = function () {
                                $scope.modalCast.fetchSpellCost();
                                $scope.modalCast.recalculatePotentialDiscounts();
                            };

                            $scope.modalCast.recalculatePotentialDiscounts = function () {
                                console.log("clacl");
                                $scope.castBox.remainingSuccessTiers = $scope.castBox.successTiers - $scope.castBox.discount.ex - $scope.castBox.discount.ch * 2 - $scope.castBox.discount.co * 3;
                                if ($scope.castBox.successTiers <= 0) {
                                    $scope.castBox.potentialDiscount.co = 0;
                                    $scope.castBox.potentialDiscount.ch = 0;
                                    $scope.castBox.potentialDiscount.ex = 0;
                                } else {
                                    $scope.castBox.potentialDiscount.ex = Math.max(0, Math.min($scope.castBox.remainingSuccessTiers,
                                        $scope.spellData.cost_ex + ($scope.castBox.empowered ? $scope.spellData.empower_cost_ex : 0) - 1 - $scope.castBox.discount.ex));
                                    $scope.castBox.potentialDiscount.ch = Math.max(0, Math.min(Math.floor($scope.castBox.remainingSuccessTiers / 2),
                                        $scope.spellData.cost_ch + ($scope.castBox.empowered ? $scope.spellData.empower_cost_ch : 0) - 1 - $scope.castBox.discount.ch));
                                    $scope.castBox.potentialDiscount.co = Math.max(0, Math.min(Math.floor($scope.castBox.remainingSuccessTiers / 3),
                                        $scope.spellData.cost_co + ($scope.castBox.empowered ? $scope.spellData.empower_cost_co : 0) - 1 - $scope.castBox.discount.co));
                                }
                            };

                            $scope.init();
                        }],
                }
            }
        ]);
    }
);
