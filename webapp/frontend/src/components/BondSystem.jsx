import React, { useState, useEffect } from 'react';
import { BOND_TYPES } from '../shared/complete_game_data.js';
import './BondSystem.css';

const BondSystem = ({ character, onBondChange, allCharacters = [] }) => {
  const [bonds, setBonds] = useState(character?.bonds || []);
  const [selectedBondType, setSelectedBondType] = useState('');
  const [bondTarget, setBondTarget] = useState('');
  const [bondDescription, setBondDescription] = useState('');
  const [showAddBond, setShowAddBond] = useState(false);

  useEffect(() => {
    if (onBondChange) {
      onBondChange(bonds);
    }
  }, [bonds, onBondChange]);

  const addBond = () => {
    if (!selectedBondType || !bondTarget) return;

    const newBond = {
      id: Date.now(),
      type: selectedBondType,
      target: bondTarget,
      description: bondDescription,
      strength: 1,
      created: new Date().toISOString()
    };

    setBonds(prev => [...prev, newBond]);
    setSelectedBondType('');
    setBondTarget('');
    setBondDescription('');
    setShowAddBond(false);
  };

  const removeBond = (bondId) => {
    setBonds(prev => prev.filter(bond => bond.id !== bondId));
  };

  const updateBondStrength = (bondId, newStrength) => {
    setBonds(prev => prev.map(bond => 
      bond.id === bondId ? { ...bond, strength: newStrength } : bond
    ));
  };

  const getBondColor = (bondType) => {
    const colors = {
      ADMIRATION: '#4CAF50',
      INFERIORITY: '#FF9800',
      MISTRUST: '#F44336',
      LOYALTY: '#2196F3',
      HATRED: '#9C27B0',
      LOVE: '#E91E63'
    };
    return colors[bondType] || '#757575';
  };

  const getBondIcon = (bondType) => {
    const icons = {
      ADMIRATION: '⭐',
      INFERIORITY: '⚡',
      MISTRUST: '👁️',
      LOYALTY: '🛡️',
      HATRED: '💀',
      LOVE: '💖'
    };
    return icons[bondType] || '🔗';
  };

  return (
    <div className="bond-system">
      <div className="bond-system-header">
        <h3>🔗 Character Bonds</h3>
        <button 
          onClick={() => setShowAddBond(true)}
          className="add-bond-btn"
        >
          + Add Bond
        </button>
      </div>

      {bonds.length === 0 ? (
        <div className="no-bonds">
          <p>No bonds established yet.</p>
          <small>Bonds represent important relationships that drive your character's actions and provide mechanical benefits.</small>
        </div>
      ) : (
        <div className="bonds-list">
          {bonds.map(bond => (
            <div 
              key={bond.id} 
              className="bond-card"
              style={{ borderColor: getBondColor(bond.type) }}
            >
              <div className="bond-header">
                <div className="bond-type">
                  <span className="bond-icon">{getBondIcon(bond.type)}</span>
                  <span className="bond-name">{BOND_TYPES[bond.type]?.name}</span>
                </div>
                <button 
                  onClick={() => removeBond(bond.id)}
                  className="remove-bond-btn"
                >
                  ×
                </button>
              </div>
              
              <div className="bond-target">
                <strong>Target:</strong> {bond.target}
              </div>
              
              <div className="bond-description">
                <strong>Description:</strong> {bond.description || BOND_TYPES[bond.type]?.description}
              </div>
              
              <div className="bond-mechanics">
                <strong>Mechanics:</strong> {BOND_TYPES[bond.type]?.mechanics}
              </div>
              
              <div className="bond-emotions">
                <strong>Emotions:</strong> {BOND_TYPES[bond.type]?.emotions?.join(', ')}
              </div>
              
              <div className="bond-strength">
                <label>Bond Strength:</label>
                <select 
                  value={bond.strength} 
                  onChange={(e) => updateBondStrength(bond.id, parseInt(e.target.value))}
                  className="strength-select"
                >
                  <option value={1}>1 - Weak</option>
                  <option value={2}>2 - Moderate</option>
                  <option value={3}>3 - Strong</option>
                  <option value={4}>4 - Very Strong</option>
                  <option value={5}>5 - Overwhelming</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddBond && (
        <div className="add-bond-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add New Bond</h4>
              <button 
                onClick={() => setShowAddBond(false)}
                className="close-modal-btn"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Bond Type:</label>
                <select 
                  value={selectedBondType} 
                  onChange={(e) => setSelectedBondType(e.target.value)}
                  className="bond-type-select"
                >
                  <option value="">Select Bond Type</option>
                  {Object.entries(BOND_TYPES).map(([key, bondType]) => (
                    <option key={key} value={key}>{bondType.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedBondType && (
                <div className="bond-type-info">
                  <p><strong>Description:</strong> {BOND_TYPES[selectedBondType]?.description}</p>
                  <p><strong>Mechanics:</strong> {BOND_TYPES[selectedBondType]?.mechanics}</p>
                </div>
              )}
              
              <div className="form-group">
                <label>Target (Person or Group):</label>
                <input 
                  type="text"
                  value={bondTarget}
                  onChange={(e) => setBondTarget(e.target.value)}
                  placeholder="Who is this bond with?"
                  className="bond-target-input"
                />
              </div>
              
              <div className="form-group">
                <label>Personal Description (Optional):</label>
                <textarea 
                  value={bondDescription}
                  onChange={(e) => setBondDescription(e.target.value)}
                  placeholder="Describe your specific relationship..."
                  className="bond-description-input"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={addBond}
                className="confirm-btn"
                disabled={!selectedBondType || !bondTarget}
              >
                Add Bond
              </button>
              <button 
                onClick={() => setShowAddBond(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BondSystem;