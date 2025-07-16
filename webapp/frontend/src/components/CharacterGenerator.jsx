import React, { useState } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, STARTING_ATTRIBUTES, DICE_PROGRESSION } from '../../../shared/game_data.js';
import './CharacterGenerator.css';

const CharacterGenerator = () => {
  const [character, setCharacter] = useState({
    name: '',
    level: 1,
    identity: '',
    theme: '',
    origin: '',
    attributes: {
      might: 8,
      dexterity: 8,
      intellect: 8,
      willpower: 8
    },
    classes: {
      primary: null,
      secondary: null
    },
    hitPoints: 40,
    mindPoints: 40,
    inventoryPoints: 6,
    fabulaPoints: 3,
    traits: [],
    bonds: [],
    equipment: []
  });

  const [availablePoints, setAvailablePoints] = useState(STARTING_ATTRIBUTES.total_points);

  const calculateDiceType = (attributeValue) => {
    if (attributeValue >= 12) return 'd12';
    if (attributeValue >= 10) return 'd10';
    if (attributeValue >= 8) return 'd8';
    return 'd6';
  };

  const updateAttribute = (attr, value) => {
    const newValue = Math.max(6, Math.min(10, value));
    const currentTotal = Object.values(character.attributes).reduce((sum, val) => sum + val, 0);
    const newTotal = currentTotal - character.attributes[attr] + newValue;
    
    if (newTotal <= 32) { // 4 attributes * 8 base = 32, +7 points = 39 max
      setCharacter(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attr]: newValue
        }
      }));
      
      const pointsUsed = newTotal - 32;
      setAvailablePoints(STARTING_ATTRIBUTES.total_points - pointsUsed);
    }
  };

  const selectClass = (classKey, slot) => {
    setCharacter(prev => ({
      ...prev,
      classes: {
        ...prev.classes,
        [slot]: classKey
      }
    }));
  };

  const addTrait = (trait) => {
    if (character.traits.length < 3) {
      setCharacter(prev => ({
        ...prev,
        traits: [...prev.traits, trait]
      }));
    }
  };

  const exportCharacter = () => {
    const characterData = {
      ...character,
      diceTypes: {
        might: calculateDiceType(character.attributes.might),
        dexterity: calculateDiceType(character.attributes.dexterity),
        intellect: calculateDiceType(character.attributes.intellect),
        willpower: calculateDiceType(character.attributes.willpower)
      },
      inventoryPoints: character.attributes.might + character.attributes.dexterity,
      created: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
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
          <h2>Attributes (Points remaining: {availablePoints})</h2>
          <div className="attribute-grid">
            {Object.entries(character.attributes).map(([attr, value]) => (
              <div key={attr} className="attribute-control">
                <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}</label>
                <div className="attribute-value">
                  <button onClick={() => updateAttribute(attr, value - 1)}>-</button>
                  <span className="value">{value}</span>
                  <button onClick={() => updateAttribute(attr, value + 1)}>+</button>
                  <span className="dice-type">{calculateDiceType(value)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="classes">
          <h2>Character Classes</h2>
          <div className="class-selection">
            <div className="class-slot">
              <h3>Primary Class</h3>
              <select
                value={character.classes.primary || ''}
                onChange={(e) => selectClass(e.target.value, 'primary')}
              >
                <option value="">Select Primary Class</option>
                {Object.entries(CHARACTER_CLASSES).map(([key, cls]) => (
                  <option key={key} value={key}>{cls.name}</option>
                ))}
              </select>
              {character.classes.primary && (
                <div className="class-info">
                  <p>{CHARACTER_CLASSES[character.classes.primary].description}</p>
                  <p><strong>Primary Attributes:</strong> {CHARACTER_CLASSES[character.classes.primary].primaryAttributes.join(', ')}</p>
                </div>
              )}
            </div>
            
            <div className="class-slot">
              <h3>Secondary Class</h3>
              <select
                value={character.classes.secondary || ''}
                onChange={(e) => selectClass(e.target.value, 'secondary')}
              >
                <option value="">Select Secondary Class</option>
                {Object.entries(CHARACTER_CLASSES).map(([key, cls]) => (
                  <option key={key} value={key}>{cls.name}</option>
                ))}
              </select>
              {character.classes.secondary && (
                <div className="class-info">
                  <p>{CHARACTER_CLASSES[character.classes.secondary].description}</p>
                  <p><strong>Primary Attributes:</strong> {CHARACTER_CLASSES[character.classes.secondary].primaryAttributes.join(', ')}</p>
                </div>
              )}
            </div>
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
              <span>{character.mindPoints + (character.level - 1) * 5}</span>
            </div>
            <div className="stat">
              <label>Inventory Points</label>
              <span>{character.attributes.might + character.attributes.dexterity}</span>
            </div>
            <div className="stat">
              <label>Fabula Points</label>
              <span>{character.fabulaPoints}</span>
            </div>
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