import React, { useState, useEffect } from 'react';
import { supabase, dbHelpers } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [statistics, setStatistics] = useState(null);
  const [users, setUsers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [diceRolls, setDiceRolls] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin && activeTab === 'overview') {
      loadStatistics();
    } else if (isAdmin) {
      loadTabData();
    }
  }, [isAdmin, activeTab]);

  const checkAdminStatus = async () => {
    try {
      if (!user || user.id === 'demo') {
        // Demo mode: Grant admin access
        setIsAdmin(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      if (user.id === 'demo') {
        // Demo statistics
        setStatistics({
          total_users: 1247,
          total_characters: 3891,
          active_characters: 2156,
          total_campaigns: 156,
          active_campaigns: 78,
          total_dice_rolls: 45230,
          total_combat_sessions: 892,
          users_by_role: {
            user: 1235,
            admin: 3,
            moderator: 9
          },
          characters_by_level: {
            '1-10': 1456,
            '11-20': 1234,
            '21-30': 789,
            '31-40': 345,
            '40+': 67
          }
        });
        return;
      }

      const { data, error } = await supabase.rpc('get_user_statistics');
      if (error) throw error;
      setStatistics(data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const loadTabData = async () => {
    try {
      if (user.id === 'demo') {
        loadDemoData();
        return;
      }

      switch (activeTab) {
        case 'users':
          await loadUsers();
          break;
        case 'characters':
          await loadCharacters();
          break;
        case 'campaigns':
          await loadCampaigns();
          break;
        case 'dice-rolls':
          await loadDiceRolls();
          break;
        case 'logs':
          await loadAdminLogs();
          break;
      }
    } catch (error) {
      console.error('Error loading tab data:', error);
    }
  };

  const loadDemoData = () => {
    const demoUsers = [
      { id: '1', username: 'dragonslayer_mike', display_name: 'Mike Johnson', role: 'user', created_at: '2025-01-15T10:30:00Z' },
      { id: '2', username: 'wizard_sarah', display_name: 'Sarah Connor', role: 'user', created_at: '2025-01-14T15:22:00Z' },
      { id: '3', username: 'gm_alex', display_name: 'Alex Rivera', role: 'moderator', created_at: '2025-01-10T09:15:00Z' }
    ];

    const demoCharacters = [
      { id: '1', name: 'Eldric the Brave', level: 15, status: 'active', user_id: '1', created_at: '2025-01-16T12:00:00Z' },
      { id: '2', name: 'Mysteria Shadowweaver', level: 22, status: 'active', user_id: '2', created_at: '2025-01-15T14:30:00Z' },
      { id: '3', name: 'Thorin Ironforge', level: 8, status: 'archived', user_id: '1', created_at: '2025-01-12T11:15:00Z' }
    ];

    const demoCampaigns = [
      { id: '1', name: 'The Crystal Prophecy', status: 'active', gm_id: '3', created_at: '2025-01-10T16:45:00Z' },
      { id: '2', name: 'Shadows of the Past', status: 'completed', gm_id: '3', created_at: '2025-01-05T10:20:00Z' }
    ];

    const demoDiceRolls = [
      { id: '1', roll_type: 'attack', total: 18, is_critical: true, user_id: '1', created_at: '2025-01-17T10:30:00Z' },
      { id: '2', roll_type: 'magic', total: 7, is_fumble: true, user_id: '2', created_at: '2025-01-17T10:25:00Z' },
      { id: '3', roll_type: 'defense', total: 15, is_high_roll: true, user_id: '1', created_at: '2025-01-17T10:20:00Z' }
    ];

    const demoLogs = [
      { id: '1', action: 'user_promoted', details: { target_user: 'alex_rivera' }, created_at: '2025-01-16T09:00:00Z' },
      { id: '2', action: 'character_reviewed', details: { character_id: '2', reason: 'content_review' }, created_at: '2025-01-15T14:30:00Z' }
    ];

    setUsers(demoUsers);
    setCharacters(demoCharacters);
    setCampaigns(demoCampaigns);
    setDiceRolls(demoDiceRolls);
    setAdminLogs(demoLogs);
  };

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    setUsers(data || []);
  };

  const loadCharacters = async () => {
    const { data, error } = await supabase
      .from('characters')
      .select(`
        *,
        user_profiles(username, display_name)
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    setCharacters(data || []);
  };

  const loadCampaigns = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        *,
        user_profiles(username, display_name)
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    setCampaigns(data || []);
  };

  const loadDiceRolls = async () => {
    const { data, error } = await supabase
      .from('dice_rolls')
      .select(`
        *,
        user_profiles(username, display_name),
        characters(name)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    setDiceRolls(data || []);
  };

  const loadAdminLogs = async () => {
    const { data, error } = await supabase
      .from('admin_logs')
      .select(`
        *,
        user_profiles(username, display_name)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    setAdminLogs(data || []);
  };

  const promoteUser = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      // Log the action
      await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action: `promote_to_${newRole}`,
          target_type: 'user',
          target_id: userId,
          details: { new_role: newRole }
        });

      await loadUsers();
      alert(`User promoted to ${newRole} successfully!`);
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Error promoting user: ' + error.message);
    }
  };

  const toggleCharacterStatus = async (characterId, newStatus) => {
    try {
      const { error } = await supabase
        .from('characters')
        .update({ status: newStatus })
        .eq('id', characterId);

      if (error) throw error;

      await loadCharacters();
    } catch (error) {
      console.error('Error updating character status:', error);
      alert('Error updating character status: ' + error.message);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Checking admin access..." />;
  }

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <h2>🔒 Access Denied</h2>
        <p>You need administrator privileges to access this page.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: '📊 Overview', icon: '📊' },
    { id: 'users', name: '👥 Users', icon: '👥' },
    { id: 'characters', name: '🎭 Characters', icon: '🎭' },
    { id: 'campaigns', name: '🏰 Campaigns', icon: '🏰' },
    { id: 'dice-rolls', name: '🎲 Dice Rolls', icon: '🎲' },
    { id: 'logs', name: '📝 Admin Logs', icon: '📝' }
  ];

  return (
    <ErrorBoundary>
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>🛡️ Admin Dashboard</h1>
          <p>Fabula Ultima Tools Administration</p>
          {user.id === 'demo' && (
            <div className="demo-notice">
              🎭 Demo Mode - Sample administrative data
            </div>
          )}
        </div>

        <div className="admin-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>📊 System Overview</h2>
              {statistics ? (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <div className="stat-number">{statistics.total_users?.toLocaleString()}</div>
                      <div className="stat-label">Total Users</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">🎭</div>
                    <div className="stat-content">
                      <div className="stat-number">{statistics.total_characters?.toLocaleString()}</div>
                      <div className="stat-label">Characters</div>
                      <div className="stat-sub">{statistics.active_characters} active</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">🏰</div>
                    <div className="stat-content">
                      <div className="stat-number">{statistics.total_campaigns?.toLocaleString()}</div>
                      <div className="stat-label">Campaigns</div>
                      <div className="stat-sub">{statistics.active_campaigns} active</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">🎲</div>
                    <div className="stat-content">
                      <div className="stat-number">{statistics.total_dice_rolls?.toLocaleString()}</div>
                      <div className="stat-label">Dice Rolls</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">⚔️</div>
                    <div className="stat-content">
                      <div className="stat-number">{statistics.total_combat_sessions?.toLocaleString()}</div>
                      <div className="stat-label">Combat Sessions</div>
                    </div>
                  </div>
                </div>
              ) : (
                <LoadingSpinner message="Loading statistics..." />
              )}
              
              {statistics?.users_by_role && (
                <div className="role-distribution">
                  <h3>User Roles</h3>
                  <div className="role-stats">
                    {Object.entries(statistics.users_by_role).map(([role, count]) => (
                      <div key={role} className="role-stat">
                        <span className="role-name">{role}</span>
                        <span className="role-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <h2>👥 User Management</h2>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Display Name</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.display_name}</td>
                        <td>
                          <span className={`role-badge role-${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            {user.role !== 'admin' && (
                              <button 
                                className="promote-btn"
                                onClick={() => promoteUser(user.id, 'admin')}
                              >
                                Promote to Admin
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="characters-section">
              <h2>🎭 Character Management</h2>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Level</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.map(character => (
                      <tr key={character.id}>
                        <td>{character.name}</td>
                        <td>{character.level}</td>
                        <td>{character.user_profiles?.display_name || 'Unknown'}</td>
                        <td>
                          <span className={`status-badge status-${character.status}`}>
                            {character.status}
                          </span>
                        </td>
                        <td>{new Date(character.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            <select 
                              value={character.status}
                              onChange={(e) => toggleCharacterStatus(character.id, e.target.value)}
                            >
                              <option value="active">Active</option>
                              <option value="archived">Archived</option>
                              <option value="dead">Dead</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'dice-rolls' && (
            <div className="dice-rolls-section">
              <h2>🎲 Recent Dice Rolls</h2>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Result</th>
                      <th>Player</th>
                      <th>Character</th>
                      <th>Special</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diceRolls.map(roll => (
                      <tr key={roll.id}>
                        <td>{roll.roll_type}</td>
                        <td className="roll-total">{roll.total}</td>
                        <td>{roll.user_profiles?.display_name || 'Demo User'}</td>
                        <td>{roll.characters?.name || 'No Character'}</td>
                        <td>
                          {roll.is_critical && <span className="roll-special critical">Critical!</span>}
                          {roll.is_fumble && <span className="roll-special fumble">Fumble!</span>}
                          {roll.is_high_roll && <span className="roll-special high">High Roll!</span>}
                        </td>
                        <td>{new Date(roll.created_at).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="logs-section">
              <h2>📝 Admin Activity Logs</h2>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Admin</th>
                      <th>Action</th>
                      <th>Details</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminLogs.map(log => (
                      <tr key={log.id}>
                        <td>{log.user_profiles?.display_name || 'System Admin'}</td>
                        <td>{log.action}</td>
                        <td>{JSON.stringify(log.details)}</td>
                        <td>{new Date(log.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;