// Fabula Ultima Game Data - Extracted from PDF
// Core game mechanics and character creation data

export const ATTRIBUTES = {
  MIGHT: 'might',
  DEXTERITY: 'dexterity', 
  INTELLECT: 'intellect',
  WILLPOWER: 'willpower'
};

export const DICE_TYPES = {
  D6: 'd6',
  D8: 'd8',
  D10: 'd10',
  D12: 'd12'
};

export const CHARACTER_CLASSES = {
  // Based on PDF content - 15 classes total
  ARCANIST: {
    name: 'Arcanist',
    description: 'Masters of ancient magic and spell-weaving',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['staff', 'spellbook'],
    abilities: ['spell mastery', 'arcane recovery']
  },
  CHIMERIST: {
    name: 'Chimerist',
    description: 'Shapeshifters who can take on monstrous forms',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['claws', 'transformation catalyst'],
    abilities: ['wild transformation', 'beast instincts']
  },
  DARKBLADE: {
    name: 'Darkblade',
    description: 'Warriors who wield shadow and dark magic',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['dark sword', 'shadow cloak'],
    abilities: ['shadow strike', 'dark magic']
  },
  ELEMENTALIST: {
    name: 'Elementalist',
    description: 'Wielders of elemental forces',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['elemental focus', 'spell components'],
    abilities: ['elemental mastery', 'elemental shield']
  },
  ENTROPIST: {
    name: 'Entropist',
    description: 'Manipulators of luck and probability',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['dice', 'probability calculator'],
    abilities: ['luck manipulation', 'chaos theory']
  },
  FURY: {
    name: 'Fury',
    description: 'Berserkers who channel rage into power',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['great weapon', 'rage catalyst'],
    abilities: ['berserker rage', 'unstoppable force']
  },
  GUARDIAN: {
    name: 'Guardian',
    description: 'Protectors who shield allies from harm',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['shield', 'protective armor'],
    abilities: ['protect ally', 'defensive stance']
  },
  LOREMASTER: {
    name: 'Loremaster',
    description: 'Scholars with vast knowledge',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['tome', 'research tools'],
    abilities: ['knowledge mastery', 'tactical insight']
  },
  ORATOR: {
    name: 'Orator',
    description: 'Inspiring speakers who rally allies',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['speaking staff', 'inspiring banner'],
    abilities: ['rally cry', 'inspiring presence']
  },
  ROGUE: {
    name: 'Rogue',
    description: 'Stealthy infiltrators and skilled thieves',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['daggers', 'thieves tools'],
    abilities: ['stealth mastery', 'sneak attack']
  },
  SHARPSHOOTER: {
    name: 'Sharpshooter',
    description: 'Precise ranged combat specialists',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['bow', 'arrows'],
    abilities: ['precise shot', 'ranged mastery']
  },
  SPIRITIST: {
    name: 'Spiritist',
    description: 'Communers with spirits and the afterlife',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['spirit focus', 'ritual components'],
    abilities: ['spirit communion', 'ethereal sight']
  },
  TINKERER: {
    name: 'Tinkerer',
    description: 'Inventors and creators of mechanical devices',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['tools', 'mechanical parts'],
    abilities: ['invention', 'mechanical mastery']
  },
  WAYFARER: {
    name: 'Wayfarer',
    description: 'Travelers and explorers of distant lands',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['travel gear', 'maps'],
    abilities: ['exploration', 'survival instincts']
  },
  WEAPONMASTER: {
    name: 'Weaponmaster',
    description: 'Masters of martial combat and weapons',
    primaryAttributes: ['might', 'dexterity'],
    startingEquipment: ['weapon of choice', 'combat gear'],
    abilities: ['weapon mastery', 'combat expertise']
  }
};

export const STARTING_ATTRIBUTES = {
  total_points: 7,
  min_value: 6,
  max_value: 10,
  distribution: {
    // Players distribute 7 points among 4 attributes
    // Each attribute starts at 6, max 10
  }
};

export const DAMAGE_TYPES = {
  PHYSICAL: 'physical',
  AIR: 'air',
  BOLT: 'bolt',
  DARK: 'dark',
  EARTH: 'earth',
  FIRE: 'fire',
  ICE: 'ice',
  LIGHT: 'light',
  POISON: 'poison'
};

export const STATUS_EFFECTS = {
  DAZED: 'dazed',
  ENRAGED: 'enraged',
  POISONED: 'poisoned',
  SHAKEN: 'shaken',
  SLOW: 'slow',
  WEAK: 'weak'
};

export const EQUIPMENT_TYPES = {
  WEAPONS: 'weapons',
  ARMOR: 'armor',
  SHIELDS: 'shields',
  ACCESSORIES: 'accessories'
};

export const BASIC_WEAPONS = {
  DAGGER: {
    name: 'Dagger',
    type: 'melee',
    damage: 'hr + 5',
    handedness: 'one-handed',
    cost: 100,
    special: 'thrown'
  },
  SWORD: {
    name: 'Sword',
    type: 'melee', 
    damage: 'hr + 8',
    handedness: 'one-handed',
    cost: 200
  },
  BOW: {
    name: 'Bow',
    type: 'ranged',
    damage: 'hr + 6',
    handedness: 'two-handed',
    cost: 150
  },
  STAFF: {
    name: 'Staff',
    type: 'arcane',
    damage: 'hr + 4',
    handedness: 'two-handed',
    cost: 100,
    special: 'channel'
  }
};

export const DICE_PROGRESSION = {
  6: 'd6',
  8: 'd8', 
  10: 'd10',
  12: 'd12'
};

export const GAME_MECHANICS = {
  fabula_points: {
    starting: 3,
    uses: ['alter story', 'invoke trait', 'invoke bond']
  },
  hit_points: {
    base: 40,
    level_bonus: 5
  },
  mind_points: {
    base: 40, 
    level_bonus: 5
  },
  inventory_points: {
    base: 6,
    calculation: 'might + dexterity'
  }
};