import React, { useState, useCallback, useMemo, memo } from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import './IntegratedDiceRoller.css';

// Memoized dice result component
const DiceResult = memo(({ diceType, value, label }) => (
  <div className="die-result">
    <div className="die-type">{label}</div>
    <div className="die-value">{value || '-'}</div>
    <div className="die-type">{diceType}</div>
  </div>
));

// Memoized quick roll button component
const QuickRollButton = memo(({ rollType, onClick, disabled }) => {
  const buttonConfig = useMemo(() => ({
    attack: { icon: '⚔️', label: 'Attack', className: 'attack' },
    magic: { icon: '🔮', label: 'Magic', className: 'magic' },
    defense: { icon: '🛡️', label: 'Defense', className: 'defense' },
    initiative: { icon: '⚡', label: 'Initiative', className: 'initiative' }
  }), []);

  const config = buttonConfig[rollType];
  
  return (
    <button 
      className={`quick-roll-btn ${config.className}`}
      onClick={() => onClick(rollType)}
      disabled={disabled}
    >
      {config.icon} {config.label}
    </button>
  );
});

// Memoized history item component
const HistoryItem = memo(({ roll, index }) => {
  const resultClass = useMemo(() => {
    if (roll.isCritical) return 'critical';
    if (roll.isFumble) return 'fumble';
    if (roll.isHighRoll) return 'high-roll';
    return '';
  }, [roll]);

  const resultStatus = useMemo(() => {
    if (roll.isCritical) return 'Critical Success!';
    if (roll.isFumble) return 'Fumble!';
    if (roll.isHighRoll) return 'High Roll!';
    return 'Normal Roll';
  }, [roll]);

  return (
    <div className={`history-item ${resultClass}`}>
      <div className="timestamp">{roll.timestamp}</div>
      <div className="roll-details">
        {roll.description}: {roll.attribute1.name} + {roll.attribute2.name}
        {roll.modifier !== 0 && ` + ${roll.modifier}`}
      </div>
      <div className="roll-total">{roll.total}</div>
      <div className="status">{resultStatus}</div>
    </div>
  );
});

