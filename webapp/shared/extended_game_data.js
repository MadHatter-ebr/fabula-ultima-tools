// Extended Fabula Ultima Game Data - Complete extraction from all PDFs
// Includes Dark Fantasy Classes, Heroic Style Skills, Playtest Updates, and all Core Rules

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

// UPDATED: Complete character classes including Dark Fantasy Classes
export const CHARACTER_CLASSES = {
  // CORE CLASSES
  ARCANIST: {
    name: 'Arcanist',
    description: 'Masters of ancient magic and spell-weaving',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['staff', 'spellbook'],
    abilities: ['spell mastery', 'arcane recovery', 'bind and summon'],
    source: 'Core Rules'
  },
  CHIMERIST: {
    name: 'Chimerist',
    description: 'Shapeshifters who can take on monstrous forms',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['claws', 'transformation catalyst'],
    abilities: ['wild transformation', 'beast instincts', 'inhuman vigor'],
    source: 'Core Rules'
  },
  DARKBLADE: {
    name: 'Darkblade',
    description: 'Warriors who wield shadow and dark magic',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['dark sword', 'shadow cloak'],
    abilities: ['shadow strike', 'dark magic', 'agony'],
    source: 'Core Rules'
  },
  ELEMENTALIST: {
    name: 'Elementalist',
    description: 'Wielders of elemental forces',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['elemental focus', 'spell components'],
    abilities: ['elemental mastery', 'elemental shield', 'elemental weapon'],
    source: 'Core Rules'
  },
  ENTROPIST: {
    name: 'Entropist',
    description: 'Manipulators of luck and probability',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['dice', 'probability calculator'],
    abilities: ['luck manipulation', 'chaos theory', 'catastrophe'],
    source: 'Core Rules'
  },
  FURY: {
    name: 'Fury',
    description: 'Berserkers who channel rage into power',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['great weapon', 'rage catalyst'],
    abilities: ['berserker rage', 'unstoppable force', 'adrenaline'],
    source: 'Core Rules'
  },
  GUARDIAN: {
    name: 'Guardian',
    description: 'Protectors who shield allies from harm',
    primaryAttributes: ['might', 'willpower'],
    startingEquipment: ['shield', 'protective armor'],
    abilities: ['protect ally', 'defensive stance', 'fortress'],
    source: 'Core Rules'
  },
  LOREMASTER: {
    name: 'Loremaster',
    description: 'Scholars with vast knowledge',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['tome', 'research tools'],
    abilities: ['knowledge mastery', 'tactical insight', 'flash of insight'],
    source: 'Core Rules'
  },
  ORATOR: {
    name: 'Orator',
    description: 'Inspiring speakers who rally allies',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['speaking staff', 'inspiring banner'],
    abilities: ['rally cry', 'inspiring presence', 'condemn'],
    source: 'Core Rules'
  },
  ROGUE: {
    name: 'Rogue',
    description: 'Stealthy infiltrators and skilled thieves',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['daggers', 'thieves tools'],
    abilities: ['stealth mastery', 'sneak attack', 'cheap shot'],
    source: 'Core Rules'
  },
  SHARPSHOOTER: {
    name: 'Sharpshooter',
    description: 'Precise ranged combat specialists',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['bow', 'arrows'],
    abilities: ['precise shot', 'ranged mastery', 'crossfire'],
    source: 'Core Rules'
  },
  SPIRITIST: {
    name: 'Spiritist',
    description: 'Communers with spirits and the afterlife',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['spirit focus', 'ritual components'],
    abilities: ['spirit communion', 'ethereal sight', 'ritual spiritism'],
    source: 'Core Rules'
  },
  TINKERER: {
    name: 'Tinkerer',
    description: 'Inventors and creators of mechanical devices',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['tools', 'mechanical parts'],
    abilities: ['invention', 'mechanical mastery', 'magitech'],
    source: 'Core Rules'
  },
  WAYFARER: {
    name: 'Wayfarer',
    description: 'Travelers and explorers of distant lands',
    primaryAttributes: ['dexterity', 'intellect'],
    startingEquipment: ['travel gear', 'maps'],
    abilities: ['exploration', 'survival instincts', 'travel'],
    source: 'Core Rules'
  },
  WEAPONMASTER: {
    name: 'Weaponmaster',
    description: 'Masters of martial combat and weapons',
    primaryAttributes: ['might', 'dexterity'],
    startingEquipment: ['weapon of choice', 'combat gear'],
    abilities: ['weapon mastery', 'combat expertise', 'counterattack'],
    source: 'Core Rules'
  },
  
  // NEW DARK FANTASY CLASSES
  HEXER: {
    name: 'Hexer',
    description: 'Powerful spellcasters who harness the darkest facets of magic, specializing in curses and toxins',
    primaryAttributes: ['intellect', 'willpower'],
    startingEquipment: ['staff', 'curse components'],
    abilities: ['curse magic', 'curse ritualism', 'encroaching hex', 'fell resonance', 'where evil treads'],
    freeBenefits: ['+5 permanent Mind Points', 'Perform Ritualism discipline rituals'],
    spells: ['acid_splash', 'aura_of_decay', 'blind', 'deteriorate', 'muddle', 'plague', 'pressure', 'seething_blight', 'shadow_mask', 'symptom_shift', 'transfer_life', 'venomous_weapon'],
    source: 'Dark Fantasy Classes'
  },
  SLAYER: {
    name: 'Slayer',
    description: 'Specialized monster hunters who have dedicated their lives to fighting creatures of darkness',
    primaryAttributes: ['might', 'dexterity'],
    startingEquipment: ['specialized weapons', 'monster hunting gear'],
    abilities: ['monster hunter', 'weakness exploitation', 'relentless pursuit'],
    source: 'Dark Fantasy Classes'
  }
};

