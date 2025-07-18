import React, { useState, useEffect } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, STARTING_ATTRIBUTES, HEROIC_STYLE_SKILLS, DEFAULT_CHARACTER, DAMAGE_TYPES, AFFINITY_TYPES } from '../shared/complete_game_data.js';
import CharacterAvatar from './CharacterAvatar';
import BondSystem from './BondSystem';
import StatusEffects from './StatusEffects';
import FabulaPoints from './FabulaPoints';
import EquipmentManager from './EquipmentManager';
import CombatSystem from './CombatSystem';
import CraftingSystem from './CraftingSystem';
import ResistanceDisplay from './ResistanceDisplay';
import './CharacterGenerator.css';
import characterStorage from '../services/characterStorage';

const ImprovedCharacterGenerator = ({ onCharacterChange, user }) => {
  const [character, setCharacter] = useState({
    ...DEFAULT_CHARACTER,
    classes: [
      { classKey: null, level: 1, abilities: {}, slot: 'primary' }
    ]
  });

  const [selectedSkillDescriptions, setSelectedSkillDescriptions] = useState({});
  const [showSkillDetails, setShowSkillDetails] = useState({});

  // Safe evaluation function for simple math formulas
  const safeEval = (expression) => {
    // Only allow numbers, basic operators, and parentheses
    if (!/^[0-9+\-*/()\s]+$/.test(expression)) {
      throw new Error('Invalid expression');
    }
    
    try {
      // Parse and evaluate simple math expressions
      const result = Function('"use strict"; return (' + expression + ')')();
      return result;
    } catch (e) {
      throw new Error('Evaluation failed');
    }
  };

  useEffect(() => {
    if (onCharacterChange) {
      onCharacterChange(character);
    }
  }, [character, onCharacterChange]);

  // Get available skills for a class - all skills are available from level 1
  const getAvailableSkills = (classKey, currentLevel) => {
    if (!classKey || !CHARACTER_CLASSES[classKey]) return {};
    
    const classData = CHARACTER_CLASSES[classKey];
    // Return all skills regardless of character level
    return classData.abilities || {};
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
    
    // The skill level indicates how many times it can be taken (max level = max times)
    const maxTimes = availableSkills[skillName].level || 1;
    
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
      
      // If level decreased, remove excess skill slots but keep all skills
      // (since all skills are available from level 1, we only need to manage slot count)
      if (newLevel < oldLevel) {
        const maxSkillSlots = getSkillSlotsForLevel(newLevel);
        const currentAbilities = newClasses[classIndex].abilities;
        const newAbilities = {};
        
        // Keep only the first N skills that fit in the available slots
        let slotCount = 0;
        Object.entries(currentAbilities).forEach(([slot, skillName]) => {
          if (slotCount < maxSkillSlots) {
            newAbilities[slot] = skillName;
            slotCount++;
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
              const timesAlreadyTaken = Object.values(currentClass.abilities).filter(
                skill => skill === skillName
              ).length;
              const maxTimes = skillData.level || 1;
              
              return (
                <option 
                  key={skillName} 
                  value={skillName}
                  disabled={!canTake && currentSkill !== skillName}
                >
                  {skillName} (Max: {maxTimes}) {timesAlreadyTaken > 0 ? `[${timesAlreadyTaken}/${maxTimes}]` : ''} {!canTake && currentSkill !== skillName ? ' - Max reached' : ''}
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
                  <span className="skill-level">Max Level: {availableSkills[currentSkill].level}</span>
                  <span className="skill-type">Type: {availableSkills[currentSkill].type}</span>
                  <span className="skill-cost">Cost: {availableSkills[currentSkill].cost}</span>
                  <span className="skill-current-level">Current SL: {(() => {
                    const timesAlreadyTaken = Object.values(currentClass.abilities).filter(
                      skill => skill === currentSkill
                    ).length;
                    return timesAlreadyTaken;
                  })()}</span>
                </div>
                <div className="skill-description">
                  {(() => {
                    const timesAlreadyTaken = Object.values(currentClass.abilities).filter(
                      skill => skill === currentSkill
                    ).length;
                    const skillLevel = timesAlreadyTaken; // Current SL
                    
                    // Replace SL in description with actual skill level
                    let description = availableSkills[currentSkill].description;
                    description = description.replace(/SL/g, skillLevel);
                    
                    // Replace formulas like 【5 + (SL × 5)】 with calculated values
                    description = description.replace(/【([^】]+)】/g, (match, formula) => {
                      try {
                        // Replace SL in formula with actual skill level
                        const calculatedFormula = formula.replace(/SL/g, skillLevel);
                        // Safe math evaluation for simple formulas
                        const result = safeEval(calculatedFormula.replace(/×/g, '*'));
                        return `【${result}】`;
                      } catch (e) {
                        return match; // Return original if evaluation fails
                      }
                    });
                    
                    return description;
                  })()}
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
    const totalLevel = calculateTotalLevel();
    const maxClasses = totalLevel >= 10 ? 3 : 2; // Ab Level 10 sind 3 Klassen erlaubt
    
    if (character.classes.length < maxClasses) {
      const slotName = character.classes.length === 1 ? 'secondary' : 'tertiary';
      setCharacter(prev => ({
        ...prev,
        classes: [
          ...prev.classes,
          { classKey: null, level: 1, abilities: {}, slot: slotName }
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
            if (benefit.includes('IP +2')) ip += 2; // Stackable IP bonuses from classes
          });
        }
      }
    });

    return { hp, mp, ip };
  };

  // Get classes with special rules
  const getClassesWithSpecialRules = () => {
    return character.classes
      .filter(cls => cls.classKey && CHARACTER_CLASSES[cls.classKey]?.specialRules)
      .map(cls => CHARACTER_CLASSES[cls.classKey]);
  };

  const resources = calculateResources();
  const classesWithSpecialRules = getClassesWithSpecialRules();

  const [savedCharacters, setSavedCharacters] = useState([]);
  const [storageStatus, setStorageStatus] = useState({ storage: 'localStorage' });
  const [zoomLevel, setZoomLevel] = useState(1);

  // Load saved characters on component mount
  useEffect(() => {
    loadSavedCharacters();
    updateStorageStatus();
  }, []);

  const loadSavedCharacters = async () => {
    try {
      const result = await characterStorage.loadCharacters();
      setSavedCharacters(result.characters);
      setStorageStatus(prev => ({ ...prev, storage: result.storage }));
    } catch (error) {
      console.error('Failed to load characters:', error);
      setSavedCharacters([]);
    }
  };

  const updateStorageStatus = async () => {
    try {
      const status = await characterStorage.getStorageStatus();
      setStorageStatus(status);
    } catch (error) {
      console.error('Failed to get storage status:', error);
    }
  };

  const saveCharacter = async () => {
    try {
      const result = await characterStorage.saveCharacter(character);
      
      if (result.success) {
        setCharacter(prev => ({ ...prev, id: result.data.id }));
        await loadSavedCharacters(); // Refresh the list
        
        const storageType = result.storage === 'supabase' ? 'cloud database' : 'local storage';
        alert(`Character saved successfully to ${storageType}!`);
      }
    } catch (error) {
      console.error('Failed to save character:', error);
      alert('Failed to save character. Please try again.');
    }
  };

  const loadCharacter = async (characterId) => {
    if (!characterId) return;
    
    const foundCharacter = savedCharacters.find(c => c.id === characterId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
      alert('Character loaded successfully!');
    }
  };

  const deleteCharacter = async (characterId) => {
    if (!confirm('Are you sure you want to delete this character?')) return;
    
    try {
      await characterStorage.deleteCharacter(characterId);
      await loadSavedCharacters(); // Refresh the list
      alert('Character deleted successfully!');
    } catch (error) {
      console.error('Failed to delete character:', error);
      alert('Failed to delete character. Please try again.');
    }
  };

  const handleAffinityChange = (newAffinities) => {
    setCharacter(prev => ({
      ...prev,
      affinities: newAffinities
    }));
  };

  return (
    <div className="character-generator improved two-column" style={{ '--zoom-level': zoomLevel }}>
      <div className="generator-header">
        <h2>🎭 Character Generator</h2>
        <div className="character-summary compact">
          <span>Total Level: {calculateTotalLevel()}</span>
          <span>HP: {resources.hp}</span>
          <span>MP: {resources.mp}</span>
          <span>IP: {resources.ip}</span>
        </div>
        <div className="zoom-controls">
          <button 
            onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
            className="zoom-btn"
          >
            🔍-
          </button>
          <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
          <button 
            onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))}
            className="zoom-btn"
          >
            🔍+
          </button>
          <button 
            onClick={() => setZoomLevel(1)}
            className="zoom-reset"
          >
            Reset
          </button>
        </div>
        <div className="character-actions">
          <div className="storage-status">
            <span className={`storage-indicator ${storageStatus.storage}`}>
              {storageStatus.storage === 'supabase' ? '☁️' : '💾'} 
              {storageStatus.storage === 'supabase' ? 'Cloud' : 'Local'}
            </span>
          </div>
          <button onClick={saveCharacter} className="save-btn">
            💾 Save Character
          </button>
          <select 
            onChange={(e) => e.target.value && loadCharacter(e.target.value)}
            value=""
            className="load-select"
          >
            <option value="">Load Character...</option>
            {savedCharacters.map(char => (
              <option key={char.id} value={char.id}>
                {char.name} (Level {char.classes?.reduce((sum, cls) => sum + (cls.level || 1), 0) || 1})
              </option>
            ))}
          </select>
          {savedCharacters.length > 0 && (
            <select 
              onChange={(e) => e.target.value && deleteCharacter(e.target.value)}
              value=""
              className="delete-select"
            >
              <option value="">Delete Character...</option>
              {savedCharacters.map(char => (
                <option key={char.id} value={char.id}>
                  🗑️ {char.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="generator-content two-column-layout">
        <div className="left-column">
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
            {(() => {
              const totalLevel = calculateTotalLevel();
              const maxClasses = totalLevel >= 10 ? 3 : 2;
              const canAddClass = character.classes.length < maxClasses;
              
              if (canAddClass) {
                const buttonText = character.classes.length === 1 
                  ? "+ Add Second Class" 
                  : "+ Add Third Class";
                return (
                  <button onClick={addCharacterClass} className="add-class-btn compact">
                    {buttonText}
                  </button>
                );
              }
              
              if (totalLevel < 10 && character.classes.length >= 2) {
                return (
                  <span className="class-requirement">
                    Reach level 10+ to add a third class
                  </span>
                );
              }
              
              return null;
            })()}
          </div>
          
          {character.classes.map((cls, index) => 
            renderClassSection(cls, index)
          )}
        </div>
        </div>

        <div className="right-column">
          {/* Advanced Character Systems */}
        <div className="advanced-systems">
          <FabulaPoints 
            character={character} 
            onFabulaPointsChange={(fabulaData) => 
              setCharacter(prev => ({ 
                ...prev, 
                fabulaPoints: fabulaData.points, 
                fabulaHistory: fabulaData.history 
              }))
            } 
          />
          
          <BondSystem 
            character={character} 
            onBondChange={(bonds) => 
              setCharacter(prev => ({ ...prev, bonds }))
            } 
          />
          
          <StatusEffects 
            character={character} 
            onStatusChange={(statusEffects) => 
              setCharacter(prev => ({ ...prev, statusEffects }))
            } 
          />
          
          <EquipmentManager 
            character={character} 
            onEquipmentChange={(equipmentData) => 
              setCharacter(prev => ({ 
                ...prev, 
                equipment: equipmentData.equipment,
                equippedItems: equipmentData.equippedItems,
                zenit: equipmentData.zenit
              }))
            } 
          />
          
          <CombatSystem 
            character={character} 
            onCombatChange={(combatData) => 
              setCharacter(prev => ({ 
                ...prev, 
                combatState: combatData.combatState,
                healthState: combatData.healthState
              }))
            } 
          />
          
          <CraftingSystem 
            character={character} 
            onCraftingChange={(craftingData) => 
              setCharacter(prev => ({ 
                ...prev, 
                craftingMaterials: craftingData.craftingMaterials,
                craftingSkill: craftingData.craftingSkill,
                craftingRecipes: craftingData.recipes
              }))
            } 
          />
          
          <ResistanceDisplay
            character={character}
            onAffinityChange={handleAffinityChange}
            editable={true}
          />
        </div>
        </div>
      </div>

      {/* Special Class Rules */}
      {classesWithSpecialRules.length > 0 && (
          <div className="special-rules-section">
            <h3>Special Class Rules</h3>
            {classesWithSpecialRules.map((classInfo, index) => (
              <div key={index} className="special-rule-card">
                <div className="special-rule-header">
                  <h4>{classInfo.name}: {classInfo.specialRules.title}</h4>
                </div>
                <div className="special-rule-content">
                  <p className="special-rule-description">
                    {classInfo.specialRules.description}
                  </p>
                  
                  {classInfo.specialRules.arcanaTypes && (
                    <div className="arcana-types">
                      <h5>Arcana Types:</h5>
                      <ul>
                        {classInfo.specialRules.arcanaTypes.map((arcana, i) => (
                          <li key={i}>
                            <strong>{arcana.name}</strong>: {arcana.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {classInfo.specialRules.bindingRules && (
                    <div className="binding-rules">
                      <h5>Binding Rules:</h5>
                      <ul>
                        {classInfo.specialRules.bindingRules.map((rule, i) => (
                          <li key={i}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {classInfo.specialRules.characterSheetRules && (
                    <div className="character-sheet-rules">
                      <h5>Character Sheet Rules:</h5>
                      <div className="rule-sections">
                        {classInfo.specialRules.characterSheetRules.sections.map((section, i) => (
                          <div key={i} className="rule-section">
                            <h6>{section.title}</h6>
                            <p>{section.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {classInfo.specialRules.arcanaSelection && (
                    <div className="arcana-selection">
                      <h5>Available Arcana:</h5>
                      <div className="arcana-list">
                        {Object.entries(classInfo.specialRules.arcanaSelection.availableArcana).map(([key, arcana]) => (
                          <div key={key} className="arcana-item">
                            <h6>{arcana.name}</h6>
                            {arcana.domains && <p><strong>Domains:</strong> {arcana.domains.join(', ')}</p>}
                            {arcana.description && <p>{arcana.description}</p>}
                            
                            {arcana.mergeBenefits && (
                              <div className="merge-benefits">
                                <strong>Merge Benefits:</strong>
                                <ul>
                                  {arcana.mergeBenefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {arcana.dismissEffect && (
                              <div className="dismiss-effect">
                                <strong>Dismiss Effect - {arcana.dismissEffect.name}:</strong>
                                <p>{arcana.dismissEffect.description}</p>
                                {arcana.dismissEffect.options && (
                                  <ul>
                                    {arcana.dismissEffect.options.map((option, i) => (
                                      <li key={i}>
                                        <strong>{option.name}:</strong> {option.effect}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {arcana.dismissEffect.effect && (
                                  <p>{arcana.dismissEffect.effect}</p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {classInfo.specialRules.mutationTypes && (
                    <div className="mutation-types">
                      <h5>Mutation Types:</h5>
                      <ul>
                        {classInfo.specialRules.mutationTypes.map((mutation, i) => (
                          <li key={i}>
                            <strong>{mutation.name}</strong>: {mutation.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {classInfo.specialRules.mutationRules && (
                    <div className="mutation-rules">
                      <h5>Mutation Rules:</h5>
                      <ul>
                        {classInfo.specialRules.mutationRules.map((rule, i) => (
                          <li key={i}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Character Actions */}
      <div className="bottom-character-actions">
        <button onClick={() => console.log(character)} className="preview-btn">
          Export Character
        </button>
        <button onClick={() => setCharacter({...DEFAULT_CHARACTER, classes: [{ classKey: null, level: 1, abilities: {}, slot: 'primary' }]})} className="reset-btn">
          Reset Character
        </button>
      </div>
    </div>
  );
};

export default ImprovedCharacterGenerator;