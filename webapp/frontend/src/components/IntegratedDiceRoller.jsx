import React, { useState, useEffect } from 'react';
import './IntegratedDiceRoller.css';

const IntegratedDiceRoller = ({ character, onRollResult }) => {
  const [rollHistory, setRollHistory] = useState([]);
  const [currentRoll, setCurrentRoll] = useState({
    attribute1: { type: 'd6', value: 0, name: 'Dexterity' },
    attribute2: { type: 'd6', value: 0, name: 'Insight' },
    modifier: 0,
    total: 0,
    isHighRoll: false,
    isCritical: false,
    isFumble: false,
    description: 'Attribute Check'
  });

  const rollDice = (diceType) => {
    const diceValues = {
      'd6': 6,
      'd8': 8,
      'd10': 10,
      'd12': 12
    };
    
    return Math.floor(Math.random() * diceValues[diceType]) + 1;
  };

  const getDiceMax = (diceType) => {
    return parseInt(diceType.slice(1));
  };

  const getAttributeDiceType = (attributeName) => {
    if (!character || !character.attributes || !character.attributes[attributeName.toLowerCase()]) {
      return 'd8'; // Default to d8 in demo mode
    }
    
    const value = character.attributes[attributeName.toLowerCase()];
    const diceMapping = {
      6: 'd6',
      8: 'd8',
      10: 'd10',
      12: 'd12'
    };
    
    return diceMapping[value] || 'd8';
  };

  const performRoll = () => {
    const roll1 = rollDice(currentRoll.attribute1.type);
    const roll2 = rollDice(currentRoll.attribute2.type);
    
    const total = roll1 + roll2 + currentRoll.modifier;
    const isHighRoll = roll1 === getDiceMax(currentRoll.attribute1.type) || 
                      roll2 === getDiceMax(currentRoll.attribute2.type);
    const isCritical = roll1 === getDiceMax(currentRoll.attribute1.type) && 
                      roll2 === getDiceMax(currentRoll.attribute2.type);
    const isFumble = roll1 === 1 && roll2 === 1;

    const newRoll = {
      ...currentRoll,
      attribute1: { ...currentRoll.attribute1, value: roll1 },
      attribute2: { ...currentRoll.attribute2, value: roll2 },
      total,
      isHighRoll,
      isCritical,
      isFumble,
      timestamp: new Date().toLocaleTimeString(),
      character: (character && character.name) || 'Demo Character'
    };

    setCurrentRoll(newRoll);
    setRollHistory(prev => [newRoll, ...prev.slice(0, 9)]);
    
    if (onRollResult) {
      onRollResult(newRoll);
    }
  };

  const performQuickRoll = (rollType) => {
    let attr1, attr2, description;
    
    switch(rollType) {
      case 'attack':
        attr1 = 'Dexterity';
        attr2 = 'Might';
        description = 'Attack Roll';
        break;
      case 'magic':
        attr1 = 'Insight';
        attr2 = 'Willpower';
        description = 'Magic Roll';
        break;
      case 'defense':
        attr1 = 'Dexterity';
        attr2 = 'Insight';
        description = 'Defense Roll';
        break;
      case 'initiative':
        attr1 = 'Dexterity';
        attr2 = 'Insight';
        description = 'Initiative Roll';
        break;
      default:
        attr1 = 'Dexterity';
        attr2 = 'Insight';
        description = 'Attribute Check';
    }

    const rollData = {
      attribute1: { 
        type: getAttributeDiceType(attr1), 
        value: 0, 
        name: attr1 
      },
      attribute2: { 
        type: getAttributeDiceType(attr2), 
        value: 0, 
        name: attr2 
      },
      modifier: 0,
      total: 0,
      isHighRoll: false,
      isCritical: false,
      isFumble: false,
      description
    };

    setCurrentRoll(rollData);
    
    // Perform the roll immediately
    setTimeout(() => {
      const roll1 = rollDice(rollData.attribute1.type);
      const roll2 = rollDice(rollData.attribute2.type);
      
      const total = roll1 + roll2 + rollData.modifier;
      const isHighRoll = roll1 === getDiceMax(rollData.attribute1.type) || 
                        roll2 === getDiceMax(rollData.attribute2.type);
      const isCritical = roll1 === getDiceMax(rollData.attribute1.type) && 
                        roll2 === getDiceMax(rollData.attribute2.type);
      const isFumble = roll1 === 1 && roll2 === 1;

      const newRoll = {
        ...rollData,
        attribute1: { ...rollData.attribute1, value: roll1 },
        attribute2: { ...rollData.attribute2, value: roll2 },
        total,
        isHighRoll,
        isCritical,
        isFumble,
        timestamp: new Date().toLocaleTimeString(),
        character: (character && character.name) || 'Demo Character'
      };

      setCurrentRoll(newRoll);
      setRollHistory(prev => [newRoll, ...prev.slice(0, 9)]);
      
      if (onRollResult) {
        onRollResult(newRoll);
      }
    }, 100);
  };

  const getResultClass = (roll) => {
    if (roll.isCritical) return 'critical';
    if (roll.isFumble) return 'fumble';
    if (roll.isHighRoll) return 'high-roll';
    return '';
  };

  const getResultStatus = (roll) => {
    if (roll.isCritical) return 'Critical Success!';
    if (roll.isFumble) return 'Fumble!';
    if (roll.isHighRoll) return 'High Roll!';
    return 'Normal Roll';
  };

  const difficultyLevels = {
    'Trivial': 7,
    'Easy': 10,
    'Normal': 13,
    'Hard': 16,
    'Extreme': 19
  };

  const getDifficultyResult = (total) => {
    if (total >= 19) return { level: 'Extreme', success: true };
    if (total >= 16) return { level: 'Hard', success: true };
    if (total >= 13) return { level: 'Normal', success: true };
    if (total >= 10) return { level: 'Easy', success: true };
    if (total >= 7) return { level: 'Trivial', success: true };
    return { level: 'Failed', success: false };
  };

  return (
    <div className="integrated-dice-roller">
      <h3>🎲 Dice Roller</h3>
      
      {/* Quick Roll Buttons */}
      <div className="quick-roll-section">
        <h4>Quick Rolls</h4>
        <div className="quick-roll-buttons">
          <button 
            className="quick-roll-btn attack" 
            onClick={() => performQuickRoll('attack')}
          >
            ⚔️ Attack
          </button>
          <button 
            className="quick-roll-btn magic" 
            onClick={() => performQuickRoll('magic')}
          >
            🔮 Magic
          </button>
          <button 
            className="quick-roll-btn defense" 
            onClick={() => performQuickRoll('defense')}
          >
            🛡️ Defense
          </button>
          <button 
            className="quick-roll-btn initiative" 
            onClick={() => performQuickRoll('initiative')}
          >
            ⚡ Initiative
          </button>
        </div>
      </div>

      {/* Custom Roll Setup */}
      <div className="custom-roll-section">
        <h4>Custom Roll</h4>
        <div className="dice-selection">
          <div className="attribute-dice">
            <label>First Attribute</label>
            <select 
              value={currentRoll.attribute1.name}
              onChange={(e) => setCurrentRoll(prev => ({
                ...prev,
                attribute1: { 
                  ...prev.attribute1, 
                  name: e.target.value,
                  type: getAttributeDiceType(e.target.value)
                }
              }))}
            >
              <option value="Dexterity">Dexterity ({getAttributeDiceType('Dexterity')})</option>
              <option value="Insight">Insight ({getAttributeDiceType('Insight')})</option>
              <option value="Might">Might ({getAttributeDiceType('Might')})</option>
              <option value="Willpower">Willpower ({getAttributeDiceType('Willpower')})</option>
            </select>
          </div>

          <span className="plus-sign">+</span>

          <div className="attribute-dice">
            <label>Second Attribute</label>
            <select 
              value={currentRoll.attribute2.name}
              onChange={(e) => setCurrentRoll(prev => ({
                ...prev,
                attribute2: { 
                  ...prev.attribute2, 
                  name: e.target.value,
                  type: getAttributeDiceType(e.target.value)
                }
              }))}
            >
              <option value="Dexterity">Dexterity ({getAttributeDiceType('Dexterity')})</option>
              <option value="Insight">Insight ({getAttributeDiceType('Insight')})</option>
              <option value="Might">Might ({getAttributeDiceType('Might')})</option>
              <option value="Willpower">Willpower ({getAttributeDiceType('Willpower')})</option>
            </select>
          </div>

          <span className="plus-sign">+</span>

          <div className="modifier-input">
            <label>Modifier</label>
            <input 
              type="number" 
              value={currentRoll.modifier}
              onChange={(e) => setCurrentRoll(prev => ({
                ...prev,
                modifier: parseInt(e.target.value) || 0
              }))}
              placeholder="0"
            />
          </div>
        </div>

        <button className="roll-button" onClick={performRoll}>
          🎲 Roll Dice
        </button>
      </div>

      {/* Current Result */}
      {currentRoll.total > 0 && (
        <div className="current-result">
          <h4>Latest Roll: {currentRoll.description}</h4>
          <div className={`result-display ${getResultClass(currentRoll)}`}>
            <div className="dice-results">
              <div className="die-result">
                <div className="die-type">{currentRoll.attribute1.name}</div>
                <div className="die-value">{currentRoll.attribute1.value}</div>
                <div className="die-type">{currentRoll.attribute1.type}</div>
              </div>
              
              <span className="plus-sign">+</span>
              
              <div className="die-result">
                <div className="die-type">{currentRoll.attribute2.name}</div>
                <div className="die-value">{currentRoll.attribute2.value}</div>
                <div className="die-type">{currentRoll.attribute2.type}</div>
              </div>
              
              {currentRoll.modifier !== 0 && (
                <>
                  <span className="plus-sign">+</span>
                  <div className="modifier-display">
                    <div className="die-type">Modifier</div>
                    <div className="modifier-value">{currentRoll.modifier}</div>
                  </div>
                </>
              )}
            </div>
            
            <div className="total-result">
              <span className="equals">=</span>
              <span className="total">{currentRoll.total}</span>
            </div>
            
            <div className={`result-status ${getResultClass(currentRoll)}`}>
              {getResultStatus(currentRoll)}
            </div>

            <div className="difficulty-check">
              <div className="difficulty-result">
                Success vs: {getDifficultyResult(currentRoll.total).level}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Roll History */}
      {rollHistory.length > 0 && (
        <div className="roll-history">
          <h4>Recent Rolls</h4>
          <div className="history-list">
            {rollHistory.slice(0, 5).map((roll, index) => (
              <div key={index} className={`history-item ${getResultClass(roll)}`}>
                <div className="timestamp">{roll.timestamp}</div>
                <div className="roll-details">
                  {roll.description}: {roll.attribute1.name} + {roll.attribute2.name}
                  {roll.modifier !== 0 && ` + ${roll.modifier}`}
                </div>
                <div className="roll-total">{roll.total}</div>
                <div className="status">{getResultStatus(roll)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegratedDiceRoller;