import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { DEFAULT_CHARACTER } from '../shared/complete_game_data.js';

// Character Context for global state management
const CharacterContext = createContext();

// Character reducer for state management
const characterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return { ...state, character: action.payload };
    
    case 'UPDATE_CHARACTER':
      return { 
        ...state, 
        character: { ...state.character, ...action.payload } 
      };
    
    case 'UPDATE_ATTRIBUTE':
      return {
        ...state,
        character: {
          ...state.character,
          attributes: {
            ...state.character.attributes,
            [action.payload.attribute]: action.payload.value
          }
        }
      };
    
    case 'UPDATE_RESOURCES':
      return {
        ...state,
        character: {
          ...state.character,
          resources: {
            ...state.character.resources,
            ...action.payload
          }
        }
      };
    
    case 'ADD_CLASS':
      return {
        ...state,
        character: {
          ...state.character,
          classes: [...state.character.classes, action.payload]
        }
      };
    
    case 'UPDATE_CLASS':
      return {
        ...state,
        character: {
          ...state.character,
          classes: state.character.classes.map((cls, index) =>
            index === action.payload.index ? { ...cls, ...action.payload.data } : cls
          )
        }
      };
    
    case 'REMOVE_CLASS':
      return {
        ...state,
        character: {
          ...state.character,
          classes: state.character.classes.filter((_, index) => index !== action.payload)
        }
      };
    
    case 'ADD_TRAIT':
      return {
        ...state,
        character: {
          ...state.character,
          traits: [...state.character.traits, action.payload]
        }
      };
    
    case 'REMOVE_TRAIT':
      return {
        ...state,
        character: {
          ...state.character,
          traits: state.character.traits.filter(trait => trait !== action.payload)
        }
      };
    
    case 'ADD_HEROIC_STYLE':
      return {
        ...state,
        character: {
          ...state.character,
          heroicStyles: [...state.character.heroicStyles, action.payload]
        }
      };
    
    case 'REMOVE_HEROIC_STYLE':
      return {
        ...state,
        character: {
          ...state.character,
          heroicStyles: state.character.heroicStyles.filter(style => style !== action.payload)
        }
      };
    
    case 'SET_COMBAT_STATE':
      return {
        ...state,
        combatState: { ...state.combatState, ...action.payload }
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'RESET_CHARACTER':
      return {
        ...state,
        character: DEFAULT_CHARACTER,
        combatState: {
          hp: { current: 40, max: 40 },
          mp: { current: 40, max: 40 },
          ip: { current: 5, max: 5 },
          conditions: [],
          status: 'healthy'
        }
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  character: DEFAULT_CHARACTER,
  combatState: {
    hp: { current: 40, max: 40 },
    mp: { current: 40, max: 40 },
    ip: { current: 5, max: 5 },
    conditions: [],
    status: 'healthy'
  },
  loading: false,
  error: null
};

// Character Provider Component
export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  // Memoized action creators
  const actions = useMemo(() => ({
    setCharacter: (character) => dispatch({ type: 'SET_CHARACTER', payload: character }),
    updateCharacter: (updates) => dispatch({ type: 'UPDATE_CHARACTER', payload: updates }),
    updateAttribute: (attribute, value) => dispatch({ type: 'UPDATE_ATTRIBUTE', payload: { attribute, value } }),
    updateResources: (resources) => dispatch({ type: 'UPDATE_RESOURCES', payload: resources }),
    addClass: (classData) => dispatch({ type: 'ADD_CLASS', payload: classData }),
    updateClass: (index, data) => dispatch({ type: 'UPDATE_CLASS', payload: { index, data } }),
    removeClass: (index) => dispatch({ type: 'REMOVE_CLASS', payload: index }),
    addTrait: (trait) => dispatch({ type: 'ADD_TRAIT', payload: trait }),
    removeTrait: (trait) => dispatch({ type: 'REMOVE_TRAIT', payload: trait }),
    addHeroicStyle: (style) => dispatch({ type: 'ADD_HEROIC_STYLE', payload: style }),
    removeHeroicStyle: (style) => dispatch({ type: 'REMOVE_HEROIC_STYLE', payload: style }),
    setCombatState: (combatState) => dispatch({ type: 'SET_COMBAT_STATE', payload: combatState }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    resetCharacter: () => dispatch({ type: 'RESET_CHARACTER' })
  }), []);

  // Memoized computed values
  const computed = useMemo(() => ({
    totalLevel: state.character.classes.reduce((total, cls) => total + cls.level, 0),
    
    calculateResources: () => {
      let hp = 40;
      let mp = 40;
      let ip = 5;
      
      state.character.classes.forEach(cls => {
        if (cls.classKey) {
          // This would need to be implemented based on actual class data
          // For now, basic calculation
          hp += cls.level * 2;
          mp += cls.level * 2;
        }
      });
      
      return { hp, mp, ip };
    },
    
    getDiceType: (attributeValue) => {
      const diceMapping = {
        6: 'd6',
        8: 'd8',
        10: 'd10',
        12: 'd12'
      };
      return diceMapping[attributeValue] || 'd6';
    },
    
    getAttributeDiceTypes: () => {
      const diceTypes = {};
      Object.entries(state.character.attributes).forEach(([attr, value]) => {
        diceTypes[attr] = computed.getDiceType(value);
      });
      return diceTypes;
    },
    
    isAttributeDistributionComplete: () => {
      return Object.values(state.character.attributes).every(val => val !== null);
    },
    
    getEquippedWeapons: () => {
      // This would need to be implemented based on inventory system
      return [];
    },
    
    getActiveAbilities: () => {
      const abilities = [];
      state.character.classes.forEach(cls => {
        if (cls.classKey && cls.abilities) {
          Object.entries(cls.abilities).forEach(([key, hasAbility]) => {
            if (hasAbility) {
              abilities.push({ classKey: cls.classKey, abilityKey: key });
            }
          });
        }
      });
      return abilities;
    }
  }), [state.character]);

  // Context value with memoization
  const contextValue = useMemo(() => ({
    ...state,
    actions,
    computed
  }), [state, actions, computed]);

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

// Custom hook for using character context
export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

// Higher-order component for character context
export const withCharacter = (Component) => {
  return function WrappedComponent(props) {
    return (
      <CharacterProvider>
        <Component {...props} />
      </CharacterProvider>
    );
  };
};

export default CharacterContext;