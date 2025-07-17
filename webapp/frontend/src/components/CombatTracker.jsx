import React, { useState, useEffect } from 'react';
import { STATUS_EFFECTS, DAMAGE_TYPES } from '../../../shared/game_data.js';
import CharacterAvatar from './CharacterAvatar';
import './CombatTracker.css';

const CombatTracker = ({ character }) => {
  const [combatants, setCombatants] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [round, setRound] = useState(1);
  const [isCombatActive, setIsCombatActive] = useState(false);
  const [battlePhase, setBattlePhase] = useState('preparation'); // preparation, combat, victory
  const [actionLog, setActionLog] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
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
      setBattlePhase('combat');
      setCurrentTurn(0);
      setRound(1);
      setActionLog([]);
      addToActionLog('=== BATTLE BEGINS! ===');
      addToActionLog(`${sortedCombatants[0]?.name} acts first!`);
    }
  };

  const nextTurn = () => {
    setIsAnimating(true);
    addToActionLog(`${combatants[currentTurn]?.name}'s turn ends`);
    
    setTimeout(() => {
      if (currentTurn < combatants.length - 1) {
        setCurrentTurn(prev => prev + 1);
      } else {
        setCurrentTurn(0);
        setRound(prev => prev + 1);
        addToActionLog(`--- Round ${round + 1} begins ---`);
      }
      setIsAnimating(false);
    }, 500);
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
    setBattlePhase('preparation');
    setCurrentTurn(0);
    setRound(1);
    addToActionLog('=== BATTLE ENDS ===');
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
    const combatant = combatants.find(c => c.id === combatantId);
    if (combatant) {
      addToActionLog(`${combatant.name} takes ${damage} ${type} damage!`);
      setCombatants(prev => prev.map(c => 
        c.id === combatantId 
          ? { ...c, currentHp: Math.max(0, c.currentHp - damage) }
          : c
      ));
    }
  };

  const applyHealing = (combatantId, healing) => {
    const combatant = combatants.find(c => c.id === combatantId);
    if (combatant) {
      addToActionLog(`${combatant.name} recovers ${healing} HP!`);
      setCombatants(prev => prev.map(c => 
        c.id === combatantId 
          ? { ...c, currentHp: Math.min(c.maxHp, c.currentHp + healing) }
          : c
      ));
    }
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

  const addToActionLog = (message) => {
    setActionLog(prev => [...prev.slice(-19), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const executeAction = (actionType, combatantId, value) => {
    const combatant = combatants.find(c => c.id === combatantId);
    if (!combatant) return;

    switch (actionType) {
      case 'attack':
        applyDamage(combatantId, value, 'physical');
        break;
      case 'magic':
        applyDamage(combatantId, value, 'magical');
        break;
      case 'heal':
        applyHealing(combatantId, value);
        break;
      case 'defend':
        addToActionLog(`${combatant.name} takes a defensive stance!`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`combat-tracker ${battlePhase}`}>
      <div className="ff-header">
        <h1>⚔️ Fabula Ultima Combat System</h1>
        <div className="battle-phase-indicator">
          {battlePhase === 'preparation' && '🛡️ Preparation Phase'}
          {battlePhase === 'combat' && '⚔️ Battle in Progress'}
          {battlePhase === 'victory' && '👑 Victory!'}
        </div>
      </div>
      
      <div className="ff-combat-interface">
        {battlePhase === 'preparation' && (
          <section className="ff-setup-panel">
            <h2>🎭 Party Setup</h2>
            <div className="combatant-form">
              <input
                type="text"
                placeholder="Character Name"
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
              <label className="character-type-toggle">
                <input
                  type="checkbox"
                  checked={newCombatant.isPlayer}
                  onChange={(e) => setNewCombatant(prev => ({ ...prev, isPlayer: e.target.checked }))}
                />
                <span>{newCombatant.isPlayer ? '🛡️ Hero' : '👹 Enemy'}</span>
              </label>
              <button className="ff-add-btn" onClick={addCombatant}>
                ✨ Add to Battle
              </button>
            </div>
          </section>
        )}

        {battlePhase === 'combat' && (
          <section className="ff-battle-controls">
            <div className="ff-combat-hud">
              <div className="turn-indicator">
                <h2>🎯 Round {round}</h2>
                <div className="current-turn">
                  {combatants[currentTurn] && (
                    <div className={`active-combatant ${isAnimating ? 'transitioning' : ''}`}>
                      <span className="turn-name">{combatants[currentTurn].name}</span>
                      <span className="turn-type">
                        {combatants[currentTurn].isPlayer ? '🛡️' : '👹'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ff-action-buttons">
                <button className="ff-turn-btn" onClick={previousTurn}>
                  ⬅️ Previous
                </button>
                <button className="ff-turn-btn next" onClick={nextTurn}>
                  Next ➡️
                </button>
                <button className="ff-end-btn" onClick={endCombat}>
                  🏁 End Battle
                </button>
              </div>
            </div>
          </section>
        )}

        {battlePhase === 'preparation' && (
          <section className="ff-start-section">
            <button 
              className="ff-start-battle" 
              onClick={startCombat} 
              disabled={combatants.length === 0}
            >
              ⚔️ BEGIN BATTLE!
            </button>
          </section>
        )}

        <section className="ff-battlefield">
          <div className="battlefield-layout">
            <div className="party-section heroes">
              <h3>🛡️ Heroes</h3>
              <div className="party-grid">
                {combatants.filter(c => c.isPlayer).map((combatant, index) => (
                  <div 
                    key={combatant.id} 
                    className={`ff-combatant-card hero ${
                      isCombatActive && combatants[currentTurn]?.id === combatant.id ? 'active-turn' : ''
                    } ${combatant.currentHp === 0 ? 'defeated' : ''}`}
                  >
                    <div className="ff-combatant-header">
                      <div className="ff-avatar">
                        <CharacterAvatar 
                          character={{
                            name: combatant.name,
                            classes: { primary: 'GUARDIAN' },
                            level: 1,
                            avatar_url: combatant.avatar_url
                          }}
                          size="small"
                          showUpload={false}
                        />
                      </div>
                      <div className="ff-name-initiative">
                        <h4>{combatant.name}</h4>
                        <span className="initiative-badge">⚡ {combatant.initiative}</span>
                      </div>
                      <button 
                        className="ff-remove-btn"
                        onClick={() => removeCombatant(combatant.id)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="ff-status-bars">
                      <div className="ff-hp-bar">
                        <div className="bar-label">HP</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill hp-fill"
                            style={{ 
                              width: `${getHealthPercentage(combatant.currentHp, combatant.maxHp)}%`,
                              backgroundColor: getHealthColor(getHealthPercentage(combatant.currentHp, combatant.maxHp))
                            }}
                          />
                          <span className="bar-text">{combatant.currentHp}/{combatant.maxHp}</span>
                        </div>
                      </div>
                      
                      <div className="ff-mp-bar">
                        <div className="bar-label">MP</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill mp-fill"
                            style={{ 
                              width: `${getHealthPercentage(combatant.currentMp, combatant.maxMp)}%`
                            }}
                          />
                          <span className="bar-text">{combatant.currentMp}/{combatant.maxMp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ff-action-panel">
                      <div className="ff-quick-actions">
                        <button className="ff-action-btn attack" onClick={() => executeAction('attack', combatant.id, 10)}>
                          ⚔️ Attack
                        </button>
                        <button className="ff-action-btn magic" onClick={() => executeAction('magic', combatant.id, 15)}>
                          🔮 Magic
                        </button>
                        <button className="ff-action-btn heal" onClick={() => executeAction('heal', combatant.id, 12)}>
                          💚 Heal
                        </button>
                        <button className="ff-action-btn defend" onClick={() => executeAction('defend', combatant.id, 0)}>
                          🛡️ Defend
                        </button>
                      </div>
                      
                      <div className="ff-hp-mp-controls">
                        <div className="control-group">
                          <button className="control-btn damage" onClick={() => applyDamage(combatant.id, 5)}>-5</button>
                          <span>HP</span>
                          <button className="control-btn heal" onClick={() => applyHealing(combatant.id, 5)}>+5</button>
                        </div>
                        <div className="control-group">
                          <button className="control-btn damage" onClick={() => updateCombatant(combatant.id, 'currentMp', Math.max(0, combatant.currentMp - 5))}>-5</button>
                          <span>MP</span>
                          <button className="control-btn heal" onClick={() => updateCombatant(combatant.id, 'currentMp', Math.min(combatant.maxMp, combatant.currentMp + 5))}>+5</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ff-status-effects">
                      <div className="effects-display">
                        {combatant.statusEffects.map((effect, effectIndex) => (
                          <span 
                            key={effectIndex} 
                            className="status-badge"
                            onClick={() => removeStatusEffect(combatant.id, effectIndex)}
                          >
                            {effect} ×
                          </span>
                        ))}
                      </div>
                      <select 
                        className="effect-selector"
                        onChange={(e) => {
                          if (e.target.value) {
                            addStatusEffect(combatant.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      >
                        <option value="">+ Status</option>
                        {Object.entries(STATUS_EFFECTS).map(([key, value]) => (
                          <option key={key} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="party-section enemies">
              <h3>👹 Enemies</h3>
              <div className="party-grid">
                {combatants.filter(c => !c.isPlayer).map((combatant, index) => (
                  <div 
                    key={combatant.id} 
                    className={`ff-combatant-card enemy ${
                      isCombatActive && combatants[currentTurn]?.id === combatant.id ? 'active-turn' : ''
                    } ${combatant.currentHp === 0 ? 'defeated' : ''}`}
                  >
                    <div className="ff-combatant-header">
                      <div className="ff-avatar">
                        <CharacterAvatar 
                          character={{
                            name: combatant.name,
                            classes: { primary: 'ENEMY' },
                            level: 1,
                            avatar_url: combatant.avatar_url
                          }}
                          size="small"
                          showUpload={false}
                        />
                      </div>
                      <div className="ff-name-initiative">
                        <h4>{combatant.name}</h4>
                        <span className="initiative-badge">⚡ {combatant.initiative}</span>
                      </div>
                      <button 
                        className="ff-remove-btn"
                        onClick={() => removeCombatant(combatant.id)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="ff-status-bars">
                      <div className="ff-hp-bar">
                        <div className="bar-label">HP</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill hp-fill"
                            style={{ 
                              width: `${getHealthPercentage(combatant.currentHp, combatant.maxHp)}%`,
                              backgroundColor: getHealthColor(getHealthPercentage(combatant.currentHp, combatant.maxHp))
                            }}
                          />
                          <span className="bar-text">{combatant.currentHp}/{combatant.maxHp}</span>
                        </div>
                      </div>
                      
                      <div className="ff-mp-bar">
                        <div className="bar-label">MP</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill mp-fill"
                            style={{ 
                              width: `${getHealthPercentage(combatant.currentMp, combatant.maxMp)}%`
                            }}
                          />
                          <span className="bar-text">{combatant.currentMp}/{combatant.maxMp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ff-action-panel">
                      <div className="ff-hp-mp-controls">
                        <div className="control-group">
                          <button className="control-btn damage" onClick={() => applyDamage(combatant.id, 5)}>-5</button>
                          <span>HP</span>
                          <button className="control-btn heal" onClick={() => applyHealing(combatant.id, 5)}>+5</button>
                        </div>
                        <div className="control-group">
                          <button className="control-btn damage" onClick={() => updateCombatant(combatant.id, 'currentMp', Math.max(0, combatant.currentMp - 5))}>-5</button>
                          <span>MP</span>
                          <button className="control-btn heal" onClick={() => updateCombatant(combatant.id, 'currentMp', Math.min(combatant.maxMp, combatant.currentMp + 5))}>+5</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ff-status-effects">
                      <div className="effects-display">
                        {combatant.statusEffects.map((effect, effectIndex) => (
                          <span 
                            key={effectIndex} 
                            className="status-badge"
                            onClick={() => removeStatusEffect(combatant.id, effectIndex)}
                          >
                            {effect} ×
                          </span>
                        ))}
                      </div>
                      <select 
                        className="effect-selector"
                        onChange={(e) => {
                          if (e.target.value) {
                            addStatusEffect(combatant.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      >
                        <option value="">+ Status</option>
                        {Object.entries(STATUS_EFFECTS).map(([key, value]) => (
                          <option key={key} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {battlePhase === 'combat' && (
          <section className="ff-action-log">
            <h3>📜 Battle Log</h3>
            <div className="log-container">
              {actionLog.map((log, index) => (
                <div key={index} className="log-entry">
                  {log}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CombatTracker;