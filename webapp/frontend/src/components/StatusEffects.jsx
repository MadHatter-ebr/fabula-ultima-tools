import React, { useState, useEffect } from 'react';
import { STATUS_EFFECTS } from '../shared/complete_game_data.js';
import './StatusEffects.css';

const StatusEffects = ({ character, onStatusChange }) => {
  const [activeEffects, setActiveEffects] = useState(character?.statusEffects || []);
  const [showAddEffect, setShowAddEffect] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [customDescription, setCustomDescription] = useState('');

  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(activeEffects);
    }
  }, [activeEffects, onStatusChange]);

  const addEffect = () => {
    if (!selectedEffect) return;

    const effectData = STATUS_EFFECTS[selectedEffect];
    const newEffect = {
      id: Date.now(),
      type: selectedEffect,
      name: effectData.name,
      description: customDescription || effectData.description,
      duration: customDuration || effectData.duration,
      effects: effectData.effects,
      positive: effectData.type === 'positive',
      applied: new Date().toISOString(),
      remaining: getDurationInTurns(customDuration || effectData.duration)
    };

    setActiveEffects(prev => [...prev, newEffect]);
    setSelectedEffect('');
    setCustomDuration('');
    setCustomDescription('');
    setShowAddEffect(false);
  };

  const removeEffect = (effectId) => {
    setActiveEffects(prev => prev.filter(effect => effect.id !== effectId));
  };

  const updateEffectDuration = (effectId, newDuration) => {
    setActiveEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, duration: newDuration, remaining: getDurationInTurns(newDuration) }
        : effect
    ));
  };

  const decrementDuration = (effectId) => {
    setActiveEffects(prev => prev.map(effect => {
      if (effect.id === effectId && effect.remaining > 0) {
        const newRemaining = effect.remaining - 1;
        return { ...effect, remaining: newRemaining };
      }
      return effect;
    }));
  };

  const getDurationInTurns = (duration) => {
    if (duration === 'scene') return 10; // Assume 10 turns per scene
    if (duration === 'permanent') return 999;
    const matches = duration.match(/(\d+)\s*(turn|turns)/);
    return matches ? parseInt(matches[1]) : 1;
  };

  const getEffectIcon = (effectType) => {
    const icons = {
      // Core Fabula Ultima Status Effects
      DAZED: '😵‍💫',
      ENRAGED: '😡',
      POISONED: '☠️',
      SHAKEN: '😰',
      SLOW: '🐌',
      WEAK: '💪❌',
      // Additional Effects
      BLESSED: '✨',
      HASTE: '⚡',
      REGENERATION: '💚',
      CURSED: '💀',
      PARALYZED: '🥶',
      CONFUSED: '😵',
      FRIGHTENED: '😨'
    };
    return icons[effectType] || '⚪';
  };

  const getEffectColor = (positive) => {
    return positive ? 'var(--ff9-crystal-blue)' : 'var(--ff9-crystal-red)';
  };

  const processEffectTurn = () => {
    setActiveEffects(prev => prev.map(effect => {
      let newRemaining = effect.remaining;
      
      // Apply per-turn effects
      if (effect.effects.hp_regen) {
        // This would integrate with character HP system
        console.log(`${effect.name}: Regenerating ${effect.effects.hp_regen} HP`);
      }
      
      if (effect.effects.hp_damage) {
        // This would integrate with character HP system
        console.log(`${effect.name}: Taking ${effect.effects.hp_damage} damage`);
      }
      
      // Decrement duration
      if (newRemaining > 0) {
        newRemaining--;
      }
      
      return { ...effect, remaining: newRemaining };
    }).filter(effect => effect.remaining > 0)); // Remove expired effects
  };

  const categorizeEffects = () => {
    const positive = activeEffects.filter(effect => effect.positive);
    const negative = activeEffects.filter(effect => !effect.positive);
    return { positive, negative };
  };

  const { positive, negative } = categorizeEffects();

  return (
    <div className="status-effects">
      <div className="status-effects-header">
        <h3>⚡ Status Effects</h3>
        <div className="effect-controls">
          <button 
            onClick={processEffectTurn}
            className="process-turn-btn"
          >
            Process Turn
          </button>
          <button 
            onClick={() => setShowAddEffect(true)}
            className="add-effect-btn"
          >
            + Add Effect
          </button>
        </div>
      </div>

      <div className="effects-summary">
        <div className="effect-count positive">
          <span className="count-label">Positive:</span>
          <span className="count-value">{positive.length}</span>
        </div>
        <div className="effect-count negative">
          <span className="count-label">Negative:</span>
          <span className="count-value">{negative.length}</span>
        </div>
      </div>

      {activeEffects.length === 0 ? (
        <div className="no-effects">
          <p>No active status effects.</p>
        </div>
      ) : (
        <>
          {positive.length > 0 && (
            <div className="effects-category">
              <h4 className="category-title positive">✨ Positive Effects</h4>
              <div className="effects-grid">
                {positive.map(effect => (
                  <div key={effect.id} className="effect-card positive">
                    <div className="effect-header">
                      <div className="effect-title">
                        <span className="effect-icon">{getEffectIcon(effect.type)}</span>
                        <span className="effect-name">{effect.name}</span>
                      </div>
                      <button 
                        onClick={() => removeEffect(effect.id)}
                        className="remove-effect-btn"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="effect-description">
                      {effect.description}
                    </div>
                    
                    <div className="effect-duration">
                      <span className="duration-label">Duration:</span>
                      <span className="duration-value">
                        {effect.remaining === 999 ? 'Permanent' : `${effect.remaining} turns`}
                      </span>
                    </div>
                    
                    <div className="effect-mechanics">
                      {Object.entries(effect.effects).map(([key, value]) => (
                        <div key={key} className="mechanic">
                          <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {negative.length > 0 && (
            <div className="effects-category">
              <h4 className="category-title negative">💀 Negative Effects</h4>
              <div className="effects-grid">
                {negative.map(effect => (
                  <div key={effect.id} className="effect-card negative">
                    <div className="effect-header">
                      <div className="effect-title">
                        <span className="effect-icon">{getEffectIcon(effect.type)}</span>
                        <span className="effect-name">{effect.name}</span>
                      </div>
                      <button 
                        onClick={() => removeEffect(effect.id)}
                        className="remove-effect-btn"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="effect-description">
                      {effect.description}
                    </div>
                    
                    <div className="effect-duration">
                      <span className="duration-label">Duration:</span>
                      <span className="duration-value">
                        {effect.remaining === 999 ? 'Permanent' : `${effect.remaining} turns`}
                      </span>
                    </div>
                    
                    <div className="effect-mechanics">
                      {Object.entries(effect.effects).map(([key, value]) => (
                        <div key={key} className="mechanic">
                          <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {showAddEffect && (
        <div className="add-effect-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Status Effect</h4>
              <button 
                onClick={() => setShowAddEffect(false)}
                className="close-modal-btn"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Effect Type:</label>
                <select 
                  value={selectedEffect} 
                  onChange={(e) => setSelectedEffect(e.target.value)}
                  className="effect-type-select"
                >
                  <option value="">Select Status Effect</option>
                  {Object.entries(STATUS_EFFECTS).map(([key, effect]) => (
                    <option key={key} value={key}>
                      {effect.name} ({effect.type})
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedEffect && (
                <div className="effect-preview">
                  <h5>{STATUS_EFFECTS[selectedEffect].name}</h5>
                  <p><strong>Type:</strong> {STATUS_EFFECTS[selectedEffect].type}</p>
                  <p><strong>Description:</strong> {STATUS_EFFECTS[selectedEffect].description}</p>
                  <p><strong>Default Duration:</strong> {STATUS_EFFECTS[selectedEffect].duration}</p>
                  <div className="effect-stats">
                    <strong>Effects:</strong>
                    {Object.entries(STATUS_EFFECTS[selectedEffect].effects).map(([key, value]) => (
                      <div key={key} className="effect-stat">
                        {key.replace('_', ' ').toUpperCase()}: {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <label>Custom Duration (optional):</label>
                <input 
                  type="text"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="e.g., 5 turns, scene, permanent"
                  className="duration-input"
                />
              </div>
              
              <div className="form-group">
                <label>Custom Description (optional):</label>
                <textarea 
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Custom description for this specific instance..."
                  className="description-input"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={addEffect}
                className="confirm-btn"
                disabled={!selectedEffect}
              >
                Add Effect
              </button>
              <button 
                onClick={() => setShowAddEffect(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusEffects;