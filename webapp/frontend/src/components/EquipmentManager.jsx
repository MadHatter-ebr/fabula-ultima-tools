import React, { useState, useEffect } from 'react';
import { EQUIPMENT_CATEGORIES } from '../shared/complete_game_data.js';
import './EquipmentManager.css';

const EquipmentManager = ({ character, onEquipmentChange }) => {
  const [equipment, setEquipment] = useState(character?.equipment || []);
  const [equippedItems, setEquippedItems] = useState(character?.equippedItems || {
    mainHand: null,
    offHand: null,
    armor: null,
    accessory1: null,
    accessory2: null
  });
  const [zenit, setZenit] = useState(character?.zenit || 500);
  const [showShop, setShowShop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('WEAPONS');
  const [selectedSubCategory, setSelectedSubCategory] = useState('melee');

  useEffect(() => {
    if (onEquipmentChange) {
      onEquipmentChange({
        equipment,
        equippedItems,
        zenit
      });
    }
  }, [equipment, equippedItems, zenit, onEquipmentChange]);

  const addItem = (item, quantity = 1) => {
    setEquipment(prev => {
      const existingItem = prev.find(e => e.name === item.name);
      if (existingItem) {
        return prev.map(e =>
          e.name === item.name
            ? { ...e, quantity: e.quantity + quantity }
            : e
        );
      } else {
        return [...prev, { ...item, quantity, id: Date.now() }];
      }
    });
  };

  const removeItem = (itemId) => {
    setEquipment(prev => prev.filter(item => item.id !== itemId));
    // Also unequip if it was equipped
    setEquippedItems(prev => {
      const newEquipped = { ...prev };
      Object.keys(newEquipped).forEach(slot => {
        if (newEquipped[slot]?.id === itemId) {
          newEquipped[slot] = null;
        }
      });
      return newEquipped;
    });
  };

  const equipItem = (item, slot) => {
    setEquippedItems(prev => ({
      ...prev,
      [slot]: item
    }));
  };

  const unequipItem = (slot) => {
    setEquippedItems(prev => ({
      ...prev,
      [slot]: null
    }));
  };

  const buyItem = (item) => {
    if (zenit >= item.cost) {
      setZenit(prev => prev - item.cost);
      addItem(item);
    }
  };

  const sellItem = (item) => {
    const sellPrice = Math.floor(item.cost * 0.5);
    setZenit(prev => prev + sellPrice);
    setEquipment(prev => 
      prev.map(e =>
        e.id === item.id
          ? { ...e, quantity: e.quantity - 1 }
          : e
      ).filter(e => e.quantity > 0)
    );
  };

  const calculateDefense = () => {
    let defense = 10; // Base defense
    let magicDefense = 10; // Base magic defense
    
    if (equippedItems.armor) {
      defense += equippedItems.armor.defense || 0;
      magicDefense += equippedItems.armor.magicDefense || 0;
    }

    // Add accessory bonuses
    [equippedItems.accessory1, equippedItems.accessory2].forEach(accessory => {
      if (accessory?.effect?.includes('Defense')) {
        const bonus = parseInt(accessory.effect.match(/\d+/)[0]);
        defense += bonus;
      }
    });

    return { defense, magicDefense };
  };

  const getEquipmentStats = () => {
    const stats = calculateDefense();
    const mainHandDamage = equippedItems.mainHand?.damage || 'None';
    const offHandDamage = equippedItems.offHand?.damage || 'None';
    
    return {
      ...stats,
      mainHandDamage,
      offHandDamage,
      totalWeight: equipment.reduce((sum, item) => sum + (item.weight || 0) * item.quantity, 0),
      totalValue: equipment.reduce((sum, item) => sum + item.cost * item.quantity, 0)
    };
  };

  const canEquip = (item, slot) => {
    if (slot === 'mainHand' || slot === 'offHand') {
      return item.type === 'weapon';
    }
    if (slot === 'armor') {
      return item.type === 'armor';
    }
    if (slot === 'accessory1' || slot === 'accessory2') {
      return item.category === 'accessory';
    }
    return false;
  };

  const getAllItems = () => {
    const items = [];
    Object.values(EQUIPMENT_CATEGORIES).forEach(category => {
      Object.values(category).forEach(subCategory => {
        if (subCategory.items) {
          Object.values(subCategory.items).forEach(item => {
            items.push(item);
          });
        }
      });
    });
    return items;
  };

  const getFilteredItems = () => {
    const category = EQUIPMENT_CATEGORIES[selectedCategory];
    if (category && category[selectedSubCategory]) {
      return Object.values(category[selectedSubCategory].items);
    }
    return [];
  };

  const stats = getEquipmentStats();

  return (
    <div className="equipment-manager">
      <div className="equipment-header">
        <h3>⚔️ Equipment & Inventory</h3>
        <div className="zenit-display">
          <span className="zenit-amount">💰 {zenit.toLocaleString()} Zenit</span>
          <button onClick={() => setShowShop(!showShop)} className="shop-btn">
            {showShop ? 'Close Shop' : 'Open Shop'}
          </button>
        </div>
      </div>

      <div className="equipment-content">
        {/* Equipment Stats */}
        <div className="equipment-stats">
          <h4>Combat Stats</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Defense:</span>
              <span className="stat-value">{stats.defense}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Magic Defense:</span>
              <span className="stat-value">{stats.magicDefense}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Main Hand:</span>
              <span className="stat-value">{stats.mainHandDamage}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Off Hand:</span>
              <span className="stat-value">{stats.offHandDamage}</span>
            </div>
          </div>
        </div>

        {/* Equipment Slots */}
        <div className="equipment-slots">
          <h4>Equipped Items</h4>
          <div className="slots-grid">
            {Object.entries(equippedItems).map(([slot, item]) => (
              <div key={slot} className="equipment-slot">
                <div className="slot-header">
                  <span className="slot-name">
                    {slot === 'mainHand' ? 'Main Hand' : 
                     slot === 'offHand' ? 'Off Hand' : 
                     slot === 'accessory1' ? 'Accessory 1' : 
                     slot === 'accessory2' ? 'Accessory 2' : 
                     slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </span>
                </div>
                <div className="slot-content">
                  {item ? (
                    <div className="equipped-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-effect">
                          {item.damage || item.effect || `Def: ${item.defense || 0}`}
                        </span>
                      </div>
                      <button 
                        onClick={() => unequipItem(slot)}
                        className="unequip-btn"
                      >
                        Unequip
                      </button>
                    </div>
                  ) : (
                    <div className="empty-slot">
                      <span>Empty</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="inventory">
          <h4>Inventory ({equipment.length} items)</h4>
          {equipment.length === 0 ? (
            <div className="empty-inventory">
              <span>No items in inventory</span>
            </div>
          ) : (
            <div className="inventory-grid">
              {equipment.map(item => (
                <div key={item.id} className="inventory-item">
                  <div className="item-header">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <div className="item-description">{item.description}</div>
                  <div className="item-stats">
                    {item.damage && <span>Damage: {item.damage}</span>}
                    {item.defense && <span>Defense: {item.defense}</span>}
                    {item.effect && <span>Effect: {item.effect}</span>}
                  </div>
                  <div className="item-actions">
                    {item.type === 'weapon' && (
                      <>
                        <button 
                          onClick={() => equipItem(item, 'mainHand')}
                          className="equip-btn"
                          disabled={!canEquip(item, 'mainHand')}
                        >
                          Main Hand
                        </button>
                        <button 
                          onClick={() => equipItem(item, 'offHand')}
                          className="equip-btn"
                          disabled={!canEquip(item, 'offHand') || item.hands === 2}
                        >
                          Off Hand
                        </button>
                      </>
                    )}
                    {item.type === 'armor' && (
                      <button 
                        onClick={() => equipItem(item, 'armor')}
                        className="equip-btn"
                      >
                        Equip
                      </button>
                    )}
                    {item.category === 'accessory' && (
                      <>
                        <button 
                          onClick={() => equipItem(item, 'accessory1')}
                          className="equip-btn"
                        >
                          Slot 1
                        </button>
                        <button 
                          onClick={() => equipItem(item, 'accessory2')}
                          className="equip-btn"
                        >
                          Slot 2
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => sellItem(item)}
                      className="sell-btn"
                    >
                      Sell ({Math.floor(item.cost * 0.5)}z)
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shop */}
        {showShop && (
          <div className="shop">
            <h4>🏪 Equipment Shop</h4>
            <div className="shop-filters">
              <select 
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory(Object.keys(EQUIPMENT_CATEGORIES[e.target.value])[0]);
                }}
                className="category-select"
              >
                {Object.entries(EQUIPMENT_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>{key.replace('_', ' ')}</option>
                ))}
              </select>
              
              <select 
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="subcategory-select"
              >
                {Object.entries(EQUIPMENT_CATEGORIES[selectedCategory]).map(([key, subCategory]) => (
                  <option key={key} value={key}>{subCategory.name}</option>
                ))}
              </select>
            </div>
            
            <div className="shop-items">
              {getFilteredItems().map(item => (
                <div key={item.name} className="shop-item">
                  <div className="item-header">
                    <span className="item-name">{item.name}</span>
                    <span className="item-cost">💰 {item.cost.toLocaleString()}z</span>
                  </div>
                  <div className="item-description">{item.description}</div>
                  <div className="item-stats">
                    {item.damage && <span>Damage: {item.damage}</span>}
                    {item.defense && <span>Defense: {item.defense}</span>}
                    {item.effect && <span>Effect: {item.effect}</span>}
                    {item.hands && <span>Hands: {item.hands}</span>}
                  </div>
                  <button 
                    onClick={() => buyItem(item)}
                    className="buy-btn"
                    disabled={zenit < item.cost}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentManager;