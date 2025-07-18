import React, { useState } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES } from '../shared/complete_game_data.js';
import './CharacterSheet.css';

const CharacterSheet = ({ character, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!character) return null;

  const calculateTotalLevel = () => {
    return character.classes?.reduce((total, cls) => total + cls.level, 0) || 0;
  };

  const getAllSkills = () => {
    const skills = [];
    character.classes?.forEach(cls => {
      if (cls.classKey && CHARACTER_CLASSES[cls.classKey]) {
        const classInfo = CHARACTER_CLASSES[cls.classKey];
        Object.entries(cls.abilities || {}).forEach(([slot, skillName]) => {
          if (classInfo.abilities && classInfo.abilities[skillName]) {
            skills.push({
              name: skillName,
              class: classInfo.name,
              level: classInfo.abilities[skillName].level,
              description: classInfo.abilities[skillName].description,
              type: classInfo.abilities[skillName].type,
              cost: classInfo.abilities[skillName].cost
            });
          }
        });
      }
    });
    return skills;
  };

  const allSkills = getAllSkills();
  const totalLevel = calculateTotalLevel();

  return (
    <div className="character-sheet-overlay">
      <div className="character-sheet">
        <div className="sheet-header">
          <div className="character-title">
            <h2>{character.name || 'Unnamed Character'}</h2>
            <div className="character-basic-info">
              <span>Level {totalLevel}</span>
              <span>•</span>
              <span>{character.identity || 'Unknown Identity'}</span>
              <span>•</span>
              <span>{character.theme || 'No Theme'}</span>
            </div>
          </div>
          <button onClick={onClose} className="close-sheet-btn">×</button>
        </div>

        <div className="sheet-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'abilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('abilities')}
          >
            Abilities
          </button>
        </div>

        <div className="sheet-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="character-overview">
                <div className="overview-section">
                  <h3>Basic Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Name:</span>
                      <span className="value">{character.name || 'Unnamed'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Identity:</span>
                      <span className="value">{character.identity || 'Unknown'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Theme:</span>
                      <span className="value">{character.theme || 'None'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Origin:</span>
                      <span className="value">{character.origin || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                <div className="overview-section">
                  <h3>Attributes</h3>
                  <div className="attributes-display">
                    {Object.entries(ATTRIBUTES).map(([key, attr]) => (
                      <div key={key} className="attribute-display">
                        <span className="attr-name">{key.toUpperCase()}</span>
                        <span className="attr-value">
                          {character.attributes?.[attr] || 8} (d{character.attributes?.[attr] || 8})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overview-section">
                  <h3>Classes</h3>
                  <div className="classes-overview">
                    {character.classes?.map((cls, index) => (
                      <div key={index} className="class-overview-item">
                        <span className="class-name">
                          {cls.classKey ? CHARACTER_CLASSES[cls.classKey]?.name : 'No Class'}
                        </span>
                        <span className="class-level">Level {cls.level}</span>
                        <span className="class-abilities">
                          {Object.keys(cls.abilities || {}).length} abilities
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'abilities' && (
            <div className="abilities-content">
              <div className="abilities-section">
                <h3>All Abilities ({allSkills.length})</h3>
                {allSkills.length === 0 ? (
                  <div className="no-abilities">
                    <span>No abilities acquired yet</span>
                  </div>
                ) : (
                  <div className="abilities-grid">
                    {allSkills.map((skill, index) => (
                      <div key={index} className="ability-card">
                        <div className="ability-header">
                          <span className="ability-name">{skill.name}</span>
                          <span className="ability-class">{skill.class}</span>
                        </div>
                        <div className="ability-meta">
                          <span className="ability-level">Level {skill.level}</span>
                          <span className="ability-type">{skill.type}</span>
                          <span className="ability-cost">{skill.cost}</span>
                        </div>
                        <div className="ability-description">
                          {skill.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;