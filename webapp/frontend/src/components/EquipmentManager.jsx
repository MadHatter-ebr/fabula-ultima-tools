import React, { useState, useEffect } from 'react';
import { EQUIPMENT_CATEGORIES, MAGISPHERES, INVENTORY_POINTS_SYSTEM } from '../shared/complete_game_data.js';
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
  const [selectedSubCategory, setSelectedSubCategory] = useState('BASIC_MELEE');

  // Update subcategory when main category changes
  useEffect(() => {
    if (selectedCategory === 'WEAPONS') {
      setSelectedSubCategory('BASIC_MELEE');
    } else if (selectedCategory === 'CONSUMABLES') {
      setSelectedSubCategory('POTIONS');
    }
  }, [selectedCategory]);

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
    const sellPrice = Math.floor(item.cost * 0.5); // Sell for half price
    setZenit(prev => prev + sellPrice);
    
    setEquipment(prev => {
      const existingItem = prev.find(e => e.name === item.name);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(e =>
          e.name === item.name
            ? { ...e, quantity: e.quantity - 1 }
            : e
        );
      } else {
        return prev.filter(e => e.id !== item.id);
      }
    });
  };

  const renderShopCategory = () => {
    if (selectedCategory === 'MAGISPHERES') {
      return (
        <div className="shop-items">
          <h4>Magispheres</h4>
          <div className="shop-grid">
            {Object.values(MAGISPHERES).map((sphere, index) => (
              <div key={index} className="shop-item">
                <div className="item-header">
                  <span className="item-name">{sphere.name}</span>
                  <span className="item-cost">{sphere.cost}z</span>
                </div>
                <div className="item-details">
                  <span className="ip-cost">IP Cost: {sphere.ipCost}</span>
                  <span className="item-effect">{sphere.effect}</span>
                </div>
                <p className="item-description">{sphere.description}</p>
                <button
                  onClick={() => buyItem({...sphere, type: 'magisphere'})}
                  disabled={zenit < sphere.cost}
                  className="buy-btn"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const categoryData = EQUIPMENT_CATEGORIES[selectedCategory];
    if (!categoryData) return null;

    if (selectedCategory === 'WEAPONS') {
      const subCategoryData = categoryData[selectedSubCategory];
      if (!subCategoryData) return null;

      return (
        <div className="shop-items">
          <div className="subcategory-tabs">
            {Object.keys(categoryData).map(subCat => (
              <button
                key={subCat}
                className={`tab-btn ${selectedSubCategory === subCat ? 'active' : ''}`}
                onClick={() => setSelectedSubCategory(subCat)}
              >
                {subCat.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="shop-grid">
            {Object.values(subCategoryData).map((item, index) => (
              <div key={index} className="shop-item">
                <div className="item-header">
                  <span className="item-name">{item.name}</span>
                  <span className="item-cost">{item.cost}z</span>
                </div>
                <div className="item-stats">
                  <span className="damage">Damage: {item.damage}</span>
                  <span className="accuracy">Accuracy: {item.accuracy}</span>
                  <span className="hands">Hands: {item.hands}</span>
                </div>
                {item.quality && item.quality.length > 0 && (
                  <div className="item-qualities">
                    Qualities: {item.quality.join(', ')}
                  </div>
                )}
                <p className="item-description">{item.description}</p>
                <button
                  onClick={() => buyItem(item)}
                  disabled={zenit < item.cost}
                  className="buy-btn"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // For ARMOR, SHIELDS, ACCESSORIES, CONSUMABLES
    if (selectedCategory === 'CONSUMABLES') {
      return (
        <div className="shop-items">
          <div className="subcategory-tabs">
            {Object.keys(categoryData).map(subCat => (
              <button
                key={subCat}
                className={`tab-btn ${selectedSubCategory === subCat ? 'active' : ''}`}
                onClick={() => setSelectedSubCategory(subCat)}
              >
                {subCat.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="shop-grid">
            {categoryData[selectedSubCategory] && Object.values(categoryData[selectedSubCategory]).map((item, index) => (
              <div key={index} className="shop-item">
                <div className="item-header">
                  <span className="item-name">{item.name}</span>
                  <span className="item-cost">{item.cost}z</span>
                </div>
                <div className="item-stats">
                  {item.effect && <span className="effect">Effect: {item.effect}</span>}
                </div>
                <p className="item-description">{item.description}</p>
                <button
                  onClick={() => buyItem(item)}
                  disabled={zenit < item.cost}
                  className="buy-btn"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="shop-items">
        <div className="shop-grid">
          {Object.values(categoryData).map((item, index) => (
            <div key={index} className="shop-item">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                <span className="item-cost">{item.cost}z</span>
              </div>
              <div className="item-stats">
                {item.defense && <span className="defense">DEF: {item.defense}</span>}
                {item.magic_defense && <span className="mdef">M.DEF: {item.magic_defense}</span>}
                {item.initiative_modifier && <span className="init">Init: {item.initiative_modifier}</span>}
                {item.effect && <span className="effect">Effect: {item.effect}</span>}
              </div>
              <p className="item-description">{item.description}</p>
              <button
                onClick={() => buyItem(item)}
                disabled={zenit < item.cost}
                className="buy-btn"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getItemSlotType = (item) => {
    if (item.type === 'weapon') return ['mainHand', 'offHand'];
    if (item.type === 'armor') return ['armor'];
    if (item.type === 'shield') return ['offHand'];
    if (item.type === 'ring' || item.type === 'amulet' || item.category === 'accessory') {
      return ['accessory1', 'accessory2'];
    }
    return [];
  };

  const canEquip = (item, slot) => {
    const validSlots = getItemSlotType(item);
    return validSlots.includes(slot);
  };

  return (
    <div className="equipment-manager">
      <div className="equipment-header">
        <h3>⚔️ Equipment & Inventory</h3>
        <div className="currency-display">
          <span className="zenit">💰 {zenit} Zenit</span>
          <button onClick={() => setShowShop(!showShop)} className="shop-btn">
            {showShop ? 'Close Shop' : 'Open Shop'}
          </button>
        </div>
      </div>

      <div className="equipment-content">
        {/* IP Information Panel */}
        <div className="ip-info-panel">
          <h4>📦 Inventory Points (IP) System</h4>
          <div className="ip-description">
            <p><strong>Current IP:</strong> {character?.resources?.ip || 5}</p>
            <p><strong>Base Value:</strong> {INVENTORY_POINTS_SYSTEM.baseValue}</p>
            <p className="ip-usage"><strong>Uses:</strong></p>
            <ul>
              <li>Use potions in combat (1 IP)</li>
              <li>Apply Magispheres to enemies (1-2 IP)</li>
              <li>Use Tent during rest (3 IP from one person)</li>
              <li>Use Cottage during rest (3 IP from two people)</li>
            </ul>
            <p className="ip-note">
              <em>Note: Equipment does not consume IP - it's used for consumables and camping!</em>
            </p>
          </div>
        </div>

        {/* Equipment Slots */}
        <div className="equipment-slots">
          <h4>Equipped Items</h4>
          <div className="slots-grid">
            <div className="equipment-slot">
              <span className="slot-label">Main Hand</span>
              <div className="slot-content">
                {equippedItems.mainHand ? (
                  <div className="equipped-item">
                    <span className="item-name">{equippedItems.mainHand.name}</span>
                    <button onClick={() => unequipItem('mainHand')} className="unequip-btn">
                      Unequip
                    </button>
                  </div>
                ) : (
                  <span className="empty-slot">Empty</span>
                )}
              </div>
            </div>

            <div className="equipment-slot">
              <span className="slot-label">Off Hand</span>
              <div className="slot-content">
                {equippedItems.offHand ? (
                  <div className="equipped-item">
                    <span className="item-name">{equippedItems.offHand.name}</span>
                    <button onClick={() => unequipItem('offHand')} className="unequip-btn">
                      Unequip
                    </button>
                  </div>
                ) : (
                  <span className="empty-slot">Empty</span>
                )}
              </div>
            </div>

            <div className="equipment-slot">
              <span className="slot-label">Armor</span>
              <div className="slot-content">
                {equippedItems.armor ? (
                  <div className="equipped-item">
                    <span className="item-name">{equippedItems.armor.name}</span>
                    <button onClick={() => unequipItem('armor')} className="unequip-btn">
                      Unequip
                    </button>
                  </div>
                ) : (
                  <span className="empty-slot">Empty</span>
                )}
              </div>
            </div>

            <div className="equipment-slot">
              <span className="slot-label">Accessory 1</span>
              <div className="slot-content">
                {equippedItems.accessory1 ? (
                  <div className="equipped-item">
                    <span className="item-name">{equippedItems.accessory1.name}</span>
                    <button onClick={() => unequipItem('accessory1')} className="unequip-btn">
                      Unequip
                    </button>
                  </div>
                ) : (
                  <span className="empty-slot">Empty</span>
                )}
              </div>
            </div>

            <div className="equipment-slot">
              <span className="slot-label">Accessory 2</span>
              <div className="slot-content">
                {equippedItems.accessory2 ? (
                  <div className="equipped-item">
                    <span className="item-name">{equippedItems.accessory2.name}</span>
                    <button onClick={() => unequipItem('accessory2')} className="unequip-btn">
                      Unequip
                    </button>
                  </div>
                ) : (
                  <span className="empty-slot">Empty</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="inventory">
          <h4>Inventory</h4>
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
                  <div className="item-actions">
                    {getItemSlotType(item).map(slot => (
                      <button
                        key={slot}
                        onClick={() => equipItem(item, slot)}
                        disabled={!canEquip(item, slot) || equippedItems[slot]}
                        className="equip-btn"
                      >
                        Equip to {slot}
                      </button>
                    ))}
                    <button onClick={() => sellItem(item)} className="sell-btn">
                      Sell (${Math.floor(item.cost * 0.5)}z)
                    </button>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">
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
            <div className="shop-header">
              <h4>🏪 Equipment Shop</h4>
              <div className="category-tabs">
                {['WEAPONS', 'ARMOR', 'SHIELDS', 'ACCESSORIES', 'CONSUMABLES', 'MAGISPHERES'].map(category => (
                  <button
                    key={category}
                    className={`tab-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {renderShopCategory()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentManager;