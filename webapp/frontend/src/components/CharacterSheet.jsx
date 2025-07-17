import React, { useState, useEffect } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, STARTING_ATTRIBUTES, HEROIC_STYLE_SKILLS, DEFAULT_CHARACTER } from '../../../shared/complete_game_data.js';
import { BASIC_WEAPONS } from '../../../shared/game_data.js';
import IntegratedDiceRoller from './IntegratedDiceRoller';
import CharacterAvatar from './CharacterAvatar';
import './CharacterSheet.css';

const CharacterSheet = ({ character: initialCharacter, onCharacterChange }) => {
  // Create a demo character with sample data
  const createDemoCharacter = () => ({
    ...DEFAULT_CHARACTER,
    name: 'Demo Character',
    identity: 'Brave Warrior',
    theme: 'Justice',
    origin: 'Noble House',
    attributes: {
      dexterity: 10,
      insight: 8,
      might: 12,
      willpower: 6
    },
    classes: [
      { 
        classKey: 'guardian', 
        level: 5, 
        abilities: {
          'Martial Melee': true,
          'Protect': true,
          'Taunt': true
        }, 
        slot: 'primary' 
      }
    ],
    traits: ['Brave', 'Loyal', 'Protective'],
    heroicStyles: ['Bodyguard', 'Counterattack']
  });

  const [character, setCharacter] = useState(initialCharacter || createDemoCharacter());
  const [activeTab, setActiveTab] = useState('overview');
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Steel Sword',
      type: 'weapons',
      quantity: 1,
      weight: 2,
      value: 200,
      damage: 'HR + 5',
      handedness: 'One-handed',
      equipped: true
    },
    {
      id: 2,
      name: 'Iron Shield',
      type: 'armor',
      quantity: 1,
      weight: 3,
      value: 150,
      equipped: true
    }
  ]);
  const [combat, setCombat] = useState({
    hp: { current: 40, max: 40 },
    mp: { current: 40, max: 40 },
    ip: { current: 5, max: 5 },
    status: 'healthy',
    conditions: []
  });

  useEffect(() => {
    if (initialCharacter) {
      setCharacter(initialCharacter);
      updateCombatStats(initialCharacter);
    }
  }, [initialCharacter]);

  useEffect(() => {
    if (onCharacterChange) {
      onCharacterChange(character);
    }
  }, [character, onCharacterChange]);

  const updateCombatStats = (char) => {
    const resources = calculateResources(char);
    setCombat(prev => ({
      ...prev,
      hp: { current: Math.min(prev.hp.current, resources.hp), max: resources.hp },
      mp: { current: Math.min(prev.mp.current, resources.mp), max: resources.mp },
      ip: { current: Math.min(prev.ip.current, resources.ip), max: resources.ip }
    }));
  };

  const calculateResources = (char) => {
    let hp = 40;
    let mp = 40;
    let ip = 5;
    
    // Add class benefits
    char.classes.forEach(cls => {
      if (cls.classKey) {
        const classInfo = CHARACTER_CLASSES[cls.classKey];
        if (classInfo.freeBenefits) {
          classInfo.freeBenefits.forEach(benefit => {
            if (benefit.includes('HP +5')) hp += 5;
            if (benefit.includes('MP +5')) mp += 5;
            if (benefit.includes('IP +2')) ip += 2;
          });
        }
      }
    });

    return { hp, mp, ip };
  };

  const getDiceType = (attributeValue) => {
    return STARTING_ATTRIBUTES.dice_mapping[attributeValue] || 'd6';
  };

  const getWeaponDamage = (weapon) => {
    if (!weapon.damage) return 0;
    
    // Extract damage from string like "HR + 5" or "8"
    const damageStr = weapon.damage.toString();
    if (damageStr.includes('HR')) {
      // High Roll damage - return the modifier
      const match = damageStr.match(/HR\s*\+\s*(\d+)/);
      return match ? parseInt(match[1]) : 0;
    } else {
      // Fixed damage
      return parseInt(damageStr) || 0;
    }
  };

  const handleWeaponAttack = (weapon) => {
    // Determine attack attributes based on weapon type
    let attr1 = 'dexterity';
    let attr2 = 'might';
    let rollType = 'weapon-attack';
    
    if (weapon.type === 'ranged') {
      attr1 = 'dexterity';
      attr2 = 'insight';
    } else if (weapon.type === 'arcane') {
      attr1 = 'insight';
      attr2 = 'willpower';
    }

    const weaponDamage = getWeaponDamage(weapon);
    
    // The IntegratedDiceRoller will handle the actual roll
    return {
      type: rollType,
      weapon: weapon.name,
      attributes: [attr1, attr2],
      modifier: weaponDamage,
      description: `${weapon.name} Attack`
    };
  };

  const handleResourceChange = (resource, value) => {
    setCombat(prev => ({
      ...prev,
      [resource]: {
        ...prev[resource],
        current: Math.max(0, Math.min(prev[resource].max, value))
      }
    }));
  };

  const addCondition = (condition) => {
    setCombat(prev => ({
      ...prev,
      conditions: [...prev.conditions, condition]
    }));
  };

  const removeCondition = (index) => {
    setCombat(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const getEquippedWeapons = () => {
    return inventory.filter(item => item.type === 'weapons' && item.equipped);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'combat', name: 'Combat', icon: '⚔️' },
    { id: 'inventory', name: 'Inventory', icon: '🎒' },
    { id: 'abilities', name: 'Abilities', icon: '🎯' }
  ];

  const conditions = [
    'Slow', 'Dazed', 'Weak', 'Shaken', 'Angry', 'Confused', 
    'Enraged', 'Poisoned', 'Bleeding', 'Stunned', 'Paralyzed'
  ];

  return (
    <div className="character-sheet">
      <div className="character-header">
        <div className="character-avatar-section">
          <CharacterAvatar 
            character={character} 
            onAvatarChange={(avatar_url) => setCharacter(prev => ({ ...prev, avatar_url }))}
          />
        </div>
        
        <div className="character-basic-info">
          <h1 className="character-name">{character.name || 'Unnamed Character'}</h1>
          <div className="character-details">
            <span className="character-identity">{character.identity}</span>
            <span className="character-theme">{character.theme}</span>
            <span className="character-origin">{character.origin}</span>
          </div>
          <div className="character-level">
            Level {character.classes.reduce((total, cls) => total + cls.level, 0)}
          </div>
        </div>

        <div className="character-resources">
          <div className="resource-bar">
            <label>HP</label>
            <div className="resource-display">
              <input 
                type="number" 
                value={combat.hp.current} 
                onChange={(e) => handleResourceChange('hp', parseInt(e.target.value))}
                max={combat.hp.max}
                min={0}
              />
              <span>/ {combat.hp.max}</span>
            </div>
            <div className="resource-bar-visual">
              <div 
                className="resource-fill hp-fill" 
                style={{ width: `${(combat.hp.current / combat.hp.max) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="resource-bar">
            <label>MP</label>
            <div className="resource-display">
              <input 
                type="number" 
                value={combat.mp.current} 
                onChange={(e) => handleResourceChange('mp', parseInt(e.target.value))}
                max={combat.mp.max}
                min={0}
              />
              <span>/ {combat.mp.max}</span>
            </div>
            <div className="resource-bar-visual">
              <div 
                className="resource-fill mp-fill" 
                style={{ width: `${(combat.mp.current / combat.mp.max) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="resource-bar">
            <label>IP</label>
            <div className="resource-display">
              <input 
                type="number" 
                value={combat.ip.current} 
                onChange={(e) => handleResourceChange('ip', parseInt(e.target.value))}
                max={combat.ip.max}
                min={0}
              />
              <span>/ {combat.ip.max}</span>
            </div>
            <div className="resource-bar-visual">
              <div 
                className="resource-fill ip-fill" 
                style={{ width: `${(combat.ip.current / combat.ip.max) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="character-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      <div className="character-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="attributes-section">
              <h3>📊 Attributes</h3>
              <div className="attributes-grid">
                {Object.entries(character.attributes).map(([attr, value]) => (
                  <div key={attr} className="attribute-display">
                    <div className="attribute-name">{attr.charAt(0).toUpperCase() + attr.slice(1)}</div>
                    <div className="attribute-value">{value}</div>
                    <div className="attribute-dice">{getDiceType(value)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="classes-section">
              <h3>🎭 Classes</h3>
              <div className="classes-list">
                {character.classes.map((cls, index) => (
                  <div key={index} className="class-display">
                    <div className="class-header">
                      <span className="class-name">
                        {cls.classKey ? CHARACTER_CLASSES[cls.classKey].name : 'No Class'}
                      </span>
                      <span className="class-level">Level {cls.level}</span>
                    </div>
                    {cls.classKey && (
                      <div className="class-benefits">
                        {CHARACTER_CLASSES[cls.classKey].freeBenefits.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="traits-section">
              <h3>✨ Traits</h3>
              <div className="traits-list">
                {character.traits.map((trait, index) => (
                  <div key={index} className="trait-tag">{trait}</div>
                ))}
              </div>
            </div>

            <div className="heroic-styles-section">
              <h3>🌟 Heroic Styles</h3>
              <div className="heroic-styles-list">
                {character.heroicStyles.map((style, index) => (
                  <div key={index} className="heroic-style-tag">{style}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'combat' && (
          <div className="combat-tab">
            <div className="combat-status">
              <h3>⚔️ Combat Status</h3>
              <div className="status-conditions">
                <div className="conditions-list">
                  {combat.conditions.map((condition, index) => (
                    <div key={index} className="condition-tag">
                      {condition}
                      <button onClick={() => removeCondition(index)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="add-condition">
                  <select onChange={(e) => {
                    if (e.target.value) {
                      addCondition(e.target.value);
                      e.target.value = '';
                    }
                  }}>
                    <option value="">Add Condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="equipped-weapons">
              <h3>🗡️ Equipped Weapons</h3>
              <div className="weapons-list">
                {getEquippedWeapons().map(weapon => (
                  <div key={weapon.id} className="weapon-item">
                    <div className="weapon-header">
                      <span className="weapon-name">{weapon.name}</span>
                      <span className="weapon-type">{weapon.type}</span>
                    </div>
                    <div className="weapon-stats">
                      <span>Damage: {weapon.damage}</span>
                      <span>{weapon.handedness}</span>
                      {weapon.special && <span>Special: {weapon.special}</span>}
                    </div>
                    <button 
                      className="weapon-attack-btn"
                      onClick={() => handleWeaponAttack(weapon)}
                    >
                      🎯 Attack
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <IntegratedDiceRoller 
              character={character} 
              onRollResult={(result) => {
                // Handle roll results for combat
                console.log('Roll result:', result);
              }}
            />
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="inventory-tab">
            <h3>🎒 Inventory</h3>
            <div className="inventory-grid">
              {inventory.map(item => (
                <div key={item.id} className="inventory-item">
                  <div className="item-header">
                    <span className="item-name">{item.name}</span>
                    <span className="item-type">{item.type}</span>
                  </div>
                  <div className="item-stats">
                    <span>Qty: {item.quantity}</span>
                    <span>Weight: {item.weight}</span>
                    <span>Value: {item.value}z</span>
                  </div>
                  {item.type === 'weapons' && (
                    <div className="weapon-controls">
                      <button 
                        className={`equip-btn ${item.equipped ? 'equipped' : ''}`}
                        onClick={() => {
                          setInventory(prev => prev.map(i => 
                            i.id === item.id ? { ...i, equipped: !i.equipped } : i
                          ));
                        }}
                      >
                        {item.equipped ? '✓ Equipped' : 'Equip'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'abilities' && (
          <div className="abilities-tab">
            <h3>🎯 Class Abilities</h3>
            <div className="abilities-list">
              {character.classes.map((cls, classIndex) => (
                <div key={classIndex} className="class-abilities">
                  {cls.classKey && (
                    <>
                      <h4>{CHARACTER_CLASSES[cls.classKey].name} Abilities</h4>
                      <div className="abilities-grid">
                        {Object.entries(cls.abilities).filter(([_, hasAbility]) => hasAbility).map(([abilityKey, _]) => {
                          const ability = CHARACTER_CLASSES[cls.classKey].abilities[abilityKey];
                          return (
                            <div key={abilityKey} className="ability-card">
                              <div className="ability-header">
                                <span className="ability-name">{abilityKey}</span>
                                <span className="ability-type">{ability.type}</span>
                              </div>
                              <div className="ability-cost">Cost: {ability.cost}</div>
                              <div className="ability-description">{ability.description}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSheet;