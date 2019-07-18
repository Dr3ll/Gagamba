define(
    [
        'enums/CharacterProperties'
    ],
    function () {
        'use strict';


        window.BattleModule = () => {

            let _takeDamage = function (character, damage) {
                if (character.health.pt * 5 <=
                    damage.ex + damage.ch + damage.co +
                    character.health.ch + character.health.ex + character.health.co) {
                    character.health.ch = 0;
                    character.health.ex = 0;
                    character.health.co = character.health.pt * 5;
                    return false; // you died
                }

                character.health.ch += damage.ch;
                character.health.ex += damage.ex;
                character.health.co += damage.co;

                return true;
            };

            let _takeHit = function (character, damage, callFieldChange) {
                if (character) {
                    let dr = character.battle.dr;
                    while (dr > 0) {
                        if (damage.ch > 0) {
                            if (dr >= damage.ch) {
                                dr -= damage.ch;
                                damage.ch = 0;
                            } else {
                                damage.ch -= dr;
                                dr = 0;
                            }
                        } else if (damage.ex > 0) {
                            if (dr >= damage.ex) {
                                dr -= damage.ex;
                                damage.ex = 0;
                            } else {
                                damage.ex -= dr;
                                dr = 0;
                            }
                        } else if (damage.co > 0) {
                            if (dr >= damage.co) {
                                dr -= damage.co;
                                damage.co = 0;
                            } else {
                                damage.co -= dr;
                                dr = 0;
                            }
                        }
                    }
                    _takeDamage(character, damage);

                    callFieldChange(_FIELD.HEALTH);
                }
            };

            let _takeBreath = function (character) {
                if (character && !character.status.tookBreath) {
                    character.health.ex =
                        10 + character.attributes[_ATTRIBUTES.CONSTITUTION] < character.health.ex
                            ? character.health.ex - 10 + character.attributes[_ATTRIBUTES.CONSTITUTION]
                            : 0;
                    character.status.tookBreath = true;

                    return true;
                }
                return false;
            };

            let _healthRegen = function (character) {
                let con = (character.attributes[_ATTRIBUTES.CONSTITUTION].value || 0);
                let multiplierh = 2;
                if (character.strengths.indexOf('HEALTH_REG') >= 0) { // TODO: Item strengths
                    multiplierh = 3;
                }
                let regh  = multiplierh * con;
                if (regh <= 0) { regh = 1;}

                return regh;
            };

            return {
                takeHit: _takeHit,
                healthRegen: _healthRegen,
                takeBreath: _takeBreath
            }

        }
    }
);