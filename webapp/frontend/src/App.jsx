import React, { useState, useEffect } from 'react';
import CharacterGenerator from './components/CharacterGenerator';
import CharacterGallery from './components/CharacterGallery';
import DiceRoller from './components/DiceRoller';
import CombatTracker from './components/CombatTracker';
import RuleReference from './components/RuleReference';
import InventoryManager from './components/InventoryManager';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const tabs = [
    { id: 'character', name: '🎭 Character Generator', component: CharacterGenerator },
    { id: 'gallery', name: '🖼️ Character Gallery', component: CharacterGallery },
    { id: 'dice', name: '🎲 Dice Roller', component: DiceRoller },
    { id: 'combat', name: '⚔️ Combat Tracker', component: CombatTracker },
    { id: 'inventory', name: '🎒 Inventory', component: InventoryManager },
    { id: 'rules', name: '📖 Rule Reference', component: RuleReference }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CharacterGenerator;

  if (loading) {
    return (
      <div className="app">
        <div className="app-loading">
          <div className="loading-spinner"></div>
          <p>Loading Fabula Ultima Tools...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <Auth onAuthenticated={setUser} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🎮 Fabula Ultima Tools</h1>
            <p>Digital tools for the ultimate JRPG tabletop experience</p>
          </div>
          
          <Auth onAuthenticated={setUser} />
        </div>
        
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
        <ActiveComponent user={user} />
      </main>
      
      <footer className="app-footer">
        <p>Made with ❤️ for Fabula Ultima players</p>
        <p>Not affiliated with Need Games - Fan-made tools</p>
      </footer>
    </div>
  );
};

export default App;