import React, { useState } from 'react';
import CharacterGenerator from './components/CharacterGenerator';
import DiceRoller from './components/DiceRoller';
import CombatTracker from './components/CombatTracker';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('character');

  const tabs = [
    { id: 'character', name: '🎭 Character Generator', component: CharacterGenerator },
    { id: 'dice', name: '🎲 Dice Roller', component: DiceRoller },
    { id: 'combat', name: '⚔️ Combat Tracker', component: CombatTracker }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CharacterGenerator;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Fabula Ultima Tools</h1>
        <p>Digital tools for the ultimate JRPG tabletop experience</p>
        
        <nav className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </header>
      
      <main className="app-main">
        <ActiveComponent />
      </main>
      
      <footer className="app-footer">
        <p>Made with ❤️ for Fabula Ultima players</p>
        <p>Not affiliated with Need Games - Fan-made tools</p>
      </footer>
    </div>
  );
};

export default App;