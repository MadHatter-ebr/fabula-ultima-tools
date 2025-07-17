import React, { useState, useEffect } from 'react';
import CharacterGenerator from './components/CharacterGenerator';
import ImprovedCharacterGenerator from './components/ImprovedCharacterGenerator';
import './components/ImprovedCharacterGenerator.css';
import CharacterSheet from './components/CharacterSheet';
import CharacterGallery from './components/CharacterGallery';
import DiceRoller from './components/DiceRoller';
import CombatTracker from './components/CombatTracker';
import RuleReference from './components/RuleReference';
import InventoryManager from './components/InventoryManager';
import AdventureGenerator from './components/AdventureGenerator';
import GameMap from './components/GameMap';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth';
import ErrorBoundary from './components/ErrorBoundary';
import { supabase, isDemoMode } from './lib/supabase';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCharacter, setCurrentCharacter] = useState(null);

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
    { id: 'sheet', name: '📋 Character Sheet', component: CharacterSheet },
    { id: 'gallery', name: '🖼️ Character Gallery', component: CharacterGallery },
    { id: 'dice', name: '🎲 Dice Roller', component: DiceRoller },
    { id: 'combat', name: '⚔️ Combat Tracker', component: CombatTracker },
    { id: 'inventory', name: '🎒 Inventory', component: InventoryManager },
    { id: 'adventure', name: '🎲 Adventure Generator', component: AdventureGenerator },
    { id: 'map', name: '🗺️ Game Map', component: GameMap },
    { id: 'rules', name: '📖 Rule Reference', component: RuleReference },
    { id: 'admin', name: '🛡️ Admin Dashboard', component: AdminDashboard }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CharacterGenerator;

  const renderActiveComponent = () => {
    try {
      switch (activeTab) {
        case 'character':
          return <ImprovedCharacterGenerator user={user || { id: 'demo' }} onCharacterChange={setCurrentCharacter} />;
        case 'sheet':
          return <CharacterSheet character={currentCharacter} onCharacterChange={setCurrentCharacter} user={user || { id: 'demo' }} />;
        case 'combat':
          return <CombatTracker user={user || { id: 'demo' }} character={currentCharacter} />;
        case 'inventory':
          return <InventoryManager user={user || { id: 'demo' }} character={currentCharacter} />;
        default:
          return <ActiveComponent user={user || { id: 'demo' }} />;
      }
    } catch (error) {
      console.error('Error rendering component:', error);
      return (
        <div className="error-fallback">
          <h2>🛠️ Oops! Something went wrong</h2>
          <p>Please try refreshing the page or selecting a different tab.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
  };

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

  // Check if we're in demo mode from Supabase config
  const isDemo = isDemoMode;
  
  // Debug output (remove in production)
  console.log('🔍 Debug App.jsx:', {
    isDemoMode,
    user: user?.id || 'none',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'fallback',
    demoModeEnv: import.meta.env.VITE_DEMO_MODE
  });

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🎮 Fabula Ultima Tools</h1>
            <p>Digital tools for the ultimate JRPG tabletop experience</p>
            {isDemo && <p className="demo-notice">🎭 Demo Mode - All features available!</p>}
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
        <ErrorBoundary>
          {renderActiveComponent()}
        </ErrorBoundary>
      </main>
      
      <footer className="app-footer">
        <p>Made with ❤️ for Fabula Ultima players</p>
        <p>Not affiliated with Need Games - Fan-made tools</p>
      </footer>
    </div>
  );
};

export default App;