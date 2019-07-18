define([
        'app',
        'modules/module'
    ], function (app) {
        'use strict';

        app.factory('CharacterBuilder', [
            function () {


                let _character = {};

                let _newCharacter = function() {
                    return {
                        name: "",
                        level: 1,
                        properties: {
                            education: undefined,
                            culture: undefined,
                            race: undefined,
                            hair: undefined,
                            eyes: undefined,
                            skin: undefined,
                            gender: "Male",
                            weight: 0,
                            height: 0
                        },
                        moonSign: undefined,
                        languages: ["BGNOME"],
                        experience: {
                            total: 15,
                            spent: 0,
                        },
                        moonshards: {
                            total: 0,
                            spent: 0
                        },
                        attributes: {
                            CHARISMA: {
                                base: 0,
                                value: 0
                            },
                            AGILITY: {
                                base: 0,
                                value: 0
                            },
                            INTUITION: {
                                base: 0,
                                value: 0
                            },
                            CONSTITUTION: {
                                base: 0,
                                value: 0
                            },
                            MYSTIC: {
                                base: 0,
                                value: 0
                            },
                            STRENGTH: {
                                base: 0,
                                value: 0
                            },
                            WIT: {
                                base: 0,
                                value: 0
                            },
                            WILLPOWER: {
                                base: 0,
                                value: 0
                            },
                            battle: {
                                dr: 0,
                                speed: 0,
                                initiative: 0,
                                defense: 0,
                                will: 0,
                                body: 0
                            },
                            focus: {
                                t: 0,
                                ch: 0,
                                ex: 0,
                                co: 0
                            },
                            health: {
                                pt: 0,
                                ch: 0,
                                ex: 0,
                                co: 0
                            },
                            crafts: [{
                                "20": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "21": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "22": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "23": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "24": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "25": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "26": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "27": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "28": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "29": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "30": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "31": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "32": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "33": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "34": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "35": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "36": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "37": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "38": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "39": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "40": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "41": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "42": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "43": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "44": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "45": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "46": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                }
                            }, {
                                "47": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "48": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "49": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "50": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "51": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "52": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                },
                                "53": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: []
                                }
                            }, {
                                "1": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "2": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "3": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "4": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "5": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "6": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "7": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "8": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "9": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "10": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "11": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "12": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [
                                    ],
                                    discount: 0
                                },
                                "13": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "14": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "15": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "16": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "17": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "18": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                },
                                "19": {
                                    skill: {
                                        base: 0,
                                        boost: 0,
                                        value: 0
                                    },
                                    masteries: [],
                                    discount: 0
                                }
                            }
                            ],
                            weaknesses: [],
                            resources: {
                                public_image: {
                                    value: 0,
                                    description: ""
                                },
                                rank: {
                                    value: 0,
                                    description: ""
                                },
                                contacts: {
                                    value: 0,
                                    description: ""
                                },
                                fortune: {
                                    value: 0,
                                    description: ""
                                },
                                relic: {
                                    value: 0,
                                    item: undefined
                                }
                            },
                            spells: [],
                            strengths: [],
                            fileName: undefined,
                            status: {
                                channels: [],
                                tookBreath: false
                            }
                        }
                    };
                };



                return {
                    getCharacter: function () {
                        return _character;
                    },
                    setCharacter: function (character) {
                        _character = character;
                    },
                    setAttributes: function (atts) {
                        _character;
                    }
                };

            }]);
    }
);