import React, { useState, useEffect } from 'react';
import { EQUIPMENT_CATEGORIES } from '../shared/complete_game_data.js';
import './CraftingSystem.css';

const CraftingSystem = ({ character, onCraftingChange }) => {
  const [craftingMaterials, setCraftingMaterials] = useState(character?.craftingMaterials || []);
  const [recipes, setRecipes] = useState(getInitialRecipes());
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showCraftingModal, setShowCraftingModal] = useState(false);
  const [craftingSkill, setCraftingSkill] = useState(character?.craftingSkill || 1);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);

  useEffect(() => {
    if (onCraftingChange) {
      onCraftingChange({
        craftingMaterials,
        craftingSkill,
        recipes
      });
    }
  }, [craftingMaterials, craftingSkill, recipes, onCraftingChange]);

  function getInitialRecipes() {
    return [
      {
        id: 'iron_sword',
        name: 'Iron Sword',
        category: 'weapons',
        difficulty: 2,
        materials: [
          { name: 'Iron Ore', quantity: 3 },
          { name: 'Wood', quantity: 1 },
          { name: 'Leather Strip', quantity: 1 }
        ],
        result: {
          name: 'Iron Sword',
          category: 'melee',
          type: 'weapon',
          hands: 1,
          damage: 'MIG + 12',
          quality: 'crafted',
          cost: 400,
          description: 'A sturdy sword forged from iron.'
        },
        craftingTime: 4,
        experience: 50
      },
      {
        id: 'healing_potion',
        name: 'Healing Potion',
        category: 'consumables',
        difficulty: 1,
        materials: [
          { name: 'Healing Herb', quantity: 2 },
          { name: 'Pure Water', quantity: 1 },
          { name: 'Glass Vial', quantity: 1 }
        ],
        result: {
          name: 'Healing Potion',
          category: 'consumable',
          type: 'potion',
          effect: 'Recovers 60 HP',
          cost: 350,
          description: 'A carefully crafted healing potion.'
        },
        craftingTime: 2,
        experience: 25
      },
      {
        id: 'leather_armor',
        name: 'Leather Armor',
        category: 'armor',
        difficulty: 3,
        materials: [
          { name: 'Leather Hide', quantity: 4 },
          { name: 'Thread', quantity: 2 },
          { name: 'Metal Buckle', quantity: 3 }
        ],
        result: {
          name: 'Crafted Leather Armor',
          category: 'light',
          type: 'armor',
          defense: 12,
          magicDefense: 10,
          cost: 300,
          description: 'Well-crafted leather armor providing good protection.'
        },
        craftingTime: 6,
        experience: 75
      },
      {
        id: 'magic_ring',
        name: 'Ring of Minor Protection',
        category: 'accessories',
        difficulty: 4,
        materials: [
          { name: 'Silver Ore', quantity: 2 },
          { name: 'Crystal Fragment', quantity: 1 },
          { name: 'Enchantment Scroll', quantity: 1 }
        ],
        result: {
          name: 'Ring of Minor Protection',
          category: 'accessory',
          type: 'ring',
          effect: 'Defense +1',
          cost: 600,
          description: 'A simple enchanted ring providing minor protection.'
        },
        craftingTime: 8,
        experience: 100
      },
      {
        id: 'masterwork_sword',
        name: 'Masterwork Sword',
        category: 'weapons',
        difficulty: 6,
        materials: [
          { name: 'Mithril Ore', quantity: 2 },
          { name: 'Hardwood', quantity: 1 },
          { name: 'Dragon Scale', quantity: 1 },
          { name: 'Master\'s Tools', quantity: 1 }
        ],
        result: {
          name: 'Masterwork Sword',
          category: 'melee',
          type: 'weapon',
          hands: 1,
          damage: 'MIG + 16',
          quality: 'masterwork',
          cost: 1200,
          description: 'A masterfully crafted sword of exceptional quality.'
        },
        craftingTime: 12,
        experience: 200
      }
    ];
  }

  const addMaterial = (material) => {
    setCraftingMaterials(prev => {
      const existingMaterial = prev.find(m => m.name === material.name);
      if (existingMaterial) {
        return prev.map(m =>
          m.name === material.name
            ? { ...m, quantity: m.quantity + material.quantity }
            : m
        );
      } else {
        return [...prev, { ...material, id: Date.now() }];
      }
    });
  };

  const removeMaterial = (materialId) => {
    setCraftingMaterials(prev => prev.filter(m => m.id !== materialId));
  };

  const canCraft = (recipe) => {
    if (craftingSkill < recipe.difficulty) return false;
    
    return recipe.materials.every(requiredMaterial => {
      const availableMaterial = craftingMaterials.find(m => m.name === requiredMaterial.name);
      return availableMaterial && availableMaterial.quantity >= requiredMaterial.quantity;
    });
  };

  const craftItem = (recipe) => {
    if (!canCraft(recipe)) return null;

    // Consume materials
    setCraftingMaterials(prev => {
      let updatedMaterials = [...prev];
      
      recipe.materials.forEach(requiredMaterial => {
        updatedMaterials = updatedMaterials.map(m =>
          m.name === requiredMaterial.name
            ? { ...m, quantity: m.quantity - requiredMaterial.quantity }
            : m
        ).filter(m => m.quantity > 0);
      });
      
      return updatedMaterials;
    });

    // Add experience (simplified)
    const newSkill = Math.min(10, craftingSkill + Math.floor(recipe.experience / 100));
    setCraftingSkill(newSkill);

    setSelectedRecipe(null);
    setShowCraftingModal(false);

    return {
      ...recipe.result,
      id: Date.now(),
      crafted: true,
      craftedBy: character?.name || 'Player'
    };
  };

  const getMaterialRarity = (materialName) => {
    const rarityMap = {
      'Wood': 'common',
      'Iron Ore': 'common',
      'Leather Strip': 'common',
      'Healing Herb': 'common',
      'Pure Water': 'common',
      'Glass Vial': 'common',
      'Leather Hide': 'uncommon',
      'Thread': 'common',
      'Metal Buckle': 'uncommon',
      'Silver Ore': 'rare',
      'Crystal Fragment': 'rare',
      'Enchantment Scroll': 'rare',
      'Mithril Ore': 'legendary',
      'Hardwood': 'uncommon',
      'Dragon Scale': 'legendary',
      'Master\'s Tools': 'legendary'
    };
    return rarityMap[materialName] || 'common';
  };

  const getRarityColor = (rarity) => {
    const colors = {
      'common': 'var(--ff9-text-secondary)',
      'uncommon': 'var(--ff9-crystal-blue)',
      'rare': 'var(--ff9-crystal-purple)',
      'legendary': 'var(--ff9-gold-light)'
    };
    return colors[rarity] || 'var(--ff9-text-secondary)';
  };

  const getFilteredRecipes = () => {
    return recipes.filter(recipe => craftingSkill >= recipe.difficulty);
  };

  const getSkillName = (level) => {
    const skillNames = {
      1: 'Novice',
      2: 'Apprentice',
      3: 'Journeyman',
      4: 'Expert',
      5: 'Artisan',
      6: 'Master',
      7: 'Grandmaster',
      8: 'Legendary',
      9: 'Mythical',
      10: 'Divine'
    };
    return skillNames[level] || 'Novice';
  };

  return (
    <div className="crafting-system">
      <div className="crafting-header">
        <h3>🔨 Crafting System</h3>
        <div className="crafting-info">
          <span className="skill-level">
            Skill: {getSkillName(craftingSkill)} (Level {craftingSkill})
          </span>
          <button 
            onClick={() => setShowMaterialsModal(true)}
            className="manage-materials-btn"
          >
            Manage Materials
          </button>
        </div>
      </div>

      <div className="crafting-content">
        {/* Materials Inventory */}
        <div className="materials-section">
          <h4>Materials ({craftingMaterials.length} types)</h4>
          {craftingMaterials.length === 0 ? (
            <div className="no-materials">
              <span>No materials available</span>
            </div>
          ) : (
            <div className="materials-grid">
              {craftingMaterials.map(material => (
                <div key={material.id} className="material-card">
                  <div className="material-header">
                    <span 
                      className="material-name"
                      style={{ color: getRarityColor(getMaterialRarity(material.name)) }}
                    >
                      {material.name}
                    </span>
                    <span className="material-quantity">x{material.quantity}</span>
                  </div>
                  <div className="material-rarity">
                    <span className={`rarity-badge ${getMaterialRarity(material.name)}`}>
                      {getMaterialRarity(material.name)}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeMaterial(material.id)}
                    className="remove-material-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recipe List */}
        <div className="recipes-section">
          <h4>Available Recipes</h4>
          <div className="recipes-grid">
            {getFilteredRecipes().map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-header">
                  <span className="recipe-name">{recipe.name}</span>
                  <span className="recipe-difficulty">
                    Difficulty: {recipe.difficulty}
                  </span>
                </div>
                
                <div className="recipe-materials">
                  <h5>Required Materials:</h5>
                  <ul>
                    {recipe.materials.map((material, index) => {
                      const available = craftingMaterials.find(m => m.name === material.name);
                      const hasEnough = available && available.quantity >= material.quantity;
                      
                      return (
                        <li key={index} className={`material-requirement ${hasEnough ? 'satisfied' : 'missing'}`}>
                          <span className="material-name">{material.name}</span>
                          <span className="material-amount">
                            {available?.quantity || 0}/{material.quantity}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <div className="recipe-result">
                  <h5>Result:</h5>
                  <span className="result-name">{recipe.result.name}</span>
                  <span className="result-effect">
                    {recipe.result.damage || recipe.result.effect || `Def: ${recipe.result.defense || 0}`}
                  </span>
                </div>
                
                <div className="recipe-info">
                  <span className="crafting-time">Time: {recipe.craftingTime}h</span>
                  <span className="experience-gain">EXP: {recipe.experience}</span>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setShowCraftingModal(true);
                  }}
                  className="craft-btn"
                  disabled={!canCraft(recipe)}
                >
                  {canCraft(recipe) ? 'Craft Item' : 'Cannot Craft'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crafting Modal */}
      {showCraftingModal && selectedRecipe && (
        <div className="crafting-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Craft {selectedRecipe.name}</h4>
              <button onClick={() => setShowCraftingModal(false)} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="crafting-preview">
                <h5>Crafting Preview</h5>
                <div className="preview-item">
                  <span className="item-name">{selectedRecipe.result.name}</span>
                  <span className="item-description">{selectedRecipe.result.description}</span>
                </div>
                
                <div className="material-consumption">
                  <h5>Materials to be consumed:</h5>
                  <ul>
                    {selectedRecipe.materials.map((material, index) => (
                      <li key={index}>
                        <span>{material.name}</span>
                        <span>x{material.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="crafting-stats">
                  <div className="stat">
                    <span>Crafting Time:</span>
                    <span>{selectedRecipe.craftingTime} hours</span>
                  </div>
                  <div className="stat">
                    <span>Experience Gained:</span>
                    <span>{selectedRecipe.experience} EXP</span>
                  </div>
                  <div className="stat">
                    <span>Success Rate:</span>
                    <span>{Math.min(100, 50 + (craftingSkill - selectedRecipe.difficulty) * 10)}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={() => {
                  const craftedItem = craftItem(selectedRecipe);
                  if (craftedItem) {
                    // This would typically add the item to inventory
                    console.log('Crafted item:', craftedItem);
                  }
                }}
                className="confirm-craft-btn"
                disabled={!canCraft(selectedRecipe)}
              >
                Confirm Crafting
              </button>
              <button 
                onClick={() => setShowCraftingModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Materials Management Modal */}
      {showMaterialsModal && (
        <div className="materials-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Manage Materials</h4>
              <button onClick={() => setShowMaterialsModal(false)} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <MaterialsManager 
                onAddMaterial={addMaterial}
                currentMaterials={craftingMaterials}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Materials Manager Component
const MaterialsManager = ({ onAddMaterial, currentMaterials }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);

  const availableMaterials = [
    'Wood', 'Iron Ore', 'Leather Strip', 'Healing Herb', 'Pure Water', 'Glass Vial',
    'Leather Hide', 'Thread', 'Metal Buckle', 'Silver Ore', 'Crystal Fragment',
    'Enchantment Scroll', 'Mithril Ore', 'Hardwood', 'Dragon Scale', 'Master\'s Tools'
  ];

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (selectedMaterial && quantity > 0) {
      onAddMaterial({
        name: selectedMaterial,
        quantity: quantity
      });
      setSelectedMaterial('');
      setQuantity(1);
    }
  };

  return (
    <div className="materials-manager">
      <form onSubmit={handleAddMaterial} className="add-material-form">
        <div className="form-group">
          <label>Material:</label>
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            required
          >
            <option value="">Select material</option>
            {availableMaterials.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Quantity:</label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        
        <button type="submit" className="add-material-btn">Add Material</button>
      </form>
    </div>
  );
};

export default CraftingSystem;