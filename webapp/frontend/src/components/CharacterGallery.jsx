import React, { useState, useEffect } from 'react';
import CharacterAvatar from './CharacterAvatar';
import { dbHelpers } from '../lib/supabase';
import './CharacterGallery.css';

const CharacterGallery = ({ user }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  useEffect(() => {
    loadCharacters();
  }, [user]);

  const loadCharacters = async () => {
    if (!user || user.id === 'demo') {
      // Demo characters
      setCharacters([
        {
          id: 1,
          name: 'Aria Lightbringer',
          level: 5,
          classes: { primary: 'ARCANIST', secondary: 'LOREMASTER' },
          attributes: { might: 8, dexterity: 9, intellect: 12, willpower: 10 },
          hitPoints: 55,
          mindPoints: 65,
          avatar_url: null
        },
        {
          id: 2,
          name: 'Thorak Ironshield',
          level: 4,
          classes: { primary: 'GUARDIAN', secondary: 'WEAPONMASTER' },
          attributes: { might: 12, dexterity: 8, intellect: 8, willpower: 11 },
          hitPoints: 70,
          mindPoints: 50,
          avatar_url: null
        },
        {
          id: 3,
          name: 'Whisper Shadowdance',
          level: 6,
          classes: { primary: 'ROGUE', secondary: 'DARKBLADE' },
          attributes: { might: 9, dexterity: 12, intellect: 10, willpower: 8 },
          hitPoints: 60,
          mindPoints: 45,
          avatar_url: null
        }
      ]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await dbHelpers.loadCharacters();
      if (error) throw error;
      setCharacters(data || []);
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (characterId, avatarData) => {
    const updatedCharacters = characters.map(char => {
      if (char.id === characterId) {
        return {
          ...char,
          avatar_url: avatarData?.url || null,
          avatar_file: avatarData?.file || null
        };
      }
      return char;
    });

    setCharacters(updatedCharacters);

    // Save to database if not in demo mode
    if (user && user.id !== 'demo') {
      try {
        const character = updatedCharacters.find(char => char.id === characterId);
        await dbHelpers.saveCharacter(character);
      } catch (error) {
        console.error('Error saving character avatar:', error);
      }
    }
  };

  const deleteCharacter = async (characterId) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      const updatedCharacters = characters.filter(char => char.id !== characterId);
      setCharacters(updatedCharacters);

      if (user && user.id !== 'demo') {
        try {
          await dbHelpers.deleteCharacter(characterId);
        } catch (error) {
          console.error('Error deleting character:', error);
        }
      }
    }
  };

  const exportCharacter = (character) => {
    const exportData = {
      ...character,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name}-fabula-ultima.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.classes.primary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || character.classes.primary === filterClass;
    return matchesSearch && matchesClass;
  });

  const uniqueClasses = [...new Set(characters.map(char => char.classes.primary).filter(Boolean))];

  if (loading) {
    return (
      <div className="character-gallery">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading characters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="character-gallery">
      <div className="gallery-header">
        <h2>🎭 Character Gallery</h2>
        <div className="gallery-stats">
          {characters.length} character{characters.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="gallery-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="class-filter"
        >
          <option value="all">All Classes</option>
          {uniqueClasses.map(className => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <div className="character-grid">
        {filteredCharacters.map(character => (
          <div key={character.id} className="character-card">
            <CharacterAvatar
              character={character}
              onAvatarChange={(avatarData) => handleAvatarChange(character.id, avatarData)}
              size="medium"
              showUpload={true}
            />

            <div className="character-details">
              <div className="character-stats">
                <div className="stat-row">
                  <span className="stat-label">Level:</span>
                  <span className="stat-value">{character.level}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Primary:</span>
                  <span className="stat-value">{character.classes.primary}</span>
                </div>
                {character.classes.secondary && (
                  <div className="stat-row">
                    <span className="stat-label">Secondary:</span>
                    <span className="stat-value">{character.classes.secondary}</span>
                  </div>
                )}
                <div className="stat-row">
                  <span className="stat-label">HP:</span>
                  <span className="stat-value">{character.hitPoints || character.hit_points}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">MP:</span>
                  <span className="stat-value">{character.mindPoints || character.mind_points}</span>
                </div>
              </div>

              <div className="character-attributes">
                <h4>Attributes</h4>
                <div className="attributes-grid">
                  <div className="attr">M: {character.attributes.might}</div>
                  <div className="attr">D: {character.attributes.dexterity}</div>
                  <div className="attr">I: {character.attributes.intellect}</div>
                  <div className="attr">W: {character.attributes.willpower}</div>
                </div>
              </div>
            </div>

            <div className="character-actions">
              <button
                className="view-btn"
                onClick={() => setSelectedCharacter(character)}
                title="View Details"
              >
                👁️ View
              </button>
              <button
                className="export-btn"
                onClick={() => exportCharacter(character)}
                title="Export Character"
              >
                📥 Export
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteCharacter(character.id)}
                title="Delete Character"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="empty-gallery">
          <h3>No characters found</h3>
          <p>
            {characters.length === 0 
              ? "Create your first character in the Character Generator!"
              : "Try adjusting your search or filter settings."
            }
          </p>
        </div>
      )}

      {/* Character Detail Modal */}
      {selectedCharacter && (
        <div className="modal-overlay" onClick={() => setSelectedCharacter(null)}>
          <div className="character-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCharacter.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedCharacter(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-avatar">
                <CharacterAvatar
                  character={selectedCharacter}
                  size="xlarge"
                  showUpload={false}
                />
              </div>

              <div className="modal-details">
                <div className="detail-section">
                  <h4>Classes</h4>
                  <p>Primary: {selectedCharacter.classes.primary}</p>
                  {selectedCharacter.classes.secondary && (
                    <p>Secondary: {selectedCharacter.classes.secondary}</p>
                  )}
                </div>

                <div className="detail-section">
                  <h4>Attributes</h4>
                  <div className="detail-attributes">
                    <div>Might: {selectedCharacter.attributes.might}</div>
                    <div>Dexterity: {selectedCharacter.attributes.dexterity}</div>
                    <div>Intellect: {selectedCharacter.attributes.intellect}</div>
                    <div>Willpower: {selectedCharacter.attributes.willpower}</div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Resources</h4>
                  <div className="detail-resources">
                    <div>Hit Points: {selectedCharacter.hitPoints || selectedCharacter.hit_points}</div>
                    <div>Mind Points: {selectedCharacter.mindPoints || selectedCharacter.mind_points}</div>
                    <div>Level: {selectedCharacter.level}</div>
                  </div>
                </div>

                {selectedCharacter.traits && selectedCharacter.traits.length > 0 && (
                  <div className="detail-section">
                    <h4>Traits</h4>
                    <ul>
                      {selectedCharacter.traits.map((trait, idx) => (
                        <li key={idx}>{trait}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCharacter.bonds && selectedCharacter.bonds.length > 0 && (
                  <div className="detail-section">
                    <h4>Bonds</h4>
                    <ul>
                      {selectedCharacter.bonds.map((bond, idx) => (
                        <li key={idx}>{bond}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGallery;