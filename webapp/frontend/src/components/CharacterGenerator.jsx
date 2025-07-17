import React, { useState } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, STARTING_ATTRIBUTES, HEROIC_STYLE_SKILLS, DEFAULT_CHARACTER } from '../shared/complete_game_data.js';
import CharacterAvatar from './CharacterAvatar';
import './CharacterGenerator.css';

const CharacterGenerator = ({ onCharacterChange }) => {
  const [character, setCharacter] = useState({
    ...DEFAULT_CHARACTER,
    classes: [
      { classKey: null, level: 1, abilities: {}, slot: 'primary' }
    ]
  });

  const [availableValues, setAvailableValues] = useState(STARTING_ATTRIBUTES.distribution.values);

  // Notify parent component when character changes
  useEffect(() => {
    if (onCharacterChange) {
      onCharacterChange(character);
    }
  }, [character, onCharacterChange]);

  const calculateDiceType = (attributeValue) => {
    return STARTING_ATTRIBUTES.dice_mapping[attributeValue] || 'd6';
  };

  const assignAttributeValue = (attr, value) => {
    // Check if the value is available
    if (!availableValues.includes(value)) return;
    
    // If the attribute already has a value, return it to available values
    const currentValue = character.attributes[attr];
    let newAvailableValues = [...availableValues];
    
    if (currentValue !== null) {
      newAvailableValues.push(currentValue);
    }
    
    // Remove the assigned value from available values
    const valueIndex = newAvailableValues.indexOf(value);
    if (valueIndex > -1) {
      newAvailableValues.splice(valueIndex, 1);
    }
    
    // Update state
    setAvailableValues(newAvailableValues);
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attr]: value
      }
    }));
  };

  const clearAttribute = (attr) => {
    const currentValue = character.attributes[attr];
    if (currentValue !== null) {
      setAvailableValues(prev => [...prev, currentValue].sort((a, b) => b - a));
      setCharacter(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attr]: null
        }
      }));
    }
  };

  const isAttributeDistributionComplete = () => {
    return Object.values(character.attributes).every(val => val !== null);
  };

  const updateClass = (classIndex, classKey) => {
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.map((cls, index) => 
        index === classIndex 
          ? { ...cls, classKey: classKey, level: 1, abilities: {} }
          : cls
      )
    }));
  };

  const removeClass = (classIndex) => {
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.filter((_, index) => index !== classIndex)
    }));
  };

  const addNewClass = () => {
    // Check if character has a class at level 10
    const hasLevel10Class = character.classes.some(cls => cls.level >= 10);
    if (!hasLevel10Class && character.classes.length >= 2) {
      alert('You need at least one class at level 10 to add more classes.');
      return;
    }

    setCharacter(prev => ({
      ...prev,
      classes: [...prev.classes, { classKey: null, level: 1, abilities: {}, slot: 'additional' }]
    }));
  };

  const toggleAbility = (classIndex, abilityKey) => {
    const classData = character.classes[classIndex];
    if (!classData.classKey) return;

    const classInfo = CHARACTER_CLASSES[classData.classKey];
    const ability = classInfo.abilities[abilityKey];
    
    if (!ability) return;

    const currentlyHasAbility = classData.abilities[abilityKey];
    
    if (currentlyHasAbility) {
      // Remove ability and decrease level
      setCharacter(prev => ({
        ...prev,
        classes: prev.classes.map((cls, index) => 
          index === classIndex 
            ? { 
                ...cls, 
                level: Math.max(1, cls.level - 1),
                abilities: {
                  ...cls.abilities,
                  [abilityKey]: false
                }
              }
            : cls
        )
      }));
    } else {
      // Add ability and increase level
      setCharacter(prev => ({
        ...prev,
        classes: prev.classes.map((cls, index) => 
          index === classIndex 
            ? { 
                ...cls, 
                level: cls.level + 1,
                abilities: {
                  ...cls.abilities,
                  [abilityKey]: true
                }
              }
            : cls
        )
      }));
    }
  };

  const getAvailableAbilities = (classIndex) => {
    const classData = character.classes[classIndex];
    if (!classData.classKey) return [];

    const classInfo = CHARACTER_CLASSES[classData.classKey];
    if (!classInfo.abilities) return [];

    return Object.entries(classInfo.abilities)
      .filter(([key, ability]) => {
        // Check if ability is available based on class level
        const requiredLevel = ability.level || 1;
        const currentLevel = classData.level;
        
        // If ability is already selected, always show it
        if (classData.abilities[key]) return true;
        
        // If not selected, check if we have enough level
        return currentLevel >= requiredLevel;
      })
      .map(([key, ability]) => ({
        key,
        ...ability,
        hasAbility: classData.abilities[key] || false
      }));
  };

  const addHeroicStyle = (styleName) => {
    if (character.heroicStyles.includes(styleName)) return;
    
    setCharacter(prev => ({
      ...prev,
      heroicStyles: [...prev.heroicStyles, styleName]
    }));
  };

  const removeHeroicStyle = (styleName) => {
    setCharacter(prev => ({
      ...prev,
      heroicStyles: prev.heroicStyles.filter(style => style !== styleName)
    }));
  };

  const addTrait = (trait) => {
    if (trait.trim() && !character.traits.includes(trait.trim())) {
      setCharacter(prev => ({
        ...prev,
        traits: [...prev.traits, trait.trim()]
      }));
    }
  };

  const removeTrait = (trait) => {
    setCharacter(prev => ({
      ...prev,
      traits: prev.traits.filter(t => t !== trait)
    }));
  };

  const calculateTotalLevel = () => {
    return character.classes.reduce((total, cls) => total + cls.level, 0);
  };

  const calculateResources = () => {
    let hp = 40;
    let mp = 40;
    let ip = 5; // SET TO 5 AS REQUESTED
    
    // Add class benefits
    character.classes.forEach(cls => {
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

  const exportCharacter = () => {
    const resources = calculateResources();
    const exportData = {
      ...character,
      resources,
      totalLevel: calculateTotalLevel(),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${character.name || 'character'}_fabula_ultima.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const resetCharacter = () => {
    if (confirm('Are you sure you want to reset the character? This will clear all data.')) {
      setCharacter({
        ...DEFAULT_CHARACTER,
        classes: [
          { classKey: null, level: 1, abilities: {}, slot: 'primary' }
        ]
      });
      setAvailableValues(STARTING_ATTRIBUTES.distribution.values);
    }
  };

  const resources = calculateResources();

  return (
    <div className="character-generator">
      <h1>🎭 Fabula Ultima Character Generator</h1>
      
      <div className="character-form">
        {/* Character Avatar */}
        <section className="character-avatar-section">
          <CharacterAvatar 
            character={character} 
            onAvatarChange={(avatar_url) => setCharacter(prev => ({ ...prev, avatar_url }))}
          />
        </section>

        {/* Basic Information */}
        <section className="basic-info">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Character Name"
              value={character.name}
              onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Identity"
              value={character.identity}
              onChange={(e) => setCharacter(prev => ({ ...prev, identity: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Theme"
              value={character.theme}
              onChange={(e) => setCharacter(prev => ({ ...prev, theme: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Origin"
              value={character.origin}
              onChange={(e) => setCharacter(prev => ({ ...prev, origin: e.target.value }))}
            />
          </div>
        </section>

        {/* Attributes */}
        <section className="attributes">
          <h2>Attributes</h2>
          <div className="attribute-distribution-info">
            <p><strong>Attribute Distribution:</strong> {STARTING_ATTRIBUTES.distribution.description}</p>
            <p><strong>Available Values:</strong> {availableValues.join(', ')}</p>
          </div>
          
          <div className="attribute-grid">
            {Object.keys(ATTRIBUTES).map(attr => (
              <div key={attr} className="attribute-control">
                <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}</label>
                {character.attributes[attr] !== null ? (
                  <div className="attribute-display">
                    <span className="value">{character.attributes[attr]}</span>
                    <span className="dice-type">{calculateDiceType(character.attributes[attr])}</span>
                    <button 
                      className="clear-btn"
                      onClick={() => clearAttribute(attr)}
                      title="Clear attribute"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="attribute-selection">
                    <select 
                      onChange={(e) => assignAttributeValue(attr, parseInt(e.target.value))}
                      value=""
                    >
                      <option value="">Select Value</option>
                      {availableValues.map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {availableValues.length > 0 && (
            <div className="attribute-reminder">
              <p>You still have {availableValues.length} attribute value(s) to assign.</p>
            </div>
          )}
        </section>

        {/* Classes */}
        <section className="classes">
          <h2>Classes & Abilities</h2>
          <div className="class-selection">
            {character.classes.map((classData, index) => (
              <div key={index} className="class-slot">
                <div className="class-slot-header">
                  <h3>Class {index + 1} {classData.slot && `(${classData.slot})`}</h3>
                  {character.classes.length > 1 && (
                    <button 
                      className="remove-class-btn"
                      onClick={() => removeClass(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="class-controls">
                  <select
                    value={classData.classKey || ''}
                    onChange={(e) => updateClass(index, e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {Object.entries(CHARACTER_CLASSES).map(([key, cls]) => (
                      <option key={key} value={key}>{cls.name}</option>
                    ))}
                  </select>
                  
                  <div className="class-level-display">
                    <span>Level: {classData.level}</span>
                  </div>
                </div>
                
                {classData.classKey && (
                  <div className="class-info">
                    <p><strong>Description:</strong> {CHARACTER_CLASSES[classData.classKey].description}</p>
                    <p><strong>Primary Attributes:</strong> {CHARACTER_CLASSES[classData.classKey].primaryAttributes.join(', ')}</p>
                    <p><strong>Free Benefits:</strong> {CHARACTER_CLASSES[classData.classKey].freeBenefits.join(', ')}</p>
                    <p><strong>Source:</strong> {CHARACTER_CLASSES[classData.classKey].source}</p>
                  </div>
                )}

                {/* Abilities Section */}
                {classData.classKey && (
                  <div className="abilities-section">
                    <h4>🎯 Class Abilities</h4>
                    <p><em>Select abilities to level up your class. Each ability selection increases class level by 1.</em></p>
                    
                    <div className="abilities-grid">
                      {getAvailableAbilities(index).map(ability => (
                        <div key={ability.key} className="ability-item">
                          <div className="ability-header">
                            <h5>{ability.key}</h5>
                            <label className="ability-toggle">
                              <input
                                type="checkbox"
                                checked={ability.hasAbility}
                                onChange={() => toggleAbility(index, ability.key)}
                              />
                              <span className="ability-checkbox"></span>
                            </label>
                          </div>
                          
                          <div className="ability-info">
                            <p><strong>Type:</strong> {ability.type}</p>
                            <p><strong>Cost:</strong> {ability.cost}</p>
                            <p><strong>Required Level:</strong> {ability.level || 1}</p>
                            <p><strong>Description:</strong> {ability.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Add New Class Button */}
            <div className="add-class-slot">
              <button 
                className="add-class-btn"
                onClick={addNewClass}
              >
                ➕ Add New Class
              </button>
              <p className="add-class-hint">
                {character.classes.length >= 2 && !character.classes.some(cls => cls.level >= 10) 
                  ? 'Need one class at level 10 to add more classes'
                  : 'Unlimited multiclassing supported'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Heroic Style Skills */}
        <section className="heroic-styles">
          <h2>Heroic Style Skills</h2>
          <div className="heroic-style-selection">
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  addHeroicStyle(e.target.value);
                  e.target.value = '';
                }
              }}
            >
              <option value="">Add Heroic Style</option>
              {Object.entries(HEROIC_STYLE_SKILLS)
                .filter(([key, _]) => !character.heroicStyles.includes(key))
                .map(([key, style]) => (
                  <option key={key} value={key}>{key}</option>
                ))}
            </select>
            
            <div className="heroic-styles-list">
              {character.heroicStyles.map(styleName => (
                <div key={styleName} className="heroic-style-tag">
                  <span>{styleName}</span>
                  <button onClick={() => removeHeroicStyle(styleName)}>×</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Character Stats */}
        <section className="character-stats">
          <h2>Character Stats</h2>
          <div className="stats-grid">
            <div className="stat">
              <label>Total Level</label>
              <span>{calculateTotalLevel()}</span>
            </div>
            <div className="stat">
              <label>Hit Points</label>
              <span>{resources.hp}</span>
            </div>
            <div className="stat">
              <label>Mind Points</label>
              <span>{resources.mp}</span>
            </div>
            <div className="stat">
              <label>Inventory Points</label>
              <span>{resources.ip}</span>
            </div>
            <div className="stat">
              <label>Fabula Points</label>
              <span>{character.fabulaPoints}</span>
            </div>
          </div>
        </section>

        {/* Character Traits */}
        <section className="traits">
          <h2>Character Traits</h2>
          <div className="trait-input">
            <input
              type="text"
              placeholder="Add a character trait"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTrait(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
          <div className="trait-list">
            {character.traits.map(trait => (
              <div key={trait} className="trait-tag">
                <span>{trait}</span>
                <button onClick={() => removeTrait(trait)}>×</button>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="actions">
          <button className="export-btn" onClick={exportCharacter}>
            📄 Export Character
          </button>
          <button className="reset-btn" onClick={resetCharacter}>
            🔄 Reset Character
          </button>
        </section>
      </div>
    </div>
  );
};

export default CharacterGenerator;