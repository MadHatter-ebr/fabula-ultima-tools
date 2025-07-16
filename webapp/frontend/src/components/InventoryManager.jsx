import React, { useState, useEffect } from 'react';
import { BASIC_WEAPONS, EQUIPMENT_TYPES, GAME_MECHANICS } from '../../../shared/game_data.js';
import { dbHelpers } from '../lib/supabase';
import './InventoryManager.css';

const InventoryManager = ({ user }) => {
  const [inventory, setInventory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'weapons',
    quantity: 1,
    weight: 1,
    description: '',
    value: 0,
    rarity: 'common'
  });
  const [characterStats, setCharacterStats] = useState({
    might: 8,
    dexterity: 8,
    inventoryPoints: 16,
    usedPoints: 0
  });
  const [loading, setLoading] = useState(false);

  // Load inventory on component mount
  useEffect(() => {
    loadInventory();
  }, [user]);

  // Calculate used inventory points
  useEffect(() => {
    const used = inventory.reduce((total, item) => total + (item.weight * item.quantity), 0);
    setCharacterStats(prev => ({ ...prev, usedPoints: used }));
  }, [inventory]);

  const loadInventory = async () => {
    if (!user || user.id === 'demo') {
      // Demo data for offline use
      setInventory([
        { id: 1, name: 'Steel Sword', type: 'weapons', quantity: 1, weight: 2, description: 'A reliable blade', value: 200, rarity: 'common' },
        { id: 2, name: 'Leather Armor', type: 'armor', quantity: 1, weight: 3, description: 'Basic protection', value: 150, rarity: 'common' },
        { id: 3, name: 'Health Potion', type: 'consumables', quantity: 5, weight: 1, description: 'Restores HP', value: 50, rarity: 'common' }
      ]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await dbHelpers.loadInventory();
      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveInventory = async (updatedInventory) => {
    if (!user || user.id === 'demo') {
      setInventory(updatedInventory);
      return;
    }

    try {
      const { error } = await dbHelpers.saveInventory(updatedInventory);
      if (error) throw error;
      setInventory(updatedInventory);
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  const addItem = async () => {
    if (!newItem.name.trim()) return;

    const item = {
      id: Date.now(),
      ...newItem,
      quantity: parseInt(newItem.quantity),
      weight: parseInt(newItem.weight),
      value: parseInt(newItem.value)
    };

    const updatedInventory = [...inventory, item];
    await saveInventory(updatedInventory);
    
    setNewItem({
      name: '',
      type: 'weapons',
      quantity: 1,
      weight: 1,
      description: '',
      value: 0,
      rarity: 'common'
    });
    setShowAddItem(false);
  };

  const updateItemQuantity = async (itemId, change) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    await saveInventory(updatedInventory);
  };

  const removeItem = async (itemId) => {
    const updatedInventory = inventory.filter(item => item.id !== itemId);
    await saveInventory(updatedInventory);
  };

  const addQuickItem = async (weaponKey) => {
    const weapon = BASIC_WEAPONS[weaponKey];
    const item = {
      id: Date.now(),
      name: weapon.name,
      type: 'weapons',
      quantity: 1,
      weight: 2,
      description: `${weapon.type} weapon, ${weapon.handedness}`,
      value: weapon.cost,
      rarity: 'common',
      damage: weapon.damage,
      handedness: weapon.handedness,
      special: weapon.special
    };

    const updatedInventory = [...inventory, item];
    await saveInventory(updatedInventory);
  };

  const filteredInventory = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: '📦' },
    { id: 'weapons', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' },
    { id: 'accessories', name: 'Accessories', icon: '💍' },
    { id: 'consumables', name: 'Consumables', icon: '🧪' },
    { id: 'materials', name: 'Materials', icon: '🔨' },
    { id: 'misc', name: 'Miscellaneous', icon: '🎒' }
  ];

  const rarityColors = {
    common: '#95a5a6',
    uncommon: '#27ae60',
    rare: '#3498db',
    epic: '#9b59b6',
    legendary: '#f39c12'
  };

  const inventoryCapacity = characterStats.inventoryPoints;
  const usedCapacity = characterStats.usedPoints;
  const capacityPercent = Math.min((usedCapacity / inventoryCapacity) * 100, 100);

  return (
    <div className="inventory-manager">
      <div className="inventory-header">
        <h2>🎒 Inventory Manager</h2>
        <div className="inventory-stats">
          <div className="capacity-meter">
            <div className="capacity-label">
              Inventory: {usedCapacity}/{inventoryCapacity} IP
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-fill" 
                style={{ 
                  width: `${capacityPercent}%`,
                  backgroundColor: capacityPercent > 90 ? '#e74c3c' : capacityPercent > 75 ? '#f39c12' : '#27ae60'
                }}
              />
            </div>
          </div>
          <div className="total-value">
            💰 Total Value: {inventory.reduce((sum, item) => sum + (item.value * item.quantity), 0)} zenit
          </div>
        </div>
      </div>

      <div className="inventory-controls">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="inventory-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="add-item-btn"
            onClick={() => setShowAddItem(true)}
          >
            ➕ Add Item
          </button>
        </div>
      </div>

      {/* Quick Add Basic Weapons */}
      <div className="quick-add-section">
        <h3>⚡ Quick Add Basic Weapons</h3>
        <div className="quick-weapons">
          {Object.entries(BASIC_WEAPONS).map(([key, weapon]) => (
            <button
              key={key}
              className="quick-weapon-btn"
              onClick={() => addQuickItem(key)}
            >
              <span className="weapon-icon">
                {weapon.type === 'melee' && '⚔️'}
                {weapon.type === 'ranged' && '🏹'}
                {weapon.type === 'arcane' && '🪄'}
              </span>
              {weapon.name}
              <span className="weapon-cost">{weapon.cost}z</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="modal-overlay">
          <div className="add-item-modal">
            <h3>➕ Add New Item</h3>
            <div className="modal-form">
              <input
                type="text"
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({...newItem, type: e.target.value})}
              >
                <option value="weapons">Weapons</option>
                <option value="armor">Armor</option>
                <option value="accessories">Accessories</option>
                <option value="consumables">Consumables</option>
                <option value="materials">Materials</option>
                <option value="misc">Miscellaneous</option>
              </select>
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              />
              <input
                type="number"
                placeholder="Weight (IP)"
                min="1"
                value={newItem.weight}
                onChange={(e) => setNewItem({...newItem, weight: e.target.value})}
              />
              <input
                type="number"
                placeholder="Value (zenit)"
                min="0"
                value={newItem.value}
                onChange={(e) => setNewItem({...newItem, value: e.target.value})}
              />
              <select
                value={newItem.rarity}
                onChange={(e) => setNewItem({...newItem, rarity: e.target.value})}
              >
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddItem(false)}>
                Cancel
              </button>
              <button className="add-btn" onClick={addItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Grid */}
      <div className="inventory-grid">
        {filteredInventory.map(item => (
          <div key={item.id} className="inventory-item">
            <div className="item-header">
              <div className="item-name" style={{ color: rarityColors[item.rarity] }}>
                {item.name}
              </div>
              <div className="item-type">
                {categories.find(cat => cat.id === item.type)?.icon} {item.type}
              </div>
            </div>
            
            <div className="item-stats">
              <div className="stat">📦 Qty: {item.quantity}</div>
              <div className="stat">⚖️ Weight: {item.weight * item.quantity} IP</div>
              <div className="stat">💰 Value: {item.value * item.quantity}z</div>
            </div>

            {item.damage && (
              <div className="item-combat">
                <div className="stat">⚔️ Damage: {item.damage}</div>
                <div className="stat">🤲 {item.handedness}</div>
                {item.special && <div className="stat">✨ {item.special}</div>}
              </div>
            )}

            <div className="item-description">
              {item.description}
            </div>

            <div className="item-actions">
              <button 
                className="quantity-btn"
                onClick={() => updateItemQuantity(item.id, -1)}
              >
                ➖
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => updateItemQuantity(item.id, 1)}
              >
                ➕
              </button>
              <button 
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <div className="empty-inventory">
          <h3>📦 Inventory is empty</h3>
          <p>Add items to start managing your equipment!</p>
        </div>
      )}

      {loading && (
        <div className="inventory-loading">
          <div className="loading-spinner"></div>
          <p>Loading inventory...</p>
        </div>
      )}
    </div>
  );
};

export default InventoryManager;