// Complete Fabula Ultima Game Data - All Classes and Abilities
// Based on comprehensive PDF extraction including Core, Dark Fantasy, and Atlas classes
// Includes: Core Rulebook, Dark Fantasy Classes, Natural Fantasy Atlas, Techno Fantasy Atlas, Low Fantasy Atlas

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
        description: 'You can bind and summon Arcana to fight alongside you. As an action, spend MP equal to the Arcana\'s level to summon it. The Arcana acts on your turn and follows your commands. You can have multiple Arcana summoned at once, but their combined levels cannot exceed your Arcanist level.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Ritual Arcanism': {
        level: 1,
        description: 'You can perform rituals of the Arcanism discipline during rest scenes. These rituals allow you to research new Arcana, improve existing ones, or create magical items. Each ritual requires specific components and time to complete.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Arcane Circle': {
        level: 1,
        description: 'You can create protective circles that enhance spellcasting. During a rest scene, you can inscribe a circle that provides bonuses to magical activities performed within it.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Emergency Summoning': {
        level: 1,
        description: 'Once per scene, you can summon an Arcana as a free action during combat, even if you have already acted this turn.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Merge': {
        level: 2,
        description: 'You can temporarily merge with one of your summoned Arcana, gaining some of its abilities and characteristics while it is merged with you.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Quick Summoning': {
        level: 2,
        description: 'You can summon Arcana as a free action instead of a full action. This allows you to summon during combat more efficiently and react to changing battlefield conditions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Arcane Knowledge': {
        level: 2,
        description: 'Your understanding of magic is exceptional. You gain bonuses when identifying magical phenomena and can sense the presence of magic.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Dismissal': {
        level: 3,
        description: 'You can forcibly dismiss summoned creatures, including enemy summons. Make a Magic Check against the summoner\'s Magic Defense.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Spell Steal': {
        level: 3,
        description: 'You can steal beneficial magical effects from enemies and apply them to yourself or allies.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Arcane Synthesis': {
        level: 4,
        description: 'You can combine two Arcana temporarily, creating a more powerful hybrid creature with combined abilities.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Mana Shield': {
        level: 4,
        description: 'You can use MP to absorb damage. When you take damage, you can spend MP to reduce it on a 1:1 basis.',
        type: 'reaction',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Arcane Regeneration': {
        level: 6,
        description: 'At the start of each of your turns, you recover 5 MP. This regeneration continues as long as you have at least one Arcana summoned and are conscious.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Phantom Strength': {
        level: 6,
        description: 'Your summoned Arcana gain +1 to all attributes and +5 to all derived statistics (HP, MP, Initiative). This bonus applies to all Arcana you summon while you have this skill.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Arcane Mastery': {
        level: 8,
        description: 'Your mastery of magic is unparalleled. Reduce the MP cost of all your abilities by 5 (minimum 1).',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Greater Summoning': {
        level: 8,
        description: 'You can summon more powerful Arcana and maintain more of them simultaneously. Your level limit for combined Arcana increases by 5.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Arcane Transcendence': {
        level: 10,
        description: 'You become one with magic itself. Once per scene, you can cast any spell or use any magical ability you have seen, regardless of class restrictions.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      }
    },
    specialRules: {
      title: 'Arcana System',
      description: 'Arcanists work with powerful magical entities called Arcana. Each Arcana has its own level, abilities, and characteristics. The Arcanist can bind multiple Arcana but their combined levels cannot exceed the Arcanist\'s class level.',
      arcanaTypes: [
        { name: 'Elemental Arcana', description: 'Fire, Ice, Lightning, Earth, Air, and Water spirits' },
        { name: 'Conceptual Arcana', description: 'Arcana representing abstract concepts like Time, Space, Life, Death' },
        { name: 'Heroic Arcana', description: 'Legendary heroes and mythical figures' },
        { name: 'Beast Arcana', description: 'Powerful magical creatures and monsters' }
      ],
      bindingRules: [
        'Arcana must be discovered through gameplay or rituals',
        'Each Arcana has a level from 1-10',
        'Total bound Arcana levels cannot exceed Arcanist level',
        'Summoning costs MP equal to Arcana level',
        'Arcana act on the Arcanist\'s turn and follow their commands'
      ]
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
        description: 'Strike from the shadows with bonus damage. When you attack a target that cannot see you or is surprised, deal extra damage equal to your Willpower die.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Umbral Blade': {
        level: 1,
        description: 'Infuse your weapons with shadow energy. For the rest of the scene, your weapons deal dark damage and can strike incorporeal enemies.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Cloak of Shadows': {
        level: 2,
        description: 'Wrap yourself in darkness. Until the start of your next turn, enemies have disadvantage on attacks against you.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Dark Healing': {
        level: 2,
        description: 'Draw power from pain and darkness. When you deal damage with a dark attack, recover HP equal to half the damage dealt.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Shadow Step': {
        level: 3,
        description: 'Teleport through shadows. Move to any position within range where shadows exist, ignoring obstacles.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Curse': {
        level: 3,
        description: 'Place a dark curse on your enemy. Target suffers ongoing penalties to their actions until the curse is lifted.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Nightmare': {
        level: 4,
        description: 'Invade an enemy\'s mind with terrifying visions. Target must make a resistance check or become confused and frightened.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Drain Life': {
        level: 4,
        description: 'Siphon life force from your enemies. Deal damage to target and heal yourself for the same amount.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Agony': {
        level: 5,
        description: 'Inflict terrible pain on your enemies. Target takes ongoing damage and has all actions hindered by excruciating pain.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Shadow Clone': {
        level: 5,
        description: 'Create a duplicate of yourself made of shadow. The clone can fight alongside you but has half your stats.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Darkness': {
        level: 6,
        description: 'Plunge an area into supernatural darkness. All creatures in the area suffer penalties to actions and movement.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Soul Rend': {
        level: 6,
        description: 'Attack the very soul of your enemy. This attack ignores physical armor and resistances.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Umbral Form': {
        level: 8,
        description: 'Become one with the shadows. You become incorporeal and immune to physical attacks, but cannot attack physically yourself.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Death Magic': {
        level: 8,
        description: 'Wield the power of death itself. Your dark attacks can instantly kill weakened enemies.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Shadow Mastery': {
        level: 10,
        description: 'Become the ultimate shadow warrior. All your dark abilities cost 5 less MP (minimum 1) and deal increased damage.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
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
        description: 'Cast powerful elemental spells of fire, ice, lightning, earth, air, and water. Each element has unique properties and effects.',
        type: 'active',
        cost: 'MP varies',
        skillLevel: 10,
        maxTimes: 1
      },
      'Ritual Elementalism': {
        level: 1,
        description: 'Perform elemental rituals during rest scenes to create magical items, alter weather, or commune with elemental spirits.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Elemental Resistance': {
        level: 2,
        description: 'Gain resistance to one chosen element. You take half damage from that element and can resist its effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Elemental Weapon': {
        level: 2,
        description: 'Imbue a weapon with elemental power. The weapon deals additional elemental damage for the rest of the scene.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Spellblade': {
        level: 3,
        description: 'Infuse weapons with elemental power and cast spells through weapon attacks. Combine weapon and spell damage.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Elemental Shield': {
        level: 3,
        description: 'Create a protective barrier of elemental energy. Absorbs damage and can reflect attacks back at enemies.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Elemental Mastery': {
        level: 4,
        description: 'Choose a second element to master. You can now cast spells of two different elements.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Elemental Fusion': {
        level: 4,
        description: 'Combine two elements to create more powerful hybrid spells with unique effects.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Elemental Summoning': {
        level: 5,
        description: 'Summon elemental beings to fight alongside you. Each elemental has unique abilities based on its element.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Elemental Travel': {
        level: 5,
        description: 'Travel through your chosen element. Teleport through fire, ice, lightning, earth, air, or water.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Elemental Shroud': {
        level: 6,
        description: 'Surround yourself with elemental energy. Gain bonuses to all actions and damage enemies who attack you.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Elemental Storm': {
        level: 6,
        description: 'Create a localized elemental storm that affects a large area with continuous elemental effects.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Elemental Avatar': {
        level: 8,
        description: 'Transform into an elemental avatar, gaining incredible power and new abilities based on your chosen element.',
        type: 'active',
        cost: '35 MP',
        maxTimes: 1
      },
      'Primal Magic': {
        level: 8,
        description: 'Access the raw, primal forces of the elements. Your spells ignore resistances and deal maximum damage.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Cataclysm': {
        level: 10,
        description: 'Unleash devastating elemental destruction that can reshape the battlefield. Affects multiple targets with catastrophic elemental damage.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Manipulate time and probability with chaos magic. Alter the flow of time, change outcomes, and bend reality.',
        type: 'active',
        cost: 'MP varies',
        skillLevel: 10,
        maxTimes: 1
      },
      'Ritual Entropism': {
        level: 1,
        description: 'Perform time and chaos rituals during rest scenes to glimpse the future, alter fate, or create temporal anomalies.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Probability Shift': {
        level: 2,
        description: 'Alter the odds of success. Force a reroll of any die roll within range, choosing the better or worse result.',
        type: 'reaction',
        cost: '10 MP',
        maxTimes: 1
      },
      'Temporal Anchor': {
        level: 2,
        description: 'Create a temporal anchor point. You can return to this exact moment in time once per scene.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Chaos Bolt': {
        level: 3,
        description: 'Launch a bolt of pure chaos that has random effects. Roll to determine what happens to the target.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Time Dilation': {
        level: 3,
        description: 'Slow time around yourself. Move and act normally while others are slowed, giving you extra actions.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Stolen Time': {
        level: 4,
        description: 'Steal time from your enemies to empower yourself. Act multiple times in a single turn while enemies lose actions.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Fate Manipulation': {
        level: 4,
        description: 'Directly alter fate and destiny. Change the outcome of any event that just occurred.',
        type: 'reaction',
        cost: '25 MP',
        maxTimes: 1
      },
      'Temporal Echo': {
        level: 5,
        description: 'Create echoes of yourself from different timelines. These echoes can act independently but share your MP.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Chaos Field': {
        level: 5,
        description: 'Create an area of pure chaos where random magical effects occur continuously.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Time Stop': {
        level: 6,
        description: 'Stop time for everyone except yourself. Take multiple actions while time is frozen.',
        type: 'active',
        cost: '35 MP',
        maxTimes: 1
      },
      'Entropy Wave': {
        level: 6,
        description: 'Release a wave of entropy that ages, corrodes, and breaks down everything it touches.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Accelerated Casting': {
        level: 7,
        description: 'Cast spells faster than normal. You can cast multiple spells in a single turn or cast as reactions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Temporal Mastery': {
        level: 8,
        description: 'Master the flow of time itself. All your time magic costs less MP and has enhanced effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Reality Rift': {
        level: 10,
        description: 'Tear a hole in reality itself. This ultimate entropy spell can rewrite the laws of physics in a localized area.',
        type: 'active',
        cost: '50 MP',
        maxTimes: 1
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
        description: 'Ignore damage through sheer will. Reduce incoming damage by spending MP on a 2:1 ratio.',
        type: 'reaction',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Adrenaline': {
        level: 1,
        description: 'Channel your rage into increased speed and strength. Gain bonus actions and damage when below half HP.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Intimidate': {
        level: 2,
        description: 'Strike fear into your enemies with your fierce presence. Enemies may flee or be paralyzed by fear.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Rage Strike': {
        level: 2,
        description: 'Attack with uncontrolled fury. Deal massive damage but become vulnerable to counterattacks.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Provoke': {
        level: 3,
        description: 'Force enemies to attack you through taunts and aggressive behavior. Enemies must focus their attacks on you.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Reckless Attack': {
        level: 3,
        description: 'Attack without regard for defense. Gain bonus damage but take increased damage from all sources.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Frenzy': {
        level: 4,
        description: 'Enter a controlled frenzy. Make additional attacks each turn but cannot perform other actions.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Unbreakable': {
        level: 4,
        description: 'Become incredibly difficult to kill. Continue fighting even when reduced to 0 HP.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Indomitable Spirit': {
        level: 5,
        description: 'Resist status effects and mental influences through sheer force of will. Automatically succeed on some saves.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Brutal Strike': {
        level: 5,
        description: 'Attack with devastating force. Deal maximum damage and potentially stun or knock down enemies.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Bloodlust': {
        level: 6,
        description: 'Heal yourself by dealing damage. Recover HP equal to a portion of the damage you deal.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Whirlwind': {
        level: 6,
        description: 'Attack all enemies around you in a spinning assault. Hit multiple targets with reduced accuracy.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Berserker': {
        level: 8,
        description: 'Enter a devastating rage that increases all your physical capabilities while making you harder to control.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Unstoppable Force': {
        level: 8,
        description: 'Nothing can stop your advance. Ignore obstacles, resistances, and defensive abilities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Apocalypse': {
        level: 10,
        description: 'Unleash your ultimate fury in a devastating area attack that can reshape the battlefield.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Shield allies from harm by intercepting attacks meant for them. Redirect enemy attacks to yourself.',
        type: 'reaction',
        cost: '5 MP',
        maxTimes: 1
      },
      'Taunt': {
        level: 1,
        description: 'Draw enemy attention to yourself. Force enemies to target you instead of your allies.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Shield Wall': {
        level: 2,
        description: 'Create a defensive barrier that provides cover for allies. Blocks projectiles and provides defensive bonuses.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Guardian\'s Resolve': {
        level: 2,
        description: 'Gain bonuses to defense and resistance when protecting allies. The more allies you protect, the stronger you become.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Defensive Stance': {
        level: 3,
        description: 'Adopt a defensive posture that greatly increases your defense but reduces your attack capability.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Shield Bash': {
        level: 3,
        description: 'Attack with your shield to stun and knock back enemies. Can interrupt enemy actions.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Fortress': {
        level: 4,
        description: 'Become an immovable defense. Gain immunity to forced movement and greatly increased resistances.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Rallying Cry': {
        level: 4,
        description: 'Inspire your allies to fight harder. Provide bonuses to all allies\' actions and morale.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Retaliation': {
        level: 5,
        description: 'Strike back when attacked. Automatically counterattack enemies who hit you.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Sacrifice': {
        level: 5,
        description: 'Take damage meant for an ally. Transfer all damage from an ally to yourself.',
        type: 'reaction',
        cost: '20 MP',
        maxTimes: 1
      },
      'Aegis': {
        level: 6,
        description: 'Create a protective field around allies. Reduce damage taken by all nearby allies.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Guardian Angel': {
        level: 6,
        description: 'Instantly teleport to an ally in danger and intercept attacks against them.',
        type: 'reaction',
        cost: '20 MP',
        maxTimes: 1
      },
      'Dual Shieldbearer': {
        level: 7,
        description: 'Wield two shields effectively. Gain additional defensive bonuses and can protect more allies simultaneously.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Unbreakable Defense': {
        level: 8,
        description: 'Your defense becomes nearly impenetrable. Reduce all damage taken to minimal amounts.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Final Stand': {
        level: 10,
        description: 'When reduced to low HP, gain massive bonuses to all defensive abilities and can protect unlimited allies.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
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
        description: 'Gain sudden understanding of any situation, problem, or mystery. Instantly know the best course of action.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Lore': {
        level: 1,
        description: 'Access your vast knowledge on any topic. Automatically succeed on knowledge checks and gain insight into any subject.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Identify': {
        level: 2,
        description: 'Instantly identify any object, creature, or magical effect. Learn its properties, weaknesses, and abilities.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Tactical Advice': {
        level: 2,
        description: 'Provide tactical guidance to allies. Grant bonuses to allies\' actions based on your strategic knowledge.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Quick Assessment': {
        level: 3,
        description: 'Quickly analyze enemies and situations. Instantly learn enemy weaknesses, resistances, and optimal strategies.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Sage Advice': {
        level: 3,
        description: 'Provide wise counsel that grants allies bonuses to their next actions. Your wisdom guides their decisions.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Research': {
        level: 4,
        description: 'Conduct magical research during rest scenes to learn new information or create magical items.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Encyclopedic Knowledge': {
        level: 4,
        description: 'Your knowledge covers virtually every subject. Gain bonuses to all knowledge-based rolls.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Predict': {
        level: 5,
        description: 'Predict future events based on your knowledge. Warn allies of incoming dangers or opportunities.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Teaching': {
        level: 5,
        description: 'Teach skills to allies during rest scenes. Temporarily grant allies knowledge or abilities they don\'t possess.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Focused': {
        level: 6,
        description: 'Maintain concentration better. Resist distractions and mental effects through scholarly discipline.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Ancient Secrets': {
        level: 6,
        description: 'Access knowledge of ancient secrets and lost arts. Use abilities from other classes or forgotten magic.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Master Scholar': {
        level: 8,
        description: 'Your scholarly pursuits grant you insight into all fields. Gain bonuses to all non-combat activities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Well-Versed': {
        level: 8,
        description: 'Master of all knowledge. You can provide expert advice on any topic and gain benefits from all knowledge.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Wisdom of the Ages': {
        level: 10,
        description: 'Access the collective wisdom of all scholars throughout history. Gain ultimate insight into any situation.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
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
        description: 'Weaken enemies with cutting words and condemnation. Reduce enemy stats and morale through verbal assault.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Inspiring Speech': {
        level: 1,
        description: 'Deliver speeches that inspire allies. Grant bonuses to ally actions and remove negative status effects.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Encourage': {
        level: 2,
        description: 'Inspire allies to greatness with words of encouragement. Provide bonuses to ally rolls and actions.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Debate': {
        level: 2,
        description: 'Engage in intellectual combat. Counter enemy arguments and social attacks with superior rhetoric.',
        type: 'reaction',
        cost: '12 MP',
        maxTimes: 1
      },
      'Rally': {
        level: 3,
        description: 'Rally allies from defeat. Restore ally morale and grant temporary bonuses to all actions.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Demoralize': {
        level: 3,
        description: 'Break enemy morale with harsh words and intimidation. Cause enemies to flee or become paralyzed.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Persuasion': {
        level: 4,
        description: 'Influence others through masterful speech. Change enemy allegiances or gain cooperation.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Oratory': {
        level: 4,
        description: 'Deliver powerful speeches that affect large groups. Influence crowds and masses of people.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Command': {
        level: 5,
        description: 'Issue commands that allies must obey. Direct ally actions with perfect coordination.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Inspiring Presence': {
        level: 5,
        description: 'Your mere presence inspires those around you. Allies gain bonuses while near you.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Diplomatic Immunity': {
        level: 6,
        description: 'Your words protect you from harm. Reduce damage from enemies who can understand you.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Mass Suggestion': {
        level: 6,
        description: 'Suggest actions to multiple targets through compelling speech. Influence groups of enemies.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Leadership': {
        level: 7,
        description: 'Command respect and loyalty through natural leadership. Allies gain bonuses to all actions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Legendary Oration': {
        level: 8,
        description: 'Deliver speeches that become legendary. Your words have lasting effects on all who hear them.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Words of Power': {
        level: 10,
        description: 'Speak words that reshape reality itself. Your ultimate speech can change the course of events.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Bond with and control vehicles as extensions of yourself. Gain bonuses when operating any vehicle.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Ace Pilot': {
        level: 1,
        description: 'Exceptional piloting skills. Perform maneuvers that should be impossible and exceed vehicle limits.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Mechanical Aptitude': {
        level: 2,
        description: 'Understand and repair machinery intuitively. Fix and modify vehicles and equipment.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Evasive Maneuvers': {
        level: 2,
        description: 'Perform evasive maneuvers to avoid attacks. Gain bonuses to defense while piloting.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Weapon Modules': {
        level: 3,
        description: 'Install and operate weapon systems on vehicles. Add combat capabilities to any vehicle.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Ramming Speed': {
        level: 3,
        description: 'Use your vehicle as a weapon. Deal massive damage by ramming enemies.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'System Override': {
        level: 4,
        description: 'Override vehicle safety systems for maximum performance. Gain bonuses but risk damage.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Multi-Vehicle Control': {
        level: 4,
        description: 'Control multiple vehicles simultaneously. Coordinate fleets of vehicles in complex maneuvers.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Enhanced Systems': {
        level: 5,
        description: 'Upgrade vehicle capabilities beyond normal limits. Improve all vehicle systems.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Combat Pilot': {
        level: 5,
        description: 'Master of vehicular combat. Gain bonuses to all combat actions while piloting.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Autopilot': {
        level: 6,
        description: 'Program vehicles to operate independently. Vehicles can act without your direct control.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Legendary Maneuver': {
        level: 6,
        description: 'Perform impossible maneuvers that defy physics. Achieve legendary piloting feats.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Vehicle Mastery': {
        level: 8,
        description: 'Master any vehicle instantly. Gain maximum bonuses with any vehicle type.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Emergency Protocols': {
        level: 8,
        description: 'Survive vehicle destruction and catastrophic failures. Escape from any vehicle disaster.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Fusion Pilot': {
        level: 10,
        description: 'Merge with your vehicle to become one entity. Gain vehicle abilities while maintaining human intelligence.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Avoid attacks with supernatural agility. Reduce damage taken by spending MP.',
        type: 'reaction',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Stealth': {
        level: 1,
        description: 'Become invisible to enemies. Move unseen and gain bonuses to surprise attacks.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Lockpicking': {
        level: 2,
        description: 'Open any lock or bypass security systems. Gain access to restricted areas.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Poison': {
        level: 2,
        description: 'Apply poison to weapons or use poison attacks. Deal ongoing damage to enemies.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Cheap Shot': {
        level: 3,
        description: 'Strike vital points for extra damage. Attack enemy weak spots for devastating effect.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Shadow Clone': {
        level: 3,
        description: 'Create illusory duplicates of yourself. Confuse enemies and gain tactical advantages.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Trap': {
        level: 4,
        description: 'Set traps to damage or hinder enemies. Create strategic obstacles on the battlefield.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Backstab': {
        level: 4,
        description: 'Attack from behind for massive damage. Deal critical hits to unaware enemies.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'High Speed': {
        level: 5,
        description: 'Move with incredible speed. Take multiple actions in a single turn.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Sleight of Hand': {
        level: 5,
        description: 'Steal items or plant objects with supernatural dexterity. Manipulate objects at distance.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Vanish': {
        level: 6,
        description: 'Disappear completely from sight and detection. Become untargetable for a short time.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Critical Strike': {
        level: 6,
        description: 'Strike with perfect precision. Always hit vital points for maximum damage.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Master Thief': {
        level: 8,
        description: 'Steal anything from anyone. Take abstract concepts like abilities or memories.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Soul Steal': {
        level: 8,
        description: 'Drain life energy from enemies. Steal HP, MP, or even abilities from targets.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Perfect Assassin': {
        level: 10,
        description: 'Become the ultimate assassin. Your attacks can instantly kill any target.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Excel with all ranged weapons. Gain bonuses to accuracy, damage, and range.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Aimed Shot': {
        level: 1,
        description: 'Take careful aim for guaranteed hits. Spend time aiming to ensure perfect accuracy.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Quick Draw': {
        level: 2,
        description: 'Draw and fire weapons with lightning speed. Always act first in combat.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Covering Fire': {
        level: 2,
        description: 'Provide covering fire for allies. Protect allies from enemy attacks.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Barrage': {
        level: 3,
        description: 'Fire multiple shots rapidly at a single target. Overwhelm enemies with volume of fire.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Ricochets': {
        level: 3,
        description: 'Bounce shots off surfaces to hit enemies around corners or behind cover.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Sniper': {
        level: 4,
        description: 'Attack from extreme range with devastating accuracy. Hit targets at any distance.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Trick Shot': {
        level: 4,
        description: 'Perform impossible shots that defy physics. Hit multiple targets with one shot.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Crossfire': {
        level: 5,
        description: 'Attack multiple enemies simultaneously. Coordinate attacks for maximum coverage.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Piercing Shot': {
        level: 5,
        description: 'Fire shots that pierce through multiple enemies. Ignore armor and cover.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Rain of Arrows': {
        level: 6,
        description: 'Fire shots that rain down over a large area. Attack all enemies in the area.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Called Shot': {
        level: 6,
        description: 'Target specific body parts for special effects. Disable enemies by targeting limbs.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Hawkeye': {
        level: 8,
        description: 'Never miss your target. All ranged attacks automatically hit.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Master Marksman': {
        level: 8,
        description: 'Achieve perfect mastery of ranged combat. All shots deal maximum damage.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Legendary Shot': {
        level: 10,
        description: 'Fire a shot that becomes legend. This ultimate attack can change the course of battle.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Perform healing and protective rituals during rest scenes. Create blessed items and sanctify areas.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Light Magic': {
        level: 1,
        description: 'Cast spells of light and healing. Banish darkness and undead creatures.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Healing Power': {
        level: 2,
        description: 'Restore HP to allies with divine healing light. Heal multiple allies simultaneously.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Bless': {
        level: 2,
        description: 'Grant divine blessings to allies. Provide bonuses to all ally actions.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Sanctuary': {
        level: 3,
        description: 'Create a holy sanctuary that prevents enemies from entering. Provide safe haven.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Turn Undead': {
        level: 3,
        description: 'Repel undead creatures with holy light. Force undead to flee or be destroyed.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Cleanse': {
        level: 4,
        description: 'Remove negative conditions and curses. Purify allies of all harmful effects.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Divine Protection': {
        level: 4,
        description: 'Grant divine protection to allies. Reduce damage taken from all sources.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Resurrection': {
        level: 5,
        description: 'Restore fallen allies to life. Bring back allies from death.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Banish': {
        level: 5,
        description: 'Banish evil creatures to other planes. Remove powerful enemies from battle.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Barrier Spells': {
        level: 6,
        description: 'Create protective barriers of light. Block attacks and harmful effects.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Mass Healing': {
        level: 6,
        description: 'Heal all allies simultaneously. Restore HP to multiple targets.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Divine Intervention': {
        level: 8,
        description: 'Call upon divine powers for miraculous effects. Alter fate and reality.',
        type: 'active',
        cost: '35 MP',
        maxTimes: 1
      },
      'Holy Aura': {
        level: 8,
        description: 'Radiate divine energy that empowers allies and weakens enemies.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Miracle': {
        level: 10,
        description: 'Perform a miracle that can change the course of events. Ultimate divine magic.',
        type: 'active',
        cost: '50 MP',
        maxTimes: 1
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
        description: 'Find resources in unlikely places. Locate supplies, tools, and information wherever you go.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Wilderness Lore': {
        level: 1,
        description: 'Master knowledge of the natural world. Identify plants, animals, and natural phenomena.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Tracking': {
        level: 2,
        description: 'Follow tracks and signs to locate creatures. Never lose a trail.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Camouflage': {
        level: 2,
        description: 'Blend into natural surroundings. Become nearly invisible in wilderness environments.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Faithful Companion': {
        level: 3,
        description: 'Gain an animal companion that fights alongside you and provides unique abilities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Foraging': {
        level: 3,
        description: 'Find food and medicinal plants in the wild. Provide sustenance for your party.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Weather Sense': {
        level: 4,
        description: 'Predict weather changes and natural disasters. Prepare for environmental hazards.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Beast Speech': {
        level: 4,
        description: 'Communicate with wild animals. Gain information and assistance from creatures.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Travel Skills': {
        level: 5,
        description: 'Excel at navigation and survival. Never get lost and always find the best route.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Trap Sense': {
        level: 5,
        description: 'Detect and disarm natural and artificial traps. Protect your party from hidden dangers.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Nature\'s Ally': {
        level: 6,
        description: 'Call upon nature for aid. Summon natural forces to help in combat or exploration.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Wilderness Stride': {
        level: 6,
        description: 'Move through difficult terrain without penalty. Lead your party through any environment.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Master Tracker': {
        level: 8,
        description: 'Track anything across any distance. Follow trails through time and space.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Survival Instincts': {
        level: 8,
        description: 'Sense danger and opportunity with supernatural awareness. Never be caught off guard.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'One with Nature': {
        level: 10,
        description: 'Become one with the natural world. Gain the abilities of any natural creature.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Excel with all melee weapons. Gain bonuses to accuracy, damage, and special maneuvers.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Combat Reflexes': {
        level: 1,
        description: 'React instantly to threats. Gain bonuses to initiative and defensive actions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Weapon Techniques': {
        level: 2,
        description: 'Master special techniques for each weapon type. Unlock unique abilities per weapon.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Flurry of Blows': {
        level: 2,
        description: 'Attack multiple times in rapid succession. Overwhelm enemies with speed.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Breach': {
        level: 3,
        description: 'Break through enemy defenses and armor. Ignore defensive bonuses.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Disarm': {
        level: 3,
        description: 'Disarm enemies with precise strikes. Remove weapons from enemy hands.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Weapon Throw': {
        level: 4,
        description: 'Throw melee weapons with devastating accuracy. Turn any weapon into a ranged weapon.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Combat Expertise': {
        level: 4,
        description: 'Master all aspects of combat. Gain bonuses to all combat actions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Counterattack': {
        level: 5,
        description: 'Strike back when attacked. Automatically counter enemy attacks.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Whirlwind Strike': {
        level: 5,
        description: 'Attack all enemies around you in a devastating circular assault.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Weapon Mastery': {
        level: 6,
        description: 'Achieve perfect mastery with your chosen weapons. Maximize damage and accuracy.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Devastating Strike': {
        level: 6,
        description: 'Strike with overwhelming force. Deal massive damage to single targets.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Bone Crusher': {
        level: 8,
        description: 'Deliver devastating attacks that can shatter bones and destroy armor.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Legendary Warrior': {
        level: 8,
        description: 'Become a legendary warrior. All weapon attacks gain maximum effectiveness.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Thousand Cuts': {
        level: 10,
        description: 'Unleash a legendary technique that strikes with the power of a thousand blows.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
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
        description: 'Cast hexes and curses that weaken and torment enemies. Master the dark arts of affliction.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Ritual Hexing': {
        level: 1,
        description: 'Perform dark rituals to create powerful curses and hexes during rest scenes.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Evil Eye': {
        level: 2,
        description: 'Curse enemies with a glance. Inflict minor curses through eye contact.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Hex Resistance': {
        level: 2,
        description: 'Resist curses and negative effects. Gain immunity to your own hexes.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Encroaching Hex': {
        level: 3,
        description: 'Spread curses to nearby enemies. Watch as your hexes contaminate multiple targets.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Cursed Items': {
        level: 3,
        description: 'Create cursed objects that afflict those who touch them. Trap enemies with cursed items.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Malevolent Aura': {
        level: 4,
        description: 'Radiate an aura of malevolence that weakens nearby enemies.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Life Drain': {
        level: 4,
        description: 'Drain life force from cursed enemies. Heal yourself by harming others.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Fell Resonance': {
        level: 5,
        description: 'Amplify curse effects through dark resonance. Make your hexes more potent.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Curse Mastery': {
        level: 5,
        description: 'Master multiple types of curses. Combine different hex effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Plague Bearer': {
        level: 6,
        description: 'Spread supernatural plagues and diseases. Infect large areas with dark corruption.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Soul Binding': {
        level: 6,
        description: 'Bind enemy souls to your will. Force enemies to serve you through dark magic.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Where Evil Treads': {
        level: 8,
        description: 'Corrupt the very ground beneath your feet. Transform areas into cursed wastelands.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Hex Lord': {
        level: 8,
        description: 'Become a lord of hexes and curses. All curse effects are maximized.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Ultimate Curse': {
        level: 10,
        description: 'Cast the ultimate curse that can doom entire kingdoms. Unleash apocalyptic hex magic.',
        type: 'active',
        cost: '50 MP',
        maxTimes: 1
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
        description: 'Craft oils effective against specific creature types. Apply to weapons for devastating effects.',
        type: 'active',
        cost: 'IP varies',
        maxTimes: 1
      },
      'Monster Lore': {
        level: 1,
        description: 'Extensive knowledge of monsters and beasts. Identify creature weaknesses and abilities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Preparation': {
        level: 2,
        description: 'Prepare for hunts by crafting specialized gear and studying targets.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Trap Setting': {
        level: 2,
        description: 'Set traps designed to capture or kill specific monster types.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Exploit': {
        level: 3,
        description: 'Target creature weaknesses for maximum damage. Strike vital points precisely.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Stalking': {
        level: 3,
        description: 'Track and follow monsters without being detected. Master of stealth hunting.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Silver Weapons': {
        level: 4,
        description: 'Craft and use silver weapons effective against supernatural creatures.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Combat Reflexes': {
        level: 4,
        description: 'React instantly to monster attacks. Gain bonuses against creature abilities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Lockdown': {
        level: 5,
        description: 'Prevent enemy movement with nets, chains, or magical restraints.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Monster Slaying': {
        level: 5,
        description: 'Specialize in killing specific monster types. Choose favored enemies.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Giant Killer': {
        level: 6,
        description: 'Deal extra damage to large enemies. Specialize in hunting massive creatures.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Poison Immunity': {
        level: 6,
        description: 'Develop immunity to most poisons and toxins through exposure.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Master Hunter': {
        level: 8,
        description: 'Become a master of the hunt. All hunting abilities reach peak effectiveness.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Wildlife Expert': {
        level: 8,
        description: 'Know everything about creatures. Predict behavior and counter abilities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Legendary Slayer': {
        level: 10,
        description: 'Become a legendary monster slayer. Can kill any creature with the right preparation.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
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
        description: 'Summon and control creatures of various types. Form bonds with beasts.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Animal Empathy': {
        level: 1,
        description: 'Understand and communicate with animals through empathic connection.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Negotiate': {
        level: 2,
        description: 'Communicate with creatures to avoid combat or gain assistance.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Beast Training': {
        level: 2,
        description: 'Train creatures to perform specific tasks and learn new abilities.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Pack Leader': {
        level: 3,
        description: 'Lead multiple creatures as a pack. Coordinate their actions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Creature Healing': {
        level: 3,
        description: 'Heal and tend to your creature companions. Restore their HP and remove ailments.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Interceptor': {
        level: 4,
        description: 'Creatures protect you from attacks. They take damage meant for you.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Creature Bond': {
        level: 4,
        description: 'Form deep bonds with creatures. Share abilities and senses.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Wild Calling': {
        level: 5,
        description: 'Call wild creatures to your aid. Summon creatures from the local environment.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Creature Evolution': {
        level: 5,
        description: 'Help creatures evolve and grow stronger. Unlock new abilities.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'All-Out Attack': {
        level: 6,
        description: 'All creatures attack together in perfect coordination. Overwhelming assault.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Creature Fusion': {
        level: 6,
        description: 'Temporarily merge with your creature companion. Gain their abilities.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Hybridization': {
        level: 8,
        description: 'Combine creature abilities to create hybrid beings with multiple powers.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Beast Lord': {
        level: 8,
        description: 'Become a lord of beasts. All creatures respect and obey you.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Legendary Tamer': {
        level: 10,
        description: 'Tame and control legendary creatures. Command mythical beasts.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
      }
    },
    source: 'Dark Fantasy'
  },

  // ATLAS CLASSES - NATURAL FANTASY
  CHANTER: {
    name: 'Chanter',
    description: 'Music-based spellcaster focused on songs and performances',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Chanting Rituals'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Chanting Magic': {
        level: 1,
        description: 'Cast spells through song and performance. Your voice becomes a conduit for magical power.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 1
      },
      'Ritual Chanting': {
        level: 1,
        description: 'Perform musical rituals during rest scenes. Create magical effects through extended performances.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Inspiring Song': {
        level: 2,
        description: 'Boost allies with inspiring melodies. Grant bonuses to all ally actions.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Lullaby': {
        level: 2,
        description: 'Sing enemies to sleep with soothing melodies. Induce drowsiness and fatigue.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Battle Hymn': {
        level: 3,
        description: 'Sing war songs that empower allies in combat. Increase damage and accuracy.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Discordant Note': {
        level: 3,
        description: 'Create harsh sounds that disorient and damage enemies. Sonic attacks.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Harmony': {
        level: 4,
        description: 'Create protective harmonies that shield allies from harm. Musical barriers.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Song of Healing': {
        level: 4,
        description: 'Heal allies with restorative melodies. Continuous healing through song.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Captivating Performance': {
        level: 5,
        description: 'Entrance enemies with mesmerizing performances. Control their actions.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Echo': {
        level: 5,
        description: 'Create magical echoes that repeat your spells. Duplicate magical effects.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Song of Power': {
        level: 6,
        description: 'Amplify all magical effects through powerful songs. Enhance spell potency.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Silence': {
        level: 6,
        description: 'Create zones of absolute silence. Prevent spellcasting and communication.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Grand Performance': {
        level: 8,
        description: 'Deliver a performance that affects everyone who hears it. Mass musical magic.',
        type: 'active',
        cost: '35 MP',
        maxTimes: 1
      },
      'Voice of the Gods': {
        level: 8,
        description: 'Your voice carries divine power. All songs have enhanced effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'World Song': {
        level: 10,
        description: 'Sing a song that can reshape reality itself. Ultimate musical magic.',
        type: 'active',
        cost: '50 MP',
        maxTimes: 1
      }
    },
    source: 'Natural Fantasy Atlas'
  },

  DANCER: {
    name: 'Dancer',
    description: 'Graceful combatant using dance-based combat techniques',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['HP +5', 'Martial melee weapons'],
    equipmentProficiencies: ['Martial weapons', 'Basic armor'],
    abilities: {
      'Combat Dance': {
        level: 1,
        description: 'Fluid combat style combining dance and martial arts. Move and attack with graceful precision.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Rhythmic Flow': {
        level: 1,
        description: 'Enter a rhythmic flow state. Gain bonuses to all actions when maintaining rhythm.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Grace': {
        level: 2,
        description: 'Enhanced mobility and evasion through natural grace. Dodge attacks with dance moves.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Mesmerizing Performance': {
        level: 2,
        description: 'Distract enemies with captivating dance moves. Reduce enemy accuracy.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Spinning Strike': {
        level: 3,
        description: 'Attack while spinning elegantly. Gain bonuses to damage and defense.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Dance of Blades': {
        level: 3,
        description: 'Combine weapon techniques with dance moves. Fluid weapon mastery.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Whirlwind': {
        level: 4,
        description: 'Spinning attack hitting multiple enemies in a graceful whirlwind of motion.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Inspiring Dance': {
        level: 4,
        description: 'Inspire allies with beautiful dance performances. Grant bonuses to ally actions.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Elemental Dance': {
        level: 5,
        description: 'Incorporate elemental effects into dance moves. Attacks gain elemental properties.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Acrobatic Combat': {
        level: 5,
        description: 'Combine acrobatics with combat. Attack from impossible angles.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Dance of Death': {
        level: 6,
        description: 'A deadly dance that can kill enemies through pure artistry. Lethal performance.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Eternal Grace': {
        level: 6,
        description: 'Achieve perfect grace in all movements. All actions become more effective.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Perfect Form': {
        level: 8,
        description: 'Achieve perfect form in dance and combat. All abilities reach peak effectiveness.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Master Performer': {
        level: 8,
        description: 'Become a master of performance and combat. All dances have maximum impact.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Divine Choreography': {
        level: 10,
        description: 'Perform a dance so perfect it touches the divine. Reality bends to your movement.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
      }
    },
    source: 'Natural Fantasy Atlas'
  },

  MUTANT: {
    name: 'Mutant',
    description: 'Class that gains random mutations and transformations',
    primaryAttributes: ['might', 'willpower'],
    freeBenefits: ['HP +5', 'Random Mutation'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Mutation': {
        level: 1,
        description: 'Gain random beneficial mutations that enhance your abilities. Roll for mutation effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Unstable Genetics': {
        level: 1,
        description: 'Your genetic structure is unstable. Gain resistance to some effects but vulnerability to others.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Adapt': {
        level: 2,
        description: 'Temporary adaptation to circumstances. Develop situational abilities.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Regeneration': {
        level: 2,
        description: 'Mutated healing factor. Slowly recover HP over time.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Toxic Blood': {
        level: 3,
        description: 'Your blood becomes toxic. Damage enemies who attack you in melee.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Limb Regrowth': {
        level: 3,
        description: 'Regrow lost limbs and recover from dismemberment. Extreme healing.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Evolve': {
        level: 4,
        description: 'Controlled mutation development. Choose the direction of your evolution.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Chimeric Form': {
        level: 4,
        description: 'Combine traits from multiple creatures. Gain abilities from different species.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Viral Mutation': {
        level: 5,
        description: 'Spread beneficial mutations to allies. Share your genetic advantages.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Adaptive Immunity': {
        level: 5,
        description: 'Develop immunity to effects that damage you. Learn from genetic trauma.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Metamorphosis': {
        level: 6,
        description: 'Undergo complete transformation. Change your entire form temporarily.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'Genetic Memory': {
        level: 6,
        description: 'Access genetic memories of your ancestors. Gain knowledge and abilities.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Transcend': {
        level: 8,
        description: 'Achieve ultimate evolutionary form. Transcend normal biological limits.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Perfect Organism': {
        level: 8,
        description: 'Become a perfect organism. Gain the best traits of all life forms.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Evolutionary Apex': {
        level: 10,
        description: 'Represent the apex of evolution. Gain ultimate adaptive abilities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    specialRules: {
      title: 'Mutation System',
      description: 'Mutants gain random beneficial mutations as they advance. Each mutation provides unique abilities and may come with drawbacks. The mutation system allows for truly unique character development.',
      mutationTypes: [
        { name: 'Physical Mutations', description: 'Changes to body structure, strength, speed, or senses' },
        { name: 'Mental Mutations', description: 'Enhanced intelligence, telepathy, or mental abilities' },
        { name: 'Elemental Mutations', description: 'Resistance or control over elemental forces' },
        { name: 'Biological Mutations', description: 'Altered biology, toxins, or metabolic changes' }
      ],
      mutationRules: [
        'Roll for random mutations when gaining certain abilities',
        'Mutations can be positive, negative, or neutral',
        'Some mutations can be controlled or directed',
        'Mutations may interact with each other in unexpected ways',
        'Evolution allows for directed mutation development'
      ]
    },
    source: 'Natural Fantasy Atlas'
  },

  // ATLAS CLASSES - TECHNO FANTASY
  CYBORG: {
    name: 'Cyborg',
    description: 'Cybernetically enhanced warrior with technological augmentations',
    primaryAttributes: ['might', 'dexterity'],
    freeBenefits: ['HP +5', 'Cybernetic Enhancement'],
    equipmentProficiencies: ['Martial weapons', 'Martial armor'],
    abilities: {
      'Cybernetic Systems': {
        level: 1,
        description: 'Enhanced physical capabilities through technological implants. Improved strength, speed, and durability.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Diagnostic Mode': {
        level: 1,
        description: 'Run diagnostic scans on yourself and others. Detect injuries, diseases, and malfunctions.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Data Analysis': {
        level: 2,
        description: 'Analyze enemies and situations with computer precision. Process information faster than humans.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Targeting System': {
        level: 2,
        description: 'Advanced targeting systems improve accuracy. Lock onto enemies for enhanced attacks.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Cybernetic Repair': {
        level: 3,
        description: 'Self-repair damaged cybernetic systems. Restore functionality to implants.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Network Connection': {
        level: 3,
        description: 'Connect to technological networks. Access information and control systems.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'System Overload': {
        level: 4,
        description: 'Push cybernetic systems beyond normal limits. Gain massive bonuses but risk damage.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Weapon Integration': {
        level: 4,
        description: 'Integrate weapons directly into cybernetic systems. Weapons become part of your body.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Enhanced Reflexes': {
        level: 5,
        description: 'Cybernetic reflexes surpass human limitations. React faster than possible.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'EMP Resistance': {
        level: 5,
        description: 'Hardened systems resist electromagnetic interference. Immunity to EMP effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Cybernetic Arsenal': {
        level: 6,
        description: 'Deploy hidden weapons from cybernetic implants. Surprise enemies with concealed armaments.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'System Synchronization': {
        level: 6,
        description: 'Synchronize with other technological systems. Control multiple machines simultaneously.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Neural Interface': {
        level: 8,
        description: 'Direct mind-machine connection. Control technology with thought alone.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Cybernetic Mastery': {
        level: 8,
        description: 'Master all cybernetic systems. Perfect integration of man and machine.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Transcendent Cyborg': {
        level: 10,
        description: 'Transcend the limits of flesh and steel. Become the ultimate fusion of organic and digital.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Techno Fantasy Atlas'
  },

  pilot: {
    name: 'Pilot',
    description: 'Expert vehicle operator and mechanical specialist',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['IP +2', 'Vehicle Proficiency'],
    equipmentProficiencies: ['Ranged weapons', 'Basic armor'],
    abilities: {
      'Vehicle Mastery': {
        level: 1,
        description: 'Enhanced control over vehicles and machines',
        type: 'passive',
        cost: 'None'
      },
      'Evasive Maneuvers': {
        level: 2,
        description: 'Superior evasion in vehicles',
        type: 'active',
        cost: '5 MP'
      },
      'Precision Strike': {
        level: 4,
        description: 'Accurate attacks from vehicles',
        type: 'active',
        cost: '10 MP'
      },
      'Ace Pilot': {
        level: 8,
        description: 'Legendary piloting skills',
        type: 'active',
        cost: '15 MP'
      }
    },
    source: 'Techno Fantasy Atlas'
  },

  HACKER: {
    name: 'Hacker',
    description: 'Digital infiltrator and information specialist',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Digital Access'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Data Breach': {
        level: 1,
        description: 'Access digital systems and networks. Penetrate security measures.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Cyber Awareness': {
        level: 1,
        description: 'Sense digital systems and electronic devices. Detect networked technology.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'System Manipulation': {
        level: 2,
        description: 'Control electronic devices and systems remotely. Override security protocols.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Data Mining': {
        level: 2,
        description: 'Extract valuable information from digital systems. Uncover hidden data.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Encryption': {
        level: 3,
        description: 'Protect digital information with advanced encryption. Secure communications.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Trace Route': {
        level: 3,
        description: 'Track digital communications and network traffic. Follow data paths.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Viral Code': {
        level: 4,
        description: 'Create destructive digital attacks that spread through networks.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Firewall': {
        level: 4,
        description: 'Create digital barriers to protect against cyber attacks.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 1
      },
      'Digital Surveillance': {
        level: 5,
        description: 'Monitor digital activities and communications. Spy through technology.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Network Takeover': {
        level: 5,
        description: 'Take control of entire networks and their connected devices.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Cyber Warfare': {
        level: 6,
        description: 'Wage war through digital means. Attack infrastructure and systems.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 1
      },
      'AI Manipulation': {
        level: 6,
        description: 'Influence and control artificial intelligence systems.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Ghost Protocol': {
        level: 8,
        description: 'Become untraceable in digital space. Invisible to all monitoring.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Digital Godhood': {
        level: 8,
        description: 'Achieve god-like control over digital systems. Ultimate hacking power.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'System Singularity': {
        level: 10,
        description: 'Merge with digital systems to become a digital entity with unlimited access.',
        type: 'active',
        cost: '50 MP',
        maxTimes: 1
      }
    },
    source: 'Techno Fantasy Atlas'
  },

  // ATLAS CLASSES - LOW FANTASY
  MERCHANT: {
    name: 'Merchant',
    description: 'Skilled trader and negotiator with business acumen',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['IP +2', 'Trade Network'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Appraise': {
        level: 1,
        description: 'Determine the true value of items and situations. Never be cheated in trade.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Business Sense': {
        level: 1,
        description: 'Innate understanding of markets and economics. Identify profitable opportunities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Negotiate': {
        level: 2,
        description: 'Superior bargaining and persuasion skills. Get better deals and prices.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Network Contacts': {
        level: 2,
        description: 'Extensive network of business contacts. Access to information and favors.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Currency Exchange': {
        level: 3,
        description: 'Expert knowledge of various currencies and exchange rates.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Fast Talk': {
        level: 3,
        description: 'Confuse and mislead through rapid, persuasive speech.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 1
      },
      'Trade Routes': {
        level: 4,
        description: 'Access to rare goods and information through established trade routes.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Investment': {
        level: 4,
        description: 'Invest resources for long-term gains. Generate passive income.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Price Manipulation': {
        level: 5,
        description: 'Manipulate local prices through market influence.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Caravan Master': {
        level: 5,
        description: 'Organize and lead trade caravans. Manage logistics efficiently.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Economic Warfare': {
        level: 6,
        description: 'Wage war through economic means. Destroy enemies financially.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Guild Connections': {
        level: 6,
        description: 'High-level connections with merchant guilds and organizations.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Market Domination': {
        level: 8,
        description: 'Control local markets and trade. Set prices and control supply.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Merchant Prince': {
        level: 8,
        description: 'Achieve noble status through wealth and influence.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Economic Empire': {
        level: 10,
        description: 'Build a vast economic empire that spans multiple regions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Low Fantasy Atlas'
  },

  SCHOLAR: {
    name: 'Scholar',
    description: 'Learned researcher and keeper of knowledge',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Scholarly Research'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Research': {
        level: 1,
        description: 'Gather and analyze information effectively through systematic study.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Academic Network': {
        level: 1,
        description: 'Access to libraries, universities, and fellow scholars.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Expertise': {
        level: 2,
        description: 'Deep knowledge in specialized subjects. Choose areas of expertise.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Speed Reading': {
        level: 2,
        description: 'Read and comprehend texts at supernatural speed.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Analysis': {
        level: 3,
        description: 'Analyze situations, objects, and phenomena with scholarly precision.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Teaching': {
        level: 3,
        description: 'Share knowledge with others. Temporarily grant skills to allies.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Ancient Knowledge': {
        level: 4,
        description: 'Access to forgotten lore and secrets from ancient times.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Translation': {
        level: 4,
        description: 'Understand and translate ancient and foreign languages.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Thesis': {
        level: 5,
        description: 'Develop revolutionary theories that change understanding.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Cross-Reference': {
        level: 5,
        description: 'Connect disparate pieces of information to reveal hidden truths.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Forbidden Knowledge': {
        level: 6,
        description: 'Access dangerous and forbidden information.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 1
      },
      'Scientific Method': {
        level: 6,
        description: 'Apply rigorous scientific principles to all investigations.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Master Scholar': {
        level: 8,
        description: 'Achieve mastery in multiple fields of study.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Scholarly Authority': {
        level: 8,
        description: 'Recognized as the ultimate authority in your field.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Universal Knowledge': {
        level: 10,
        description: 'Access to all knowledge that exists or has ever existed.',
        type: 'active',
        cost: '50 MP',
        maxTimes: 1
      }
    },
    source: 'Low Fantasy Atlas'
  },

  PEASANT: {
    name: 'Peasant',
    description: 'Hardy commoner with practical skills and resilience',
    primaryAttributes: ['might', 'willpower'],
    freeBenefits: ['HP +5', 'Common Sense'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Hard Work': {
        level: 1,
        description: 'Tireless dedication to tasks. Gain bonuses to extended activities.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Common Sense': {
        level: 1,
        description: 'Practical wisdom and good judgment. Avoid obvious traps and dangers.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Survival Instinct': {
        level: 2,
        description: 'Natural ability to survive harsh conditions. Resist environmental hazards.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Tool Mastery': {
        level: 2,
        description: 'Expert use of simple tools and implements. Improvise tools when needed.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Stubborn Determination': {
        level: 3,
        description: 'Refuse to give up or be deterred. Resist mental effects.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Community Bonds': {
        level: 3,
        description: 'Strong connections with common folk. Gain aid from ordinary people.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Folk Wisdom': {
        level: 4,
        description: 'Practical knowledge and common sense passed down through generations.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Honest Work': {
        level: 4,
        description: 'Gain respect and trust through honest labor. People trust you.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Endurance': {
        level: 5,
        description: 'Exceptional stamina and endurance. Continue when others would collapse.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Salt of the Earth': {
        level: 5,
        description: 'Represent the best of common humanity. Inspire others through example.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 1
      },
      'Humble Heroism': {
        level: 6,
        description: 'Perform heroic acts without seeking glory. Gain bonuses to noble actions.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Against All Odds': {
        level: 6,
        description: 'Gain bonuses when facing impossible situations. Thrive under pressure.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Heroic Determination': {
        level: 8,
        description: 'Extraordinary willpower in dire situations. Never give up hope.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 1
      },
      'Champion of the People': {
        level: 8,
        description: 'Become a champion of common folk. Gain massive bonuses when protecting others.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Legendary Peasant': {
        level: 10,
        description: 'Prove that heroes can come from anywhere. Achieve legendary status.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Low Fantasy Atlas'
  }
};

// Bond System - Relationships between characters
export const BOND_TYPES = {
  ADMIRATION: {
    name: 'Admiration',
    description: 'You look up to this person and want to be like them.',
    emotions: ['Respect', 'Inspiration', 'Awe'],
    mechanics: 'Gain bonuses when acting to impress or please this person'
  },
  INFERIORITY: {
    name: 'Inferiority',
    description: 'You feel inferior to this person and want to prove yourself.',
    emotions: ['Inadequacy', 'Jealousy', 'Determination'],
    mechanics: 'Gain bonuses when competing with or trying to surpass this person'
  },
  MISTRUST: {
    name: 'Mistrust',
    description: 'You do not trust this person and are wary of their motives.',
    emotions: ['Suspicion', 'Caution', 'Wariness'],
    mechanics: 'Gain bonuses when acting against or investigating this person'
  },
  LOYALTY: {
    name: 'Loyalty',
    description: 'You are devoted to this person and will support them.',
    emotions: ['Dedication', 'Faithfulness', 'Devotion'],
    mechanics: 'Gain bonuses when protecting or helping this person'
  },
  HATRED: {
    name: 'Hatred',
    description: 'You despise this person and want to see them fail.',
    emotions: ['Anger', 'Resentment', 'Fury'],
    mechanics: 'Gain bonuses when acting to harm or oppose this person'
  },
  LOVE: {
    name: 'Love',
    description: 'You care deeply for this person and want them to be happy.',
    emotions: ['Affection', 'Tenderness', 'Compassion'],
    mechanics: 'Gain bonuses when acting to support or comfort this person'
  }
};

// Status Effects System
export const STATUS_EFFECTS = {
  // Positive Effects
  BLESSED: {
    name: 'Blessed',
    type: 'positive',
    description: 'Divine favor grants bonuses to all actions.',
    duration: 'scene',
    effects: { accuracy: '+1', damage: '+2', resistance: '+1' }
  },
  HASTE: {
    name: 'Haste',
    type: 'positive',
    description: 'Increased speed allows for extra actions.',
    duration: 'scene',
    effects: { actions: '+1', dodge: '+2' }
  },
  REGENERATION: {
    name: 'Regeneration',
    type: 'positive',
    description: 'Slowly recover HP over time.',
    duration: 'scene',
    effects: { hp_regen: '5 per turn' }
  },
  
  // Negative Effects
  CURSED: {
    name: 'Cursed',
    type: 'negative',
    description: 'Dark magic causes penalties to all actions.',
    duration: 'scene',
    effects: { accuracy: '-1', damage: '-2', resistance: '-1' }
  },
  POISONED: {
    name: 'Poisoned',
    type: 'negative',
    description: 'Toxins cause ongoing damage.',
    duration: 'scene',
    effects: { hp_damage: '3 per turn' }
  },
  PARALYZED: {
    name: 'Paralyzed',
    type: 'negative',
    description: 'Unable to take actions.',
    duration: '3 turns',
    effects: { actions: 'none' }
  },
  CONFUSED: {
    name: 'Confused',
    type: 'negative',
    description: 'May act randomly or attack allies.',
    duration: 'scene',
    effects: { control: 'random' }
  },
  FRIGHTENED: {
    name: 'Frightened',
    type: 'negative',
    description: 'Fear causes penalties and may cause fleeing.',
    duration: 'scene',
    effects: { accuracy: '-2', damage: '-1', may_flee: true }
  }
};

// Fabula Points System
export const FABULA_POINTS = {
  starting_points: 5,
  max_points: 10,
  uses: {
    REROLL: {
      name: 'Reroll',
      cost: 1,
      description: 'Reroll any die roll you just made.',
      timing: 'after roll'
    },
    INVOKE_TRAIT: {
      name: 'Invoke Trait',
      cost: 1,
      description: 'Gain a bonus die by invoking a character trait.',
      timing: 'before roll'
    },
    EXTRA_ACTION: {
      name: 'Extra Action',
      cost: 2,
      description: 'Take an additional action on your turn.',
      timing: 'during turn'
    },
    NARRATIVE_CONTROL: {
      name: 'Narrative Control',
      cost: 3,
      description: 'Add a minor detail to the scene or story.',
      timing: 'any time'
    },
    DRAMATIC_MOMENT: {
      name: 'Dramatic Moment',
      cost: 5,
      description: 'Create a dramatic moment that significantly affects the story.',
      timing: 'any time'
    }
  },
  gaining_points: [
    'When you fail a roll dramatically',
    'When you act according to your traits in a way that creates complications',
    'When you sacrifice something important for the greater good',
    'At the end of each session',
    'When the GM awards them for good roleplay'
  ]
};

// Equipment Categories
export const EQUIPMENT_CATEGORIES = {
  WEAPONS: {
    BASIC_MELEE: {
      name: 'Basic Melee Weapons',
      examples: ['Dagger', 'Club', 'Spear', 'Sword'],
      damage: 'HR + 5',
      accuracy: '+0',
      cost: '100 zenit'
    },
    MARTIAL_MELEE: {
      name: 'Martial Melee Weapons',
      examples: ['Katana', 'Warhammer', 'Greatsword', 'Halberd'],
      damage: 'HR + 10',
      accuracy: '+1',
      cost: '300 zenit'
    },
    BASIC_RANGED: {
      name: 'Basic Ranged Weapons',
      examples: ['Bow', 'Crossbow', 'Sling', 'Javelin'],
      damage: 'HR + 5',
      accuracy: '+0',
      cost: '150 zenit'
    },
    MARTIAL_RANGED: {
      name: 'Martial Ranged Weapons',
      examples: ['Longbow', 'Firearm', 'Crossbow Expert', 'Composite Bow'],
      damage: 'HR + 10',
      accuracy: '+1',
      cost: '400 zenit'
    }
  },
  ARMOR: {
    BASIC: {
      name: 'Basic Armor',
      examples: ['Leather Armor', 'Chain Mail', 'Hide Armor'],
      defense: '+2',
      magic_defense: '+0',
      cost: '200 zenit'
    },
    MARTIAL: {
      name: 'Martial Armor',
      examples: ['Plate Armor', 'Scale Mail', 'Reinforced Leather'],
      defense: '+3',
      magic_defense: '+1',
      cost: '500 zenit'
    }
  },
  SHIELDS: {
    BASIC: {
      name: 'Basic Shield',
      defense: '+2',
      magic_defense: '+2',
      cost: '100 zenit'
    },
    MARTIAL: {
      name: 'Martial Shield',
      defense: '+3',
      magic_defense: '+3',
      cost: '250 zenit'
    }
  }
};

// Damage Types and Resistances
export const DAMAGE_TYPES = {
  PHYSICAL: {
    name: 'Physical',
    description: 'Damage from weapons, claws, and physical attacks.',
    common_resistances: ['Armor', 'Tough skin', 'Incorporeal']
  },
  AIR: {
    name: 'Air',
    description: 'Wind and lightning-based attacks.',
    common_resistances: ['Grounded', 'Insulation', 'Storm resistance']
  },
  BOLT: {
    name: 'Bolt',
    description: 'Lightning and electrical attacks.',
    common_resistances: ['Rubber', 'Grounding', 'Electrical immunity']
  },
  DARK: {
    name: 'Dark',
    description: 'Shadow and negative energy attacks.',
    common_resistances: ['Holy protection', 'Light magic', 'Positive energy']
  },
  EARTH: {
    name: 'Earth',
    description: 'Stone and earth-based attacks.',
    common_resistances: ['Flying', 'Intangible', 'Earth immunity']
  },
  FIRE: {
    name: 'Fire',
    description: 'Heat and flame-based attacks.',
    common_resistances: ['Fire immunity', 'Cold resistance', 'Wet conditions']
  },
  ICE: {
    name: 'Ice',
    description: 'Cold and frost-based attacks.',
    common_resistances: ['Cold immunity', 'Fire resistance', 'Warm conditions']
  },
  LIGHT: {
    name: 'Light',
    description: 'Holy and radiant energy attacks.',
    common_resistances: ['Dark protection', 'Shadow magic', 'Negative energy']
  },
  POISON: {
    name: 'Poison',
    description: 'Toxic and venomous attacks.',
    common_resistances: ['Poison immunity', 'Antidotes', 'Undead']
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
  EQUIPMENT_CATEGORIES,
  STATUS_EFFECTS,
  DAMAGE_TYPES,
  DEFAULT_CHARACTER,
  CHARACTER_CREATION_RULES
};