const OptimizedDiceRoller = memo(({ onRollResult, showHistory = true }) => {
  const { character, computed } = useCharacter();
  const [rollHistory, setRollHistory] = useState([]);
  const [currentRoll, setCurrentRoll] = useState({
    attribute1: { type: 'd8', value: 0, name: 'Dexterity' },
    attribute2: { type: 'd8', value: 0, name: 'Insight' },
    modifier: 0,
    total: 0,
    isHighRoll: false,
    isCritical: false,
    isFumble: false,
    description: 'Attribute Check'
  });

  // Memoized dice rolling function
  const rollDice = useCallback((diceType) => {
    const diceValues = { 'd6': 6, 'd8': 8, 'd10': 10, 'd12': 12 };
    return Math.floor(Math.random() * diceValues[diceType]) + 1;
  }, []);

  // Memoized dice max calculation
  const getDiceMax = useCallback((diceType) => {
    return parseInt(diceType.slice(1));
  }, []);

  // Memoized attribute dice type getter
  const getAttributeDiceType = useCallback((attributeName) => {
    if (!character || !character.attributes) return 'd8';
    const value = character.attributes[attributeName.toLowerCase()];
    return computed.getDiceType(value);
  }, [character, computed]);

  // Memoized attribute options
  const attributeOptions = useMemo(() => [
    'Dexterity', 'Insight', 'Might', 'Willpower'
  ], []);

  // Memoized difficulty levels
  const difficultyLevels = useMemo(() => ({
    'Trivial': 7,
    'Easy': 10,
    'Normal': 13,
    'Hard': 16,
    'Extreme': 19
  }), []);

  // Memoized difficulty result calculator
  const getDifficultyResult = useCallback((total) => {
    if (total >= 19) return { level: 'Extreme', success: true };
    if (total >= 16) return { level: 'Hard', success: true };
    if (total >= 13) return { level: 'Normal', success: true };
    if (total >= 10) return { level: 'Easy', success: true };
    if (total >= 7) return { level: 'Trivial', success: true };
    return { level: 'Failed', success: false };
  }, []);

  // Optimized roll performance function
  const performRoll = useCallback(() => {
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
    if (showHistory) {
      setRollHistory(prev => [newRoll, ...prev.slice(0, 9)]);
    }
    
    if (onRollResult) {
      onRollResult(newRoll);
    }
  }, [currentRoll, rollDice, getDiceMax, character, showHistory, onRollResult]);

  // Optimized quick roll function
  const performQuickRoll = useCallback((rollType) => {
    const rollConfigs = {
      attack: { attr1: 'Dexterity', attr2: 'Might', description: 'Attack Roll' },
      magic: { attr1: 'Insight', attr2: 'Willpower', description: 'Magic Roll' },
      defense: { attr1: 'Dexterity', attr2: 'Insight', description: 'Defense Roll' },
      initiative: { attr1: 'Dexterity', attr2: 'Insight', description: 'Initiative Roll' }
    };

    const config = rollConfigs[rollType];
    const rollData = {
      attribute1: { 
        type: getAttributeDiceType(config.attr1), 
        value: 0, 
        name: config.attr1 
      },
      attribute2: { 
        type: getAttributeDiceType(config.attr2), 
        value: 0, 
        name: config.attr2 
      },
      modifier: 0,
      total: 0,
      isHighRoll: false,
      isCritical: false,
      isFumble: false,
      description: config.description
    };

    setCurrentRoll(rollData);
    
    // Perform roll immediately
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
      if (showHistory) {
        setRollHistory(prev => [newRoll, ...prev.slice(0, 9)]);
      }
      
      if (onRollResult) {
        onRollResult(newRoll);
      }
    }, 100);
  }, [getAttributeDiceType, rollDice, getDiceMax, character, showHistory, onRollResult]);

  // Memoized result class
  const resultClass = useMemo(() => {
    if (currentRoll.isCritical) return 'critical';
    if (currentRoll.isFumble) return 'fumble';
    if (currentRoll.isHighRoll) return 'high-roll';
    return '';
  }, [currentRoll]);

  // Memoized result status
  const resultStatus = useMemo(() => {
    if (currentRoll.isCritical) return 'Critical Success!';
    if (currentRoll.isFumble) return 'Fumble!';
    if (currentRoll.isHighRoll) return 'High Roll!';
    return 'Normal Roll';
  }, [currentRoll]);

  return (
    <div className="integrated-dice-roller">
      <h3>🎲 Dice Roller</h3>
      
      {/* Quick Roll Buttons */}
      <div className="quick-roll-section">
        <h4>Quick Rolls</h4>
        <div className="quick-roll-buttons">
          {['attack', 'magic', 'defense', 'initiative'].map(rollType => (
            <QuickRollButton
              key={rollType}
              rollType={rollType}
              onClick={performQuickRoll}
              disabled={false}
            />
          ))}
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
              {attributeOptions.map(attr => (
                <option key={attr} value={attr}>
                  {attr} ({getAttributeDiceType(attr)})
                </option>
              ))}
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
              {attributeOptions.map(attr => (
                <option key={attr} value={attr}>
                  {attr} ({getAttributeDiceType(attr)})
                </option>
              ))}
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
          <div className={`result-display ${resultClass}`}>
            <div className="dice-results">
              <DiceResult 
                diceType={currentRoll.attribute1.type}
                value={currentRoll.attribute1.value}
                label={currentRoll.attribute1.name}
              />
              
              <span className="plus-sign">+</span>
              
              <DiceResult 
                diceType={currentRoll.attribute2.type}
                value={currentRoll.attribute2.value}
                label={currentRoll.attribute2.name}
              />
              
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
            
            <div className={`result-status ${resultClass}`}>
              {resultStatus}
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
      {showHistory && rollHistory.length > 0 && (
        <div className="roll-history">
          <h4>Recent Rolls</h4>
          <div className="history-list">
            {rollHistory.slice(0, 5).map((roll, index) => (
              <HistoryItem key={index} roll={roll} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

OptimizedDiceRoller.displayName = 'OptimizedDiceRoller';

export default OptimizedDiceRoller;