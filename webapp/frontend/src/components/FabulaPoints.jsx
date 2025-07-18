import React, { useState, useEffect } from 'react';
import { FABULA_POINTS } from '../shared/complete_game_data.js';
import './FabulaPoints.css';

const FabulaPoints = ({ character, onFabulaPointsChange }) => {
  const [currentPoints, setCurrentPoints] = useState(character?.fabulaPoints || FABULA_POINTS.starting_points);
  const [history, setHistory] = useState(character?.fabulaHistory || []);
  const [showUseModal, setShowUseModal] = useState(false);
  const [selectedUse, setSelectedUse] = useState('');
  const [useDescription, setUseDescription] = useState('');

  useEffect(() => {
    if (onFabulaPointsChange) {
      onFabulaPointsChange({
        points: currentPoints,
        history: history
      });
    }
  }, [currentPoints, history, onFabulaPointsChange]);

  const spendPoints = (amount, reason, description = '') => {
    if (currentPoints >= amount) {
      const newPoints = currentPoints - amount;
      setCurrentPoints(newPoints);
      
      const historyEntry = {
        id: Date.now(),
        type: 'spend',
        amount: amount,
        reason: reason,
        description: description,
        timestamp: new Date().toISOString(),
        pointsAfter: newPoints
      };
      
      setHistory(prev => [historyEntry, ...prev]);
      return true;
    }
    return false;
  };

  const gainPoints = (amount, reason, description = '') => {
    const newPoints = Math.min(currentPoints + amount, FABULA_POINTS.max_points);
    setCurrentPoints(newPoints);
    
    const historyEntry = {
      id: Date.now(),
      type: 'gain',
      amount: amount,
      reason: reason,
      description: description,
      timestamp: new Date().toISOString(),
      pointsAfter: newPoints
    };
    
    setHistory(prev => [historyEntry, ...prev]);
  };

  const usePoints = () => {
    if (!selectedUse) return;
    
    const useData = FABULA_POINTS.uses[selectedUse];
    if (spendPoints(useData.cost, useData.name, useDescription)) {
      setSelectedUse('');
      setUseDescription('');
      setShowUseModal(false);
    }
  };

  const getPointsColor = () => {
    const percentage = currentPoints / FABULA_POINTS.max_points;
    if (percentage >= 0.7) return 'var(--ff9-crystal-blue)';
    if (percentage >= 0.4) return 'var(--ff9-gold-light)';
    return 'var(--ff9-crystal-red)';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="fabula-points">
      <div className="fabula-points-header">
        <h3>✨ Fabula Points</h3>
        <div className="points-controls">
          <button 
            onClick={() => gainPoints(1, 'Manual Addition', 'Added by player')}
            className="gain-point-btn"
            disabled={currentPoints >= FABULA_POINTS.max_points}
          >
            +1
          </button>
          <button 
            onClick={() => setShowUseModal(true)}
            className="use-points-btn"
            disabled={currentPoints === 0}
          >
            Use Points
          </button>
        </div>
      </div>

      <div className="points-display">
        <div className="points-counter">
          <div className="points-bar">
            <div 
              className="points-fill"
              style={{ 
                width: `${(currentPoints / FABULA_POINTS.max_points) * 100}%`,
                backgroundColor: getPointsColor()
              }}
            />
          </div>
          <div className="points-text">
            <span className="current-points">{currentPoints}</span>
            <span className="points-separator">/</span>
            <span className="max-points">{FABULA_POINTS.max_points}</span>
          </div>
        </div>
        
        <div className="points-status">
          {currentPoints === 0 && (
            <span className="status-message warning">No points remaining</span>
          )}
          {currentPoints === FABULA_POINTS.max_points && (
            <span className="status-message success">Maximum points reached</span>
          )}
        </div>
      </div>

      <div className="fabula-info">
        <h4>How to Gain Fabula Points</h4>
        <ul className="gaining-points-list">
          {FABULA_POINTS.gaining_points.map((method, index) => (
            <li key={index} className="gaining-method">
              {method}
              <button 
                onClick={() => gainPoints(1, 'Rule-based', method)}
                className="quick-gain-btn"
                disabled={currentPoints >= FABULA_POINTS.max_points}
              >
                +1
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="fabula-uses">
        <h4>Fabula Point Uses</h4>
        <div className="uses-grid">
          {Object.entries(FABULA_POINTS.uses).map(([key, use]) => (
            <div key={key} className="use-card">
              <div className="use-header">
                <span className="use-name">{use.name}</span>
                <span className="use-cost">{use.cost} FP</span>
              </div>
              <div className="use-description">{use.description}</div>
              <div className="use-timing">
                <strong>Timing:</strong> {use.timing}
              </div>
              <button 
                onClick={() => {
                  setSelectedUse(key);
                  setShowUseModal(true);
                }}
                className="use-btn"
                disabled={currentPoints < use.cost}
              >
                Use ({use.cost} FP)
              </button>
            </div>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="fabula-history">
          <h4>Recent History</h4>
          <div className="history-list">
            {history.slice(0, 10).map(entry => (
              <div key={entry.id} className={`history-entry ${entry.type}`}>
                <div className="history-main">
                  <span className="history-type">
                    {entry.type === 'spend' ? '💸' : '💰'}
                  </span>
                  <span className="history-reason">{entry.reason}</span>
                  <span className="history-amount">
                    {entry.type === 'spend' ? '-' : '+'}{entry.amount} FP
                  </span>
                </div>
                {entry.description && (
                  <div className="history-description">{entry.description}</div>
                )}
                <div className="history-footer">
                  <span className="history-timestamp">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                  <span className="history-result">
                    Points after: {entry.pointsAfter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showUseModal && (
        <div className="use-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Use Fabula Points</h4>
              <button 
                onClick={() => setShowUseModal(false)}
                className="close-modal-btn"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="current-points-display">
                <span>Current Points: {currentPoints}</span>
              </div>
              
              <div className="form-group">
                <label>Select Use:</label>
                <select 
                  value={selectedUse} 
                  onChange={(e) => setSelectedUse(e.target.value)}
                  className="use-select"
                >
                  <option value="">Select how to use points</option>
                  {Object.entries(FABULA_POINTS.uses).map(([key, use]) => (
                    <option 
                      key={key} 
                      value={key}
                      disabled={currentPoints < use.cost}
                    >
                      {use.name} ({use.cost} FP)
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedUse && (
                <div className="use-preview">
                  <h5>{FABULA_POINTS.uses[selectedUse].name}</h5>
                  <p><strong>Cost:</strong> {FABULA_POINTS.uses[selectedUse].cost} FP</p>
                  <p><strong>Description:</strong> {FABULA_POINTS.uses[selectedUse].description}</p>
                  <p><strong>Timing:</strong> {FABULA_POINTS.uses[selectedUse].timing}</p>
                </div>
              )}
              
              <div className="form-group">
                <label>Description (optional):</label>
                <textarea 
                  value={useDescription}
                  onChange={(e) => setUseDescription(e.target.value)}
                  placeholder="Describe how you're using the points..."
                  className="description-input"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={usePoints}
                className="confirm-btn"
                disabled={!selectedUse || currentPoints < (selectedUse ? FABULA_POINTS.uses[selectedUse].cost : 0)}
              >
                Use Points
              </button>
              <button 
                onClick={() => setShowUseModal(false)}
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

export default FabulaPoints;