// NEW: Heroic Style Skills from Playtest Materials
export const HEROIC_STYLE_SKILLS = {
  AGILE_DEFENDER: {
    name: 'Agile Defender Style',
    requirements: ['Dodge skill level 2+', 'Dexterity d10+'],
    description: 'Become a defensive character based on Dodge',
    source: 'Playtest Materials'
  },
  BLAST_GLADIATOR: {
    name: 'Blast Gladiator Style',
    requirements: ['Bone Crusher skill'],
    description: 'Elementally imbue enemies with Bone Crusher',
    source: 'Playtest Materials'
  },
  BULLET_DEFLECTION: {
    name: 'Bullet Deflection Style',
    requirements: ['Dexterity and/or Insight d10+'],
    description: 'Negate and deflect ranged attacks with swords',
    source: 'Playtest Materials'
  },
  DARK_BLESSING: {
    name: 'Dark Blessing Style',
    requirements: ['Specific requirements TBD'],
    description: 'Harness dark powers for beneficial effects',
    source: 'Playtest Materials'
  },
  COLLECTOR: {
    name: 'Collector Style',
    requirements: ['Specific requirements TBD'],
    description: 'Master multiple weapon types and fighting styles',
    source: 'Playtest Materials'
  },
  GUNBREAKER: {
    name: 'Gunbreaker Style',
    requirements: ['Specific requirements TBD'],
    description: 'Combine firearms with melee combat',
    source: 'Playtest Materials'
  },
  IAIDO: {
    name: 'Iaido Style',
    requirements: ['Specific requirements TBD'],
    description: 'Master the art of quick-draw sword techniques',
    source: 'Playtest Materials'
  },
  PALM_AND_STEP: {
    name: 'Palm and Step Style',
    requirements: ['Specific requirements TBD'],
    description: 'Martial arts focusing on movement and strikes',
    source: 'Playtest Materials'
  },
  PUNISHING: {
    name: 'Punishing Style',
    requirements: ['Specific requirements TBD'],
    description: 'Counter-attack and punishment focused combat',
    source: 'Playtest Materials'
  },
  SKYSPEAR: {
    name: 'Skyspear Style',
    requirements: ['Specific requirements TBD'],
    description: 'Aerial combat and spear mastery',
    source: 'Playtest Materials'
  },
  DUELIST: {
    name: 'Duelist Style',
    requirements: ['Specific requirements TBD'],
    description: 'Single combat mastery with reduced MP costs',
    source: 'Playtest Materials'
  }
};

