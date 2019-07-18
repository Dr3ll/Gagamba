define(
    [
        'enums/CharacterProperties'
    ],
    function () {
        'use strict';


        window.CastingModule = () => {

            let _calcSpellCost = function (spell, empowered, magic, sDiscount) {
                let successDiscount = {co: 0, ex: 0, ch: 0};
                if (sDiscount) {
                    successDiscount.co = sDiscount.co * -1;
                    successDiscount.ch = sDiscount.ch * -1;
                    successDiscount.ex = sDiscount.ex * -1;
                }
                let skillDiscount = {co: 0, ex: 0, ch: 0};
                let skillDiscountValue = magic[spell.school].discount;
                let cost = {ex: spell.cost_ex, ch: spell.cost_ch, co: spell.cost_co};
                if (empowered) {
                    cost.ex += spell.empower_cost_ex;
                    cost.ch += spell.empower_cost_ch;
                    cost.co += spell.empower_cost_co;
                }

                // Substract consumed
                if (cost.ex !== 0) {
                    cost.ex - cost.co;
                } else if (cost.ch !== 0) {
                    cost.ch - cost.co;
                }

                if (cost.ex !== 0) {
                    skillDiscount.ex = skillDiscountValue;
                } else if (cost.ch !== 0) {
                    skillDiscount.ch = skillDiscountValue;
                }

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

                // Min spell cost is 1 for channeled and exhausted focus
                if (cost.ch <= 0 && cost.ex <= 0) {
                    if (spell.cost_ch > spell.cost_ex) {
                        cost.ch = 1;
                    } else {
                        cost.ex = 1;
                    }
                }

                return cost;
            };

            let _applyFocusCost = function (character, cost, grossCost) {
                if (character.focus.t < (grossCost.ex + grossCost.ch + grossCost.co) + (character.focus.ch + character.focus.ex + character.focus.co)) {
                    return false; // not enough focus
                }

                character.focus.ex += cost.ex;
                character.focus.ch += cost.ch;
                character.focus.co += cost.co;

                return true;
            };

            let _cast = function (character, spell, empowered, successDiscount) {
                let cost = _calcSpellCost(spell, empowered, character.crafts[_CRAFT_TYPES.MAGIC], successDiscount);
                if (_applyFocusCost(character, cost, {ex: spell.cost_ex, ch: spell.cost_ch, co: spell.cost_co})) {
                    if (cost.ch > 0) {
                        let temp = character.status.channels;
                        temp.push({spellId: spell.id, value: cost.ch});
                        character.status.channels = temp;
                    }
                }
            };

            let _focusRegen = function (character) {
                let will = (character.attributes[_ATTRIBUTES.WILLPOWER].value || 0);
                let multiplierf = 2;
                if (character.strengths.indexOf('FOCUS_REG') >= 0) { // TODO: Item strengths
                    multiplierf = 3;
                }
                let regf  = multiplierf * will;
                if (regf <= 0) { regf = 1; }

                return regf;
            };

            let _dropAllChannels = function (character) {
                if (character) {
                    character.status.channels = [];
                    return true;
                }
            };

            let _dropChannel = function (character, index) {
                if (character) {
                    let temp = character.status.channels;
                    let f = character.focus.ch - temp[index].value;
                    if (f < 0 || f !== f) {
                        f = 0;
                    }
                    character.focus.ch = f;
                    character.focus.ex += temp[index].value;

                    temp.splice(index, 1);
                    character.status.channels = temp;
                    return true;
                }
                return false;
            };

            return {
                calcSpellCost: _calcSpellCost,
                cast: _cast,
                focusRegen: _focusRegen,
                dropChannel: _dropChannel,
                dropAllChannels: _dropAllChannels
            }

        }
    }
);