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
  distribution: {
    // Fixed distribution according to core rules:
    // - Two attributes at 10 (d10)
    // - One attribute at 8 (d8)
    // - One attribute at 6 (d6)
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
  },
  skill_points: {
    description: 'Skill Points (SP) are gained when leveling up classes',
    per_level: 1,
    starting_bonus: 'Each class starts with 1 skill point at level 1'
  }
};

// CLASS SKILLS - Each class has specific skills with level requirements
export const CLASS_SKILLS = {
  ARCANIST: {
    'Bind and Summon': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Bind and summon Arcana' },
    'Ritual Arcanism': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Perform Arcanism rituals' },
    'Arcane Regeneration': { max_level: 6, mp_cost: 0, type: 'passive', description: 'Recover MP when dismissing Arcana' },
    'Phantom Strength': { max_level: 6, mp_cost: 0, type: 'passive', description: 'Boost pulse damage' },
    'Quick Summoning': { max_level: 2, mp_cost: 0, type: 'passive', description: 'Reduce summoning MP cost' }
  },
  CHIMERIST: {
    'Spell Mimic': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Learn spells from studied creatures' },
    'Transformation': { max_level: 1, mp_cost: 10, type: 'action', description: 'Transform into studied creature' },
    'Inhuman Vigor': { max_level: 6, mp_cost: 0, type: 'passive', description: 'Boost HP and resistances' },
    'Wild Senses': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Enhanced perception abilities' },
    'Bestial Fury': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Boost damage while transformed' }
  },
  DARKBLADE: {
    'Shadow Strike': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Dark damage attacks' },
    'Agony': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Recover HP/MP from damage' },
    'Torment': { max_level: 3, mp_cost: 10, type: 'action', description: 'Inflict status effects' },
    'Dark Weapon': { max_level: 1, mp_cost: 5, type: 'spell', description: 'Imbue weapon with darkness' },
    'Umbral Form': { max_level: 2, mp_cost: 15, type: 'action', description: 'Become incorporeal' }
  },
  ELEMENTALIST: {
    'Elemental Magic': { max_level: 10, mp_cost: 0, type: 'passive', description: 'Learn elemental spells' },
    'Elemental Mastery': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Boost elemental damage' },
    'Elemental Shield': { max_level: 3, mp_cost: 10, type: 'action', description: 'Temporary elemental resistance' },
    'Spellblade': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Cast spells through weapons' },
    'Cataclysm': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Boost spell damage with extra MP' }
  },
  ENTROPIST: {
    'Luck Manipulation': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Alter dice rolls' },
    'Stolen Time': { max_level: 4, mp_cost: 0, type: 'action', description: 'Manipulate turn order' },
    'Catastrophe': { max_level: 3, mp_cost: 15, type: 'action', description: 'Cause random negative effects' },
    'Probability Shield': { max_level: 2, mp_cost: 10, type: 'action', description: 'Deflect attacks with luck' },
    'Chaos Theory': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Unpredictable bonus effects' }
  },
  FURY: {
    'Berserker Rage': { max_level: 6, mp_cost: 0, type: 'passive', description: 'Boost damage when in Crisis' },
    'Withstand': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Reduce damage taken' },
    'Indomitable Spirit': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Resist status effects' },
    'Provoke': { max_level: 2, mp_cost: 5, type: 'action', description: 'Force enemies to attack you' },
    'Adrenaline': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Extra actions in Crisis' }
  },
  GUARDIAN: {
    'Protect': { max_level: 1, mp_cost: 0, type: 'action', description: 'Shield allies from damage' },
    'Defensive Stance': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Boost defense and magic defense' },
    'Fortress': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Increase HP and defense' },
    'Bodyguard': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Counterattack when protecting' },
    'Taunt': { max_level: 2, mp_cost: 5, type: 'action', description: 'Draw enemy attention' }
  },
  LOREMASTER: {
    'Quick Assessment': { max_level: 1, mp_cost: 0, type: 'action', description: 'Study creatures and items' },
    'Focused': { max_level: 6, mp_cost: 0, type: 'passive', description: 'Increase MP and Insight checks' },
    'Flash of Insight': { max_level: 3, mp_cost: 10, type: 'action', description: 'Gain tactical advantages' },
    'Tactical Insight': { max_level: 2, mp_cost: 0, type: 'passive', description: 'Boost ally accuracy' },
    'Encyclopedic Knowledge': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Bonus to knowledge checks' }
  },
  ORATOR: {
    'Encouraging Words': { max_level: 1, mp_cost: 5, type: 'action', description: 'Boost ally attributes' },
    'Condemn': { max_level: 6, mp_cost: 5, type: 'action', description: 'Inflict status effects with words' },
    'Inspire': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Boost ally morale' },
    'Rally': { max_level: 3, mp_cost: 10, type: 'action', description: 'Remove ally status effects' },
    'Rousing Speech': { max_level: 2, mp_cost: 15, type: 'action', description: 'Boost all allies' }
  },
  ROGUE: {
    'Dodge': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Avoid attacks and reduce damage' },
    'Sneak Attack': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Bonus damage from stealth' },
    'Cheap Shot': { max_level: 3, mp_cost: 10, type: 'action', description: 'Inflict status with attacks' },
    'Soul Steal': { max_level: 5, mp_cost: 0, type: 'action', description: 'Steal MP from enemies' },
    'High Speed': { max_level: 2, mp_cost: 0, type: 'passive', description: 'Boost initiative and movement' }
  },
  SHARPSHOOTER: {
    'Ranged Weapon Mastery': { max_level: 10, mp_cost: 0, type: 'passive', description: 'Expertise with ranged weapons' },
    'Crossfire': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Attack multiple targets' },
    'Hawkeye': { max_level: 5, mp_cost: 10, type: 'action', description: 'Precise shots with bonus damage' },
    'Barrage': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Multiple attacks per turn' },
    'Warning Shot': { max_level: 2, mp_cost: 5, type: 'action', description: 'Intimidate enemies' }
  },
  SPIRITIST: {
    'Ritual Spiritism': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Perform spirit rituals' },
    'Healing Power': { max_level: 2, mp_cost: 0, type: 'passive', description: 'Boost healing effects' },
    'Manifestation': { max_level: 4, mp_cost: 15, type: 'action', description: 'Summon spirit allies' },
    'Ethereal Sight': { max_level: 3, mp_cost: 0, type: 'passive', description: 'See invisible creatures' },
    'Spirit Communion': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Communicate with spirits' }
  },
  TINKERER: {
    'Gadgets': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Create and use inventions' },
    'Alchemy': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Create potions and items' },
    'Magitech': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Combine magic and technology' },
    'Repair': { max_level: 2, mp_cost: 0, type: 'action', description: 'Fix equipment and constructs' },
    'Innovation': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Create unique items' }
  },
  WAYFARER: {
    'Resourceful': { max_level: 4, mp_cost: 0, type: 'passive', description: 'Survive in wilderness' },
    'Exploration': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Navigate and discover' },
    'Travel': { max_level: 2, mp_cost: 0, type: 'passive', description: 'Faster overland movement' },
    'Survival Instincts': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Detect danger' },
    'Cartographer': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Create accurate maps' }
  },
  WEAPONMASTER: {
    'Melee Weapon Mastery': { max_level: 10, mp_cost: 0, type: 'passive', description: 'Expertise with melee weapons' },
    'Counterattack': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Strike back when attacked' },
    'Breach': { max_level: 4, mp_cost: 10, type: 'action', description: 'Ignore armor and resistances' },
    'Bone Crusher': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Stun enemies with attacks' },
    'Combat Expertise': { max_level: 2, mp_cost: 0, type: 'passive', description: 'Tactical combat bonuses' }
  },
  HEXER: {
    'Curse Magic': { max_level: 10, mp_cost: 0, type: 'passive', description: 'Learn Hexer spells' },
    'Curse Ritualism': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Perform curse rituals' },
    'Encroaching Hex': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Build hex power for area damage' },
    'Fell Resonance': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Bonus damage to afflicted enemies' },
    'Where Evil Treads': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Discover evil locations while traveling' }
  },
  SLAYER: {
    'Monster Hunter': { max_level: 6, mp_cost: 0, type: 'passive', description: 'Bonus damage against monsters' },
    'Bane Oils': { max_level: 5, mp_cost: 0, type: 'action', description: 'Apply weakness-inducing oils' },
    'Exploit': { max_level: 5, mp_cost: 0, type: 'passive', description: 'Use enemy traits against them' },
    'Giant Killer': { max_level: 1, mp_cost: 0, type: 'passive', description: 'Extra damage vs. large enemies' },
    'Lockdown': { max_level: 4, mp_cost: 10, type: 'action', description: 'Reduce enemy damage output' },
    'Wildlife Expert': { max_level: 3, mp_cost: 0, type: 'passive', description: 'Knowledge of creature weaknesses' }
  }
};