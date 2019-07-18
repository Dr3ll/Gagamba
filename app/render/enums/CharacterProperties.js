'use strict';

const _ATTRIBUTES = Object.freeze({
    AGILITY: 'AGILITY',
    CHARISMA: 'CHARISMA',
    CONSTITUTION: 'CONSTITUTION',
    INTUITION: 'INTUITION',
    MYSTIC: 'MYSTIC',
    STRENGTH: 'STRENGTH',
    WILLPOWER: 'WILLPOWER',
    WIT: 'WIT'
});

const _FIELD = Object.freeze({
    FOCUS: 'FOCUS',
    HEALTH: 'HEALTH',
    MOONSHARDS: 'MOONSHARDS',
    MAGIC: 'MAGIC',
    CHANNELS: 'CHANNELS',
    PROPERTIES: 'PROPERTIES',
    NAME: 'NAME',
    ATTRIBUTES: 'ATTRIBUTES',
    CRAFTS: 'CRAFTS'
});

const _RSTATES = Object.freeze({
    FRESH: 'f',
    CHANNELED: 'ch',
    EXHAUSTED: 'ex',
    CONSUMED: 'co'
});

const _CRAFT_TYPES = Object.freeze({
    GENERAL: 0,
    WEAPON: 1,
    MAGIC: 2
});
