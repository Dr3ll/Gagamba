define(
    [
        'enums/CharacterProperties'
    ],
    function () {
        'use strict';


        window.AnotherModule = () => {

            let _sleep = function (character, castingModule, battleModule, callFieldChange) {
                if (character) {
                    // Focus
                    let regf = castingModule.focusRegen();

                    character.focus.ex = 0;
                    character.focus.ch = 0;
                    character.focus.co = character.focus.co - regf > 0 ? character.focus.co - regf : 0;

                    if (castingModule.dropAllChannels()) {
                        callFieldChange(_FIELD.CHANNELS);
                    }

                    // Health
                    let regh = battleModule.healthRegen();

                    character.health.ex = 0;
                    //_character.health.ch = 0; // TODO: poison and such
                    character.health.co = character.health.co - regh > 0 ? character.health.co - regh : 0;

                    character.status.tookBreath = false;

                    return true;
                }
                return false;
            };

            let _rest = function (character, callFieldChange) {
                if (character) {
                    character.focus.ex = 0;
                    character.health.ex = 0;
                    character.status.tookBreath = false;

                    callFieldChange(_FIELD.FOCUS);
                    callFieldChange(_FIELD.HEALTH);
                }
            };

            let _refreshField = function (cheatEnabled, character, field, callFieldChange) {
                if (cheatEnabled && character) {
                    switch (field) {
                        case _FIELD.FOCUS: {
                            if (character.focus) {
                                character.focus.ch = 0;
                                character.focus.ex = 0;
                                character.focus.co = 0;
                                character.status.channels = [];
                                callFieldChange(_FIELD.CHANNELS);
                            }
                            break;
                        }
                        case _FIELD.HEALTH: {
                            if (character.health) {
                                character.health.ch = 0;
                                character.health.ex = 0;
                                character.health.co = 0;
                            }
                            break;
                        }
                        case _FIELD.MOONSHARDS: {
                            if (character.moonshards) {
                                character.moonshards.spent = 0;
                            }
                            break;
                        }
                    }
                    callFieldChange(field);
                }
            };

            let _spendMoonshard = function (character, callFieldChange) {
                if (character.moonshards.spent >= character.moonshards.total ) {
                    return;
                }

                character.moonshards.spent++;
                callFieldChange(_FIELD.MOONSHARDS);
            };

            let _refreshMoonshards = function (character, amount, callFieldChange) {
                if (character) {
                    if (amount === undefined) {
                        character.moonshards.spent = 0;
                    } else {
                        character.moonshards.spent -= amount;
                        if (character.moonshards.spent < 0) {
                            character.moonshards.spent = 0;
                        }
                    }

                    callFieldChange(_FIELD.MOONSHARDS);
                }
                return false;
            };

            return {
                sleep: _sleep,
                rest: _rest,
                refreshField: _refreshField,
                refreshMoonshards: _refreshMoonshards,
                spendMoonshard: _spendMoonshard
            }

        }
    }
);