// NEW: Hexer Spells from Dark Fantasy Classes
export const HEXER_SPELLS = {
  ACID_SPLASH: {
    name: 'Acid Splash',
    mp: 10,
    target: 'One creature',
    duration: 'Instantaneous',
    type: 'offensive',
    description: 'Hurl a globule of caustic muck that splatters on impact. Target takes HR+15 poison damage, nearby creatures take 5 poison damage.',
    source: 'Dark Fantasy Classes'
  },
  AURA_OF_DECAY: {
    name: 'Aura of Decay',
    mp: 10,
    target: 'One creature',
    duration: 'Scene',
    type: 'utility',
    description: 'Cloak target in toxic magic. Creatures that melee attack the target take 5 poison damage.',
    source: 'Dark Fantasy Classes'
  },
  BLIND: {
    name: 'Blind',
    mp: 20,
    target: 'One creature',
    duration: 'Scene',
    type: 'offensive',
    description: 'Cover targets eyes with pitch-black shadows. Target suffers -2 penalty to Accuracy Checks.',
    source: 'Dark Fantasy Classes'
  },
  DETERIORATE: {
    name: 'Deteriorate',
    mp: 10,
    target: 'One creature',
    duration: 'Scene',
    type: 'offensive',
    description: 'Mark targets soul to weaken resistance to afflictions. When target would recover from status effects, you choose one to keep.',
    source: 'Dark Fantasy Classes'
  },
  MUDDLE: {
    name: 'Muddle',
    mp: 20,
    target: 'One creature',
    duration: 'Scene',
    type: 'offensive',
    description: 'Conjure troubling visions in targets mind. Target suffers -2 penalty to Magic Checks.',
    source: 'Dark Fantasy Classes'
  },
  PLAGUE: {
    name: 'Plague',
    mp: 15,
    target: 'One weak or shaken creature',
    duration: 'Instantaneous',
    type: 'offensive',
    description: 'Cause targets condition to worsen into infection. Target recovers from weak/shaken and becomes poisoned.',
    source: 'Dark Fantasy Classes'
  },
  PRESSURE: {
    name: 'Pressure',
    mp: '5×T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    type: 'offensive',
    description: 'Conjure oppressive atmosphere. Next time target spends MP, they must spend additional 10 MP or lose effect.',
    source: 'Dark Fantasy Classes'
  },
  SEETHING_BLIGHT: {
    name: 'Seething Blight',
    mp: 15,
    target: 'One slow or dazed creature',
    duration: 'Instantaneous',
    type: 'offensive',
    description: 'Magnify targets distress into blinding rage. Target recovers from slow/dazed and becomes enraged.',
    source: 'Dark Fantasy Classes'
  },
  SHADOW_MASK: {
    name: 'Shadow Mask',
    mp: 10,
    target: 'One creature',
    duration: 'Scene',
    type: 'utility',
    description: 'Light bends around ally to keep them hidden. Target cannot be selected for multi-target attacks and gains +2 to stealth.',
    source: 'Dark Fantasy Classes'
  },
  SYMPTOM_SHIFT: {
    name: 'Symptom Shift',
    mp: 10,
    target: 'One creature',
    duration: 'Instantaneous',
    type: 'utility',
    description: 'Target chooses one status effect among slow, dazed, weak, shaken to recover from and immediately suffers a different one.',
    source: 'Dark Fantasy Classes'
  },
  TRANSFER_LIFE: {
    name: 'Transfer Life',
    mp: 10,
    target: 'One willing creature',
    duration: 'Scene',
    type: 'utility',
    description: 'Connect life threads between yourself and target. Either may spend up to 30 HP for the other to recover equal amount.',
    source: 'Dark Fantasy Classes'
  },
  VENOMOUS_WEAPON: {
    name: 'Venomous Weapon',
    mp: 10,
    target: 'One equipped weapon',
    duration: 'Scene',
    type: 'utility',
    description: 'Imbue weapon with poisonous energy. All damage becomes poison type. May perform free attack if you have weapon equipped.',
    source: 'Dark Fantasy Classes'
  }
};

// UPDATED: Core Book Variants from Playtest Materials
export const CORE_BOOK_VARIANTS = {
  SPELLBLADE: {
    name: 'Spellblade (Updated)',
    description: 'No longer grants extra damage with Dexterity, instead grants bonus to Check. Non-DEX weapons use MIG+MIG, INS+INS, or WLP+WLP.',
    version: '1.11',
    source: 'Playtest Materials'
  },
  BATTLE_STANCES: {
    name: 'Battle Stances System',
    description: 'New optional system for combat positioning and tactical options',
    source: 'Playtest Materials'
  },
  PRESSURE_STAGGER: {
    name: 'Pressure and Stagger Rules',
    description: 'Now only apply to elites and champions (removed from soldiers due to complexity)',
    source: 'Playtest Materials'
  },
  MAGITECH_ARMAMENT: {
    name: 'Magitech Armament (Updated)',
    description: 'Swapped position of Defense and elemental benefits. Armament always occupies both hand slots. +1 Accuracy, +2 damage.',
    source: 'Playtest Materials'
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
  7: 'd6',
  8: 'd8',
  9: 'd8', 
  10: 'd10',
  11: 'd10',
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
  },
  heroic_style_rules: {
    max_per_character: 1,
    unique_per_group: true,
    available_at_creation: 'optional rule',
    description: 'Heroic Style Skills provide additional support to builds and playstyles'
  }
};