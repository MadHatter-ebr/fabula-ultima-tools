import React, { useState, useEffect } from 'react';
import { STATUS_EFFECTS, DAMAGE_TYPES } from '../shared/complete_game_data.js';
import './GMTools.css';

const GMTools = ({ character, onGMDataChange }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [npcs, setNpcs] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [questLog, setQuestLog] = useState([]);
  const [worldNotes, setWorldNotes] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateNPC, setShowCreateNPC] = useState(false);
  const [showCreateEncounter, setShowCreateEncounter] = useState(false);
  const [showCreateQuest, setShowCreateQuest] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (onGMDataChange) {
      onGMDataChange({
        campaigns,
        currentCampaign,
        npcs,
        encounters,
        questLog,
        worldNotes,
        sessionNotes
      });
    }
  }, [campaigns, currentCampaign, npcs, encounters, questLog, worldNotes, sessionNotes, onGMDataChange]);

  const createCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now(),
      ...campaignData,
      createdAt: new Date().toISOString(),
      players: [],
      sessions: []
    };
    setCampaigns(prev => [...prev, newCampaign]);
    setCurrentCampaign(newCampaign);
    setShowCreateCampaign(false);
  };

  const createNPC = (npcData) => {
    const newNPC = {
      id: Date.now(),
      ...npcData,
      createdAt: new Date().toISOString(),
      notes: ''
    };
    setNpcs(prev => [...prev, newNPC]);
    setShowCreateNPC(false);
  };

  const createEncounter = (encounterData) => {
    const newEncounter = {
      id: Date.now(),
      ...encounterData,
      createdAt: new Date().toISOString(),
      status: 'planned'
    };
    setEncounters(prev => [...prev, newEncounter]);
    setShowCreateEncounter(false);
  };

  const createQuest = (questData) => {
    const newQuest = {
      id: Date.now(),
      ...questData,
      createdAt: new Date().toISOString(),
      status: 'active',
      progress: 0
    };
    setQuestLog(prev => [...prev, newQuest]);
    setShowCreateQuest(false);
  };

  const rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
  };

  const generateName = () => {
    const firstNames = ['Aria', 'Kael', 'Luna', 'Zephyr', 'Ember', 'Sage', 'Raven', 'Orion', 'Ivy', 'Phoenix'];
    const lastNames = ['Stormwind', 'Shadowmere', 'Goldleaf', 'Ironforge', 'Moonwhisper', 'Starfall', 'Thornwick', 'Frostborn', 'Brightblade', 'Duskwood'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  };

  const generateTreasure = () => {
    const treasures = [
      { name: 'Healing Potion', type: 'consumable', rarity: 'common', value: 300 },
      { name: 'Magic Sword', type: 'weapon', rarity: 'rare', value: 1200 },
      { name: 'Scroll of Fireball', type: 'consumable', rarity: 'uncommon', value: 800 },
      { name: 'Cloak of Protection', type: 'armor', rarity: 'rare', value: 1500 },
      { name: 'Ring of Power', type: 'accessory', rarity: 'rare', value: 2000 },
      { name: 'Ancient Artifact', type: 'artifact', rarity: 'legendary', value: 5000 }
    ];
    
    return treasures[Math.floor(Math.random() * treasures.length)];
  };

  return (
    <div className="gm-tools">
      <div className="gm-header">
        <h3>🎲 GM Tools</h3>
        <div className="campaign-selector">
          {currentCampaign ? (
            <span className="current-campaign">Campaign: {currentCampaign.name}</span>
          ) : (
            <button onClick={() => setShowCreateCampaign(true)} className="create-campaign-btn">
              Create Campaign
            </button>
          )}
        </div>
      </div>

      {currentCampaign && (
        <div className="gm-content">
          <div className="gm-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'npcs' ? 'active' : ''}`}
              onClick={() => setActiveTab('npcs')}
            >
              NPCs
            </button>
            <button 
              className={`tab-btn ${activeTab === 'encounters' ? 'active' : ''}`}
              onClick={() => setActiveTab('encounters')}
            >
              Encounters
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quests' ? 'active' : ''}`}
              onClick={() => setActiveTab('quests')}
            >
              Quests
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="campaign-overview">
                  <h4>Campaign: {currentCampaign.name}</h4>
                  <div className="campaign-stats">
                    <div className="stat">
                      <span>NPCs:</span>
                      <span>{npcs.length}</span>
                    </div>
                    <div className="stat">
                      <span>Encounters:</span>
                      <span>{encounters.length}</span>
                    </div>
                    <div className="stat">
                      <span>Active Quests:</span>
                      <span>{questLog.filter(q => q.status === 'active').length}</span>
                    </div>
                  </div>
                </div>

                <div className="notes-section">
                  <div className="world-notes">
                    <h4>World Notes</h4>
                    <textarea 
                      value={worldNotes}
                      onChange={(e) => setWorldNotes(e.target.value)}
                      placeholder="Write world-building notes, lore, important locations..."
                      className="notes-textarea"
                    />
                  </div>
                  
                  <div className="session-notes">
                    <h4>Session Notes</h4>
                    <textarea 
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="Write session notes, player decisions, important events..."
                      className="notes-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'npcs' && (
              <div className="npcs-tab">
                <div className="section-header">
                  <h4>NPCs ({npcs.length})</h4>
                  <button onClick={() => setShowCreateNPC(true)} className="create-btn">
                    Create NPC
                  </button>
                </div>
                
                {npcs.length === 0 ? (
                  <div className="empty-state">
                    <span>No NPCs created yet</span>
                  </div>
                ) : (
                  <div className="npcs-grid">
                    {npcs.map(npc => (
                      <div key={npc.id} className="npc-card">
                        <div className="npc-header">
                          <span className="npc-name">{npc.name}</span>
                          <span className="npc-type">{npc.type}</span>
                        </div>
                        <div className="npc-description">{npc.description}</div>
                        <div className="npc-stats">
                          <div className="stat">
                            <span>Location:</span>
                            <span>{npc.location}</span>
                          </div>
                          <div className="stat">
                            <span>Relationship:</span>
                            <span>{npc.relationship}</span>
                          </div>
                        </div>
                        <div className="npc-actions">
                          <button className="edit-btn">Edit</button>
                          <button className="remove-btn">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'encounters' && (
              <div className="encounters-tab">
                <div className="section-header">
                  <h4>Encounters ({encounters.length})</h4>
                  <button onClick={() => setShowCreateEncounter(true)} className="create-btn">
                    Create Encounter
                  </button>
                </div>
                
                {encounters.length === 0 ? (
                  <div className="empty-state">
                    <span>No encounters created yet</span>
                  </div>
                ) : (
                  <div className="encounters-grid">
                    {encounters.map(encounter => (
                      <div key={encounter.id} className="encounter-card">
                        <div className="encounter-header">
                          <span className="encounter-name">{encounter.name}</span>
                          <span className={`encounter-status ${encounter.status}`}>
                            {encounter.status}
                          </span>
                        </div>
                        <div className="encounter-description">{encounter.description}</div>
                        <div className="encounter-details">
                          <div className="detail">
                            <span>Difficulty:</span>
                            <span>{encounter.difficulty}</span>
                          </div>
                          <div className="detail">
                            <span>Location:</span>
                            <span>{encounter.location}</span>
                          </div>
                          <div className="detail">
                            <span>Enemies:</span>
                            <span>{encounter.enemies?.length || 0}</span>
                          </div>
                        </div>
                        <div className="encounter-actions">
                          <button className="run-btn">Run</button>
                          <button className="edit-btn">Edit</button>
                          <button className="remove-btn">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quests' && (
              <div className="quests-tab">
                <div className="section-header">
                  <h4>Quests ({questLog.length})</h4>
                  <button onClick={() => setShowCreateQuest(true)} className="create-btn">
                    Create Quest
                  </button>
                </div>
                
                {questLog.length === 0 ? (
                  <div className="empty-state">
                    <span>No quests created yet</span>
                  </div>
                ) : (
                  <div className="quests-grid">
                    {questLog.map(quest => (
                      <div key={quest.id} className="quest-card">
                        <div className="quest-header">
                          <span className="quest-name">{quest.name}</span>
                          <span className={`quest-status ${quest.status}`}>
                            {quest.status}
                          </span>
                        </div>
                        <div className="quest-description">{quest.description}</div>
                        <div className="quest-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${quest.progress}%` }}
                            />
                          </div>
                          <span className="progress-text">{quest.progress}%</span>
                        </div>
                        <div className="quest-details">
                          <div className="detail">
                            <span>Reward:</span>
                            <span>{quest.reward}</span>
                          </div>
                          <div className="detail">
                            <span>Difficulty:</span>
                            <span>{quest.difficulty}</span>
                          </div>
                        </div>
                        <div className="quest-actions">
                          <button className="progress-btn">Update Progress</button>
                          <button className="edit-btn">Edit</button>
                          <button className="remove-btn">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="tools-tab">
                <div className="tools-grid">
                  <div className="tool-card">
                    <h4>Dice Roller</h4>
                    <div className="dice-buttons">
                      <button onClick={() => alert(`d4: ${rollDice(4)}`)}>d4</button>
                      <button onClick={() => alert(`d6: ${rollDice(6)}`)}>d6</button>
                      <button onClick={() => alert(`d8: ${rollDice(8)}`)}>d8</button>
                      <button onClick={() => alert(`d10: ${rollDice(10)}`)}>d10</button>
                      <button onClick={() => alert(`d12: ${rollDice(12)}`)}>d12</button>
                      <button onClick={() => alert(`d20: ${rollDice(20)}`)}>d20</button>
                    </div>
                  </div>
                  
                  <div className="tool-card">
                    <h4>Name Generator</h4>
                    <button onClick={() => alert(`Random Name: ${generateName()}`)}>
                      Generate Name
                    </button>
                  </div>
                  
                  <div className="tool-card">
                    <h4>Treasure Generator</h4>
                    <button onClick={() => {
                      const treasure = generateTreasure();
                      alert(`Treasure: ${treasure.name} (${treasure.rarity}) - ${treasure.value} Zenit`);
                    }}>
                      Generate Treasure
                    </button>
                  </div>
                  
                  <div className="tool-card">
                    <h4>Random Encounter</h4>
                    <button onClick={() => alert('Random encounter generated!')}>
                      Random Encounter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="create-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Campaign</h4>
              <button onClick={() => setShowCreateCampaign(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <CampaignForm onCreateCampaign={createCampaign} />
            </div>
          </div>
        </div>
      )}

      {/* Create NPC Modal */}
      {showCreateNPC && (
        <div className="create-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create NPC</h4>
              <button onClick={() => setShowCreateNPC(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <NPCForm onCreateNPC={createNPC} />
            </div>
          </div>
        </div>
      )}

      {/* Create Encounter Modal */}
      {showCreateEncounter && (
        <div className="create-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Encounter</h4>
              <button onClick={() => setShowCreateEncounter(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <EncounterForm onCreateEncounter={createEncounter} />
            </div>
          </div>
        </div>
      )}

      {/* Create Quest Modal */}
      {showCreateQuest && (
        <div className="create-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Quest</h4>
              <button onClick={() => setShowCreateQuest(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <QuestForm onCreateQuest={createQuest} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Campaign Form Component
const CampaignForm = ({ onCreateCampaign }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    setting: '',
    theme: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCampaign(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Campaign Name:</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Setting:</label>
        <input 
          type="text" 
          value={formData.setting}
          onChange={(e) => setFormData(prev => ({ ...prev, setting: e.target.value }))}
          placeholder="e.g., Medieval Fantasy, Modern Urban, Post-Apocalyptic"
        />
      </div>
      
      <div className="form-group">
        <label>Theme:</label>
        <input 
          type="text" 
          value={formData.theme}
          onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
          placeholder="e.g., Heroic Adventure, Mystery, Horror"
        />
      </div>
      
      <button type="submit" className="submit-btn">Create Campaign</button>
    </form>
  );
};

// NPC Form Component
const NPCForm = ({ onCreateNPC }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'friendly',
    description: '',
    location: '',
    relationship: 'neutral'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateNPC(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Type:</label>
        <select 
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="friendly">Friendly</option>
          <option value="neutral">Neutral</option>
          <option value="hostile">Hostile</option>
          <option value="vendor">Vendor</option>
          <option value="quest-giver">Quest Giver</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Location:</label>
        <input 
          type="text" 
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Relationship:</label>
        <select 
          value={formData.relationship}
          onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
        >
          <option value="ally">Ally</option>
          <option value="neutral">Neutral</option>
          <option value="enemy">Enemy</option>
          <option value="rival">Rival</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>
      
      <button type="submit" className="submit-btn">Create NPC</button>
    </form>
  );
};

// Encounter Form Component
const EncounterForm = ({ onCreateEncounter }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'medium',
    location: '',
    enemies: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateEncounter(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Difficulty:</label>
        <select 
          value={formData.difficulty}
          onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="deadly">Deadly</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Location:</label>
        <input 
          type="text" 
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>
      
      <button type="submit" className="submit-btn">Create Encounter</button>
    </form>
  );
};

// Quest Form Component
const QuestForm = ({ onCreateQuest }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'medium',
    reward: '',
    type: 'main'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateQuest(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Difficulty:</label>
        <select 
          value={formData.difficulty}
          onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Reward:</label>
        <input 
          type="text" 
          value={formData.reward}
          onChange={(e) => setFormData(prev => ({ ...prev, reward: e.target.value }))}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Type:</label>
        <select 
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="main">Main Quest</option>
          <option value="side">Side Quest</option>
          <option value="personal">Personal Quest</option>
        </select>
      </div>
      
      <button type="submit" className="submit-btn">Create Quest</button>
    </form>
  );
};

export default GMTools;