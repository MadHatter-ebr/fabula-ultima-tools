import React, { useState } from 'react';
import { DICE_TYPES, ATTRIBUTES } from '../shared/game_data.js';
import './DiceRoller.css';

const DiceRoller = () => {
  const [rollHistory, setRollHistory] = useState([]);
  const [currentRoll, setCurrentRoll] = useState({
    attribute1: { type: 'd8', value: 0 },
    attribute2: { type: 'd8', value: 0 },
    modifier: 0,
    total: 0,
    isHighRoll: false,
    isCritical: false,
    isFumble: false
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
      timestamp: new Date().toLocaleTimeString()
    };

    setCurrentRoll(newRoll);
    setRollHistory(prev => [newRoll, ...prev.slice(0, 9)]); // Keep last 10 rolls
  };

  const getDiceMax = (diceType) => {
    return parseInt(diceType.slice(1));
  };

  const getResultClass = (roll) => {
    if (roll.isCritical) return 'critical';
    if (roll.isFumble) return 'fumble';
    if (roll.isHighRoll) return 'high-roll';
    return '';
  };

  const difficultyLevels = {
    'Trivial': 7,
    'Easy': 10,
    'Normal': 13,
    'Hard': 16,
    'Extreme': 19
  };

  const quickRolls = [
    { name: 'Might + Might', attr1: 'd8', attr2: 'd8', description: 'Physical power' },
    { name: 'Dexterity + Intellect', attr1: 'd8', attr2: 'd8', description: 'Precise action' },
    { name: 'Intellect + Willpower', attr1: 'd8', attr2: 'd8', description: 'Mental focus' },
    { name: 'Willpower + Willpower', attr1: 'd8', attr2: 'd8', description: 'Pure determination' }
  ];

  return (
    <div className="dice-roller">
      <h1>🎲 Fabula Ultima Dice Roller</h1>
      
      <div className="roller-interface">
        <section className="roll-setup">
          <h2>Attribute Check</h2>
          <div className="dice-selection">
            <div className="attribute-dice">
              <label>First Attribute</label>
              <select 
                value={currentRoll.attribute1.type}
                onChange={(e) => setCurrentRoll(prev => ({
                  ...prev,
                  attribute1: { ...prev.attribute1, type: e.target.value }
                }))}
              >
                <option value="d6">d6</option>
                <option value="d8">d8</option>
                <option value="d10">d10</option>
                <option value="d12">d12</option>
              </select>
            </div>
            
            <div className="plus-sign">+</div>
            
            <div className="attribute-dice">
              <label>Second Attribute</label>
              <select 
                value={currentRoll.attribute2.type}
                onChange={(e) => setCurrentRoll(prev => ({
                  ...prev,
                  attribute2: { ...prev.attribute2, type: e.target.value }
                }))}
              >
                <option value="d6">d6</option>
                <option value="d8">d8</option>
                <option value="d10">d10</option>
                <option value="d12">d12</option>
              </select>
            </div>
            
            <div className="modifier-input">
              <label>Modifier</label>
              <input
                type="number"
                value={currentRoll.modifier}
                onChange={(e) => setCurrentRoll(prev => ({
                  ...prev,
                  modifier: parseInt(e.target.value) || 0
                }))}
                min="-10"
                max="10"
              />
            </div>
          </div>
          
          <button className="roll-button" onClick={performRoll}>
            🎲 ROLL DICE
          </button>
        </section>

        <section className="current-result">
          <h2>Current Roll</h2>
          <div className={`result-display ${getResultClass(currentRoll)}`}>
            <div className="dice-results">
              <div className="die-result">
                <span className="die-type">{currentRoll.attribute1.type}</span>
                <span className="die-value">{currentRoll.attribute1.value || '-'}</span>
              </div>
              <span className="plus">+</span>
              <div className="die-result">
                <span className="die-type">{currentRoll.attribute2.type}</span>
                <span className="die-value">{currentRoll.attribute2.value || '-'}</span>
              </div>
              <span className="plus">+</span>
              <div className="modifier-display">
                <span className="modifier-value">{currentRoll.modifier}</span>
              </div>
            </div>
            
            <div className="total-result">
              <span className="equals">=</span>
              <span className="total">{currentRoll.total}</span>
            </div>
            
            {currentRoll.isCritical && (
              <div className="result-status critical">🌟 CRITICAL SUCCESS!</div>
            )}
            {currentRoll.isFumble && (
              <div className="result-status fumble">💥 FUMBLE!</div>
            )}
            {currentRoll.isHighRoll && !currentRoll.isCritical && (
              <div className="result-status high-roll">⚡ HIGH ROLL!</div>
            )}
          </div>
        </section>

        <section className="quick-rolls">
          <h2>Quick Rolls</h2>
          <div className="quick-roll-buttons">
            {quickRolls.map((roll, index) => (
              <button
                key={index}
                className="quick-roll-btn"
                onClick={() => {
                  setCurrentRoll(prev => ({
                    ...prev,
                    attribute1: { type: roll.attr1, value: 0 },
                    attribute2: { type: roll.attr2, value: 0 },
                    modifier: 0
                  }));
                  setTimeout(performRoll, 100);
                }}
              >
                <span className="roll-name">{roll.name}</span>
                <span className="roll-description">{roll.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="difficulty-reference">
          <h2>Difficulty Levels</h2>
          <div className="difficulty-grid">
            {Object.entries(difficultyLevels).map(([level, target]) => (
              <div
                key={level}
                className={`difficulty-level ${currentRoll.total >= target ? 'success' : 'failure'}`}
              >
                <span className="level-name">{level}</span>
                <span className="target-number">{target}</span>
                <span className="result-indicator">
                  {currentRoll.total >= target ? '✅' : '❌'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="roll-history">
          <h2>Roll History</h2>
          <div className="history-list">
            {rollHistory.map((roll, index) => (
              <div key={index} className={`history-item ${getResultClass(roll)}`}>
                <span className="timestamp">{roll.timestamp}</span>
                <span className="roll-details">
                  {roll.attribute1.type}({roll.attribute1.value}) + {roll.attribute2.type}({roll.attribute2.value}) + {roll.modifier}
                </span>
                <span className="roll-total">{roll.total}</span>
                {roll.isCritical && <span className="status">CRIT</span>}
                {roll.isFumble && <span className="status">FUMBLE</span>}
                {roll.isHighRoll && !roll.isCritical && <span className="status">HIGH</span>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiceRoller;