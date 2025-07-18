import React, { useState, useEffect } from 'react';
import { DAMAGE_TYPES, STATUS_EFFECTS } from '../shared/complete_game_data.js';
import './CombatSystem.css';

const CombatSystem = ({ character, onCombatChange }) => {
  const [combatState, setCombatState] = useState({
    isInCombat: false,
    currentTurn: 0,
    turnOrder: [],
    actionQueue: [],
    combatLog: [],
    participants: []
  });

  const [healthState, setHealthState] = useState({
    currentHP: character?.hp || 100,
    currentMP: character?.mp || 50,
    currentIP: character?.ip || 5
  });

  const [showCombatActions, setShowCombatActions] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [enemies, setEnemies] = useState([]);
  const [showAddEnemy, setShowAddEnemy] = useState(false);

  useEffect(() => {
    if (onCombatChange) {
      onCombatChange({
        combatState,
        healthState
      });
    }
  }, [combatState, healthState, onCombatChange]);

  const initializeCombat = () => {
    const allParticipants = [
      {
        id: 'player',
        name: character?.name || 'Player',
        type: 'player',
        hp: character?.hp || 100,
        mp: character?.mp || 50,
        ip: character?.ip || 5,
        currentHP: character?.hp || 100,
        currentMP: character?.mp || 50,
        currentIP: character?.ip || 5,
        initiative: Math.floor(Math.random() * 20) + 1,
        statusEffects: []
      },
      ...enemies.map(enemy => ({
        ...enemy,
        currentHP: enemy.hp,
        currentMP: enemy.mp,
        currentIP: enemy.ip,
        initiative: Math.floor(Math.random() * 20) + 1,
        statusEffects: []
      }))
    ];

    const sortedParticipants = allParticipants.sort((a, b) => b.initiative - a.initiative);

    setCombatState(prev => ({
      ...prev,
      isInCombat: true,
      participants: sortedParticipants,
      turnOrder: sortedParticipants.map(p => p.id),
      currentTurn: 0,
      combatLog: [`Combat started! Initiative order: ${sortedParticipants.map(p => p.name).join(', ')}`]
    }));
  };

  const endCombat = () => {
    setCombatState(prev => ({
      ...prev,
      isInCombat: false,
      currentTurn: 0,
      turnOrder: [],
      actionQueue: [],
      participants: [],
      combatLog: [...prev.combatLog, 'Combat ended.']
    }));
  };

  const nextTurn = () => {
    setCombatState(prev => {
      const nextTurnIndex = (prev.currentTurn + 1) % prev.turnOrder.length;
      const currentParticipant = prev.participants.find(p => p.id === prev.turnOrder[nextTurnIndex]);
      
      return {
        ...prev,
        currentTurn: nextTurnIndex,
        combatLog: [...prev.combatLog, `${currentParticipant?.name}'s turn begins.`]
      };
    });
  };

  const performAction = (action, target, damage = 0) => {
    const currentParticipant = combatState.participants.find(p => p.id === combatState.turnOrder[combatState.currentTurn]);
    const targetParticipant = combatState.participants.find(p => p.id === target);

    if (!currentParticipant || !targetParticipant) return;

    setCombatState(prev => {
      const updatedParticipants = prev.participants.map(p => {
        if (p.id === target && damage > 0) {
          const newHP = Math.max(0, p.currentHP - damage);
          return { ...p, currentHP: newHP };
        }
        return p;
      });

      const logEntry = `${currentParticipant.name} uses ${action} on ${targetParticipant.name}${damage > 0 ? ` for ${damage} damage` : ''}`;

      return {
        ...prev,
        participants: updatedParticipants,
        combatLog: [...prev.combatLog, logEntry]
      };
    });

    setSelectedAction('');
    setSelectedTarget('');
    setShowCombatActions(false);
  };

  const addEnemy = (enemyData) => {
    setEnemies(prev => [...prev, {
      id: `enemy_${Date.now()}`,
      name: enemyData.name,
      type: 'enemy',
      hp: enemyData.hp,
      mp: enemyData.mp,
      ip: enemyData.ip,
      defense: enemyData.defense,
      magicDefense: enemyData.magicDefense,
      attacks: enemyData.attacks || ['Basic Attack'],
      resistances: enemyData.resistances || [],
      vulnerabilities: enemyData.vulnerabilities || []
    }]);
    setShowAddEnemy(false);
  };

  const removeEnemy = (enemyId) => {
    setEnemies(prev => prev.filter(enemy => enemy.id !== enemyId));
  };

  const rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
  };

  const calculateDamage = (attacker, target, damageType = 'PHYSICAL') => {
    const baseDamage = rollDice(20) + 10; // Base damage calculation
    const defense = damageType === 'PHYSICAL' ? target.defense : target.magicDefense;
    const finalDamage = Math.max(1, baseDamage - defense);
    
    return finalDamage;
  };

  const getCurrentParticipant = () => {
    if (!combatState.isInCombat) return null;
    return combatState.participants.find(p => p.id === combatState.turnOrder[combatState.currentTurn]);
  };

  const getAliveParticipants = () => {
    return combatState.participants.filter(p => p.currentHP > 0);
  };

  const getTargetableParticipants = () => {
    const currentParticipant = getCurrentParticipant();
    if (!currentParticipant) return [];
    
    return combatState.participants.filter(p => 
      p.id !== currentParticipant.id && 
      p.currentHP > 0 &&
      p.type !== currentParticipant.type
    );
  };

  const currentParticipant = getCurrentParticipant();

  return (
    <div className="combat-system">
      <div className="combat-header">
        <h3>⚔️ Combat System</h3>
        <div className="combat-controls">
          {!combatState.isInCombat ? (
            <button onClick={initializeCombat} className="start-combat-btn">
              Start Combat
            </button>
          ) : (
            <button onClick={endCombat} className="end-combat-btn">
              End Combat
            </button>
          )}
        </div>
      </div>

      <div className="combat-content">
        {/* Health Display */}
        <div className="health-display">
          <h4>Character Status</h4>
          <div className="health-bars">
            <div className="health-bar">
              <span className="bar-label">HP:</span>
              <div className="bar-container">
                <div 
                  className="bar-fill hp-fill"
                  style={{ width: `${(healthState.currentHP / (character?.hp || 100)) * 100}%` }}
                />
              </div>
              <span className="bar-value">{healthState.currentHP}/{character?.hp || 100}</span>
            </div>
            
            <div className="health-bar">
              <span className="bar-label">MP:</span>
              <div className="bar-container">
                <div 
                  className="bar-fill mp-fill"
                  style={{ width: `${(healthState.currentMP / (character?.mp || 50)) * 100}%` }}
                />
              </div>
              <span className="bar-value">{healthState.currentMP}/{character?.mp || 50}</span>
            </div>
            
            <div className="health-bar">
              <span className="bar-label">IP:</span>
              <div className="bar-container">
                <div 
                  className="bar-fill ip-fill"
                  style={{ width: `${(healthState.currentIP / (character?.ip || 5)) * 100}%` }}
                />
              </div>
              <span className="bar-value">{healthState.currentIP}/{character?.ip || 5}</span>
            </div>
          </div>
        </div>

        {/* Enemy Management */}
        <div className="enemy-management">
          <div className="enemy-header">
            <h4>Enemies</h4>
            <button onClick={() => setShowAddEnemy(true)} className="add-enemy-btn">
              Add Enemy
            </button>
          </div>
          
          {enemies.length === 0 ? (
            <div className="no-enemies">
              <span>No enemies added</span>
            </div>
          ) : (
            <div className="enemies-list">
              {enemies.map(enemy => (
                <div key={enemy.id} className="enemy-card">
                  <div className="enemy-info">
                    <span className="enemy-name">{enemy.name}</span>
                    <span className="enemy-stats">HP: {enemy.hp}, MP: {enemy.mp}</span>
                  </div>
                  <button 
                    onClick={() => removeEnemy(enemy.id)}
                    className="remove-enemy-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Combat Status */}
        {combatState.isInCombat && (
          <div className="combat-status">
            <h4>Combat Status</h4>
            <div className="turn-info">
              <span>Current Turn: {currentParticipant?.name}</span>
              <span>Round: {Math.floor(combatState.currentTurn / combatState.turnOrder.length) + 1}</span>
            </div>
            
            <div className="participants-list">
              {combatState.participants.map(participant => (
                <div 
                  key={participant.id} 
                  className={`participant-card ${participant.id === combatState.turnOrder[combatState.currentTurn] ? 'active' : ''} ${participant.currentHP === 0 ? 'defeated' : ''}`}
                >
                  <div className="participant-info">
                    <span className="participant-name">{participant.name}</span>
                    <span className="participant-hp">HP: {participant.currentHP}/{participant.hp}</span>
                  </div>
                  <div className="participant-status">
                    <span className="initiative">Init: {participant.initiative}</span>
                    {participant.statusEffects.length > 0 && (
                      <span className="status-count">Effects: {participant.statusEffects.length}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {currentParticipant?.type === 'player' && (
              <div className="player-actions">
                <button 
                  onClick={() => setShowCombatActions(true)}
                  className="action-btn"
                >
                  Take Action
                </button>
                <button 
                  onClick={nextTurn}
                  className="skip-turn-btn"
                >
                  Skip Turn
                </button>
              </div>
            )}
          </div>
        )}

        {/* Combat Log */}
        <div className="combat-log">
          <h4>Combat Log</h4>
          <div className="log-entries">
            {combatState.combatLog.map((entry, index) => (
              <div key={index} className="log-entry">
                <span className="log-time">{new Date().toLocaleTimeString()}</span>
                <span className="log-text">{entry}</span>
              </div>
            )).reverse()}
          </div>
        </div>
      </div>

      {/* Combat Actions Modal */}
      {showCombatActions && (
        <div className="combat-actions-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Combat Actions</h4>
              <button onClick={() => setShowCombatActions(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="action-selection">
                <label>Select Action:</label>
                <select 
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="action-select"
                >
                  <option value="">Choose action</option>
                  <option value="Attack">Attack</option>
                  <option value="Spell">Cast Spell</option>
                  <option value="Defend">Defend</option>
                  <option value="Item">Use Item</option>
                  <option value="Skill">Use Skill</option>
                </select>
              </div>
              
              {selectedAction && (
                <div className="target-selection">
                  <label>Select Target:</label>
                  <select 
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="target-select"
                  >
                    <option value="">Choose target</option>
                    {getTargetableParticipants().map(participant => (
                      <option key={participant.id} value={participant.id}>
                        {participant.name} (HP: {participant.currentHP}/{participant.hp})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {selectedAction && selectedTarget && (
                <div className="action-preview">
                  <p>
                    {currentParticipant?.name} will use {selectedAction} on {
                      combatState.participants.find(p => p.id === selectedTarget)?.name
                    }
                  </p>
                  <button 
                    onClick={() => {
                      const damage = selectedAction === 'Attack' ? calculateDamage(currentParticipant, combatState.participants.find(p => p.id === selectedTarget)) : 0;
                      performAction(selectedAction, selectedTarget, damage);
                      nextTurn();
                    }}
                    className="confirm-action-btn"
                  >
                    Confirm Action
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Enemy Modal */}
      {showAddEnemy && (
        <div className="add-enemy-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Enemy</h4>
              <button onClick={() => setShowAddEnemy(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <EnemyForm onAddEnemy={addEnemy} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enemy Form Component
const EnemyForm = ({ onAddEnemy }) => {
  const [enemyData, setEnemyData] = useState({
    name: '',
    hp: 50,
    mp: 20,
    ip: 3,
    defense: 10,
    magicDefense: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEnemy(enemyData);
    setEnemyData({
      name: '',
      hp: 50,
      mp: 20,
      ip: 3,
      defense: 10,
      magicDefense: 10
    });
  };

  return (
    <form onSubmit={handleSubmit} className="enemy-form">
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={enemyData.name}
          onChange={(e) => setEnemyData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>HP:</label>
          <input 
            type="number" 
            value={enemyData.hp}
            onChange={(e) => setEnemyData(prev => ({ ...prev, hp: parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label>MP:</label>
          <input 
            type="number" 
            value={enemyData.mp}
            onChange={(e) => setEnemyData(prev => ({ ...prev, mp: parseInt(e.target.value) }))}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label>IP:</label>
          <input 
            type="number" 
            value={enemyData.ip}
            onChange={(e) => setEnemyData(prev => ({ ...prev, ip: parseInt(e.target.value) }))}
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Defense:</label>
          <input 
            type="number" 
            value={enemyData.defense}
            onChange={(e) => setEnemyData(prev => ({ ...prev, defense: parseInt(e.target.value) }))}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Magic Defense:</label>
          <input 
            type="number" 
            value={enemyData.magicDefense}
            onChange={(e) => setEnemyData(prev => ({ ...prev, magicDefense: parseInt(e.target.value) }))}
            min="0"
            required
          />
        </div>
      </div>
      
      <button type="submit" className="add-btn">Add Enemy</button>
    </form>
  );
};

export default CombatSystem;