import React, { useState } from 'react';
import { DAMAGE_TYPES, AFFINITY_TYPES } from '../shared/complete_game_data';
import './ResistanceDisplay.css';

const ResistanceDisplay = ({ character, onAffinityChange, editable = false }) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleAffinityChange = (damageType, newAffinity) => {
    if (!editable || !onAffinityChange) return;
    
    const updatedAffinities = {
      ...character.affinities,
      [damageType]: newAffinity
    };
    onAffinityChange(updatedAffinities);
  };

  const renderAffinityIcon = (damageType, damageConfig, affinity) => {
    const affinityConfig = AFFINITY_TYPES[affinity];
    
    if (!affinityConfig || affinity === 'NORMAL') {
      return (
        <div 
          className="resistance-item normal"
          onMouseEnter={() => setShowTooltip(`${damageType}-${affinity}`)}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <span className="damage-icon" style={{ color: damageConfig.color }}>
            {damageConfig.icon}
          </span>
          {showTooltip === `${damageType}-${affinity}` && (
            <div className="resistance-tooltip">
              <strong>{damageConfig.name}</strong><br/>
              {affinityConfig?.description || 'Normal damage'}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        className={`resistance-item ${affinity.toLowerCase()}`}
        onMouseEnter={() => setShowTooltip(`${damageType}-${affinity}`)}
        onMouseLeave={() => setShowTooltip(null)}
      >
        <div className="resistance-stack">
          <span className="damage-icon" style={{ color: damageConfig.color }}>
            {damageConfig.icon}
          </span>
          <span 
            className="affinity-icon" 
            style={{ color: affinityConfig.color }}
          >
            {affinityConfig.icon}
          </span>
        </div>
        {showTooltip === `${damageType}-${affinity}` && (
          <div className="resistance-tooltip">
            <strong>{damageConfig.name} - {affinityConfig.name}</strong><br/>
            {affinityConfig.description}<br/>
            <em>Damage modifier: {affinityConfig.modifier}</em>
          </div>
        )}
      </div>
    );
  };

  const renderEditableAffinity = (damageType, damageConfig, currentAffinity) => {
    return (
      <div className="editable-resistance-item">
        <div className="damage-type-header">
          <span className="damage-icon" style={{ color: damageConfig.color }}>
            {damageConfig.icon}
          </span>
          <span className="damage-name">{damageConfig.name}</span>
        </div>
        <select 
          value={currentAffinity}
          onChange={(e) => handleAffinityChange(damageType, e.target.value)}
          className="affinity-select"
        >
          {Object.entries(AFFINITY_TYPES).map(([key, affinity]) => (
            <option key={key} value={key}>
              {affinity.icon} {affinity.name} ({affinity.modifier})
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="resistance-display">
      <h4>🛡️ Damage Affinities</h4>
      
      {editable ? (
        <div className="editable-resistances">
          {Object.entries(DAMAGE_TYPES).map(([key, damageConfig]) => {
            const damageType = key.toLowerCase();
            const currentAffinity = character.affinities?.[damageType] || 'NORMAL';
            
            return (
              <div key={key}>
                {renderEditableAffinity(damageType, damageConfig, currentAffinity)}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="resistance-grid">
          {Object.entries(DAMAGE_TYPES).map(([key, damageConfig]) => {
            const damageType = key.toLowerCase();
            const affinity = character.affinities?.[damageType] || 'NORMAL';
            
            return (
              <div key={key}>
                {renderAffinityIcon(damageType, damageConfig, affinity)}
              </div>
            );
          })}
        </div>
      )}
      
      {!editable && (
        <div className="resistance-legend">
          <div className="legend-item">
            <span className="legend-icon">🛡️</span> Resistant (-5 dmg)
          </div>
          <div className="legend-item">
            <span className="legend-icon">🚫</span> Immune (0 dmg)
          </div>
          <div className="legend-item">
            <span className="legend-icon">🔻</span> Vulnerable (+5 dmg)
          </div>
        </div>
      )}
    </div>
  );
};

export default ResistanceDisplay;