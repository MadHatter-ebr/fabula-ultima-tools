import React, { useState, useEffect } from 'react';
import { STATUS_EFFECTS, DAMAGE_TYPES } from '../../../shared/game_data.js';
import CharacterAvatar from './CharacterAvatar';
import './CombatTracker.css';

const CombatTracker = () => {
  const [combatants, setCombatants] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [round, setRound] = useState(1);
  const [isCombatActive, setIsCombatActive] = useState(false);
  const [newCombatant, setNewCombatant] = useState({
    name: '',
    maxHp: 40,
    currentHp: 40,
    maxMp: 40,
    currentMp: 40,
    initiative: 0,
    isPlayer: true,
    statusEffects: [],
    conditions: []
  });

  const addCombatant = () => {
    if (newCombatant.name.trim()) {
      setCombatants(prev => [...prev, {
        ...newCombatant,
        id: Date.now(),
        currentHp: newCombatant.maxHp,
        currentMp: newCombatant.maxMp
      }]);
      setNewCombatant({
        name: '',
        maxHp: 40,
        currentHp: 40,
        maxMp: 40,
        currentMp: 40,
        initiative: 0,
        isPlayer: true,
        statusEffects: [],
        conditions: []
      });
    }
  };

  const removeCombatant = (id) => {
    setCombatants(prev => prev.filter(c => c.id !== id));
  };

  const updateCombatant = (id, field, value) => {
    setCombatants(prev => prev.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const startCombat = () => {
    if (combatants.length > 0) {
      // Sort by initiative (highest first)
      const sortedCombatants = [...combatants].sort((a, b) => b.initiative - a.initiative);
      setCombatants(sortedCombatants);
      setIsCombatActive(true);
      setCurrentTurn(0);
      setRound(1);
    }
  };

  const nextTurn = () => {
    if (currentTurn < combatants.length - 1) {
      setCurrentTurn(prev => prev + 1);
    } else {
      setCurrentTurn(0);
      setRound(prev => prev + 1);
    }
  };

  const previousTurn = () => {
    if (currentTurn > 0) {
      setCurrentTurn(prev => prev - 1);
    } else {
      setCurrentTurn(combatants.length - 1);
      setRound(prev => Math.max(1, prev - 1));
    }
  };

  const endCombat = () => {
    setIsCombatActive(false);
    setCurrentTurn(0);
    setRound(1);
  };

  const addStatusEffect = (combatantId, effect) => {
    setCombatants(prev => prev.map(c => 
      c.id === combatantId 
        ? { ...c, statusEffects: [...c.statusEffects, effect] }
        : c
    ));
  };

  const removeStatusEffect = (combatantId, effectIndex) => {
    setCombatants(prev => prev.map(c => 
      c.id === combatantId 
        ? { ...c, statusEffects: c.statusEffects.filter((_, i) => i !== effectIndex) }
        : c
    ));
  };

  const applyDamage = (combatantId, damage, type = 'physical') => {
    setCombatants(prev => prev.map(c => 
      c.id === combatantId 
        ? { ...c, currentHp: Math.max(0, c.currentHp - damage) }
        : c
    ));
  };

  const applyHealing = (combatantId, healing) => {
    setCombatants(prev => prev.map(c => 
      c.id === combatantId 
        ? { ...c, currentHp: Math.min(c.maxHp, c.currentHp + healing) }
        : c
    ));
  };

  const getHealthPercentage = (current, max) => {
    return (current / max) * 100;
  };

  const getHealthColor = (percentage) => {
    if (percentage > 75) return '#4CAF50';
    if (percentage > 50) return '#FFC107';
    if (percentage > 25) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="combat-tracker">
      <h1>⚔️ Fabula Ultima Combat Tracker</h1>
      
      <div className="combat-interface">
        <section className="combat-setup">
          <h2>Add Combatant</h2>
          <div className="combatant-form">
            <input
              type="text"
              placeholder="Name"
              value={newCombatant.name}
              onChange={(e) => setNewCombatant(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Max HP"
              value={newCombatant.maxHp}
              onChange={(e) => setNewCombatant(prev => ({ ...prev, maxHp: parseInt(e.target.value) || 40 }))}
            />
            <input
              type="number"
              placeholder="Max MP"
              value={newCombatant.maxMp}
              onChange={(e) => setNewCombatant(prev => ({ ...prev, maxMp: parseInt(e.target.value) || 40 }))}
            />
            <input
              type="number"
              placeholder="Initiative"
              value={newCombatant.initiative}
              onChange={(e) => setNewCombatant(prev => ({ ...prev, initiative: parseInt(e.target.value) || 0 }))}
            />
            <label>
              <input
                type="checkbox"
                checked={newCombatant.isPlayer}
                onChange={(e) => setNewCombatant(prev => ({ ...prev, isPlayer: e.target.checked }))}
              />
              Player Character
            </label>
            <button onClick={addCombatant}>Add Combatant</button>
          </div>
        </section>

        <section className="combat-controls">
          <h2>Combat Controls</h2>
          <div className="control-buttons">
            {!isCombatActive ? (
              <button className="start-combat" onClick={startCombat} disabled={combatants.length === 0}>
                🚀 Start Combat
              </button>
            ) : (
              <>
                <button onClick={previousTurn}>⬅️ Previous Turn</button>
                <button onClick={nextTurn}>➡️ Next Turn</button>
                <button className="end-combat" onClick={endCombat}>🏁 End Combat</button>
              </>
            )}
          </div>
          
          {isCombatActive && (
            <div className="combat-status">
              <h3>Round {round}</h3>
              <p>Current Turn: {combatants[currentTurn]?.name}</p>
            </div>
          )}
        </section>

        <section className="combatants-list">
          <h2>Combatants</h2>
          <div className="combatants-grid">
            {combatants.map((combatant, index) => (
              <div 
                key={combatant.id} 
                className={`combatant-card ${combatant.isPlayer ? 'player' : 'enemy'} ${
                  isCombatActive && index === currentTurn ? 'current-turn' : ''
                } ${combatant.currentHp === 0 ? 'defeated' : ''}`}
              >
                <div className="combatant-header">
                  <div className="combatant-avatar">
                    <CharacterAvatar 
                      character={{
                        name: combatant.name,
                        classes: { primary: combatant.isPlayer ? 'GUARDIAN' : 'ENEMY' },
                        level: 1,
                        avatar_url: combatant.avatar_url
                      }}
                      size="small"
                      showUpload={false}
                    />
                  </div>
                  <div className="combatant-info">
                    <h3>{combatant.name}</h3>
                    <div className="combatant-type">
                      {combatant.isPlayer ? '🛡️ Player' : '👹 Enemy'}
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeCombatant(combatant.id)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="health-bars">
                  <div className="health-bar">
                    <label>HP: {combatant.currentHp}/{combatant.maxHp}</label>
                    <div className="bar-container">
                      <div 
                        className="bar hp-bar"
                        style={{ 
                          width: `${getHealthPercentage(combatant.currentHp, combatant.maxHp)}%`,
                          backgroundColor: getHealthColor(getHealthPercentage(combatant.currentHp, combatant.maxHp))
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="health-bar">
                    <label>MP: {combatant.currentMp}/{combatant.maxMp}</label>
                    <div className="bar-container">
                      <div 
                        className="bar mp-bar"
                        style={{ 
                          width: `${getHealthPercentage(combatant.currentMp, combatant.maxMp)}%`,
                          backgroundColor: '#2196F3'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="combatant-controls">
                  <div className="hp-controls">
                    <button onClick={() => applyDamage(combatant.id, 5)}>-5 HP</button>
                    <button onClick={() => applyHealing(combatant.id, 5)}>+5 HP</button>
                  </div>
                  
                  <div className="mp-controls">
                    <button onClick={() => updateCombatant(combatant.id, 'currentMp', Math.max(0, combatant.currentMp - 5))}>-5 MP</button>
                    <button onClick={() => updateCombatant(combatant.id, 'currentMp', Math.min(combatant.maxMp, combatant.currentMp + 5))}>+5 MP</button>
                  </div>
                </div>
                
                <div className="initiative-display">
                  <span>Initiative: {combatant.initiative}</span>
                </div>
                
                <div className="status-effects">
                  <h4>Status Effects:</h4>
                  <div className="effects-list">
                    {combatant.statusEffects.map((effect, effectIndex) => (
                      <span 
                        key={effectIndex} 
                        className="status-effect"
                        onClick={() => removeStatusEffect(combatant.id, effectIndex)}
                      >
                        {effect} ×
                      </span>
                    ))}
                  </div>
                  <select 
                    onChange={(e) => {
                      if (e.target.value) {
                        addStatusEffect(combatant.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Add Status Effect</option>
                    {Object.entries(STATUS_EFFECTS).map(([key, value]) => (
                      <option key={key} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CombatTracker;