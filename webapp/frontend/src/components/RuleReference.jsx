import React, { useState } from 'react';
import { CHARACTER_CLASSES, ATTRIBUTES, DICE_TYPES, DAMAGE_TYPES, STATUS_EFFECTS, BASIC_WEAPONS, GAME_MECHANICS, HEXER_SPELLS } from '../shared/game_data.js';
import './RuleReference.css';

const RuleReference = () => {
  const [activeTab, setActiveTab] = useState('basics');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  const tabs = [
    { id: 'basics', label: '🎲 Basics', icon: '🎲' },
    { id: 'classes', label: '🎭 Classes', icon: '🎭' },
    { id: 'combat', label: '⚔️ Combat', icon: '⚔️' },
    { id: 'equipment', label: '🛡️ Equipment', icon: '🛡️' },
    { id: 'magic', label: '✨ Magic', icon: '✨' }
  ];

  const filterContent = (content, term) => {
    if (!term) return content;
    return content.filter(item => 
      item.name?.toLowerCase().includes(term.toLowerCase()) ||
      item.description?.toLowerCase().includes(term.toLowerCase())
    );
  };

  const renderBasics = () => (
    <div className="rule-section">
      <h3>🎲 Core Mechanics</h3>
      
      <div className="rule-card">
        <h4>Attributes</h4>
        <div className="attribute-grid">
          {Object.entries(ATTRIBUTES).map(([key, attr]) => (
            <div key={key} className="attribute-item">
              <span className="attr-name">{attr.charAt(0).toUpperCase() + attr.slice(1)}</span>
              <span className="attr-desc">
                {attr === 'might' && 'Physical strength and endurance'}
                {attr === 'dexterity' && 'Agility and precision'}
                {attr === 'intellect' && 'Intelligence and reasoning'}
                {attr === 'willpower' && 'Mental fortitude and magic'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rule-card">
        <h4>Dice System</h4>
        <p>Fabula Ultima uses dice from d6 to d12 based on attribute levels:</p>
        <div className="dice-progression">
          <div className="dice-item">6-7: d6</div>
          <div className="dice-item">8-9: d8</div>
          <div className="dice-item">10-11: d10</div>
          <div className="dice-item">12: d12</div>
        </div>
      </div>

      <div className="rule-card">
        <h4>Health & Resources</h4>
        <div className="resources-grid">
          <div className="resource-item">
            <strong>Hit Points (HP)</strong>
            <p>Base: {GAME_MECHANICS.hit_points.base} + {GAME_MECHANICS.hit_points.level_bonus} per level</p>
          </div>
          <div className="resource-item">
            <strong>Mind Points (MP)</strong>
            <p>Base: {GAME_MECHANICS.mind_points.base} + {GAME_MECHANICS.mind_points.level_bonus} per level</p>
          </div>
          <div className="resource-item">
            <strong>Inventory Points</strong>
            <p>Base: {GAME_MECHANICS.inventory_points.base} (Might + Dexterity)</p>
          </div>
          <div className="resource-item">
            <strong>Fabula Points</strong>
            <p>Starting: {GAME_MECHANICS.fabula_points.starting}</p>
            <p>Uses: {GAME_MECHANICS.fabula_points.uses.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="rule-section">
      <h3>🎭 Character Classes</h3>
      
      <div className="class-grid">
        {Object.entries(CHARACTER_CLASSES).map(([key, classData]) => (
          <div 
            key={key} 
            className={`class-card ${selectedClass === key ? 'selected' : ''}`}
            onClick={() => setSelectedClass(selectedClass === key ? null : key)}
          >
            <h4>{classData.name}</h4>
            <p>{classData.description}</p>
            <div className="class-attributes">
              <strong>Primary:</strong> {classData.primaryAttributes.join(', ')}
            </div>
            
            {selectedClass === key && (
              <div className="class-details">
                <div className="starting-equipment">
                  <strong>Starting Equipment:</strong>
                  <ul>
                    {classData.startingEquipment.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="abilities">
                  <strong>Abilities:</strong>
                  <ul>
                    {classData.abilities.map((ability, idx) => (
                      <li key={idx}>{ability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCombat = () => (
    <div className="rule-section">
      <h3>⚔️ Combat Rules</h3>
      
      <div className="rule-card">
        <h4>Damage Types</h4>
        <div className="damage-types">
          {Object.entries(DAMAGE_TYPES).map(([key, type]) => (
            <div key={key} className="damage-type">
              <span className="damage-icon">
                {type === 'physical' && '⚔️'}
                {type === 'fire' && '🔥'}
                {type === 'ice' && '❄️'}
                {type === 'bolt' && '⚡'}
                {type === 'earth' && '🌍'}
                {type === 'air' && '💨'}
                {type === 'dark' && '🌑'}
                {type === 'light' && '☀️'}
                {type === 'poison' && '☠️'}
              </span>
              <span className="damage-name">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rule-card">
        <h4>Status Effects</h4>
        <div className="status-effects">
          {Object.entries(STATUS_EFFECTS).map(([key, effect]) => (
            <div key={key} className="status-effect">
              <span className="status-name">{effect.charAt(0).toUpperCase() + effect.slice(1)}</span>
              <span className="status-desc">
                {effect === 'dazed' && 'Cannot perform actions effectively'}
                {effect === 'enraged' && 'Increased damage but reduced accuracy'}
                {effect === 'poisoned' && 'Takes damage over time'}
                {effect === 'shaken' && 'Reduced mental resistance'}
                {effect === 'slow' && 'Reduced initiative and actions'}
                {effect === 'weak' && 'Reduced physical damage'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rule-card">
        <h4>Combat Flow</h4>
        <div className="combat-flow">
          <div className="flow-step">1. Initiative (Dexterity + Intellect)</div>
          <div className="flow-step">2. Declare Actions</div>
          <div className="flow-step">3. Roll Checks</div>
          <div className="flow-step">4. Apply Damage</div>
          <div className="flow-step">5. Check Status Effects</div>
        </div>
      </div>
    </div>
  );

  const renderEquipment = () => (
    <div className="rule-section">
      <h3>🛡️ Equipment</h3>
      
      <div className="rule-card">
        <h4>Basic Weapons</h4>
        <div className="weapon-grid">
          {Object.entries(BASIC_WEAPONS).map(([key, weapon]) => (
            <div key={key} className="weapon-card">
              <h5>{weapon.name}</h5>
              <div className="weapon-stats">
                <div>Type: {weapon.type}</div>
                <div>Damage: {weapon.damage}</div>
                <div>Handedness: {weapon.handedness}</div>
                <div>Cost: {weapon.cost} zenit</div>
                {weapon.special && <div>Special: {weapon.special}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rule-card">
        <h4>Equipment Categories</h4>
        <div className="equipment-categories">
          <div className="category-item">
            <strong>Weapons</strong>
            <p>Melee, ranged, and arcane implements</p>
          </div>
          <div className="category-item">
            <strong>Armor</strong>
            <p>Provides defense and special properties</p>
          </div>
          <div className="category-item">
            <strong>Shields</strong>
            <p>Defensive equipment for protection</p>
          </div>
          <div className="category-item">
            <strong>Accessories</strong>
            <p>Rings, amulets, and other magical items</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMagic = () => (
    <div className="rule-section">
      <h3>✨ Magic System</h3>
      
      <div className="rule-card">
        <h4>Spell Schools</h4>
        <div className="spell-schools">
          <div className="school-item">
            <strong>Elementalism</strong>
            <p>Fire, Ice, Bolt, Earth spells</p>
          </div>
          <div className="school-item">
            <strong>Entropism</strong>
            <p>Luck, probability, and chaos magic</p>
          </div>
          <div className="school-item">
            <strong>Spiritism</strong>
            <p>Communication with spirits and undead</p>
          </div>
          <div className="school-item">
            <strong>Chimerism</strong>
            <p>Transformation and beast magic</p>
          </div>
          <div className="school-item">
            <strong>Hexer Magic</strong>
            <p>Dark magic specializing in curses and toxins</p>
          </div>
        </div>
      </div>

      <div className="rule-card">
        <h4>Spell Casting</h4>
        <div className="spellcasting-rules">
          <div className="rule-item">
            <strong>MP Cost:</strong> Most spells cost Mind Points to cast
          </div>
          <div className="rule-item">
            <strong>Accuracy:</strong> Intellect + Willpower for spell attacks
          </div>
          <div className="rule-item">
            <strong>Magic Defense:</strong> Intellect + Willpower for resisting spells
          </div>
          <div className="rule-item">
            <strong>Spell Levels:</strong> Spells increase in power and cost with level
          </div>
        </div>
      </div>

      <div className="rule-card">
        <h4>Hexer Spells</h4>
        <div className="hexer-spells">
          {Object.entries(HEXER_SPELLS).map(([key, spell]) => (
            <div key={key} className="spell-item">
              <div className="spell-header">
                <h5>{spell.name}</h5>
                <div className="spell-stats">
                  <span className="spell-mp">MP: {spell.mp}</span>
                  <span className="spell-target">Target: {spell.target}</span>
                  <span className="spell-duration">Duration: {spell.duration}</span>
                  <span className={`spell-type ${spell.type}`}>
                    {spell.type === 'offensive' ? '⚔️' : '🛡️'} {spell.type.charAt(0).toUpperCase() + spell.type.slice(1)}
                  </span>
                </div>
              </div>
              <div className="spell-description">
                <p>{spell.description}</p>
              </div>
              <div className="spell-source">
                <small>Source: {spell.source}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basics': return renderBasics();
      case 'classes': return renderClasses();
      case 'combat': return renderCombat();
      case 'equipment': return renderEquipment();
      case 'magic': return renderMagic();
      default: return renderBasics();
    }
  };

  return (
    <div className="rule-reference">
      <div className="rule-header">
        <h2>📖 Fabula Ultima Rule Reference</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="rule-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="rule-content">
        {renderTabContent()}
      </div>

      <div className="rule-footer">
        <p>📚 Based on Fabula Ultima Core Rules</p>
        <p>🎮 Quick reference for players and GMs</p>
      </div>
    </div>
  );
};

export default RuleReference;