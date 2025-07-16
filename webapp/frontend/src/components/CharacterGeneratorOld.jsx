import React, { useState } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, STARTING_ATTRIBUTES, DICE_PROGRESSION, HEROIC_STYLE_SKILLS, HEXER_SPELLS, CLASS_SKILLS } from '../../../shared/game_data.js';
import CharacterAvatar from './CharacterAvatar';
import './CharacterGenerator.css';

const CharacterGenerator = () => {
  const [character, setCharacter] = useState({
    name: '',
    level: 1,
    identity: '',
    theme: '',
    origin: '',
    attributes: {
      might: null,
      dexterity: null,
      intellect: null,
      willpower: null
    },
    classes: [
      { classKey: null, level: 1, slot: 'primary', skills: {} },
      { classKey: null, level: 1, slot: 'secondary', skills: {} }
    ],
    heroicStyle: null,
    hitPoints: 40,
    mindPoints: 40,
    inventoryPoints: 6,
    fabulaPoints: 3,
    traits: [],
    bonds: [],
    equipment: [],
    avatar_url: null
  });

  const [availableValues, setAvailableValues] = useState(STARTING_ATTRIBUTES.distribution.values);

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

  const getAvailableSkillPoints = (classIndex) => {
    const classData = character.classes[classIndex];
    if (!classData.classKey) return 0;
    
    const totalSkillPoints = classData.level; // 1 skill point per level
    const usedSkillPoints = Object.values(classData.skills).reduce((sum, skillLevel) => sum + skillLevel, 0);
    return totalSkillPoints - usedSkillPoints;
  };

  const updateSkillLevel = (classIndex, skillName, newLevel) => {
    const classData = character.classes[classIndex];
    if (!classData.classKey) return;
    
    const skillData = CLASS_SKILLS[classData.classKey][skillName];
    if (!skillData) return;
    
    const maxLevel = skillData.max_level;
    const currentLevel = classData.skills[skillName] || 0;
    const availablePoints = getAvailableSkillPoints(classIndex);
    
    // Check if we can increase/decrease the skill level
    if (newLevel > currentLevel && availablePoints <= 0) return;
    if (newLevel < 0 || newLevel > maxLevel) return;
    
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.map((cls, i) => {
        if (i === classIndex) {
          const newSkills = { ...cls.skills };
          if (newLevel === 0) {
            delete newSkills[skillName];
          } else {
            newSkills[skillName] = newLevel;
          }
          return { ...cls, skills: newSkills };
        }
        return cls;
      })
    }));
  };

  const selectClass = (classKey, index) => {
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.map((classData, i) => 
        i === index ? { ...classData, classKey } : classData
      )
    }));
  };

  const updateClassLevel = (index, level) => {
    setCharacter(prev => ({
      ...prev,
      classes: prev.classes.map((classData, i) => 
        i === index ? { ...classData, level: Math.max(1, Math.min(10, level)) } : classData
      )
    }));
  };

  const canAddMoreClasses = () => {
    return character.classes.some(classData => classData.level >= 10);
  };

  const addNewClassSlot = () => {
    if (canAddMoreClasses() && character.classes.length < 6) {
      setCharacter(prev => ({
        ...prev,
        classes: [...prev.classes, { classKey: null, level: 1, slot: `tertiary-${prev.classes.length - 1}`, skills: {} }]
      }));
    }
  };

  const removeClassSlot = (index) => {
    if (index >= 2) { // Can't remove primary or secondary slots
      setCharacter(prev => ({
        ...prev,
        classes: prev.classes.filter((_, i) => i !== index)
      }));
    }
  };

  const getClassesBySource = () => {
    const classesBySource = {};
    Object.entries(CHARACTER_CLASSES).forEach(([key, cls]) => {
      const source = cls.source || 'Unknown';
      if (!classesBySource[source]) {
        classesBySource[source] = [];
      }
      classesBySource[source].push({ key, ...cls });
    });
    return classesBySource;
  };

  const renderClassOptions = () => {
    const classesBySource = getClassesBySource();
    const sourceOrder = ['Core Rules', 'Dark Fantasy Classes', 'Playtest Materials'];
    
    return sourceOrder.map(source => {
      if (!classesBySource[source]) return null;
      
      return (
        <optgroup key={source} label={source}>
          {classesBySource[source].map(cls => (
            <option key={cls.key} value={cls.key}>{cls.name}</option>
          ))}
        </optgroup>
      );
    });
  };

  const addTrait = (trait) => {
    if (character.traits.length < 3) {
      setCharacter(prev => ({
        ...prev,
        traits: [...prev.traits, trait]
      }));
    }
  };

  const handleAvatarChange = (avatarData) => {
    if (avatarData) {
      setCharacter(prev => ({
        ...prev,
        avatar_url: avatarData.url,
        avatar_file: avatarData.file
      }));
    } else {
      setCharacter(prev => ({
        ...prev,
        avatar_url: null,
        avatar_file: null
      }));
    }
  };

  const exportCharacter = () => {
    if (!isAttributeDistributionComplete()) {
      alert('Please assign all attribute values before exporting!');
      return;
    }
    
    const totalLevel = character.classes.reduce((sum, classData) => sum + classData.level, 0);
    const characterData = {
      ...character,
      totalLevel,
      diceTypes: {
        might: calculateDiceType(character.attributes.might),
        dexterity: calculateDiceType(character.attributes.dexterity),
        intellect: calculateDiceType(character.attributes.intellect),
        willpower: calculateDiceType(character.attributes.willpower)
      },
      inventoryPoints: character.attributes.might + character.attributes.dexterity,
      created: new Date().toISOString()
    };
    
    // Remove file reference for JSON export (keep only URL)
    const { avatar_file, ...exportData } = characterData;
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'character'}-fabula-ultima.json`;
    a.click();
  };

  return (
    <div className="character-generator">
      <h1>🎮 Fabula Ultima Character Generator</h1>
      
      <div className="character-form">
        {/* Character Avatar Section */}
        <section className="character-avatar-section">
          <CharacterAvatar 
            character={character}
            onAvatarChange={handleAvatarChange}
            size="large"
            showUpload={true}
          />
        </section>

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

        <section className="attributes">
          <h2>Attributes Distribution</h2>
          <div className="attribute-distribution-info">
            <p>Assign these values to your attributes: <strong>10, 10, 8, 6</strong></p>
            <p>Available values: {availableValues.sort((a, b) => b - a).join(', ')}</p>
          </div>
          <div className="attribute-grid">
            {Object.entries(character.attributes).map(([attr, value]) => (
              <div key={attr} className="attribute-control">
                <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}</label>
                <div className="attribute-selection">
                  <select 
                    value={value || ''}
                    onChange={(e) => assignAttributeValue(attr, parseInt(e.target.value))}
                  >
                    <option value="">Select value</option>
                    {availableValues.map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                    {value && <option value={value}>{value}</option>}
                  </select>
                  {value && (
                    <div className="attribute-display">
                      <span className="value">{value}</span>
                      <span className="dice-type">{calculateDiceType(value)}</span>
                      <button 
                        className="clear-btn"
                        onClick={() => clearAttribute(attr)}
                        title="Clear this attribute"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!isAttributeDistributionComplete() && (
            <div className="attribute-reminder">
              <p>💡 Remember to assign all four values to your attributes!</p>
            </div>
          )}
        </section>

        <section className="classes">
          <h2>Character Classes</h2>
          <div className="class-selection">
            {character.classes.map((classData, index) => (
              <div key={index} className="class-slot">
                <div className="class-slot-header">
                  <h3>
                    {index === 0 ? 'Primary Class' : 
                     index === 1 ? 'Secondary Class' : 
                     `Additional Class ${index - 1}`}
                  </h3>
                  {index >= 2 && (
                    <button 
                      className="remove-class-btn"
                      onClick={() => removeClassSlot(index)}
                      title="Remove this class slot"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="class-controls">
                  <select
                    value={classData.classKey || ''}
                    onChange={(e) => selectClass(e.target.value, index)}
                  >
                    <option value="">Select Class</option>
                    {renderClassOptions()}
                  </select>
                  
                  {classData.classKey && (
                    <div className="class-level-control">
                      <label>Level:</label>
                      <button onClick={() => updateClassLevel(index, classData.level - 1)}>-</button>
                      <span className="level-value">{classData.level}</span>
                      <button onClick={() => updateClassLevel(index, classData.level + 1)}>+</button>
                    </div>
                  )}
                </div>

                {classData.classKey && (
                  <div className="class-info">
                    <p>{CHARACTER_CLASSES[classData.classKey].description}</p>
                    <p><strong>Source:</strong> {CHARACTER_CLASSES[classData.classKey].source}</p>
                    <p><strong>Primary Attributes:</strong> {CHARACTER_CLASSES[classData.classKey].primaryAttributes.join(', ')}</p>
                    {CHARACTER_CLASSES[classData.classKey].abilities && (
                      <p><strong>Abilities:</strong> {CHARACTER_CLASSES[classData.classKey].abilities.join(', ')}</p>
                    )}
                    {CHARACTER_CLASSES[classData.classKey].freeBenefits && (
                      <p><strong>Free Benefits:</strong> {CHARACTER_CLASSES[classData.classKey].freeBenefits.join(', ')}</p>
                    )}
                    {CHARACTER_CLASSES[classData.classKey].startingEquipment && (
                      <p><strong>Starting Equipment:</strong> {CHARACTER_CLASSES[classData.classKey].startingEquipment.join(', ')}</p>
                    )}
                    
                    {/* Skills Section */}
                    {classData.level > 0 && CLASS_SKILLS[classData.classKey] && (
                      <div className="skills-section">
                        <h4>Skills (Available Points: {getAvailableSkillPoints(index)})</h4>
                        <div className="skills-grid">
                          {Object.entries(CLASS_SKILLS[classData.classKey]).map(([skillName, skillData]) => {
                            const currentLevel = classData.skills[skillName] || 0;
                            return (
                              <div key={skillName} className="skill-item">
                                <div className="skill-header">
                                  <h5>{skillName}</h5>
                                  <div className="skill-level-controls">
                                    <button 
                                      onClick={() => updateSkillLevel(index, skillName, currentLevel - 1)}
                                      disabled={currentLevel <= 0}
                                    >
                                      -
                                    </button>
                                    <span className="skill-level">{currentLevel}/{skillData.max_level}</span>
                                    <button 
                                      onClick={() => updateSkillLevel(index, skillName, currentLevel + 1)}
                                      disabled={currentLevel >= skillData.max_level || getAvailableSkillPoints(index) <= 0}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div className="skill-info">
                                  <p>{skillData.description}</p>
                                  <div className="skill-details">
                                    <span className="skill-type">{skillData.type}</span>
                                    {skillData.mp_cost > 0 && (
                                      <span className="skill-mp">MP: {skillData.mp_cost}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {canAddMoreClasses() && character.classes.length < 6 && (
              <div className="add-class-slot">
                <button 
                  className="add-class-btn"
                  onClick={addNewClassSlot}
                  title="Add another class (requires level 10+ in any class)"
                >
                  + Add Class
                </button>
                <p className="add-class-hint">
                  You can add more classes when you reach level 10 in any class
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="character-stats">
          <h2>Character Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <label>Hit Points</label>
              <span>{character.hitPoints + (character.level - 1) * 5}</span>
            </div>
            <div className="stat">
              <label>Mind Points</label>
              <span>
                {character.mindPoints + (character.level - 1) * 5 + 
                (character.classes.some(classData => classData.classKey === 'HEXER') ? 5 : 0)}
                {character.classes.some(classData => classData.classKey === 'HEXER') && 
                  <small> (+5 from Hexer)</small>
                }
              </span>
            </div>
            <div className="stat">
              <label>Inventory Points</label>
              <span>
                {(character.attributes.might || 0) + (character.attributes.dexterity || 0)}
                {!isAttributeDistributionComplete() && <small> (incomplete)</small>}
              </span>
            </div>
            <div className="stat">
              <label>Fabula Points</label>
              <span>{character.fabulaPoints}</span>
            </div>
          </div>
        </section>

        <section className="heroic-styles">
          <h2>Heroic Style Skills (Optional)</h2>
          <div className="heroic-style-selection">
            <select
              value={character.heroicStyle || ''}
              onChange={(e) => setCharacter(prev => ({ ...prev, heroicStyle: e.target.value || null }))}
            >
              <option value="">No Heroic Style</option>
              {Object.entries(HEROIC_STYLE_SKILLS).map(([key, style]) => (
                <option key={key} value={key}>{style.name}</option>
              ))}
            </select>
            {character.heroicStyle && (
              <div className="heroic-style-info">
                <p>{HEROIC_STYLE_SKILLS[character.heroicStyle].description}</p>
                <p><strong>Requirements:</strong> {HEROIC_STYLE_SKILLS[character.heroicStyle].requirements.join(', ')}</p>
                <p><strong>Source:</strong> {HEROIC_STYLE_SKILLS[character.heroicStyle].source}</p>
              </div>
            )}
          </div>
        </section>

        <section className="traits">
          <h2>Traits ({character.traits.length}/3)</h2>
          <div className="trait-input">
            <input
              type="text"
              placeholder="Enter a trait..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addTrait(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          </div>
          <div className="trait-list">
            {character.traits.map((trait, index) => (
              <span key={index} className="trait-tag">
                {trait}
                <button onClick={() => {
                  setCharacter(prev => ({
                    ...prev,
                    traits: prev.traits.filter((_, i) => i !== index)
                  }));
                }}>×</button>
              </span>
            ))}
          </div>
        </section>

        <section className="actions">
          <button className="export-btn" onClick={exportCharacter}>
            💾 Export Character
          </button>
          <button className="reset-btn" onClick={() => window.location.reload()}>
            🔄 Reset
          </button>
        </section>
      </div>
    </div>
  );
};

export default CharacterGenerator;