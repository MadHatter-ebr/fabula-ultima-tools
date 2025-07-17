// Complete Fabula Ultima Game Data - All Classes and Abilities
// Based on comprehensive PDF extraction including Core, Dark Fantasy, and Atlas classes

export const ATTRIBUTES = {
  DEXTERITY: 'dexterity',
  INSIGHT: 'insight', 
  MIGHT: 'might',
  WILLPOWER: 'willpower'
};

export const DICE_TYPES = {
  D6: 'd6',
  D8: 'd8',
  D10: 'd10',
  D12: 'd12'
};

// Attribute distribution system (core rules)
export const STARTING_ATTRIBUTES = {
  distribution: {
    values: [10, 10, 8, 6],
    description: 'Distribute these values among your four attributes'
  },
  allowed_values: [6, 8, 10],
  dice_mapping: {
    6: 'd6',
    8: 'd8',
    10: 'd10'
  }
};

// Complete character classes with abilities
export const CHARACTER_CLASSES = {
  // CORE CLASSES
  ARCANIST: {
    name: 'Arcanist',
    description: 'Masters of ancient magic and summoning',
    primaryAttributes: ['willpower'],
    freeBenefits: ['HP or MP +5', 'Bind and Summon Arcana'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Bind and Summon': {
        level: 1,
        description: 'Bind and summon Arcana to fight alongside you',
        type: 'active',
        cost: 'MP varies'
      },
      'Ritual Arcanism': {
        level: 1,
        description: 'Perform rituals of the Arcanism discipline',
        type: 'ritual',
        cost: 'Special'
      },
      'Quick Summoning': {
        level: 2,
        description: 'Summon Arcana faster in combat',
        type: 'passive',
        cost: 'None'
      },
      'Arcane Regeneration': {
        level: 6,
        description: 'Regenerate MP each turn',
        type: 'passive',
        cost: 'None'
      },
      'Phantom Strength': {
        level: 6,
        description: 'Your Arcana become more powerful',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  DARKBLADE: {
    name: 'Darkblade',
    description: 'Warriors who wield shadow and dark magic',
    primaryAttributes: ['dexterity', 'willpower'],
    freeBenefits: ['Martial armor', 'Martial melee OR ranged weapons'],
    equipmentProficiencies: ['Martial armor', 'Martial weapons'],
    abilities: {
      'Shadow Strike': {
        level: 1,
        description: 'Strike from the shadows with bonus damage',
        type: 'active',
        cost: 'MP varies'
      },
      'Agony': {
        level: 5,
        description: 'Inflict terrible pain on your enemies',
        type: 'active',
        cost: '20 MP'
      },
      'Umbral Form': {
        level: 8,
        description: 'Become one with the shadows',
        type: 'active',
        cost: '30 MP'
      }
    },
    source: 'Core Rules'
  },

  ELEMENTALIST: {
    name: 'Elementalist',
    description: 'Wielders of elemental forces',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Elementalism Rituals'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Elemental Magic': {
        level: 1,
        description: 'Cast powerful elemental spells',
        type: 'active',
        cost: 'MP varies',
        skillLevel: 10
      },
      'Spellblade': {
        level: 3,
        description: 'Infuse weapons with elemental power',
        type: 'active',
        cost: '10 MP'
      },
      'Elemental Shroud': {
        level: 6,
        description: 'Surround yourself with elemental energy',
        type: 'active',
        cost: '15 MP'
      },
      'Cataclysm': {
        level: 10,
        description: 'Unleash devastating elemental destruction',
        type: 'active',
        cost: '40 MP'
      }
    },
    source: 'Core Rules'
  },

  ENTROPIST: {
    name: 'Entropist',
    description: 'Masters of time and chaos magic',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Entropism Rituals'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Entropic Magic': {
        level: 1,
        description: 'Manipulate time and probability',
        type: 'active',
        cost: 'MP varies',
        skillLevel: 10
      },
      'Stolen Time': {
        level: 4,
        description: 'Act multiple times in a single turn',
        type: 'active',
        cost: '20 MP'
      },
      'Accelerated Casting': {
        level: 7,
        description: 'Cast spells faster',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  FURY: {
    name: 'Fury',
    description: 'Berserkers who channel primal rage',
    primaryAttributes: ['might', 'willpower'],
    freeBenefits: ['HP +5', 'Martial armor and melee weapons'],
    equipmentProficiencies: ['Martial armor', 'Martial melee weapons'],
    abilities: {
      'Withstand': {
        level: 1,
        description: 'Ignore damage through sheer will',
        type: 'active',
        cost: 'MP varies'
      },
      'Provoke': {
        level: 3,
        description: 'Force enemies to attack you',
        type: 'active',
        cost: '10 MP'
      },
      'Indomitable Spirit': {
        level: 5,
        description: 'Resist status effects',
        type: 'passive',
        cost: 'None'
      },
      'Berserker': {
        level: 8,
        description: 'Enter a devastating rage',
        type: 'active',
        cost: '25 MP'
      }
    },
    source: 'Core Rules'
  },

  GUARDIAN: {
    name: 'Guardian',
    description: 'Protectors who defend their allies',
    primaryAttributes: ['might'],
    freeBenefits: ['HP +5', 'Martial armor and shields'],
    equipmentProficiencies: ['Martial armor', 'Shields'],
    abilities: {
      'Protect': {
        level: 1,
        description: 'Shield allies from harm',
        type: 'active',
        cost: 'MP varies'
      },
      'Fortress': {
        level: 4,
        description: 'Become an immovable defense',
        type: 'active',
        cost: '15 MP'
      },
      'Retaliation': {
        level: 5,
        description: 'Strike back when attacked',
        type: 'passive',
        cost: 'None'
      },
      'Dual Shieldbearer': {
        level: 7,
        description: 'Wield two shields effectively',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  LOREMASTER: {
    name: 'Loremaster',
    description: 'Scholars of ancient knowledge',
    primaryAttributes: ['insight'],
    freeBenefits: ['MP +5'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Flash of Insight': {
        level: 1,
        description: 'Gain sudden understanding',
        type: 'active',
        cost: '5 MP'
      },
      'Quick Assessment': {
        level: 3,
        description: 'Quickly analyze enemies',
        type: 'active',
        cost: '10 MP'
      },
      'Focused': {
        level: 6,
        description: 'Maintain concentration better',
        type: 'passive',
        cost: 'None'
      },
      'Well-Versed': {
        level: 8,
        description: 'Master of all knowledge',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  ORATOR: {
    name: 'Orator',
    description: 'Masters of speech and persuasion',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Condemn': {
        level: 1,
        description: 'Weaken enemies with words',
        type: 'active',
        cost: '10 MP'
      },
      'Encourage': {
        level: 2,
        description: 'Inspire allies to greatness',
        type: 'active',
        cost: '10 MP'
      },
      'Persuasion': {
        level: 4,
        description: 'Influence others through speech',
        type: 'active',
        cost: '15 MP'
      },
      'Leadership': {
        level: 7,
        description: 'Command respect and loyalty',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  PILOT: {
    name: 'Pilot',
    description: 'Masters of vehicles and machinery',
    primaryAttributes: ['dexterity', 'might'],
    freeBenefits: ['HP +5', 'Martial armor'],
    equipmentProficiencies: ['Martial armor', 'Vehicle systems'],
    abilities: {
      'Vehicle Bond': {
        level: 1,
        description: 'Bond with and control vehicles',
        type: 'passive',
        cost: 'None'
      },
      'Weapon Modules': {
        level: 3,
        description: 'Install weapon systems',
        type: 'passive',
        cost: 'None'
      },
      'Enhanced Systems': {
        level: 5,
        description: 'Upgrade vehicle capabilities',
        type: 'passive',
        cost: 'None'
      },
      'Emergency Protocols': {
        level: 8,
        description: 'Survive vehicle destruction',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  ROGUE: {
    name: 'Rogue',
    description: 'Stealthy combatants and infiltrators',
    primaryAttributes: ['dexterity'],
    freeBenefits: ['HP +5', 'Martial armor and ranged weapons'],
    equipmentProficiencies: ['Martial armor', 'Martial ranged weapons'],
    abilities: {
      'Dodge': {
        level: 1,
        description: 'Avoid attacks with agility',
        type: 'active',
        cost: 'MP varies'
      },
      'Cheap Shot': {
        level: 3,
        description: 'Strike vital points for extra damage',
        type: 'active',
        cost: '10 MP'
      },
      'High Speed': {
        level: 5,
        description: 'Move with incredible speed',
        type: 'active',
        cost: '15 MP'
      },
      'Soul Steal': {
        level: 8,
        description: 'Drain life energy from enemies',
        type: 'active',
        cost: '25 MP'
      }
    },
    source: 'Core Rules'
  },

  SHARPSHOOTER: {
    name: 'Sharpshooter',
    description: 'Expert marksmen and ranged combatants',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['HP +5', 'Martial armor and ranged weapons'],
    equipmentProficiencies: ['Martial armor', 'Martial ranged weapons'],
    abilities: {
      'Ranged Weapon Mastery': {
        level: 1,
        description: 'Excel with ranged weapons',
        type: 'passive',
        cost: 'None'
      },
      'Barrage': {
        level: 3,
        description: 'Fire multiple shots rapidly',
        type: 'active',
        cost: '15 MP'
      },
      'Crossfire': {
        level: 5,
        description: 'Attack multiple enemies',
        type: 'active',
        cost: '20 MP'
      },
      'Hawkeye': {
        level: 8,
        description: 'Never miss your target',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  SPIRITIST: {
    name: 'Spiritist',
    description: 'Healers and masters of light magic',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Spiritism Rituals'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Ritual Spiritism': {
        level: 1,
        description: 'Perform healing and protective rituals',
        type: 'ritual',
        cost: 'Special'
      },
      'Healing Power': {
        level: 2,
        description: 'Restore HP to allies',
        type: 'active',
        cost: 'MP varies'
      },
      'Cleanse': {
        level: 4,
        description: 'Remove negative conditions',
        type: 'active',
        cost: '15 MP'
      },
      'Barrier Spells': {
        level: 6,
        description: 'Create protective barriers',
        type: 'active',
        cost: '20 MP'
      }
    },
    source: 'Core Rules'
  },

  TINKERER: {
    name: 'Tinkerer',
    description: 'Inventors and gadget masters',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['IP +2'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor', 'Gadgets'],
    abilities: {
      'Gadgets': {
        level: 1,
        description: 'Create and use mechanical devices',
        type: 'active',
        cost: 'IP varies'
      },
      'Alchemy': {
        level: 3,
        description: 'Brew potions and create compounds',
        type: 'active',
        cost: 'IP varies'
      },
      'Magitech': {
        level: 5,
        description: 'Combine magic and technology',
        type: 'passive',
        cost: 'None'
      },
      'Invention': {
        level: 8,
        description: 'Create entirely new devices',
        type: 'active',
        cost: 'IP varies'
      }
    },
    source: 'Core Rules'
  },

  WAYFARER: {
    name: 'Wayfarer',
    description: 'Explorers and wilderness survivors',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['HP +5'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Resourceful': {
        level: 1,
        description: 'Find resources in unlikely places',
        type: 'passive',
        cost: 'None'
      },
      'Faithful Companion': {
        level: 3,
        description: 'Gain an animal companion',
        type: 'passive',
        cost: 'None'
      },
      'Travel Skills': {
        level: 5,
        description: 'Excel at navigation and survival',
        type: 'passive',
        cost: 'None'
      },
      'Survival Instincts': {
        level: 8,
        description: 'Sense danger and opportunity',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Core Rules'
  },

  WEAPONMASTER: {
    name: 'Weaponmaster',
    description: 'Masters of martial combat',
    primaryAttributes: ['dexterity', 'might'],
    freeBenefits: ['HP +5', 'Martial armor and melee weapons'],
    equipmentProficiencies: ['Martial armor', 'Martial melee weapons'],
    abilities: {
      'Melee Weapon Mastery': {
        level: 1,
        description: 'Excel with melee weapons',
        type: 'passive',
        cost: 'None'
      },
      'Breach': {
        level: 3,
        description: 'Break through enemy defenses',
        type: 'active',
        cost: '10 MP'
      },
      'Counterattack': {
        level: 5,
        description: 'Strike back when attacked',
        type: 'passive',
        cost: 'None'
      },
      'Bone Crusher': {
        level: 8,
        description: 'Deliver devastating attacks',
        type: 'active',
        cost: '20 MP'
      }
    },
    source: 'Core Rules'
  },

  // DARK FANTASY CLASSES
  HEXER: {
    name: 'Hexer',
    description: 'Masters of curses and dark magic',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Ritualism'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Curse Magic': {
        level: 1,
        description: 'Cast hexes and curses',
        type: 'active',
        cost: 'MP varies'
      },
      'Encroaching Hex': {
        level: 3,
        description: 'Spread curses to nearby enemies',
        type: 'active',
        cost: '15 MP'
      },
      'Fell Resonance': {
        level: 5,
        description: 'Amplify curse effects',
        type: 'passive',
        cost: 'None'
      },
      'Where Evil Treads': {
        level: 8,
        description: 'Corrupt the very ground',
        type: 'active',
        cost: '25 MP'
      }
    },
    spells: [
      'Acid Splash', 'Blind', 'Plague', 'Venomous Weapon', 'Shadow Mask',
      'Torpor', 'Weakness', 'Curse', 'Drain Spirit', 'Toxic Cloud',
      'Soul Burn', 'Wither'
    ],
    source: 'Dark Fantasy'
  },

  SLAYER: {
    name: 'Slayer',
    description: 'Monster hunters and beast killers',
    primaryAttributes: ['dexterity', 'might'],
    freeBenefits: ['IP +2', 'Martial melee and ranged weapons'],
    equipmentProficiencies: ['Martial weapons', 'Hunting gear'],
    abilities: {
      'Bane Oils': {
        level: 1,
        description: 'Craft oils effective against specific creatures',
        type: 'active',
        cost: 'IP varies'
      },
      'Exploit': {
        level: 3,
        description: 'Target creature weaknesses',
        type: 'active',
        cost: '10 MP'
      },
      'Lockdown': {
        level: 5,
        description: 'Prevent enemy movement',
        type: 'active',
        cost: '15 MP'
      },
      'Giant Killer': {
        level: 6,
        description: 'Deal extra damage to large enemies',
        type: 'passive',
        cost: 'None'
      },
      'Wildlife Expert': {
        level: 8,
        description: 'Know everything about creatures',
        type: 'passive',
        cost: 'None'
      }
    },
    source: 'Dark Fantasy'
  },

  TAMER: {
    name: 'Tamer',
    description: 'Beast masters and creature summoners',
    primaryAttributes: ['willpower'],
    freeBenefits: ['MP +5'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Creature Mastery': {
        level: 1,
        description: 'Summon and control creatures',
        type: 'active',
        cost: 'MP varies'
      },
      'Negotiate': {
        level: 2,
        description: 'Communicate with creatures',
        type: 'active',
        cost: '10 MP'
      },
      'Interceptor': {
        level: 4,
        description: 'Creatures protect you',
        type: 'passive',
        cost: 'None'
      },
      'All-Out Attack': {
        level: 6,
        description: 'All creatures attack together',
        type: 'active',
        cost: '20 MP'
      },
      'Hybridization': {
        level: 8,
        description: 'Combine creature abilities',
        type: 'active',
        cost: '25 MP'
      }
    },
    source: 'Dark Fantasy'
  }
};

// Heroic Style Skills (available to all characters)
export const HEROIC_STYLE_SKILLS = {
  'Agile Defender Style': {
    description: 'Combine defense with mobility',
    level: 1,
    type: 'passive'
  },
  'Blast Gladiator Style': {
    description: 'Explosive combat techniques',
    level: 1,
    type: 'active'
  },
  'Bullet Deflection Style': {
    description: 'Deflect ranged attacks',
    level: 1,
    type: 'passive'
  },
  'Charged Punch Style': {
    description: 'Devastating unarmed strikes',
    level: 1,
    type: 'active'
  },
  'Collector Style': {
    description: 'Gather and use various items',
    level: 1,
    type: 'passive'
  },
  'Dark Blessing Style': {
    description: 'Channel dark powers',
    level: 1,
    type: 'active'
  },
  'Detonation Style': {
    description: 'Explosive magical effects',
    level: 1,
    type: 'active'
  },
  'Duelist Style': {
    description: 'One-on-one combat mastery',
    level: 1,
    type: 'passive'
  },
  'Fūma Shuriken Style': {
    description: 'Ninja throwing weapon techniques',
    level: 1,
    type: 'active'
  },
  'Gunbreaker Style': {
    description: 'Combine gunfire with melee',
    level: 1,
    type: 'active'
  },
  'Gunslinger Style': {
    description: 'Rapid-fire gun techniques',
    level: 1,
    type: 'active'
  },
  'Heightened Element Style': {
    description: 'Enhance elemental magic',
    level: 1,
    type: 'passive'
  },
  'Hidden Weapon Style': {
    description: 'Conceal and surprise with weapons',
    level: 1,
    type: 'active'
  },
  'Humble Style': {
    description: 'Power through humility',
    level: 1,
    type: 'passive'
  },
  'Iaidō Style': {
    description: 'Quick-draw sword techniques',
    level: 1,
    type: 'active'
  },
  'Investigator Style': {
    description: 'Enhanced detection and analysis',
    level: 1,
    type: 'passive'
  },
  'Palm and Step Style': {
    description: 'Martial arts combat techniques',
    level: 1,
    type: 'active'
  },
  'Piercing Sorcery Style': {
    description: 'Magic that penetrates defenses',
    level: 1,
    type: 'active'
  },
  'Prophetic Defender Style': {
    description: 'Foresee and prevent attacks',
    level: 1,
    type: 'passive'
  },
  'Punishing Style': {
    description: 'Retribution-based combat',
    level: 1,
    type: 'passive'
  },
  'Ranger Style': {
    description: 'Wilderness and tracking skills',
    level: 1,
    type: 'passive'
  },
  'Reaper Style': {
    description: 'Death-dealing combat techniques',
    level: 1,
    type: 'active'
  },
  'Scorpion Tail Style': {
    description: 'Poisonous strike techniques',
    level: 1,
    type: 'active'
  },
  'Skyspear Style': {
    description: 'Aerial spear combat',
    level: 1,
    type: 'active'
  },
  'Thaumaturge Style': {
    description: 'Miracle-working magic',
    level: 1,
    type: 'active'
  },
  'Vortex Warrior Style': {
    description: 'Whirlwind combat techniques',
    level: 1,
    type: 'active'
  }
};

// Status Effects
export const STATUS_EFFECTS = {
  POISONED: 'Poisoned',
  CURSED: 'Cursed',
  BLINDED: 'Blinded',
  WEAKENED: 'Weakened',
  SLOWED: 'Slowed',
  STUNNED: 'Stunned',
  CONFUSED: 'Confused',
  CHARMED: 'Charmed',
  FRIGHTENED: 'Frightened',
  BLESSED: 'Blessed',
  HASTED: 'Hasted',
  STRENGTHENED: 'Strengthened',
  PROTECTED: 'Protected',
  REGENERATING: 'Regenerating'
};

// Damage Types
export const DAMAGE_TYPES = {
  PHYSICAL: 'Physical',
  ELEMENTAL: 'Elemental',
  DARK: 'Dark',
  LIGHT: 'Light',
  POISON: 'Poison',
  PURE: 'Pure'
};

// Default character values
export const DEFAULT_CHARACTER = {
  name: '',
  level: 5,
  classes: [],
  attributes: {
    dexterity: null,
    insight: null,
    might: null,
    willpower: null
  },
  resources: {
    hp: 0,
    mp: 0,
    ip: 5, // SET TO 5 AS REQUESTED
    fabula: 3
  },
  traits: [],
  heroicStyles: [],
  equipment: [],
  bonds: [],
  avatar_url: null
};

// Character creation rules
export const CHARACTER_CREATION_RULES = {
  startingLevel: 5,
  maxLevel: 50,
  maxClasses: 'unlimited',
  additionalClassRequirement: 'One class at level 10',
  inventoryPoints: 5, // SET TO 5 AS REQUESTED
  fabulaPoints: 3,
  bondCount: 6,
  identityCount: 3,
  themeCount: 3,
  originCount: 3
};

export default {
  ATTRIBUTES,
  DICE_TYPES,
  STARTING_ATTRIBUTES,
  CHARACTER_CLASSES,
  HEROIC_STYLE_SKILLS,
  STATUS_EFFECTS,
  DAMAGE_TYPES,
  DEFAULT_CHARACTER,
  CHARACTER_CREATION_RULES
};