import React, { useState } from 'react';
import './AdventureGenerator.css';

const AdventureGenerator = () => {
  const [adventure, setAdventure] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [parameters, setParameters] = useState({
    theme: 'fantasy',
    difficulty: 'medium',
    duration: 'short',
    playerCount: 4,
    level: 5,
    setting: 'mixed'
  });

  const themes = {
    fantasy: { name: 'High Fantasy', icon: '🏰' },
    darkFantasy: { name: 'Dark Fantasy', icon: '🌑' },
    technoFantasy: { name: 'Techno Fantasy', icon: '🤖' },
    lowFantasy: { name: 'Low Fantasy', icon: '🗡️' },
    naturalFantasy: { name: 'Natural Fantasy', icon: '🌿' },
    urban: { name: 'Urban Fantasy', icon: '🏙️' }
  };

  const difficulties = {
    easy: { name: 'Easy', color: '#2ecc71' },
    medium: { name: 'Medium', color: '#f39c12' },
    hard: { name: 'Hard', color: '#e74c3c' },
    deadly: { name: 'Deadly', color: '#8e44ad' }
  };

  const durations = {
    short: { name: 'One-Shot (2-4 hours)', sessions: 1 },
    medium: { name: 'Short Campaign (4-8 sessions)', sessions: 6 },
    long: { name: 'Long Campaign (8+ sessions)', sessions: 12 }
  };

  const settings = {
    urban: { name: 'Urban/City', icon: '🏙️' },
    wilderness: { name: 'Wilderness', icon: '🌲' },
    dungeon: { name: 'Dungeon/Underground', icon: '🏰' },
    mixed: { name: 'Mixed Environments', icon: '🗺️' }
  };

  const adventureTemplates = {
    rescue: {
      name: 'Rescue Mission',
      description: 'Someone important has been captured and needs saving',
      hooks: [
        'A beloved NPC has been kidnapped by bandits',
        'The mayor\'s daughter was taken by cultists',
        'A merchant caravan has gone missing',
        'A fellow adventurer sent a distress signal'
      ]
    },
    mystery: {
      name: 'Mystery Investigation',
      description: 'Strange events require investigation and solving',
      hooks: [
        'People are disappearing from the local tavern',
        'Strange lights appear in the abandoned mansion',
        'Livestock are found drained of blood',
        'Ancient artifacts are being stolen'
      ]
    },
    exploration: {
      name: 'Exploration Adventure',
      description: 'Discover new locations and uncover secrets',
      hooks: [
        'A new continent has been discovered',
        'An ancient ruin has been unearthed',
        'Magical portals are opening randomly',
        'A flying island has appeared in the sky'
      ]
    },
    political: {
      name: 'Political Intrigue',
      description: 'Navigate complex social and political situations',
      hooks: [
        'Two noble houses are on the brink of war',
        'The king has been acting strangely',
        'A revolution is brewing in the capital',
        'Trade routes are being sabotaged'
      ]
    },
    survival: {
      name: 'Survival Challenge',
      description: 'Overcome natural and supernatural threats',
      hooks: [
        'Shipwrecked on a mysterious island',
        'Trapped in a collapsing underground city',
        'Lost in a cursed forest',
        'Surviving in a post-apocalyptic wasteland'
      ]
    }
  };

  const villainTypes = {
    cultist: { name: 'Cultist Leader', motivation: 'Summon dark entity' },
    noble: { name: 'Corrupt Noble', motivation: 'Gain political power' },
    wizard: { name: 'Mad Wizard', motivation: 'Achieve immortality' },
    criminal: { name: 'Crime Boss', motivation: 'Control territory' },
    monster: { name: 'Ancient Monster', motivation: 'Reclaim lost domain' },
    construct: { name: 'Magitech Construct', motivation: 'Follow original programming' }
  };

  const generateRandomAdventure = () => {
    setGenerating(true);
    
    setTimeout(() => {
      const templateKeys = Object.keys(adventureTemplates);
      const selectedTemplate = adventureTemplates[templateKeys[Math.floor(Math.random() * templateKeys.length)]];
      
      const villainKeys = Object.keys(villainTypes);
      const selectedVillain = villainTypes[villainKeys[Math.floor(Math.random() * villainKeys.length)]];
      
      const hook = selectedTemplate.hooks[Math.floor(Math.random() * selectedTemplate.hooks.length)];
      
      const newAdventure = {
        title: generateAdventureTitle(selectedTemplate, parameters.theme),
        type: selectedTemplate.name,
        description: selectedTemplate.description,
        hook: hook,
        theme: themes[parameters.theme],
        difficulty: difficulties[parameters.difficulty],
        duration: durations[parameters.duration],
        setting: settings[parameters.setting],
        villain: selectedVillain,
        acts: generateActs(selectedTemplate, parameters),
        npcs: generateNPCs(parameters),
        locations: generateLocations(parameters),
        rewards: generateRewards(parameters),
        complications: generateComplications(parameters)
      };
      
      setAdventure(newAdventure);
      setGenerating(false);
    }, 2000);
  };

  const generateAdventureTitle = (template, theme) => {
    const titlePrefixes = {
      fantasy: ['The Lost', 'The Cursed', 'The Ancient', 'The Forgotten', 'The Sacred'],
      darkFantasy: ['The Damned', 'The Corrupted', 'The Fallen', 'The Forsaken', 'The Haunted'],
      technoFantasy: ['The Digital', 'The Cybernetic', 'The Quantum', 'The Virtual', 'The Synthetic'],
      lowFantasy: ['The Stolen', 'The Hidden', 'The Broken', 'The Last', 'The Secret'],
      naturalFantasy: ['The Wild', 'The Primal', 'The Living', 'The Growing', 'The Untamed'],
      urban: ['The Underground', 'The Corporate', 'The Street', 'The Neon', 'The Metropolitan']
    };
    
    const titleSuffixes = {
      rescue: ['Rescue', 'Liberation', 'Salvation', 'Freedom', 'Deliverance'],
      mystery: ['Mystery', 'Enigma', 'Secret', 'Conspiracy', 'Truth'],
      exploration: ['Discovery', 'Expedition', 'Journey', 'Quest', 'Adventure'],
      political: ['Conspiracy', 'Throne', 'Crown', 'Empire', 'Revolution'],
      survival: ['Survival', 'Escape', 'Endurance', 'Trial', 'Ordeal']
    };
    
    const prefix = titlePrefixes[theme][Math.floor(Math.random() * titlePrefixes[theme].length)];
    const suffix = titleSuffixes[template.name.toLowerCase().split(' ')[0]][Math.floor(Math.random() * titleSuffixes[template.name.toLowerCase().split(' ')[0]].length)];
    
    return `${prefix} ${suffix}`;
  };

  const generateActs = (template, params) => {
    const baseActs = [
      {
        title: 'The Hook',
        description: 'Heroes learn about the situation and decide to get involved',
        objectives: ['Meet the quest giver', 'Gather initial information', 'Prepare for the journey']
      },
      {
        title: 'The Investigation',
        description: 'Heroes gather clues and prepare for the main challenge',
        objectives: ['Investigate the problem', 'Gather allies or resources', 'Uncover the villain\'s plan']
      },
      {
        title: 'The Confrontation',
        description: 'Heroes face the main challenge and resolve the adventure',
        objectives: ['Confront the main antagonist', 'Overcome the final challenge', 'Resolve the situation']
      }
    ];

    if (params.duration === 'medium' || params.duration === 'long') {
      baseActs.splice(2, 0, {
        title: 'The Complication',
        description: 'Unexpected developments make the situation more complex',
        objectives: ['Deal with new complications', 'Adapt to changing circumstances', 'Make difficult choices']
      });
    }

    return baseActs;
  };

  const generateNPCs = (params) => {
    const npcTypes = ['Quest Giver', 'Ally', 'Informant', 'Rival', 'Neutral Party'];
    const npcNames = ['Aria', 'Kael', 'Zara', 'Daven', 'Lyra', 'Thane', 'Nyx', 'Raven'];
    
    return npcTypes.map(type => ({
      name: npcNames[Math.floor(Math.random() * npcNames.length)],
      type: type,
      motivation: 'Generated based on adventure context',
      description: `A ${type.toLowerCase()} important to the adventure`
    }));
  };

  const generateLocations = (params) => {
    const locationTypes = {
      urban: ['Tavern', 'Noble District', 'Underground Sewers', 'Market Square', 'City Watch HQ'],
      wilderness: ['Ancient Forest', 'Mountain Pass', 'Hidden Valley', 'Ruined Tower', 'Sacred Grove'],
      dungeon: ['Crypt Entrance', 'Trap-filled Corridor', 'Monster Lair', 'Treasure Chamber', 'Boss Room'],
      mixed: ['Starting Town', 'Wilderness Path', 'Ancient Ruins', 'Hidden Sanctuary', 'Final Confrontation']
    };
    
    const locations = locationTypes[params.setting];
    return locations.map(loc => ({
      name: loc,
      description: `A key location in the adventure`,
      encounters: ['Combat', 'Puzzle', 'Social', 'Exploration'][Math.floor(Math.random() * 4)]
    }));
  };

  const generateRewards = (params) => {
    const baseReward = params.level * 100;
    return {
      experience: `${baseReward} XP per character`,
      money: `${baseReward * 2} zenit`,
      items: ['Magic weapon', 'Rare artifact', 'Useful equipment'],
      story: 'Reputation increase and new contacts'
    };
  };

  const generateComplications = (params) => {
    const complications = [
      'The villain has a backup plan',
      'An ally betrays the party',
      'Time is running out',
      'Innocent people are in danger',
      'The situation is more complex than it appears'
    ];
    
    return complications.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  return (
    <div className="adventure-generator">
      <div className="generator-header">
        <h1>🎲 AI Adventure Generator</h1>
        <p>Create unique Fabula Ultima adventures with AI assistance</p>
      </div>

      <div className="generator-controls">
        <div className="control-group">
          <label>Theme:</label>
          <select 
            value={parameters.theme} 
            onChange={(e) => setParameters({...parameters, theme: e.target.value})}
          >
            {Object.entries(themes).map(([key, theme]) => (
              <option key={key} value={key}>{theme.icon} {theme.name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Difficulty:</label>
          <select 
            value={parameters.difficulty} 
            onChange={(e) => setParameters({...parameters, difficulty: e.target.value})}
          >
            {Object.entries(difficulties).map(([key, diff]) => (
              <option key={key} value={key}>{diff.name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Duration:</label>
          <select 
            value={parameters.duration} 
            onChange={(e) => setParameters({...parameters, duration: e.target.value})}
          >
            {Object.entries(durations).map(([key, dur]) => (
              <option key={key} value={key}>{dur.name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Setting:</label>
          <select 
            value={parameters.setting} 
            onChange={(e) => setParameters({...parameters, setting: e.target.value})}
          >
            {Object.entries(settings).map(([key, setting]) => (
              <option key={key} value={key}>{setting.icon} {setting.name}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Player Count:</label>
          <input 
            type="number" 
            min="1" 
            max="8" 
            value={parameters.playerCount}
            onChange={(e) => setParameters({...parameters, playerCount: parseInt(e.target.value)})}
          />
        </div>

        <div className="control-group">
          <label>Average Level:</label>
          <input 
            type="number" 
            min="1" 
            max="50" 
            value={parameters.level}
            onChange={(e) => setParameters({...parameters, level: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div className="generator-actions">
        <button 
          className="generate-btn"
          onClick={generateRandomAdventure}
          disabled={generating}
        >
          {generating ? '🎲 Generating...' : '🎲 Generate Adventure'}
        </button>
      </div>

      {adventure && (
        <div className="generated-adventure">
          <div className="adventure-header">
            <h2>{adventure.title}</h2>
            <div className="adventure-tags">
              <span className="tag theme-tag">{adventure.theme.icon} {adventure.theme.name}</span>
              <span className="tag difficulty-tag" style={{backgroundColor: adventure.difficulty.color}}>
                {adventure.difficulty.name}
              </span>
              <span className="tag duration-tag">{adventure.duration.name}</span>
              <span className="tag setting-tag">{adventure.setting.icon} {adventure.setting.name}</span>
            </div>
          </div>

          <div className="adventure-content">
            <section className="adventure-summary">
              <h3>📖 Adventure Summary</h3>
              <p><strong>Type:</strong> {adventure.type}</p>
              <p><strong>Description:</strong> {adventure.description}</p>
              <p><strong>Hook:</strong> {adventure.hook}</p>
              <p><strong>Main Villain:</strong> {adventure.villain.name} - {adventure.villain.motivation}</p>
            </section>

            <section className="adventure-acts">
              <h3>🎭 Adventure Structure</h3>
              <div className="acts-grid">
                {adventure.acts.map((act, index) => (
                  <div key={index} className="act-card">
                    <h4>Act {index + 1}: {act.title}</h4>
                    <p>{act.description}</p>
                    <div className="objectives">
                      <strong>Objectives:</strong>
                      <ul>
                        {act.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="adventure-npcs">
              <h3>👥 Key NPCs</h3>
              <div className="npcs-grid">
                {adventure.npcs.map((npc, index) => (
                  <div key={index} className="npc-card">
                    <h4>{npc.name}</h4>
                    <p><strong>Role:</strong> {npc.type}</p>
                    <p>{npc.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="adventure-locations">
              <h3>🗺️ Key Locations</h3>
              <div className="locations-grid">
                {adventure.locations.map((location, index) => (
                  <div key={index} className="location-card">
                    <h4>{location.name}</h4>
                    <p>{location.description}</p>
                    <span className="encounter-type">{location.encounters}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="adventure-rewards">
              <h3>💎 Rewards</h3>
              <div className="rewards-grid">
                <div className="reward-item">
                  <strong>Experience:</strong> {adventure.rewards.experience}
                </div>
                <div className="reward-item">
                  <strong>Money:</strong> {adventure.rewards.money}
                </div>
                <div className="reward-item">
                  <strong>Items:</strong> {adventure.rewards.items.join(', ')}
                </div>
                <div className="reward-item">
                  <strong>Story:</strong> {adventure.rewards.story}
                </div>
              </div>
            </section>

            <section className="adventure-complications">
              <h3>⚠️ Potential Complications</h3>
              <ul>
                {adventure.complications.map((comp, index) => (
                  <li key={index}>{comp}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="adventure-actions">
            <button className="export-btn">📄 Export Adventure</button>
            <button className="regenerate-btn" onClick={generateRandomAdventure}>
              🔄 Generate New Adventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdventureGenerator;