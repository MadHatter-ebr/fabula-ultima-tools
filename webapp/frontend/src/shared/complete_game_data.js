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
    description: 'A scholar of magic who forms bonds with powerful spirits called Arcana',
    primaryAttributes: ['willpower'],
    freeBenefits: ['HP or MP +5', 'Bind and Summon Arcana'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      // NORMAL SKILLS
      'Bind and Summon': {
        level: 1,
        description: 'You may bind Arcana to your soul and summon them later. The Game Master will tell you the details of each binding process when you first encounter the Arcanum in question. You may use an action and spend 40 Mind Points to summon an Arcanum you have bound: the details of this process are explained on the next page. If you take this Skill at character creation, you begin play with one Arcanum of your choice already bound to you, chosen from the list on the next pages. Other than that, you may only obtain new Arcana through exploration and story progression.',
        type: 'active',
        cost: '40 MP',
        maxTimes: 1
      },
      'Ritual Arcanism': {
        level: 1,
        description: 'You may perform Rituals of the Arcanism discipline, as long as their effects fall within the domains of one or more Arcana you have bound (see next pages). Arcanism Rituals use 【WLP + WLP】 for the Magic Check',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Arcane Circle': {
        level: 4,
        description: 'After you willingly dismiss an Arcanum on your turn during a conflict (see next page), if that Arcanum had not been summoned during this same turn and you have an arcane weapon equipped, you may immediately perform the Spell action for free. The spell you cast this way must have a total Mind Point cost of 【SL × 5】 or lower (you must still pay the spell\'s MP cost).',
        type: 'active',
        cost: 'Free after dismissal',
        maxTimes: 4
      },
      'Arcane Regeneration': {
        level: 2,
        description: 'When you summon an Arcanum, you immediately recover 【SL × 5】 Hit Points.',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Emergency Arcanum': {
        level: 6,
        description: 'As long as you are in Crisis, the cost for summoning your Arcana is reduced by 【SL × 5】 Mind Points.',
        type: 'passive',
        cost: 'None',
        maxTimes: 6
      },
    },
    specialRules: {
      title: 'Arcana System',
      description: 'Arcanists work with powerful magical entities called Arcana. Each Arcana has its own level, abilities, and characteristics.',
      characterSheetRules: {
        displayCondition: 'character_has_arcanist_level >= 1',
        sections: [
          {
            title: 'THE ARCANA',
            type: 'dropdown',
            content: 'General information about the Arcana system and how it works with the Arcanist class.'
          },
          {
            title: 'MERGING WITH AN ARCANUM',
            type: 'dropdown',
            content: 'When you summon an Arcanum, you gain its merge benefits; those benefits last until the Arcanum is dismissed (see below). You cannot summon an Arcanum while already merged with one; you must first dismiss the current Arcanum.'
          },
          {
            title: 'DISMISSING AN ARCANUM',
            type: 'dropdown',
            content: 'An Arcanum can be dismissed in several ways: - Once the current scene ends, all Arcana are automatically dismissed. - If you die or fall unconscious while merged with an Arcanum, they are dismissed. - If you leave the scene while merged with an Arcanum, they are dismissed. - You may willingly dismiss your Arcanum: this does not require an action, but during a conflict it can only be done on your turn, before or after an action.'
          },
          {
            title: 'DISMISS EFFECTS',
            type: 'dropdown',
            content: 'Most Arcana have a powerful dismiss effect, which may only be activated when you willingly dismiss the Arcanum as described above — if the Arcanum is dismissed for any other reason, the dismiss effect cannot be triggered. If the dismiss effect of an Arcanum deals damage, it will deal 10 extra damage if you are level 20 or higher, or 20 extra damage if you are level 40 or higher. You are also free to ignore the dismiss effect if you don\'t want to use it.'
          },
          {
            title: 'DOMAINS',
            type: 'dropdown',
            content: 'Each Arcanum is associated with a few key concepts or domains. The Game Master should use these to establish the trials needed to bind the Arcanum, and to adjudicate Rituals performed through the Ritual Arcanism Skill. If you create new Arcana for your world, make sure to associate them with domains that allow for interesting Rituals'
          }
        ]
      },
      arcanaSelection: {
        displayCondition: 'character_has_arcanist_level >= 1',
        claimArcanaButton: {
          title: 'Claim Arcana',
          type: 'large_plus_button',
          action: 'open_arcana_selection_popup',
          description: 'Select an Arcanum to bind to your character'
        },
        availableArcana: {
          'CUSTOM_ARCANUM': {
            name: 'Custom Arcanum',
            type: 'custom_creation',
            description: 'Create your own unique Arcanum with custom domains, merge benefits, and dismiss effects.',
            creationForm: {
              name: { label: 'Arcanum Name', type: 'text', required: true, maxLength: 50 },
              domains: { label: 'Domains (choose 2-4)', type: 'multiselect', minSelections: 2, maxSelections: 4, allowCustom: true },
              mergeBenefits: { label: 'Merge Benefits (1-3)', type: 'textarea_list', minEntries: 1, maxEntries: 3 },
              dismissEffect: { label: 'Dismiss Effect', type: 'complex_form', required: true },
              gmApproval: { label: 'GM Approval Required', type: 'checkbox', checked: true, disabled: true }
            }
          },
          'ARCANUM_OF_THE_FORGE': {
            name: 'Arcanum of the Forge',
            domains: ['fire', 'heat', 'metal'],
            mergeBenefits: [
              'You have Resistance to fire damage.',
              'Any fire damage you deal ignores Resistances.'
            ],
            dismissEffect: {
              name: 'Forge or Inferno',
              description: 'When you dismiss this Arcanum, choose Forge or Inferno:',
              options: [
                { name: 'Forge', effect: 'You create a basic armor, shield or weapon of your choice. If you select this option again, the previously created item vanishes. If you create a weapon this way, it deals fire damage instead of physical.' },
                { name: 'Inferno', effect: 'Choose any number of creatures you can see: each of them suffers 30 fire damage. This damage ignores Resistances.' }
              ]
            }
          },
          'ARCANUM_OF_THE_FROST': {
            name: 'Arcanum of the Frost',
            domains: ['cold', 'ice', 'silence'],
            mergeBenefits: [
              'You have Resistance to ice damage and are immune to enraged.',
              'Any ice damage you deal ignores Resistances.'
            ],
            dismissEffect: {
              name: 'Ice Age',
              description: 'Choose any number of creatures you can see: each of them suffers 30 ice damage. This damage ignores Resistances.'
            }
          },
          'ARCANUM_OF_THE_GATE': {
            name: 'Arcanum of the Gate',
            domains: ['space', 'travel', 'void'],
            mergeBenefits: [
              'You have Resistance to dark damage.',
              'You gain a +1 bonus to your Magic Defense.'
            ],
            dismissEffect: {
              name: 'Oblivion or Warp',
              description: 'When you dismiss this Arcanum, choose Oblivion or Warp:',
              options: [
                { name: 'Oblivion', effect: 'Choose any number of creatures you can see: each of them suffers 30 dark damage. This damage ignores Resistances.' },
                { name: 'Warp', effect: 'You teleport yourself and up to five other nearby willing creatures to a location you previously visited, if that location is within 1 travel day.' }
              ]
            }
          },
          'ARCANUM_OF_THE_GRIMOIRE': {
            name: 'Arcanum of the Grimoire',
            domains: ['knowledge', 'revelations', 'understanding'],
            mergeBenefits: [
              'You are able to read, write, speak and understand all languages.',
              'You treat your Insight as if it were one die size higher (up to a maximum of d12).'
            ],
            dismissEffect: {
              name: 'Oracle',
              description: 'You ask the Game Master a single question. The Game Master must answer truthfully, describing the vision shown to you by the Grimoire. Once used, this dismiss effect will not be available until the next dawn. Furthermore, the same question may never be asked more than once. The Game Master has final say on which questions are too similar to be asked again.'
            }
          },
          'ARCANUM_OF_THE_OAK': {
            name: 'Arcanum of the Oak',
            domains: ['earth', 'plants', 'poison'],
            mergeBenefits: [
              'You have Resistance to earth and poison damage and are immune to poisoned.',
              'Whenever you recover Hit Points, you recover 5 extra Hit Points.'
            ],
            dismissEffect: {
              name: 'Blossom',
              description: 'Choose any number of creatures you can see (you may also choose yourself): each of them recovers from the poisoned status effect and recovers 40 Hit Points. This amount increases to 50 Hit Points if you are level 20 or higher, or to 60 Hit Points if you are level 40 or higher.'
            }
          },
          'ARCANUM_OF_THE_SKY': {
            name: 'Arcanum of the Sky',
            domains: ['fog', 'rain', 'storms'],
            mergeBenefits: [
              'You have Resistance to air and bolt damage.',
              'You may use an action to accurately predict weather conditions for the next day within a range of two travel days — the Game Master will tell you what the weather conditions will be.'
            ],
            dismissEffect: {
              name: 'Thunderstorm',
              description: 'Choose any number of creatures you can see: each of them suffers 30 bolt damage. This damage ignores Resistances.'
            }
          },
          'ARCANUM_OF_THE_SWORD': {
            name: 'Arcanum of the Sword',
            domains: ['conquest', 'heroism', 'leadership'],
            mergeBenefits: [
              'Your attacks deal 5 extra damage, and all damage dealt by your attacks is treated as having no type (thus being unaffected by damage Affinities). Damage dealt by your attacks cannot gain a type as long as you are merged with this Arcanum.'
            ],
            dismissEffect: {
              name: 'Multi-Attack',
              description: 'When you perform an attack, you may have that attack gain the multi (any number of targets) property. If you do, this Arcanum will be automatically dismissed after the attack is resolved (this is not considered a willing dismiss).'
            }
          },
          'ARCANUM_OF_THE_TOWER': {
            name: 'Arcanum of the Tower',
            domains: ['judgment', 'protection', 'sacrifice'],
            mergeBenefits: [
              'When you summon this Arcanum, choose a damage type: air, bolt, dark, earth, fire, or ice. Until this Arcanum is dismissed, each of your allies present on the scene has Resistance to the chosen damage type (you do not gain this Resistance).'
            ],
            dismissEffect: {
              name: 'Judgment',
              description: 'Choose any number of creatures you can see: each of them suffers 30 light damage. This damage ignores Resistances.'
            }
          },
          'ARCANUM_OF_THE_WHEEL': {
            name: 'Arcanum of the Wheel',
            domains: ['destiny', 'speed', 'time'],
            mergeBenefits: [
              'You are immune to slow.',
              'You gain a +1 bonus to your Defense.'
            ],
            dismissEffect: {
              name: 'Time Freeze',
              description: 'Choose any number of creatures you can see: each of them suffers slow. If a creature chosen this way is already slow, that creature will instead perform one fewer action during their next turn (to a minimum of 0 actions).'
            }
          }
        }
      }
    },
    source: 'Core Rules'
  },

  DARKBLADE: {
    name: 'Darkblade',
    description: 'Warriors who embrace darkness and pain, channeling their suffering into power',
    primaryAttributes: ['dexterity', 'willpower'],
    freeBenefits: ['Martial armor', 'Martial melee OR ranged weapons'],
    equipmentProficiencies: ['Martial armor', 'Martial weapons'],
    abilities: {
      'Agony': {
        level: 5,
        description: 'After you deal damage to one or more creatures, if you have a Bond towards at least one of those creatures, you may recover 【SL × 2】 Hit Points and 【SL × 2】 Mind Points.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Dark Blood': {
        level: 1,
        description: 'As long as you are in Crisis, you have Resistance to dark damage and poison damage.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Heart of Darkness': {
        level: 1,
        description: 'Once per scene upon entering Crisis, you may choose a specific creature you can see that you don\'t have a Bond towards. If you do, create a Bond of hatred towards that creature.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Painful Lesson': {
        level: 3,
        description: 'After another creature causes you to lose Hit Points (with an attack, a spell or any other method), you may immediately perform the Study action on that creature for free. If you do, gain a bonus equal to 【SL】 to your Check. Remember, you can study the same aspect of a creature only once.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Shadow Strike': {
        level: 5,
        description: 'You have learned to channel your vital force into your attacks. You may use an action to perform a Shadow Strike: roll your current Might die and lose an amount of Hit Points equal to 【the number rolled on your Might die】. If this didn\'t reduce your Hit Points to 0, you may perform a free attack with a weapon you have equipped: if this attack hits one or more targets, it deals extra damage equal to 【SL + the number rolled on your Might die】. However, all damage dealt by this attack becomes dark and its damage type cannot be changed.',
        type: 'Active',
        cost: 'HP sacrifice',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  ELEMENTALIST: {
    name: 'Elementalist',
    description: 'Scholars of elemental magic who combine arcane knowledge with elemental power',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Ritualism'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Cataclysm': {
        level: 5,
        description: 'When you cast an instantaneous spell, if you have an arcane weapon equipped, you may increase the spell\'s total MP cost by up to 【SL × 10】 Mind Points to have it deal an additional 【SL × 5】 damage.',
        type: 'active',
        cost: 'Variable MP increase',
        maxTimes: 5
      },
      'Elemental Magic': {
        level: 10,
        description: 'You may learn and cast spells from any of these types: earth, air, fire, water, ice, or bolt. Each time you take this Skill, you learn one spell from the Elementalist spell list.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 10,
        requiresSpellSelection: true,
        spellList: 'ELEMENTALIST_SPELLS'
      },
      'Magical Artillery': {
        level: 5,
        description: 'When you cast a spell of the earth, air, fire, water, ice, or bolt type that targets only you, you may change its target to "One enemy you can see" instead.',
        type: 'active',
        cost: 'None',
        maxTimes: 5
      },
      'Ritual Elementalism': {
        level: 1,
        description: 'You may perform Rituals whose effects fall within the Ritualism discipline.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Spellblade': {
        level: 5,
        description: 'When you deal damage with a weapon attack, you may spend 10 Mind Points to have the attack deal an additional 【SL × 5】 damage. Choose a damage type when you take this Skill: air, bolt, earth, fire, ice, or water.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 5
      }
    },
    source: 'Core Rules'
  },

  ENTROPIST: {
    name: 'Entropist',
    description: 'Masters of time, chaos, and entropy magic',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Ritualism'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Absorb MP': {
        level: 5,
        description: 'After you suffer damage, you may immediately recover 【SL × 2】 Mind Points.',
        type: 'reaction',
        cost: 'None',
        maxTimes: 5
      },
      'Entropic Magic': {
        level: 10,
        description: 'Each time you acquire this Skill, learn one Entropist spell. Offensive (rr) Entropist spells use 【INS + WLP】 for the Magic Check.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 10,
        requiresSpellSelection: true,
        spellList: 'ENTROPIST_SPELLS'
      },
      'Lucky Seven': {
        level: 1,
        description: 'You have a lucky number; at the beginning of each session, that number is 7. Once per scene after you perform a Check, you may replace the value shown on one of the dice you rolled with your lucky number (even if this would give an impossible Result, such as a value of 7 on a d6). If you do, the replaced value becomes your new lucky number.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Ritual Entropism': {
        level: 1,
        description: 'You may perform Rituals whose effects fall within the Entropism discipline. Entropism Rituals use 【INS + WLP】 for the Magic Check.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Stolen Time': {
        level: 4,
        description: 'During a conflict, you may use an action to interfere with the flow of time by spending up to 【SL × 5】 Mind Points. For every 5 Mind Points you spend this way, choose one option: one creature you can see suffers slow; or one creature you can see recovers from slow; or one creature you can see may immediately perform the Equipment action for free; or choose one ally you can see who has yet to take a turn during this round: that ally may take their turn immediately after yours during this round. Each option can only be chosen once per use of this Skill.',
        type: 'active',
        cost: 'Up to SL × 5 MP',
        maxTimes: 4
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
    description: 'Warriors who channel primal rage and unbridled fury in combat',
    primaryAttributes: ['might', 'willpower'],
    freeBenefits: ['HP +5', 'Martial melee weapons and martial armor'],
    equipmentProficiencies: ['Martial melee weapons', 'Martial armor'],
    abilities: {
      'Adrenaline': {
        level: 5,
        description: 'As long as you are in Crisis, you deal 【SL × 2】 extra damage (be it with attacks, spells, Arcana, items or any other method).',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Frenzy': {
        level: 1,
        description: 'Your Accuracy Checks with brawling, dagger, flail and thrown weapons trigger a critical success if both dice show the same number (and the Check is not a fumble).',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Indomitable Spirit': {
        level: 4,
        description: 'When you spend one or more Fabula Points, you get an additional benefit — choose one option: you recover 【SL × 5】 Hit Points; or you recover 【SL × 5】 Mind Points; or you recover from a single status effect of your choice.',
        type: 'passive',
        cost: 'None',
        maxTimes: 4
      },
      'Provoke': {
        level: 5,
        description: 'You may use an action and spend 5 Mind Points to perform an Opposed 【MIG + WLP】 Check against a creature you can see — describe how you taunt them! If you succeed, the target suffers enraged and is compelled to focus their attention on you (their attacks and offensive spells must include you among the targets if possible). This compulsion ends if you fall unconscious or leave the scene, if the creature is no longer enraged, or if they are successfully provoked by someone else. You gain a bonus equal to 【SL】 to your 【MIG + WLP】 Checks for this Skill.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 5
      },
      'Withstand': {
        level: 5,
        description: 'When you perform the Guard action, if you choose not to provide cover to another creature, you recover Hit Points equal to 【SL, multiplied by the highest strength among your Bonds】 and choose Might or Willpower: you treat the chosen Attribute as being one die size higher (up to a maximum of d12) until the end of your next turn.',
        type: 'active',
        cost: 'None',
        maxTimes: 5
      }
    },
    source: 'Core Rules'
  },

  GUARDIAN: {
    name: 'Guardian',
    description: 'Stalwart protectors who shield their allies from harm',
    primaryAttributes: ['might'],
    freeBenefits: ['HP +5', 'Martial armor and martial shields'],
    equipmentProficiencies: ['Martial armor', 'Martial shields'],
    abilities: {
      'Bodyguard': {
        level: 1,
        description: 'If you perform the Guard action and choose to provide cover to another creature, that creature gains Resistance to all damage types until the start of your next turn.',
        type: 'active',
        cost: 'None',
        maxTimes: 1
      },
      'Defensive Mastery': {
        level: 5,
        description: 'As long as you have a shield or a martial armor equipped, all damage you suffer is reduced by 【SL】 (applied before damage Affinities).',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Dual Shieldbearer': {
        level: 1,
        description: 'You may now equip a shield in your main hand slot. As long as you have two shields equipped, you gain the benefits of both items and may treat them as the following combined two-handed melee brawling weapon: Twin Shields 【MIG + MIG】 【HR + 5】 physical. Deals extra damage equal to your 【SL】 in defensive mastery (above).',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Fortress': {
        level: 5,
        description: 'Permanently increase your maximum Hit Points by 【SL × 3】.',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Protect': {
        level: 1,
        description: 'When another creature is threatened by an attack, spell or other danger, you may take their place (any Checks that are part of the danger will be performed against you; you may declare the use of this Skill before or after the Checks have been made). If the danger already affected you, it affects you twice (resolve both instances separately); you also cannot protect multiple creatures from the same danger. If you use this Skill during a conflict, you cannot use it again until the start of your next turn.',
        type: 'reaction',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  LOREMASTER: {
    name: 'Loremaster',
    description: 'Scholars and investigators who uncover secrets through knowledge and deduction',
    primaryAttributes: ['insight'],
    freeBenefits: ['MP +5'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Flash of Insight': {
        level: 3,
        description: 'When you roll a 13 or higher on a Check performed to investigate a creature, item or location — this includes using the Study action during a conflict — you may ask the Game Master up to 【SL】 questions concerning the subject of your investigation. You may ask these questions immediately or save them for later; whenever you ask one of these questions, the Game Master will answer truthfully and you will describe your character\'s deductive process. This Skill may only be used once on the same creature, item or location.',
        type: 'passive',
        cost: 'None',
        maxTimes: 3
      },
      'Focused': {
        level: 5,
        description: 'Permanently increase your maximum Mind Points by 【SL × 3】. When you perform an Open Check using 【INS + INS】, you gain a bonus equal to 【SL】 on that Check (this only applies to Open Checks).',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Knowledge is Power': {
        level: 1,
        description: 'When you perform an Accuracy Check, you may replace one of the Attribute dice with Insight (such as 【INS + INS】 for a pistol or 【INS + MIG】 for a waraxe).',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Quick Assessment': {
        level: 6,
        description: 'At the start of a conflict, you may spend up to 【SL × 5】 Mind Points. For every 5 Mind Points you spend this way, choose one option: choose a creature you can see and the GM reveals one of their Traits; or name a damage type and choose a creature you can see, and the GM reveals that creature\'s Affinity towards that damage type.',
        type: 'active',
        cost: 'Up to SL × 5 MP',
        maxTimes: 6
      },
      'Trained Memory': {
        level: 1,
        description: 'You may perfectly recall the details of any scene you have visited within the past week. You can "go back in time" within your mind in order to examine and investigate such scenes again — your Flash of Insight Skill will apply to these memories as well.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  ORATOR: {
    name: 'Orator',
    description: 'Masters of speech, persuasion, and social manipulation',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Condemn': {
        level: 4,
        description: 'You may use an action and spend 5 Mind Points to perform an Opposed 【INS + WLP】 Check against a creature that can hear and understand you — describe your accusations! If you succeed, the target loses 【SL × 10】 Mind Points and suffers dazed or shaken (your choice). You gain a bonus equal to 【SL】 to your 【INS + WLP】 Checks for this Skill.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 4
      },
      'Encourage': {
        level: 6,
        description: 'During a conflict, you may use an action and spend 5 Mind Points to choose another creature that can hear and understand you. That creature recovers 【SL × 5】 Hit Points and chooses Dexterity, Insight, Might, or Willpower: they treat the chosen Attribute as being one die size higher (up to a maximum of d12) until the start of your next turn.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 6
      },
      'My Trust in You': {
        level: 2,
        description: 'After another Player Character who is able to hear you performs a Check, you may spend 1 Fabula Point and invoke one of their Traits or Bonds in order to let them reroll dice or improve the Result of the Check (following the normal rules). Then, if you have a Bond towards that character, they recover 【SL × 10】 Mind Points.',
        type: 'reaction',
        cost: '1 Fabula Point',
        maxTimes: 2
      },
      'Persuasive': {
        level: 2,
        description: 'When you successfully perform a Check to fill or erase sections of a Clock, if your approach relied on charm, diplomacy, deception or intimidation, you may spend up to 【SL × 20】 Mind Points. If you do, fill or erase an additional section of that Clock for every 20 Mind Points you spend this way.',
        type: 'passive',
        cost: 'Variable MP',
        maxTimes: 2
      },
      'Unexpected Ally': {
        level: 1,
        description: 'You may use an action and spend 1 Fabula Point to choose a non-hostile creature able to hear and understand you. If you do, that creature becomes helpful towards you so long as you are kind and respectful to them and your requests are reasonable.',
        type: 'active',
        cost: '1 Fabula Point',
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
    description: 'Stealthy thieves and opportunists who excel at hit-and-run tactics',
    primaryAttributes: ['dexterity'],
    freeBenefits: ['IP +2'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Cheap Shot': {
        level: 5,
        description: 'When you hit a creature with an attack, if the attack only targeted that creature and they are suffering from one or more status effects, you may have it deal extra damage equal to 【SL + the number of status effects on the creature】.',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Dodge': {
        level: 3,
        description: 'As long as you have no shields and no martial armor equipped, your Defense score is increased by 【SL】.',
        type: 'passive',
        cost: 'None',
        maxTimes: 3
      },
      'High Speed': {
        level: 3,
        description: 'At the start of a conflict, you may spend 10 Mind Points. If you do, choose one option and apply it before the start of the first round: perform a free attack with a weapon you have equipped; or perform a Hinder or Objective action. You also gain a bonus equal to 【SL】 to all Checks you perform as part of the chosen option.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 3
      },
      'See You Later': {
        level: 1,
        description: 'You may use an action and spend 1 Fabula Point to vanish from the current scene, reappearing whenever you want during a different scene in which another Player Character is present. Describe how you escaped and miraculously got here!',
        type: 'active',
        cost: '1 Fabula Point',
        maxTimes: 1
      },
      'Soul Steal': {
        level: 5,
        description: 'You may use an action to perform a 【DEX + WLP】 Check against the Magic Defense of a creature you can see. If you succeed and the target is a soldier, you recover 【SL】 Inventory Points; if they are an elite or champion, the GM gives you the target\'s soul treasure, an item worth an amount of zenit equal to or lower than 【the target\'s level multiplied by 30, or by 50 if they are a Villain】. This soul treasure will appear inside your backpack; a creature can be successfully stolen from with this Skill only once. You gain a bonus equal to 【SL】 to your 【DEX + WLP】 Checks for this Skill.',
        type: 'active',
        cost: 'None',
        maxTimes: 5
      }
    },
    source: 'Core Rules'
  },

  SHARPSHOOTER: {
    name: 'Sharpshooter',
    description: 'Expert marksmen specializing in ranged combat and precision shooting',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['HP +5', 'Martial ranged weapons and martial shields'],
    equipmentProficiencies: ['Martial ranged weapons', 'Martial shields'],
    abilities: {
      'Barrage': {
        level: 1,
        description: 'When you perform a ranged attack, you may spend 10 Mind Points to choose one option: the attack gains multi (2); or you increase the attack\'s multi property by one, up to a maximum of multi (3).',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Crossfire': {
        level: 1,
        description: 'After a creature you can see performs a ranged attack, you may spend an amount of Mind Points equal to the total Result of their Accuracy Check in order to have the attack fail automatically against all targets. You can only use this Skill if you have a ranged weapon equipped, and it has no effect if the Accuracy Check was a critical success.',
        type: 'reaction',
        cost: 'Variable MP',
        maxTimes: 1
      },
      'Hawkeye': {
        level: 5,
        description: 'When you perform the Guard action, if you choose not to provide cover to another creature, you may choose one option: the next ranged attack you perform before the end of the current scene will deal 【SL × 2】 extra damage; or you may immediately perform a free attack with a bow or firearm you have equipped, treating your High Roll (HR) as 0 when calculating damage dealt by this attack.',
        type: 'active',
        cost: 'None',
        maxTimes: 5
      },
      'Ranged Weapon Mastery': {
        level: 4,
        description: 'You gain a bonus equal to 【SL】 to all Accuracy Checks with ranged weapons.',
        type: 'passive',
        cost: 'None',
        maxTimes: 4
      },
      'Warning Shot': {
        level: 4,
        description: 'When you hit one or more targets with a ranged attack that would deal damage, you may have the attack deal no damage. If you do, choose one option: inflict shaken on each target hit by the attack; or inflict slow on each target hit by the attack; or each target hit by the attack loses 【SL × 10】 Mind Points. Describe your maneuver!',
        type: 'active',
        cost: 'None',
        maxTimes: 4
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
      'Healing Power': {
        level: 2,
        description: 'When you cast a spell that targets one or more allies, if you have an arcane weapon equipped, you may have each of those allies recover an amount of Hit Points equal to 【SL, multiplied by the number of Bonds you have】. This healing is separate from any healing caused by the effects of the spell.',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Ritual Spiritism': {
        level: 1,
        description: 'You may perform Rituals whose effects fall within the Spiritism discipline. Spiritism Rituals use 【INS + WLP】 for the Magic Check.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Spiritual Magic': {
        level: 10,
        description: 'Each time you acquire this Skill, learn one Spiritist spell. Offensive (rr) Spiritist spells use 【INS + WLP】 for the Magic Check.',
        type: 'spell',
        cost: 'MP varies',
        maxTimes: 10
      },
      'Support Magic': {
        level: 1,
        description: 'When you cast a spell that targets one or more allies, if you have an arcane weapon equipped, you may choose one of those allies you have a Bond towards. If you do, that ally gains a bonus to the next Check they perform during the current scene; this bonus is equal to the strength of your Bond towards them.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Vismagus': {
        level: 1,
        description: 'When you cast a spell, if you don\'t have enough Mind Points to pay for its total cost, you may choose to spend twice as many Hit Points instead. You cannot use this Skill if doing so would reduce you to 0 Hit Points. If a spell cast this way would cause you to recover Hit Points, you instead recover no Hit Points (the spell functions normally on any other target).',
        type: 'active',
        cost: 'HP varies',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  TINKERER: {
    name: 'Tinkerer',
    description: 'Inventors and gadget masters',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['IP +2', 'Projects'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Emergency Item': {
        level: 1,
        description: 'Once per conflict scene, if you are in Crisis, you may perform an additional action on your turn. This action must be the Inventory action.',
        type: 'active',
        cost: 'None',
        maxTimes: 1
      },
      'Gadgets': {
        level: 5,
        description: 'When you first acquire this Skill, choose a gadget type: alchemy, infusions or magitech (see next four pages). You gain its basic benefits. Whenever you take this Skill again, choose one option: you gain the basic benefits of a new gadget type; or you gain the advanced benefits of a gadget type whose basic benefits you already obtained; or you gain the superior benefits of a gadget type whose advanced benefits you already obtained.',
        type: 'invention',
        cost: 'IP varies',
        maxTimes: 5
      },
      'Potion Rain': {
        level: 2,
        description: 'When you create a potion that restores a single creature\'s HP and/or MP, you may have it affect up to 【SL】 additional creatures. If you do, the potion only restores half the normal amount of HP and MP to each creature.',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Secret Formula': {
        level: 5,
        description: 'When you create a potion or magisphere whose effects restore HP and/or MP, each restored amount is increased by 【SL × 5】. When you create an elemental shard, potion or magisphere that deals damage, that item deals 【SL】 extra damage.',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Visionary': {
        level: 5,
        description: 'When you work on a Project, up to 【SL × 100】 zenit of material costs are automatically paid; additionally, you generate an additional 【SL】 progress every day. If multiple characters with this Skill work on the same Project, the effects will be cumulative.',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      }
    },
    source: 'Core Rules'
  },

  WAYFARER: {
    name: 'Wayfarer',
    description: 'Explorers and wilderness survivors',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['IP +2'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Faithful Companion': {
        level: 5,
        description: 'Together with the rest of your group, design a level 5 beast, construct, elemental or plant creature that becomes your companion. This creature has no Initiative score and does not level up, can have up to two basic attacks, gains a bonus equal to 【SL】 to Accuracy Checks and Magic Checks, and their maximum Hit Points are equal to 【(SL multiplied by the companion\'s base Might die size) + half your level】. Your companion doesn\'t get a turn during conflicts, but on your turn you can use an action to have the companion perform an action (only once per turn). If you leave a scene, your companion leaves with you. If your companion falls to 0 Hit Points, they flee and rejoin you at the start of the next scene in which you are present, with HP equal to their Crisis score. When you rest, your companion also gains the full benefits of resting.',
        type: 'companion',
        cost: 'None',
        maxTimes: 5
      },
      'Resourceful': {
        level: 4,
        description: 'You recover 【SL】 Inventory Points after each travel roll.',
        type: 'passive',
        cost: 'None',
        maxTimes: 4
      },
      'Tavern Talk': {
        level: 3,
        description: 'When you rest inside an inn or tavern, you may ask the Game Master up to 【SL】 questions about your surroundings and the people who live here; the Game Master will answer truthfully and you describe how you gathered the information.',
        type: 'active',
        cost: 'None',
        maxTimes: 3
      },
      'Treasure Hunter': {
        level: 2,
        description: 'When your group journeys on the world map, you will make a discovery on a roll of 【SL + 1】 or lower on the travel roll (instead of only on a 1).',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Well-Traveled': {
        level: 1,
        description: 'You reduce the die rolled for your travel rolls by one size (to a minimum of d6). If multiple characters have this Skill, the effects are not cumulative.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  WEAPONMASTER: {
    name: 'Weaponmaster',
    description: 'Masters of martial combat',
    primaryAttributes: ['dexterity', 'might'],
    freeBenefits: ['HP +5', 'Martial melee weapons and martial shields'],
    equipmentProficiencies: ['Martial melee weapons', 'Martial shields'],
    abilities: {
      'Bladestorm': {
        level: 1,
        description: 'When you perform a melee attack, you may spend 10 Mind Points to choose one option: the attack gains multi (2); or you increase the attack\'s multi property by one, up to a maximum of multi (3).',
        type: 'active',
        cost: '10 MP',
        maxTimes: 1
      },
      'Bone Crusher': {
        level: 4,
        description: 'When you hit one or more targets with a melee attack that would deal damage, you may have the attack deal no damage. If you do, choose one option: inflict dazed on each target hit by the attack; or inflict weak on each target hit by the attack; or each target hit by the attack loses 【SL × 10】 Mind Points. Describe your maneuver!',
        type: 'active',
        cost: 'None',
        maxTimes: 4
      },
      'Breach': {
        level: 3,
        description: 'You may use an action and spend 5 Mind Points to perform a free attack with a melee weapon you have equipped. This attack must target a single creature. If the attack is successful, it deals no damage and you choose one option: you destroy one shield equipped by the target; or you destroy the target\'s equipped armor; or whenever the target suffers damage from a source before the start of your next turn, that source deals 【SL × 2】 extra damage to them.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 3
      },
      'Counterattack': {
        level: 1,
        description: 'After an enemy hits or misses you with a melee attack, if the Result of their Accuracy Check was an even number, you may perform a free attack against that enemy (after their attack has been fully resolved). This attack must be a melee attack and must have that enemy as its only target; treat your High Roll (HR) as 0 when calculating damage dealt by this attack.',
        type: 'reaction',
        cost: 'None',
        maxTimes: 1
      },
      'Melee Weapon Mastery': {
        level: 4,
        description: 'You gain a bonus equal to 【SL】 to all Accuracy Checks with melee weapons.',
        type: 'passive',
        cost: 'None',
        maxTimes: 4
      }
    },
    source: 'Core Rules'
  },

  CHIMERIST: {
    name: 'Chimerist',
    description: 'Practitioners who learn spells by observing and mimicking creatures, adapting their abilities through study and experimentation',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['MP +5', 'Ritualism discipline access'],
    equipmentProficiencies: ['Arcane weapons', 'Daggers', 'Flails'],
    abilities: {
      'Consume': {
        level: 5,
        description: 'After you deal damage to one or more creatures with a spell, if you have an arcane, dagger or flail weapon equipped, you recover 【SL × 2】 Mind Points.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Feral Speech': {
        level: 1,
        description: 'You can communicate with creatures of the beast, monster and plant Species.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Pathogenesis': {
        level: 3,
        description: 'When you deal damage to one or more creatures with one of your Chimerist spells, each of those creatures that share their Species with the creature you originally learned that spell from suffers poisoned.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Ritual Chimerism': {
        level: 2,
        description: 'You may perform Rituals whose effects fall within the Chimerism discipline. When you acquire this Skill, choose 【INS + WLP】 or 【MIG + WLP】. From now on, your Chimerism Rituals will use the chosen Attributes for the Magic Check.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      },
      'Spell Mimic': {
        level: 10,
        description: 'When you see a creature belonging to the beast, monster or plant Species cast a spell, you may immediately choose to learn that spell as a Chimerist spell of your own: if you do, record the Species of the creature you learned it from. When you first acquire this Skill, choose 【INS + WLP】 or 【MIG + WLP】. From now on, your offensive (rr) Chimerist spells will use the chosen Attributes for the Magic Check, regardless of the Attributes used by the creature you learned the spell from. You may have up to 【SL + 2】 different Chimerist spells memorized this way. If you want to memorize a new Chimerist spell but are already at your limit, you must forget one of your old spells and replace it with the new spell.',
        type: 'Passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  NECROMANCER: {
    name: 'Necromancer',
    description: 'Masters of death magic and manipulation of the undead',
    primaryAttributes: ['insight', 'willpower'],
    freeBenefits: ['HP +5 or MP +5 (your choice)'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Beyond the Realms of Death': {
        level: 5,
        description: 'When another creature you can see loses Hit Points while in Crisis, if they are not undead, you gain 1 Grave Point. You may never have more than 【SL + 1】 Grave Points. When you are reduced to 0 Hit Points, you lose all Grave Points; then, if you lost at least 1 Grave Point this way and this is the first time you are reduced to 0 HP during this scene, you do not Surrender nor Sacrifice yourself: instead, you recover an amount of HP equal to 【SL, multiplied by the amount of Grave Points you lost this way】.',
        type: 'passive',
        cost: 'None',
        maxTimes: 5
      },
      'Children of the Grave': {
        level: 1,
        description: 'You can always communicate verbally with undead creatures. Once per scene, you may ask an undead a single question; they are compelled to answer truthfully.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Fear is the Key': {
        level: 3,
        description: 'After you cause one or more enemies to lose Hit Points, if you have acquired the Beyond the Realms of Death Skill and at least one of them is suffering from shaken and/or weak, you gain 1 Grave Point and recover 【SL × 2】 Hit Points and Mind Points.',
        type: 'passive',
        cost: 'None',
        maxTimes: 3
      },
      'For Whom the Bell Tolls': {
        level: 3,
        description: 'When you deal damage to a creature with a spell, if that spell only deals damage to that creature, you may spend 1 Grave Point. If you do, choose one option: if that creature is suffering from one or more status effects, the spell deals extra damage equal to 【(SL × 2) + the number of status effects on that creature】; or if that creature is suffering from no status effects, they suffer shaken.',
        type: 'active',
        cost: '1 Grave Point',
        maxTimes: 3
      },
      'Rondo of Nightmare': {
        level: 1,
        description: 'When you cast an offensive spell (rr) with a target of "One creature", you may spend 2 Grave Points to have it target all creatures you can see that are present on the scene (perform a single Magic Check and confront it with the Magic Defense of each target). If you do, all damage dealt by the spell becomes dark and its type cannot change.',
        type: 'active',
        cost: '2 Grave Points',
        maxTimes: 1
      }
    },
    source: 'Core Rules'
  },

  ACE_OF_CARDS: {
    name: 'Ace of Cards',
    description: 'Masters of fate and fortune who manipulate luck through magical cards',
    primaryAttributes: ['dexterity', 'insight'],
    freeBenefits: ['HP +5 or MP +5 (your choice)'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Double or Nothing': {
        level: 1,
        description: 'Before you perform an Accuracy Check, a Magic Check for an offensive spell (rr), or a Check to advance or turn back a Clock, you may declare double or nothing. If you do and the Check triggers a critical success, double the damage dealt by that attack or spell or the filled or erased sections of that Clock, respectively; however, any other kind of success becomes a failure instead.',
        type: 'active',
        cost: 'None',
        maxTimes: 1
      },
      'High or Low': {
        level: 1,
        description: 'When you generate a critical success or a fumble, you may draw 1 card from your deck. If you do, discard 1 card from your hand.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Magic Cards': {
        level: 3,
        description: 'You gain a deck, a hand and a discard pile. During a conflict, you may use an action and spend up to 【10 + (SL × 5)】 Mind Points (minimum 10). If you do, resolve 1 card from your hand for every 5 MP spent this way (to a maximum of 5 cards; these cards form a set). After you resolve the effect of the set (if any), discard these cards and draw that many cards from your deck.',
        type: 'active',
        cost: 'Variable MP',
        maxTimes: 3
      },
      'Mulligan': {
        level: 5,
        description: 'At the end of your turn during a conflict, you may discard up to 【SL】 cards from your hand. If you do, draw that many cards from your deck.',
        type: 'active',
        cost: 'None',
        maxTimes: 5
      },
      'Trap Card': {
        level: 4,
        description: 'After an enemy you can see performs an action during a conflict, you may declare one of your deck\'s suits (after the action has been resolved) and put the first card on the bottom of your deck in your discard pile, face up. If that card is a joker or its suit matches the one you declared, you may immediately perform the Spell action for free, casting a spell with a total Mind Point cost equal to or lower than 【SL × 5】 (you must still pay its MP cost).',
        type: 'reaction',
        cost: 'None',
        maxTimes: 4
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
  },

  // NATURAL FANTASY ATLAS CLASSES
  FLORALIST: {
    name: 'Floralist',
    description: 'A practitioner of chloromancy, skilled in the cultivation and manipulation of magical plants',
    primaryAttributes: ['willpower', 'insight'],
    freeBenefits: ['MP +5', 'Chloromancy Rituals'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Battle Gardening': {
        level: 5,
        description: 'After you plant a magiseed through the Chloromancy Skill (not when using Graft), you may choose one option: perform a free attack with an equipped weapon; or perform the Spell action for free, casting a spell with a total Mind Point cost equal to or lower than 【SL × 5】 + 5 (you must still pay its MP cost). Treat the High Roll (HR) of your Accuracy Check or Magic Check as being equal to 0 when determining damage dealt by this attack or spell.',
        type: 'active',
        cost: 'Free after Chloromancy',
        maxTimes: 5
      },
      'Chloromancy': {
        level: 1,
        description: 'You may perform Rituals of the Chloromancy discipline during rest scenes. Additionally, during a conflict, you may perform the following action: Plant Magiseed - Pay 5 MP to plant a magiseed adjacent to you. The magiseed grows instantly and produces its effect.',
        type: 'ritual',
        cost: 'Special',
        maxTimes: 1
      },
      'Emergency Harvest': {
        level: 3,
        description: 'Choose yourself and up to 【SL】 allies you can see. Each chosen creature recovers 【SL × 5】 Hit Points and 【SL × 5】 Mind Points.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 3
      },
      'Graft': {
        level: 2,
        description: 'During a conflict, you may plant a magiseed in a location where a magical plant already exists. The magiseed produces its effect immediately and is combined with the existing plant.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 2
      },
      'Green Thumb': {
        level: 1,
        description: 'When you perform an Open Check to study, navigate, or survive in a natural environment, you may reroll up to 【SL】 dice.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      },
      'Herbalism': {
        level: 2,
        description: 'When you use a Potion or Remedy, its effects are increased by 【SL × 5】 (if the item restores HP or MP) or the effect duration is doubled (if the item provides a different benefit).',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Magiseed Creation': {
        level: 4,
        description: 'You can create special magiseeds that contain concentrated magical energy. These seeds can be planted to create various magical effects during combat or exploration.',
        type: 'active',
        cost: 'MP varies',
        maxTimes: 4
      },
      'Nature\'s Ally': {
        level: 3,
        description: 'You can call upon plant allies to assist you in combat. Summon plant creatures or animate existing vegetation to fight alongside you.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 3
      },
      'Poison Resistance': {
        level: 2,
        description: 'Your constant exposure to various plants has built up your resistance to toxins. You gain immunity to poison effects and can neutralize poison in others.',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Root Network': {
        level: 4,
        description: 'You can tap into the underground network of plant roots to gather information over vast distances and communicate with other plant-connected individuals.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 4
      },
      'Seasonal Adaptation': {
        level: 3,
        description: 'You can adapt your magical abilities to match the current season, gaining different benefits and spell effects based on the time of year.',
        type: 'passive',
        cost: 'None',
        maxTimes: 3
      },
      'Thorn Barrier': {
        level: 3,
        description: 'Create a barrier of thorns that protects you and your allies. The barrier deals damage to enemies who attack through it and provides cover.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 3
      },
      'Verdant Growth': {
        level: 5,
        description: 'Cause explosive plant growth in the area around you. This can create difficult terrain, provide cover, or enhance existing plant-based effects.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 5
      },
      'Vine Whip': {
        level: 1,
        description: 'Control nearby vines or create magical vines to strike enemies, restrain them, or manipulate objects at a distance.',
        type: 'active',
        cost: '5 MP',
        maxTimes: 1
      },
      'Photosynthesis': {
        level: 2,
        description: 'You can absorb sunlight to restore your magical energy. During daylight hours, you can recover MP more quickly during rest.',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      }
    },
    source: 'Natural Fantasy Atlas'
  },

  GEOMANCER: {
    name: 'Geomancer',
    description: 'A master of earth magic who can manipulate stone, crystal, and the very ground itself',
    primaryAttributes: ['willpower', 'might'],
    freeBenefits: ['MP +5', 'Earth Affinity'],
    equipmentProficiencies: ['Basic weapons', 'Basic armor'],
    abilities: {
      'Stone Skin': {
        level: 2,
        description: 'Your skin becomes as hard as stone, increasing your defense against physical attacks. You gain resistance to physical damage equal to 【SL × 2】.',
        type: 'active',
        cost: '10 MP',
        maxTimes: 2
      },
      'Earthquake': {
        level: 5,
        description: 'Cause the ground to shake violently in a large area. All creatures in the area must make a Dexterity + Acrobatics check (DL 10 + SL) or be knocked prone and take earth damage.',
        type: 'active',
        cost: '25 MP',
        maxTimes: 5
      },
      'Crystal Prison': {
        level: 4,
        description: 'Trap an enemy in a prison of crystal. The target is restrained and cannot move until they break free or the crystals are destroyed.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 4
      },
      'Stone Projectile': {
        level: 1,
        description: 'Hurl stones or create stone projectiles to attack enemies at range. Deal earth damage equal to 【HR + 10 + (SL × 3)】.',
        type: 'active',
        cost: '8 MP',
        maxTimes: 1
      },
      'Tremor Sense': {
        level: 2,
        description: 'You can sense vibrations through the ground, detecting movement and creatures within 【SL × 50】 meters even through walls.',
        type: 'passive',
        cost: 'None',
        maxTimes: 2
      },
      'Mineral Communion': {
        level: 3,
        description: 'Communicate with the earth itself, gathering information about underground structures, mineral deposits, and geological history.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 3
      },
      'Stone Shape': {
        level: 3,
        description: 'Reshape stone and earth as if it were clay. Create simple tools, weapons, or structures from available stone materials.',
        type: 'active',
        cost: '15 MP',
        maxTimes: 3
      },
      'Avalanche': {
        level: 4,
        description: 'Call down a devastating avalanche of stones and earth. Affects a wide area and deals massive earth damage to all targets.',
        type: 'active',
        cost: '22 MP',
        maxTimes: 4
      },
      'Crystal Armor': {
        level: 3,
        description: 'Encase yourself or an ally in protective crystal armor. Increases defense and provides resistance to elemental damage.',
        type: 'active',
        cost: '16 MP',
        maxTimes: 3
      },
      'Petrification': {
        level: 5,
        description: 'Slowly turn an enemy to stone. The target must resist or be transformed into stone for 【SL】 scenes.',
        type: 'active',
        cost: '30 MP',
        maxTimes: 5
      },
      'Earth Elemental': {
        level: 4,
        description: 'Summon a powerful earth elemental to fight alongside you. The elemental\'s strength depends on your skill level.',
        type: 'active',
        cost: '20 MP',
        maxTimes: 4
      },
      'Ground Slam': {
        level: 2,
        description: 'Slam the ground with tremendous force, creating shockwaves that knock down enemies and deal earth damage.',
        type: 'active',
        cost: '12 MP',
        maxTimes: 2
      },
      'Stone Wall': {
        level: 3,
        description: 'Raise a wall of stone from the ground. The wall provides cover and can be shaped to create defensive positions.',
        type: 'active',
        cost: '14 MP',
        maxTimes: 3
      },
      'Magnetic Field': {
        level: 4,
        description: 'Create a magnetic field that affects metal objects. You can attract or repel metal weapons and armor.',
        type: 'active',
        cost: '18 MP',
        maxTimes: 4
      },
      'Spelunking': {
        level: 1,
        description: 'Your natural affinity with underground spaces gives you bonuses when navigating caves, tunnels, and underground areas.',
        type: 'passive',
        cost: 'None',
        maxTimes: 1
      }
    },
    source: 'Natural Fantasy Atlas'
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
  // Core Fabula Ultima Status Effects (from official rules)
  DAZED: {
    name: 'Dazed',
    type: 'negative',
    description: 'Temporarily reduces your Insight die size by one.',
    duration: 'until recovered',
    effects: { insight_penalty: -1 },
    attribute_affected: 'INSIGHT',
    stackable: true,
    minimum_die: 6
  },
  ENRAGED: {
    name: 'Enraged',
    type: 'negative', 
    description: 'Temporarily reduces your Dexterity and Insight die sizes by one.',
    duration: 'until recovered',
    effects: { dexterity_penalty: -1, insight_penalty: -1 },
    attribute_affected: ['DEXTERITY', 'INSIGHT'],
    stackable: true,
    minimum_die: 6
  },
  POISONED: {
    name: 'Poisoned',
    type: 'negative',
    description: 'Temporarily reduces your Might and Willpower die sizes by one.',
    duration: 'until recovered',
    effects: { might_penalty: -1, willpower_penalty: -1 },
    attribute_affected: ['MIGHT', 'WILLPOWER'],
    stackable: true,
    minimum_die: 6
  },
  SHAKEN: {
    name: 'Shaken',
    type: 'negative',
    description: 'Temporarily reduces your Willpower die size by one.',
    duration: 'until recovered',
    effects: { willpower_penalty: -1 },
    attribute_affected: 'WILLPOWER',
    stackable: true,
    minimum_die: 6
  },
  SLOW: {
    name: 'Slow',
    type: 'negative',
    description: 'Temporarily reduces your Dexterity die size by one.',
    duration: 'until recovered',
    effects: { dexterity_penalty: -1 },
    attribute_affected: 'DEXTERITY',
    stackable: true,
    minimum_die: 6
  },
  WEAK: {
    name: 'Weak',
    type: 'negative',
    description: 'Temporarily reduces your Might die size by one.',
    duration: 'until recovered',
    effects: { might_penalty: -1 },
    attribute_affected: 'MIGHT',
    stackable: true,
    minimum_die: 6
  },
  
  // Additional Custom Effects
  BLESSED: {
    name: 'Blessed',
    type: 'positive',
    description: 'Divine favor grants bonuses to actions.',
    duration: 'scene',
    effects: { accuracy: '+1', damage: '+2' },
    stackable: false
  },
  HASTE: {
    name: 'Haste',
    type: 'positive',
    description: 'Increased speed allows for extra actions.',
    duration: 'scene',
    effects: { actions: '+1', dodge: '+2' },
    stackable: false
  },
  REGENERATION: {
    name: 'Regeneration',
    type: 'positive',
    description: 'Slowly recover HP over time.',
    duration: 'scene',
    effects: { hp_regen: '5 per turn' },
    stackable: false
  },
  
  // Other Negative Effects
  CURSED: {
    name: 'Cursed',
    type: 'negative',
    description: 'Dark magic causes penalties to all actions.',
    duration: 'scene',
    effects: { accuracy: '-1', damage: '-2' },
    stackable: false
  },
  PARALYZED: {
    name: 'Paralyzed',
    type: 'negative',
    description: 'Unable to take actions.',
    duration: '3 turns',
    effects: { actions: 'none' },
    stackable: false
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

// Complete Equipment Tables from Fabula Ultima Books
export const EQUIPMENT_CATEGORIES = {
  // WEAPONS - Complete tables from all books
  WEAPONS: {
    // MELEE WEAPONS
    BASIC_MELEE: {
      'Unarmed Strike': {
        name: 'Unarmed Strike',
        category: 'basic_melee',
        type: 'weapon',
        damage: 'HR + 0',
        accuracy: '+0',
        cost: 0,
        hands: 1,
        quality: ['brawling'],
        description: 'Your fists, feet, or other body parts.'
      },
      'Dagger': {
        name: 'Dagger',
        category: 'basic_melee',
        type: 'weapon',
        damage: 'HR + 5',
        accuracy: '+0',
        cost: 100,
        hands: 1,
        quality: ['precise'],
        description: 'A small, quick blade perfect for swift strikes.'
      },
      'Sword': {
        name: 'Sword',
        category: 'basic_melee',
        type: 'weapon',
        damage: 'HR + 8',
        accuracy: '+0',
        cost: 200,
        hands: 1,
        quality: [],
        description: 'A versatile one-handed weapon.'
      },
      'Spear': {
        name: 'Spear',
        category: 'basic_melee',
        type: 'weapon',
        damage: 'HR + 6',
        accuracy: '+0',
        cost: 100,
        hands: 1,
        quality: ['two-handed'],
        description: 'A long weapon ideal for keeping enemies at distance.'
      },
      'Club': {
        name: 'Club',
        category: 'basic_melee',
        type: 'weapon',
        damage: 'HR + 4',
        accuracy: '+0',
        cost: 50,
        hands: 1,
        quality: [],
        description: 'A simple wooden weapon.'
      }
    },
    MARTIAL_MELEE: {
      'Katana': {
        name: 'Katana',
        category: 'martial_melee',
        type: 'weapon',
        damage: 'HR + 10',
        accuracy: '+1',
        cost: 300,
        hands: 1,
        quality: ['precise'],
        description: 'A curved sword of exceptional craftsmanship.'
      },
      'Greatsword': {
        name: 'Greatsword',
        category: 'martial_melee',
        type: 'weapon',
        damage: 'HR + 12',
        accuracy: '+0',
        cost: 400,
        hands: 2,
        quality: ['two-handed', 'heavy'],
        description: 'A massive two-handed blade.'
      },
      'Warhammer': {
        name: 'Warhammer',
        category: 'martial_melee',
        type: 'weapon',
        damage: 'HR + 10',
        accuracy: '+0',
        cost: 300,
        hands: 1,
        quality: ['heavy'],
        description: 'A crushing weapon effective against armor.'
      },
      'Rapier': {
        name: 'Rapier',
        category: 'martial_melee',
        type: 'weapon',
        damage: 'HR + 7',
        accuracy: '+2',
        cost: 300,
        hands: 1,
        quality: ['precise'],
        description: 'A slender thrusting sword designed for finesse.'
      },
      'Halberd': {
        name: 'Halberd',
        category: 'martial_melee',
        type: 'weapon',
        damage: 'HR + 10',
        accuracy: '+0',
        cost: 350,
        hands: 2,
        quality: ['two-handed', 'reach'],
        description: 'A polearm combining spear and axe.'
      }
    },
    // RANGED WEAPONS
    BASIC_RANGED: {
      'Bow': {
        name: 'Bow',
        category: 'basic_ranged',
        type: 'weapon',
        damage: 'HR + 5',
        accuracy: '+0',
        cost: 150,
        hands: 2,
        quality: ['ranged'],
        description: 'A classic ranged weapon.'
      },
      'Crossbow': {
        name: 'Crossbow',
        category: 'basic_ranged',
        type: 'weapon',
        damage: 'HR + 6',
        accuracy: '+0',
        cost: 200,
        hands: 2,
        quality: ['ranged', 'reload'],
        description: 'A mechanical ranged weapon.'
      },
      'Sling': {
        name: 'Sling',
        category: 'basic_ranged',
        type: 'weapon',
        damage: 'HR + 3',
        accuracy: '+0',
        cost: 50,
        hands: 1,
        quality: ['ranged'],
        description: 'A simple projectile weapon.'
      },
      'Throwing Knife': {
        name: 'Throwing Knife',
        category: 'basic_ranged',
        type: 'weapon',
        damage: 'HR + 4',
        accuracy: '+0',
        cost: 80,
        hands: 1,
        quality: ['ranged', 'thrown'],
        description: 'Light throwing weapons for quick attacks.'
      }
    },
    MARTIAL_RANGED: {
      'Longbow': {
        name: 'Longbow',
        category: 'martial_ranged',
        type: 'weapon',
        damage: 'HR + 8',
        accuracy: '+1',
        cost: 400,
        hands: 2,
        quality: ['ranged', 'two-handed'],
        description: 'An improved bow with greater range and power.'
      },
      'Heavy Crossbow': {
        name: 'Heavy Crossbow',
        category: 'martial_ranged',
        type: 'weapon',
        damage: 'HR + 10',
        accuracy: '+1',
        cost: 500,
        hands: 2,
        quality: ['ranged', 'reload', 'heavy'],
        description: 'A powerful mechanical weapon.'
      },
      'Composite Bow': {
        name: 'Composite Bow',
        category: 'martial_ranged',
        type: 'weapon',
        damage: 'HR + 7',
        accuracy: '+2',
        cost: 450,
        hands: 2,
        quality: ['ranged', 'precise'],
        description: 'A bow made from multiple materials for enhanced performance.'
      }
    },
    // ARCANE WEAPONS
    ARCANE: {
      'Staff': {
        name: 'Staff',
        category: 'arcane',
        type: 'weapon',
        damage: 'HR + 4',
        accuracy: '+0',
        cost: 200,
        hands: 2,
        quality: ['two-handed', 'magical'],
        description: 'A magical focus that enhances spellcasting.'
      },
      'Wand': {
        name: 'Wand',
        category: 'arcane',
        type: 'weapon',
        damage: 'HR + 2',
        accuracy: '+1',
        cost: 150,
        hands: 1,
        quality: ['magical', 'precise'],
        description: 'A small magical implement.'
      },
      'Orb': {
        name: 'Orb',
        category: 'arcane',
        type: 'weapon',
        damage: 'HR + 3',
        accuracy: '+0',
        cost: 180,
        hands: 1,
        quality: ['magical'],
        description: 'A crystalline focus for magical energy.'
      }
    }
  },
  
  // ARMOR - Complete armor table
  ARMOR: {
    'No Armor': {
      name: 'No Armor',
      category: 'none',
      type: 'armor',
      defense: '+0',
      magic_defense: '+0',
      cost: 0,
      initiative_modifier: '+0',
      description: 'Unprotected.'
    },
    'Clothing': {
      name: 'Clothing',
      category: 'light',
      type: 'armor',
      defense: '+1',
      magic_defense: '+0',
      cost: 50,
      initiative_modifier: '+0',
      description: 'Regular clothes provide minimal protection.'
    },
    'Travel Garb': {
      name: 'Travel Garb',
      category: 'light',
      type: 'armor',
      defense: '+2',
      magic_defense: '+1',
      cost: 100,
      initiative_modifier: '+0',
      description: 'Sturdy clothing designed for travel.'
    },
    'Leather Armor': {
      name: 'Leather Armor',
      category: 'light',
      type: 'armor',
      defense: '+3',
      magic_defense: '+1',
      cost: 200,
      initiative_modifier: '+0',
      description: 'Basic protection that doesn\'t hinder movement.'
    },
    'Chain Mail': {
      name: 'Chain Mail',
      category: 'medium',
      type: 'armor',
      defense: '+4',
      magic_defense: '+1',
      cost: 500,
      initiative_modifier: '-1',
      description: 'Interlocked metal rings provide good protection.'
    },
    'Brigandine': {
      name: 'Brigandine',
      category: 'medium',
      type: 'armor',
      defense: '+5',
      magic_defense: '+2',
      cost: 800,
      initiative_modifier: '-1',
      description: 'Metal plates sewn into a fabric backing.'
    },
    'Plate Armor': {
      name: 'Plate Armor',
      category: 'heavy',
      type: 'armor',
      defense: '+6',
      magic_defense: '+2',
      cost: 1000,
      initiative_modifier: '-2',
      description: 'Full metal protection for the wealthy warrior.'
    },
    'Silk Shirt': {
      name: 'Silk Shirt',
      category: 'magical',
      type: 'armor',
      defense: '+2',
      magic_defense: '+3',
      cost: 800,
      initiative_modifier: '+0',
      description: 'Enchanted silk that provides magical protection.'
    },
    'Sage Robe': {
      name: 'Sage Robe',
      category: 'magical',
      type: 'armor',
      defense: '+3',
      magic_defense: '+4',
      cost: 1200,
      initiative_modifier: '+0',
      description: 'Robes woven with protective enchantments.'
    }
  },
  
  // SHIELDS
  SHIELDS: {
    'Buckler': {
      name: 'Buckler',
      category: 'light',
      type: 'shield',
      defense: '+1',
      magic_defense: '+1',
      cost: 100,
      initiative_modifier: '+0',
      description: 'A small shield for parrying attacks.'
    },
    'Shield': {
      name: 'Shield',
      category: 'medium',
      type: 'shield',
      defense: '+2',
      magic_defense: '+2',
      cost: 200,
      initiative_modifier: '-1',
      description: 'A standard protective shield.'
    },
    'Kite Shield': {
      name: 'Kite Shield',
      category: 'heavy',
      type: 'shield',
      defense: '+3',
      magic_defense: '+2',
      cost: 400,
      initiative_modifier: '-1',
      description: 'A large shield offering excellent protection.'
    },
    'Tower Shield': {
      name: 'Tower Shield',
      category: 'heavy',
      type: 'shield',
      defense: '+4',
      magic_defense: '+3',
      cost: 600,
      initiative_modifier: '-2',
      description: 'A massive shield that provides total cover.'
    }
  },
  
  // ACCESSORIES
  ACCESSORIES: {
    'Ring': {
      name: 'Ring',
      category: 'accessory',
      type: 'ring',
      effect: '+1 to specific attribute or skill',
      cost: 500,
      description: 'A magical ring with various enchantments.'
    },
    'Amulet': {
      name: 'Amulet',
      category: 'accessory',
      type: 'amulet',
      effect: '+5 HP or MP',
      cost: 400,
      description: 'A protective charm worn around the neck.'
    },
    'Bracelet': {
      name: 'Bracelet',
      category: 'accessory',
      type: 'bracelet',
      effect: '+1 to resistance or immunity',
      cost: 600,
      description: 'An enchanted wrist ornament.'
    },
    'Cloak': {
      name: 'Cloak',
      category: 'accessory',
      type: 'cloak',
      effect: 'Special movement or stealth bonus',
      cost: 700,
      description: 'A magical cloak with special properties.'
    }
  },

  // CONSUMABLES
  CONSUMABLES: {
    // POTIONS
    POTIONS: {
      'Potion': {
        name: 'Potion',
        category: 'consumable',
        type: 'potion',
        effect: 'Recover 50 HP',
        cost: 300,
        description: 'A healing draught that restores vitality.'
      },
      'Hi-Potion': {
        name: 'Hi-Potion',
        category: 'consumable',
        type: 'potion',
        effect: 'Recover 100 HP',
        cost: 500,
        description: 'A powerful healing potion.'
      },
      'X-Potion': {
        name: 'X-Potion',
        category: 'consumable',
        type: 'potion',
        effect: 'Fully recover HP',
        cost: 1000,
        description: 'The ultimate healing potion.'
      },
      'Ether': {
        name: 'Ether',
        category: 'consumable',
        type: 'potion',
        effect: 'Recover 30 MP',
        cost: 500,
        description: 'Restores magical energy.'
      },
      'Hi-Ether': {
        name: 'Hi-Ether',
        category: 'consumable',
        type: 'potion',
        effect: 'Recover 60 MP',
        cost: 800,
        description: 'A powerful mana restoration potion.'
      },
      'Elixir': {
        name: 'Elixir',
        category: 'consumable',
        type: 'potion',
        effect: 'Fully recover HP and MP',
        cost: 2000,
        description: 'A legendary potion that fully restores both health and magic.'
      },
      'Remedy': {
        name: 'Remedy',
        category: 'consumable',
        type: 'potion',
        effect: 'Remove all status ailments',
        cost: 200,
        description: 'Cures various ailments and conditions.'
      },
      'Phoenix Down': {
        name: 'Phoenix Down',
        category: 'consumable',
        type: 'potion',
        effect: 'Revive from Crisis with 1 HP',
        cost: 1000,
        description: 'A mystical feather that can bring back the fallen.'
      }
    },
    
    // TOOLS AND EQUIPMENT
    TOOLS: {
      'Tent': {
        name: 'Tent',
        category: 'consumable',
        type: 'camping',
        effect: 'Spend 3 IP from one person to recover HP and MP during rest',
        cost: 100,
        description: 'Provides shelter and comfort during rest for the group.'
      },
      'Cottage': {
        name: 'Cottage',
        category: 'consumable',
        type: 'camping',
        effect: 'Spend 3 IP from two people to fully recover HP and MP during rest',
        cost: 500,
        description: 'A magical dwelling that provides excellent rest for the group.'
      },
      'Rope': {
        name: 'Rope (50ft)',
        category: 'gear',
        type: 'tool',
        effect: 'Climbing and utility aid',
        cost: 20,
        description: 'Strong hemp rope for various uses.'
      },
      'Grappling Hook': {
        name: 'Grappling Hook',
        category: 'gear', 
        type: 'tool',
        effect: '+2 bonus to climbing checks',
        cost: 50,
        description: 'A metal hook for scaling walls.'
      },
      'Torch': {
        name: 'Torch',
        category: 'gear',
        type: 'tool',
        effect: 'Provides light in darkness',
        cost: 5,
        description: 'A wooden stick wrapped with oil-soaked cloth.'
      }
    }
  }
};

// Damage Types and Resistances

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

// Inventory Points (IP) System - Resource for combat actions and rest
export const INVENTORY_POINTS_SYSTEM = {
  baseValue: 5,
  description: 'Inventory Points (IP) are a resource used in combat and during rest',
  uses: {
    combat: [
      'Use potions as a free action (1 IP)',
      'Apply Magispheres to enemies (1-2 IP depending on sphere)',
      'Use special combat consumables'
    ],
    rest: [
      'Use Tent for enhanced rest (3 IP from one person)',
      'Use Cottage for full recovery (3 IP from two people)',
      'Purchase camping supplies'
    ]
  },
  classBonus: '+2 IP per class with "Inventory Points +2" benefit (stackable)',
  calculation: 'Base 5 + sum of all IP bonuses from classes'
};

// Magispheres - Combat consumables that use IP
export const MAGISPHERES = {
  'Heal Sphere': {
    name: 'Heal Sphere',
    cost: 100,
    ipCost: 1,
    effect: 'Target recovers 30 HP',
    description: 'A crystalline sphere containing healing magic.'
  },
  'Mana Sphere': {
    name: 'Mana Sphere', 
    cost: 120,
    ipCost: 1,
    effect: 'Target recovers 20 MP',
    description: 'A glowing orb that restores magical energy.'
  },
  'Thunder Sphere': {
    name: 'Thunder Sphere',
    cost: 200,
    ipCost: 2,
    effect: 'Deal bolt damage to target (HR + 15)',
    description: 'A crackling sphere of electrical energy.'
  },
  'Fire Sphere': {
    name: 'Fire Sphere',
    cost: 200,
    ipCost: 2,
    effect: 'Deal fire damage to target (HR + 15)',
    description: 'A burning orb of concentrated flame.'
  },
  'Ice Sphere': {
    name: 'Ice Sphere',
    cost: 200,
    ipCost: 2,
    effect: 'Deal ice damage to target (HR + 15)',
    description: 'A freezing sphere of crystallized cold.'
  },
  'Poison Sphere': {
    name: 'Poison Sphere',
    cost: 150,
    ipCost: 1,
    effect: 'Target suffers poison status effect',
    description: 'A toxic orb that spreads venomous energy.'
  },
  'Sleep Sphere': {
    name: 'Sleep Sphere',
    cost: 180,
    ipCost: 1,
    effect: 'Target falls asleep until end of scene or damaged',
    description: 'A dreamy sphere that induces slumber.'
  },
  'Cure Sphere': {
    name: 'Cure Sphere',
    cost: 250,
    ipCost: 2,
    effect: 'Remove all status ailments from target',
    description: 'A purifying orb that cleanses harmful effects.'
  }
};

// Damage Types and Resistance System
export const DAMAGE_TYPES = {
  PHYSICAL: {
    name: 'Physical',
    icon: '⚔️',
    color: '#8B4513',
    description: 'Physical damage from weapons and attacks'
  },
  FIRE: {
    name: 'Fire',
    icon: '🔥',
    color: '#FF4500',
    description: 'Fire elemental damage'
  },
  ICE: {
    name: 'Ice',
    icon: '❄️',
    color: '#00BFFF',
    description: 'Ice and cold elemental damage'
  },
  AIR: {
    name: 'Air',
    icon: '💨',
    color: '#87CEEB',
    description: 'Wind and air elemental damage'
  },
  EARTH: {
    name: 'Earth',
    icon: '🗿',
    color: '#8B4513',
    description: 'Earth and stone elemental damage'
  },
  BOLT: {
    name: 'Bolt',
    icon: '⚡',
    color: '#FFD700',
    description: 'Lightning and electric damage'
  },
  DARK: {
    name: 'Dark',
    icon: '🌑',
    color: '#4B0082',
    description: 'Shadow and darkness damage'
  },
  LIGHT: {
    name: 'Light',
    icon: '✨',
    color: '#FFD700',
    description: 'Holy and light damage'
  }
};

// Affinity Types (Resistance System)
export const AFFINITY_TYPES = {
  VULNERABLE: {
    name: 'Vulnerable',
    icon: '🔻',
    color: '#FF4444',
    modifier: '2x',
    multiplier: 2,
    description: 'Takes double damage from this type'
  },
  NORMAL: {
    name: 'Normal',
    icon: '➖',
    color: '#888888',
    modifier: '1x',
    multiplier: 1,
    description: 'Normal damage from this type'
  },
  RESISTANT: {
    name: 'Resistant',
    icon: '🛡️',
    color: '#4444FF',
    modifier: '½',
    multiplier: 0.5,
    description: 'Takes half damage from this type'
  },
  IMMUNE: {
    name: 'Immune',
    icon: '🚫',
    color: '#00FF00',
    modifier: '0',
    multiplier: 0,
    description: 'Takes no damage from this type'
  },
  ABSORB: {
    name: 'Absorb',
    icon: '💚',
    color: '#00AA00',
    modifier: 'Heal',
    multiplier: -1,
    description: 'Damage heals instead of hurts'
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
    ip: 5, // Base IP value - modified by class bonuses
    fabula: 3
  },
  traits: [],
  heroicStyles: [],
  equipment: [],
  bonds: [],
  avatar_url: null,
  affinities: {
    physical: 'NORMAL',
    fire: 'NORMAL',
    ice: 'NORMAL',
    air: 'NORMAL',
    earth: 'NORMAL',
    bolt: 'NORMAL',
    dark: 'NORMAL',
    light: 'NORMAL'
  }
};

// Character creation rules
// Elementalist Spells
export const ELEMENTALIST_SPELLS = {
  'Elemental Shroud': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Scene',
    description: 'You weave magical energy and protect the targets from the fury of the elements. Choose a damage type: air, bolt, earth, fire or ice. Until this spell ends, each target gains Resistance against the chosen damage type.',
    type: 'earth, air, fire, water, ice, bolt'
  },
  'Elemental Weapon': {
    mp: '10',
    target: 'One weapon',
    duration: 'Scene',
    description: 'You imbue a weapon with elemental energy. Choose a damage type: air, bolt, earth, fire, or ice. Until this spell ends, all damage dealt by the weapon becomes of the chosen damage type. If you have that weapon equipped while you cast this spell, you may perform a free attack with it as part of the same action. This spell can only be cast on a weapon equipped by a willing creature.',
    type: 'earth, air, fire, water, ice, bolt'
  },
  'Flare': {
    mp: '20',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You channel a single ray of fire towards your foe, its temperature so high that it will pierce through most defenses. The target suffers 【HR + 25】 fire damage. Damage dealt by this spell ignores Resistances.',
    type: 'fire'
  },
  'Fulgur': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You weave electricity into a wave of crackling bolts. Each target hit by this spell suffers 【HR + 15】 bolt damage. Opportunity: Each target hit by this spell suffers dazed.',
    type: 'bolt'
  },
  'Glacies': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You coat your foes under a thick layer of frost. Each target hit by this spell suffers 【HR + 15】 ice damage. Opportunity: Each target hit by this spell suffers slow.',
    type: 'ice'
  },
  'Iceberg': {
    mp: '20',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'A pillar of ice magic envelops your foe, suddenly dropping their body temperature to a critical level. The target suffers 【HR + 25】 ice damage. Damage dealt by this spell ignores Resistances.',
    type: 'ice'
  },
  'Ignis': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You unleash a searing barrage against your foes, conjuring flames out of thin air. Each target hit by this spell suffers 【HR + 15】 fire damage. Opportunity: Each target hit by this spell suffers shaken.',
    type: 'fire'
  },
  'Soaring Strike': {
    mp: '10',
    target: 'Self',
    duration: 'Instantaneous',
    description: 'The wind carries your strikes across the battlefield. You may immediately perform a free attack with a melee weapon you have equipped. This attack may target creatures that can only be targeted by ranged attacks. If you used a weapon belonging to the brawling or spear Category for this attack, it deals 5 extra damage. If you hit a flying target with this attack, you may force them to land immediately.',
    type: 'air'
  },
  'Terra': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'Spires of jagged rock erupt from the ground beneath your foes, closing around them. Each target hit by this spell suffers 【HR + 15】 earth damage. This spell cannot target creatures who are flying, floating, falling, or otherwise in mid-air. Opportunity: Each target hit by this spell performs one fewer action on their next turn (to a minimum of 0 actions).',
    type: 'earth'
  },
  'Thunderbolt': {
    mp: '20',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You send lightning striking at your foe. The target suffers 【HR + 25】 bolt damage. Damage dealt by this spell ignores Resistances.',
    type: 'bolt'
  },
  'Ventus': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You summon the power of winds against your enemy. Each target hit by this spell suffers 【HR + 15】 air damage. Opportunity: Each flying target hit by this spell is forced to land immediately.',
    type: 'air'
  },
  'Vortex': {
    mp: '10',
    target: 'Self',
    duration: 'Scene',
    description: 'A roaring gale surrounds you, blowing away arrows and bullets. Until this spell ends, you gain a +2 bonus to your Defense against ranged attacks.',
    type: 'air'
  }
};

// Tinkerer Invention Systems
export const TINKERER_ALCHEMY = {
  basic: {
    name: 'Basic Mix',
    ipCost: 3,
    dice: 2,
    description: 'Roll two d20s and assign one to target and one to effect.'
  },
  advanced: {
    name: 'Advanced Mix',
    ipCost: 4,
    dice: 3,
    description: 'Roll three d20s and assign one to target and one to effect.'
  },
  superior: {
    name: 'Superior Mix',
    ipCost: 5,
    dice: 4,
    description: 'Roll four d20s and assign one to target and one to effect.'
  }
};

export const ALCHEMY_TARGETS = {
  '1-6': 'You or one ally you can see that is present on the scene',
  '7-11': 'One enemy you can see that is present on the scene',
  '12-16': 'You and every ally present on the scene',
  '17-20': 'Every enemy present on the scene'
};

export const ALCHEMY_EFFECTS = {
  'Any1': 'Suffers 20 poison damage',
  'Any2': 'Recovers 30 Hit Points',
  '1': 'Treats their Dexterity and Might dice as if they were one size higher (up to a maximum of d12) until the end of your next turn',
  '2': 'Treats their Insight and Willpower dice as if they were one size higher (up to a maximum of d12) until the end of your next turn',
  '3': 'Suffers 20 air damage (30 at level 20+, 40 at level 40+)',
  '4': 'Suffers 20 bolt damage (30 at level 20+, 40 at level 40+)',
  '5': 'Suffers 20 dark damage (30 at level 20+, 40 at level 40+)',
  '6': 'Suffers 20 earth damage (30 at level 20+, 40 at level 40+)',
  '7': 'Suffers 20 fire damage (30 at level 20+, 40 at level 40+)',
  '8': 'Suffers 20 ice damage (30 at level 20+, 40 at level 40+)',
  '9': 'Gains Resistance to air and fire damage until the end of the scene',
  '10': 'Gains Resistance to bolt and ice damage until the end of the scene',
  '11': 'Gains Resistance to dark and earth damage until the end of the scene',
  '12': 'Suffers enraged',
  '13': 'Suffers poisoned',
  '14': 'Suffers dazed, shaken, slow and weak',
  '15': 'Recovers from all status effects',
  '16-17': 'Recovers 50 Hit Points and 50 Mind Points',
  '18': 'Recovers 100 Hit Points',
  '19': 'Recovers 100 Mind Points',
  '20': 'Recovers 100 Hit Points and 100 Mind Points'
};

export const TINKERER_INFUSIONS = {
  basic: {
    'Cryo': { damage: 5, type: 'ice', description: 'The attack deals 5 extra damage, and its damage becomes ice' },
    'Pyro': { damage: 5, type: 'fire', description: 'The attack deals 5 extra damage, and its damage becomes fire' },
    'Volt': { damage: 5, type: 'bolt', description: 'The attack deals 5 extra damage, and its damage becomes bolt' }
  },
  advanced: {
    'Cyclone': { damage: 5, type: 'air', description: 'The attack deals 5 extra damage, and its damage becomes air' },
    'Exorcism': { damage: 5, type: 'light', description: 'The attack deals 5 extra damage, and its damage becomes light' },
    'Seismic': { damage: 5, type: 'earth', description: 'The attack deals 5 extra damage, and its damage becomes earth' },
    'Shadow': { damage: 5, type: 'dark', description: 'The attack deals 5 extra damage, and its damage becomes dark' }
  },
  superior: {
    'Vampire': { 
      damage: 0, 
      type: 'special', 
      description: 'Choose one option: you recover an amount of HP equal to half the HP loss suffered by the target of the attack; or you recover an amount of MP equal to half the HP loss suffered by the target of the attack. This infusion can only be used if the attack targeted a single creature.' 
    },
    'Venom': { 
      damage: 5, 
      type: 'poison', 
      description: 'The attack deals 5 extra damage, its damage becomes poison, and each creature hit by the attack suffers poisoned' 
    }
  }
};

export const TINKERER_MAGITECH = {
  basic: {
    name: 'Magitech Override',
    description: 'You may use an action and spend 10 Mind Points to perform an Opposed 【INS + INS】 Check against a nearby soldier-rank construct you can see. If you succeed, you gain control of the creature until the end of the scene.',
    cost: '10 MP'
  },
  advanced: {
    name: 'Magicannon',
    description: 'You may perform the Inventory action and spend 3 Inventory Points to create a magicannon firearm. Choose the type of damage it deals (air, bolt, earth, fire, ice, or physical). Accuracy: 【DEX + INS】 +1, Damage: 【HR + 10】, Two-handed, Ranged.',
    cost: '3 IP'
  },
  superior: {
    name: 'Magispheres',
    description: 'You develop magisphere prototypes that can replicate spells from Elementalist, Entropist and Spiritist lists. You may perform the Inventory action and spend 2 Inventory Points to create a magisphere and immediately cast one of your prototype spells.',
    cost: '2 IP',
    spellSlots: { base: 3, level20: 2, level40: 2 }
  }
};

// Ace of Cards Deck System - Official 30-Card Rules
export const CARD_SUITS = {
  hearts: { name: 'Hearts', symbol: '♥️', color: 'red', damageType: 'fire' },
  diamonds: { name: 'Diamonds', symbol: '♦️', color: 'red', damageType: 'earth' },
  clubs: { name: 'Clubs', symbol: '♣️', color: 'black', damageType: 'ice' },
  spades: { name: 'Spades', symbol: '♠️', color: 'black', damageType: 'air' }
};

export const CARD_VALUES = {
  1: { name: 'One', value: 1, display: '1' },
  2: { name: 'Two', value: 2, display: '2' },
  3: { name: 'Three', value: 3, display: '3' },
  4: { name: 'Four', value: 4, display: '4' },
  5: { name: 'Five', value: 5, display: '5' },
  6: { name: 'Six', value: 6, display: '6' },
  7: { name: 'Seven', value: 7, display: '7' }
};

// Create 30-card Ace of Cards deck (28 suit cards + 2 jokers)
export const createAceOfCardsDeck = () => {
  const deck = [];
  
  // Add 7 cards per suit (values 1-7)
  Object.keys(CARD_SUITS).forEach(suit => {
    Object.keys(CARD_VALUES).forEach(value => {
      deck.push({
        id: `${value}_${suit}`,
        suit,
        value: parseInt(value),
        isJoker: false,
        display: `${CARD_VALUES[value].display}${CARD_SUITS[suit].symbol}`,
        damageType: CARD_SUITS[suit].damageType
      });
    });
  });
  
  // Add 2 jokers
  deck.push(
    { id: 'joker_1', suit: 'joker', value: 'joker', isJoker: true, display: '🃏', damageType: null },
    { id: 'joker_2', suit: 'joker', value: 'joker', isJoker: true, display: '🃏', damageType: null }
  );
  
  return deck;
};

// Legacy 52-card deck function for compatibility
export const createStandardDeck = () => {
  const deck = [];
  const standardValues = {
    ace: { name: 'Ace', value: 1, display: 'A' },
    2: { name: 'Two', value: 2, display: '2' },
    3: { name: 'Three', value: 3, display: '3' },
    4: { name: 'Four', value: 4, display: '4' },
    5: { name: 'Five', value: 5, display: '5' },
    6: { name: 'Six', value: 6, display: '6' },
    7: { name: 'Seven', value: 7, display: '7' },
    8: { name: 'Eight', value: 8, display: '8' },
    9: { name: 'Nine', value: 9, display: '9' },
    10: { name: 'Ten', value: 10, display: '10' },
    jack: { name: 'Jack', value: 11, display: 'J' },
    queen: { name: 'Queen', value: 12, display: 'Q' },
    king: { name: 'King', value: 13, display: 'K' }
  };
  
  Object.keys(CARD_SUITS).forEach(suit => {
    Object.keys(standardValues).forEach(value => {
      deck.push({
        id: `${value}_${suit}`,
        suit,
        value,
        isJoker: false,
        display: `${standardValues[value].display}${CARD_SUITS[suit].symbol}`
      });
    });
  });
  
  deck.push(
    { id: 'joker_red', suit: 'joker', value: 'joker', isJoker: true, display: '🃏' },
    { id: 'joker_black', suit: 'joker', value: 'joker', isJoker: true, display: '🃏' }
  );
  
  return deck;
};

export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Ace of Cards Set Effects
export const CARD_SET_EFFECTS = {
  'Jackpot': {
    requirement: '4 cards of the same value, none of which is a joker',
    effect: 'You and every ally present on the scene recover 777 Hit Points and 777 Mind Points; any PCs who have surrendered but are still part of the scene immediately regain consciousness (this does not cancel the effects of their Surrender).',
    checkSet: (cards) => {
      if (cards.length !== 4) return false;
      const values = cards.map(c => c.value);
      const hasJoker = cards.some(c => c.isJoker);
      return !hasJoker && values.every(v => v === values[0]);
    }
  },
  'Magic Flush': {
    requirement: '4 cards of consecutive values and of the same suit',
    effect: 'You deal damage equal to 【25 + the total value of the resolved cards】 to each enemy present on the scene; the type of this damage matches the suit of the resolved cards.',
    bonusDamage: { level20: 10, level40: 20 },
    checkSet: (cards) => {
      if (cards.length !== 4) return false;
      const suits = cards.map(c => c.suit);
      const values = cards.map(c => parseInt(c.value)).sort((a, b) => a - b);
      const sameSuit = suits.every(s => s === suits[0] && s !== 'joker');
      const consecutive = values.every((v, i) => i === 0 || v === values[i-1] + 1);
      return sameSuit && consecutive;
    }
  },
  'Blinding Flush': {
    requirement: '4 cards of consecutive values',
    effect: 'You deal damage equal to 【15 + the total value of the resolved cards】 to each enemy present on the scene; the type of this damage is light if the highest value among those cards is even, or dark if that value is odd.',
    bonusDamage: { level20: 10, level40: 20 },
    checkSet: (cards) => {
      if (cards.length !== 4) return false;
      const values = cards.map(c => parseInt(c.value)).sort((a, b) => a - b);
      return values.every((v, i) => i === 0 || v === values[i-1] + 1);
    }
  },
  'Full Status': {
    requirement: '3 cards of the same value + 2 cards of the same value',
    effect: 'Choose two status effects among dazed, shaken, slow, and weak: if 【the highest value among resolved cards】 is even, you and every ally present on the scene recover from the chosen status effects; if odd, each enemy present on the scene suffers them.',
    checkSet: (cards) => {
      if (cards.length !== 5) return false;
      const valueCounts = {};
      cards.forEach(c => {
        const val = c.value;
        valueCounts[val] = (valueCounts[val] || 0) + 1;
      });
      const counts = Object.values(valueCounts).sort((a, b) => b - a);
      return counts.length === 2 && counts[0] === 3 && counts[1] === 2;
    }
  },
  'Triple Support': {
    requirement: '3 cards of the same value',
    effect: 'You and every ally present on the scene regain an amount of Hit Points and Mind Points equal to 【the total value of the resolved cards, multiplied by 3】.',
    checkSet: (cards) => {
      if (cards.length !== 3) return false;
      const values = cards.map(c => c.value);
      return values.every(v => v === values[0]);
    }
  },
  'Double Trouble': {
    requirement: '2 cards of the same value + 2 cards of the same value',
    effect: 'You deal damage equal to 【10 + the highest value among resolved cards】 to each of up to two different enemies you can see that are present on the scene; the type of this damage is one of your choice among those matching the suits of the resolved cards.',
    bonusDamage: { level20: 10, level40: 20 },
    checkSet: (cards) => {
      if (cards.length !== 4) return false;
      const valueCounts = {};
      cards.forEach(c => {
        const val = c.value;
        valueCounts[val] = (valueCounts[val] || 0) + 1;
      });
      const counts = Object.values(valueCounts);
      return counts.length === 2 && counts.every(c => c === 2);
    }
  },
  'Magic Pair': {
    requirement: '2 cards of the same value',
    effect: 'You perform a free attack with a weapon you have equipped. If this attack deals damage, choose a suit among those of the resolved cards; all damage dealt by the attack becomes of the type matching that suit.',
    checkSet: (cards) => {
      if (cards.length !== 2) return false;
      const values = cards.map(c => c.value);
      return values[0] === values[1];
    }
  }
};

// Deck Management Rules
export const ACE_OF_CARDS_RULES = {
  deckSize: 30,
  startingHandSize: 5,
  cardsPerSuit: 7,
  suitCount: 4,
  jokerCount: 2,
  cardValues: [1, 2, 3, 4, 5, 6, 7],
  availableOnlyInConflict: true,
  shuffleAfterConflict: true,
  description: {
    deck: 'Your deck contains exactly 30 cards: 2 jokers, plus 28 cards divided into 4 suits. Each suit contains 7 cards with values 1 to 7. Each suit is associated with a different damage type: air, earth, fire, and ice.',
    conflict: 'When a conflict begins, shuffle all 30 cards and place face down, then draw 5 cards for your starting hand.',
    drawing: 'If you need to draw cards and your deck doesn\'t have enough, draw as many as you can, shuffle your discard pile into the deck, then keep drawing.',
    hand: 'Cards in your hand are normally only visible to you, but you can show them to others if you wish.',
    discard: 'When you discard cards, place them face up in your discard pile in any order you prefer. The order cannot be modified once placed.',
    endOfConflict: 'At the end of each conflict, shuffle all 30 cards back into your deck and put it aside.'
  }
};

// Spiritist Spells
export const SPIRITIST_SPELLS = {
  'Aura': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Scene',
    description: 'You project your soul outside your body and direct it to surround the targets, shielding them from dangerous magic. Until this spell ends, each target may treat their Magic Defense as being equal to 12 against any effects that target it (they are still free to use their normal Defense score if higher than 12).'
  },
  'Awaken': {
    mp: '20',
    target: 'One creature',
    duration: 'Scene',
    description: 'You allow a creature to focus their vital energy into accomplishing what they previously could not. Choose one Attribute: Dexterity, Insight, Might, or Willpower. Until this spell ends, the target treats the chosen Attribute as if it were one die size higher (up to a maximum of d12).'
  },
  'Barrier': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Scene',
    description: 'You project your soul outside your body and weave it into a barrier to protect the targets from attacks. Until this spell ends, each target may treat their Defense as being equal to 12 against any effects that target it (they are still free to use their normal Defense score if higher than 12).'
  },
  'Cleanse': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You strengthen and purify the soul energy coursing through your companions. Each target recovers from all status effects.'
  },
  'Enrage': {
    mp: '10',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You cause a creature to lose any semblance of temper and act brazenly. The target suffers enraged and cannot perform the Guard or Spell actions during their next turn.',
    offensive: true
  },
  'Hallucination': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You alter the senses of your enemies, causing them to experience bizarre or frightening hallucinations. Choose dazed or shaken: you inflict the chosen status effect on each target hit by this spell.',
    offensive: true
  },
  'Heal': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You invigorate your companions, soothing their pain and healing their fatigue. Each target recovers 40 Hit Points. This amount increases to 50 Hit Points if you are level 20 or higher, or to 60 Hit Points if you are level 40 or higher.'
  },
  'Lux': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You focus your inner energy into a barrage of blinding soul rays. Each target hit by this spell suffers 【HR + 15】 light damage. Opportunity: Each target hit by this spell suffers dazed.',
    offensive: true
  },
  'Mercy': {
    mp: '20',
    target: 'One creature',
    duration: 'Scene',
    description: 'You strengthen the heart of a creature against suffering and despair. Until this spell ends, if the target would be reduced to 0 Hit Points, they are instead left standing with exactly 1 Hit Point. Once that happens, this spell ends.'
  },
  'Reinforce': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Scene',
    description: 'You protect the targets from attacks that would corrupt their body and spirit. Choose dazed, enraged, poisoned, shaken, slow, or weak. Until this spell ends, each target becomes immune to the chosen status effect.'
  },
  'Soul Weapon': {
    mp: '10',
    target: 'One equipped weapon',
    duration: 'Scene',
    description: 'You imbue a weapon with the cleansing energy of your spirit. Until this spell ends, all damage dealt by the weapon becomes of the light type. If you have that weapon equipped while you cast this spell, you may perform a free attack with it as part of the same action. This spell can only be cast on a weapon equipped by a willing creature.'
  },
  'Torpor': {
    mp: '5 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'You smother the soul energy coursing through the bodies of your foes, hindering their movements. Choose slow or weak: you inflict the chosen status effect on each target hit by this spell.',
    offensive: true
  }
};

// Entropist Spells
export const ENTROPIST_SPELLS = {
  'Acceleration': {
    mp: '20',
    target: 'One creature',
    duration: 'Scene',
    description: 'You bend the fabric of time. Until this spell ends, the target gains the ability to perform a single additional action during each of their turns. Once the target has performed a total of two additional actions granted by this spell, this spell ends.',
    type: 'time'
  },
  'Anomaly': {
    mp: '20',
    target: 'One creature',
    duration: 'Scene',
    description: 'You alter the very nature of your target. Until this spell ends, if the target would suffer damage of a type they Absorb or are Immune to, they are instead treated as if they were Vulnerable to that damage type. Once that happens, this spell ends.',
    type: 'chaos'
  },
  'Dark Weapon': {
    mp: '10',
    target: 'One equipped weapon',
    duration: 'Scene',
    description: 'You imbue a weapon with dark energy. Until this spell ends, all damage dealt by the weapon becomes of the dark type. If you have that weapon equipped while you cast this spell, you may perform a free attack with it as part of the same action. This spell can only be cast on a weapon equipped by a willing creature.',
    type: 'dark'
  },
  'Dispel': {
    mp: '10',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You release a wave of negative energy and cleanse all magic from a creature. If the target is affected by one or more spells with a duration of Scene, they are no longer affected by any of those spells instead.',
    type: 'chaos'
  },
  'Divination': {
    mp: '10',
    target: 'Self',
    duration: 'Scene',
    description: 'You glimpse briefly into the future. Until this spell ends, after a creature you can see performs a Check, if it was not a fumble nor a critical success, you may force that creature to reroll both dice. Once you have forced two rerolls this way, this spell ends.',
    type: 'time'
  },
  'Drain Spirit': {
    mp: '5',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You consume a creature\'s psyche. The target loses 【HR + 15】 Mind Points. Then, you recover an amount of Mind Points equal to half the Mind Points loss they suffered (if the loss was reduced to 0 in some way, you recover none).',
    type: 'dark'
  },
  'Drain Vigor': {
    mp: '10',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You steal another creature\'s life force. The target suffers 【HR + 15】 dark damage. Then, you recover an amount of Hit Points equal to half the Hit Points loss they suffered (if the loss was reduced to 0 in some way, you recover none).',
    type: 'dark'
  },
  'Gamble': {
    mp: 'up to 20',
    target: 'Special',
    duration: 'Instantaneous',
    description: 'You summon a vortex of chaotic energy. Roll your current Willpower die once for every 10 Mind Points spent while casting this spell, then keep the single die you prefer: the number on that die determines the effects of this spell. 1: You lose half of your current Hit Points and half of your current Mind Points. 2-3: Each creature present on the scene, including yourself, suffers poisoned. 4-6: Each creature present on the scene, including yourself, suffers slow. 7-8: Choose up to three creatures you can see: each of them recovers 50 Hit Points and also recovers from all status effects. 9+: Choose any number of creatures you can see: each of them suffers 30 damage. The damage type is determined randomly by rolling a d6: 1. air 2. bolt 3. dark 4. earth 5. fire 6. poison',
    type: 'chaos'
  },
  'Mirror': {
    mp: '10',
    target: 'One creature',
    duration: 'Scene',
    description: 'You twist the laws of magic. Until this spell ends, if an offensive (rr) spell is cast on the target, the creature who cast that offensive spell will be targeted in their stead (any other targets of the offensive spell will be targeted as normal). Once that happens, this spell ends.',
    type: 'chaos'
  },
  'Omega': {
    mp: '20',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You invoke doom on your foe, turning strength into frailty. The target loses an amount of Hit Points equal to 【20 + half the target\'s level】.',
    type: 'dark'
  },
  'Stop': {
    mp: '10',
    target: 'One creature',
    duration: 'Instantaneous',
    description: 'You trap a foe inside a circle of altered time and space. The target will perform one fewer action on their next turn (to a minimum of 0 actions).',
    type: 'time'
  },
  'Umbra': {
    mp: '10 × T',
    target: 'Up to three creatures',
    duration: 'Instantaneous',
    description: 'A storm of dark energy turns matter into ash. Each target hit by this spell suffers 【HR + 15】 dark damage. Opportunity: Each target hit by this spell suffers weak.',
    type: 'dark'
  }
};

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
  AFFINITY_TYPES,
  DEFAULT_CHARACTER,
  CHARACTER_CREATION_RULES,
  ELEMENTALIST_SPELLS,
  ENTROPIST_SPELLS,
  SPIRITIST_SPELLS,
  TINKERER_ALCHEMY,
  ALCHEMY_TARGETS,
  ALCHEMY_EFFECTS,
  TINKERER_INFUSIONS,
  TINKERER_MAGITECH,
  CARD_SUITS,
  CARD_VALUES,
  createStandardDeck,
  createAceOfCardsDeck,
  shuffleDeck,
  CARD_SET_EFFECTS,
  ACE_OF_CARDS_RULES
};