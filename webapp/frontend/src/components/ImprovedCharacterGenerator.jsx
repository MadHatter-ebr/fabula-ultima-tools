import React, { useState, useEffect } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, STARTING_ATTRIBUTES, HEROIC_STYLE_SKILLS, DEFAULT_CHARACTER } from '../shared/complete_game_data.js';
import CharacterAvatar from './CharacterAvatar';
import './CharacterGenerator.css';

const ImprovedCharacterGenerator = ({ onCharacterChange, user }) => {
  const [character, setCharacter] = useState({
    ...DEFAULT_CHARACTER,
    classes: [
      { classKey: null, level: 1, abilities: {}, slot: 'primary' }
    ]
  });

  const [selectedSkillDescriptions, setSelectedSkillDescriptions] = useState({});
  const [showSkillDetails, setShowSkillDetails] = useState({});

  useEffect(() => {
    if (onCharacterChange) {
      onCharacterChange(character);
    }
  }, [character, onCharacterChange]);

  // Get available skills for a class based on current level
  const getAvailableSkills = (classKey, currentLevel) => {
    if (!classKey || !CHARACTER_CLASSES[classKey]) return {};
    
    const classData = CHARACTER_CLASSES[classKey];
    const availableSkills = {};
    
    // Only include skills that are available at or below current level
    Object.entries(classData.abilities || {}).forEach(([skillName, skillData]) => {
      if (skillData.level <= currentLevel) {
        availableSkills[skillName] = skillData;
      }
    });
    
    return availableSkills;
  };

  // Check if a skill can be taken (based on usage limits)
  const canTakeSkill = (classIndex, skillName) => {
    const currentClass = character.classes[classIndex];
    if (!currentClass.classKey) return false;
    
    const availableSkills = getAvailableSkills(currentClass.classKey, currentClass.level);
    if (!availableSkills[skillName]) return false;
    
    // Count how many times this skill is already taken
    const timesAlreadyTaken = Object.values(currentClass.abilities).filter(
      skill => skill === skillName
    ).length;
    
    // Most skills can only be taken once, some special skills might allow multiple times
    // This would need to be defined in the skill data - for now, limit to 1
    const maxTimes = availableSkills[skillName].maxTimes || 1;
    
    return timesAlreadyTaken < maxTimes;
  };

  // Get skill slots based on class level
  const getSkillSlotsForLevel = (level) => {
    // In Fabula Ultima, you get skills at levels 1, 2, 3, 4, 5, 6, 8, 10
    const skillLevels = [1, 2, 3, 4, 5, 6, 8, 10];
    return skillLevels.filter(skillLevel => skillLevel <= level).length;
  };

  const updateClassLevel = (classIndex, newLevel) => {
    setCharacter(prev => {
      const newClasses = [...prev.classes];
      const oldLevel = newClasses[classIndex].level;
      newClasses[classIndex].level = parseInt(newLevel);
      
      // If level decreased, remove skills that are no longer available
      if (newLevel < oldLevel) {
        const classKey = newClasses[classIndex].classKey;
        const availableSkills = getAvailableSkills(classKey, newLevel);
        const newAbilities = {};
        
        Object.entries(newClasses[classIndex].abilities).forEach(([slot, skillName]) => {
          if (availableSkills[skillName]) {
            newAbilities[slot] = skillName;
          }
        });
        
        newClasses[classIndex].abilities = newAbilities;
      }
      
      return {
        ...prev,
        classes: newClasses
      };
    });
  };

  const updateClassSkill = (classIndex, skillSlot, skillName) => {
    setCharacter(prev => {
      const newClasses = [...prev.classes];
      
      if (skillName === '') {
        // Remove skill
        delete newClasses[classIndex].abilities[skillSlot];
      } else {
        // Add skill
        newClasses[classIndex].abilities[skillSlot] = skillName;
      }
      
      return {
        ...prev,
        classes: newClasses
      };
    });
  };

  const toggleSkillDescription = (classIndex, skillName) => {
    const key = `${classIndex}-${skillName}`;
    setShowSkillDetails(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderSkillSelector = (classIndex, skillSlot) => {
    const currentClass = character.classes[classIndex];
    if (!currentClass.classKey) return null;
    
    const availableSkills = getAvailableSkills(currentClass.classKey, currentClass.level);
    const currentSkill = currentClass.abilities[skillSlot];
    
    return (
      <div className="skill-selector" key={skillSlot}>
        <div className="skill-header">
          <label>Skill {skillSlot}:</label>
          <select
            value={currentSkill || ''}
            onChange={(e) => updateClassSkill(classIndex, skillSlot, e.target.value)}
            className="skill-select compact"
          >
            <option value="">-- Select Skill --</option>
            {Object.entries(availableSkills).map(([skillName, skillData]) => {
              const canTake = canTakeSkill(classIndex, skillName);
              return (
                <option 
                  key={skillName} 
                  value={skillName}
                  disabled={!canTake && currentSkill !== skillName}
                >
                  {skillName} (Lv.{skillData.level}) {!canTake && currentSkill !== skillName ? ' - Already taken' : ''}
                </option>
              );
            })}
          </select>
        </div>
        
        {currentSkill && availableSkills[currentSkill] && (
          <div className="skill-details">
            <button 
              type="button"
              className="skill-toggle-btn"
              onClick={() => toggleSkillDescription(classIndex, currentSkill)}
            >
              {showSkillDetails[`${classIndex}-${currentSkill}`] ? '▼' : '▶'} 
              {currentSkill}
            </button>
            
            {showSkillDetails[`${classIndex}-${currentSkill}`] && (
              <div className="skill-description-full">
                <div className="skill-meta">
                  <span className="skill-level">Level: {availableSkills[currentSkill].level}</span>
                  <span className="skill-type">Type: {availableSkills[currentSkill].type}</span>
                  <span className="skill-cost">Cost: {availableSkills[currentSkill].cost}</span>
                </div>
                <div className="skill-description">
                  {availableSkills[currentSkill].description}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderClassSection = (classData, classIndex) => {
    const currentClass = character.classes[classIndex];
    const maxSkillSlots = getSkillSlotsForLevel(currentClass.level);
    const skillSlots = Array.from({ length: maxSkillSlots }, (_, i) => `skill_${i + 1}`);
    
    return (
      <div className="class-section compact" key={classIndex}>
        <div className="class-header">
          <div className="class-basic-info">
            <div className="class-selection">
              <label>Class {classIndex + 1}:</label>
              <select
                value={currentClass.classKey || ''}
                onChange={(e) => updateClass(classIndex, e.target.value)}
                className="class-select compact"
              >
                <option value="">-- Select Class --</option>
                {Object.entries(CHARACTER_CLASSES).map(([key, cls]) => (
                  <option key={key} value={key}>{cls.name}</option>
                ))}
              </select>
            </div>
            
            {currentClass.classKey && (
              <div className="class-level">
                <label>Level:</label>
                <select
                  value={currentClass.level}
                  onChange={(e) => updateClassLevel(classIndex, e.target.value)}
                  className="level-select compact"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {currentClass.classKey && CHARACTER_CLASSES[currentClass.classKey] && (
            <div className="class-info compact">
              <div className="class-description">
                <strong>{CHARACTER_CLASSES[currentClass.classKey].name}</strong>: {CHARACTER_CLASSES[currentClass.classKey].description}
              </div>
              <div className="class-attributes">
                <strong>Primary Attributes:</strong> {CHARACTER_CLASSES[currentClass.classKey].primaryAttributes?.join(', ')}
              </div>
              <div className="class-benefits">
                <strong>Free Benefits:</strong> {CHARACTER_CLASSES[currentClass.classKey].freeBenefits?.join(', ')}
              </div>
            </div>
          )}
        </div>
        
        {currentClass.classKey && (
          <div className="skills-section">
            <h4>Skills ({Object.keys(currentClass.abilities).length}/{maxSkillSlots}):</h4>
            <div className="skills-grid">
              {skillSlots.map(skillSlot => renderSkillSelector(classIndex, skillSlot))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const updateClass = (classIndex, classKey) => {
    setCharacter(prev => {
      const newClasses = [...prev.classes];
      newClasses[classIndex] = {
        ...newClasses[classIndex],
        classKey: classKey,
        abilities: {} // Reset abilities when changing class
      };
      return {
        ...prev,
        classes: newClasses
      };
    });
  };

  const addCharacterClass = () => {
    if (character.classes.length < 2) {
      setCharacter(prev => ({
        ...prev,
        classes: [
          ...prev.classes,
          { classKey: null, level: 1, abilities: {}, slot: 'secondary' }
        ]
      }));
    }
  };

  const removeCharacterClass = (classIndex) => {
    if (character.classes.length > 1) {
      setCharacter(prev => ({
        ...prev,
        classes: prev.classes.filter((_, index) => index !== classIndex)
      }));
    }
  };

  const updateBasicInfo = (field, value) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAttribute = (attribute, value) => {
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: parseInt(value)
      }
    }));
  };

  const calculateTotalLevel = () => {
    return character.classes.reduce((total, cls) => total + cls.level, 0);
  };

  const calculateResources = () => {
    let hp = 40;
    let mp = 40;
    let ip = 5;
    
    character.classes.forEach(cls => {
      if (cls.classKey && CHARACTER_CLASSES[cls.classKey]) {
        const classInfo = CHARACTER_CLASSES[cls.classKey];
        if (classInfo.freeBenefits) {
          classInfo.freeBenefits.forEach(benefit => {
            if (benefit.includes('HP +5')) hp += 5;
            if (benefit.includes('MP +5')) mp += 5;
            if (benefit.includes('IP +2')) ip += 2;
          });
        }
      }
    });

    return { hp, mp, ip };
  };

  const resources = calculateResources();

  return (
    <div className="character-generator improved">
      <div className="generator-header">
        <h2>🎭 Character Generator</h2>
        <div className="character-summary compact">
          <span>Total Level: {calculateTotalLevel()}</span>
          <span>HP: {resources.hp}</span>
          <span>MP: {resources.mp}</span>
          <span>IP: {resources.ip}</span>
        </div>
      </div>

      <div className="generator-content">
        {/* Basic Information - Compact */}
        <div className="basic-info-section compact">
          <h3>Basic Information</h3>
          <div className="basic-info-grid">
            <input
              type="text"
              placeholder="Character Name"
              value={character.name || ''}
              onChange={(e) => updateBasicInfo('name', e.target.value)}
              className="name-input compact"
            />
            <input
              type="text"
              placeholder="Identity"
              value={character.identity || ''}
              onChange={(e) => updateBasicInfo('identity', e.target.value)}
              className="identity-input compact"
            />
            <input
              type="text"
              placeholder="Theme"
              value={character.theme || ''}
              onChange={(e) => updateBasicInfo('theme', e.target.value)}
              className="theme-input compact"
            />
            <input
              type="text"
              placeholder="Origin"
              value={character.origin || ''}
              onChange={(e) => updateBasicInfo('origin', e.target.value)}
              className="origin-input compact"
            />
          </div>
        </div>

        {/* Attributes - Compact */}
        <div className="attributes-section compact">
          <h3>Attributes</h3>
          <div className="attributes-grid">
            {Object.keys(ATTRIBUTES).map(attr => (
              <div key={attr} className="attribute-control">
                <label>{attr.charAt(0).toUpperCase() + attr.slice(1).toLowerCase()}:</label>
                <select
                  value={character.attributes[ATTRIBUTES[attr]] || 8}
                  onChange={(e) => updateAttribute(ATTRIBUTES[attr], e.target.value)}
                  className="attribute-select compact"
                >
                  <option value={6}>6 (d6)</option>
                  <option value={8}>8 (d8)</option>
                  <option value={10}>10 (d10)</option>
                  <option value={12}>12 (d12)</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Classes */}
        <div className="classes-section">
          <div className="classes-header">
            <h3>Classes</h3>
            {character.classes.length < 2 && (
              <button onClick={addCharacterClass} className="add-class-btn compact">
                + Add Second Class
              </button>
            )}
          </div>
          
          {character.classes.map((cls, index) => 
            renderClassSection(cls, index)
          )}
        </div>

        {/* Character Actions */}
        <div className="character-actions">
          <button onClick={() => console.log(character)} className="preview-btn">
            Preview Character
          </button>
          <button onClick={() => setCharacter({...DEFAULT_CHARACTER, classes: [{ classKey: null, level: 1, abilities: {}, slot: 'primary' }]})} className="reset-btn">
            Reset Character
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImprovedCharacterGenerator;