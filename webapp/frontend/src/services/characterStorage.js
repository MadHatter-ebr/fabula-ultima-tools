import { supabase, dbHelpers, isDemoMode } from '../lib/supabase.js';

class CharacterStorageService {
  constructor() {
    this.useLocalStorage = isDemoMode;
  }

  async saveCharacter(character) {
    const characterToSave = {
      ...character,
      id: character.id || Date.now().toString(),
      name: character.name || 'Unnamed Character',
      updated_at: new Date().toISOString()
    };

    try {
      if (this.useLocalStorage || !(await this.isUserAuthenticated())) {
        return this.saveToLocalStorage(characterToSave);
      } else {
        return this.saveToSupabase(characterToSave);
      }
    } catch (error) {
      console.warn('Supabase save failed, falling back to localStorage:', error);
      return this.saveToLocalStorage(characterToSave);
    }
  }

  async loadCharacters() {
    try {
      if (this.useLocalStorage || !(await this.isUserAuthenticated())) {
        return this.loadFromLocalStorage();
      } else {
        return this.loadFromSupabase();
      }
    } catch (error) {
      console.warn('Supabase load failed, falling back to localStorage:', error);
      return this.loadFromLocalStorage();
    }
  }

  async deleteCharacter(characterId) {
    try {
      if (this.useLocalStorage || !(await this.isUserAuthenticated())) {
        return this.deleteFromLocalStorage(characterId);
      } else {
        return this.deleteFromSupabase(characterId);
      }
    } catch (error) {
      console.warn('Supabase delete failed, falling back to localStorage:', error);
      return this.deleteFromLocalStorage(characterId);
    }
  }

  // Supabase methods
  async saveToSupabase(character) {
    const { data, error } = await dbHelpers.saveCharacter(character);
    if (error) throw error;
    return { success: true, data, storage: 'supabase' };
  }

  async loadFromSupabase() {
    const { data, error } = await dbHelpers.loadCharacters();
    if (error) throw error;
    return { characters: data || [], storage: 'supabase' };
  }

  async deleteFromSupabase(characterId) {
    const { data, error } = await dbHelpers.deleteCharacter(characterId);
    if (error) throw error;
    return { success: true, data, storage: 'supabase' };
  }

  // LocalStorage methods
  saveToLocalStorage(character) {
    const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    const existingIndex = savedCharacters.findIndex(c => c.id === character.id);
    
    if (existingIndex >= 0) {
      savedCharacters[existingIndex] = character;
    } else {
      savedCharacters.push(character);
    }
    
    localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
    return { success: true, data: character, storage: 'localStorage' };
  }

  loadFromLocalStorage() {
    const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    return { characters, storage: 'localStorage' };
  }

  deleteFromLocalStorage(characterId) {
    const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    const filteredCharacters = savedCharacters.filter(c => c.id !== characterId);
    localStorage.setItem('savedCharacters', JSON.stringify(filteredCharacters));
    return { success: true, storage: 'localStorage' };
  }

  // Helper methods
  async isUserAuthenticated() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user !== null;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      return null;
    }
  }

  getStorageStatus() {
    return this.isUserAuthenticated().then(isAuth => ({
      isAuthenticated: isAuth,
      isDemoMode: this.useLocalStorage,
      preferredStorage: isAuth && !this.useLocalStorage ? 'supabase' : 'localStorage'
    }));
  }
}

export const characterStorage = new CharacterStorageService();
export default characterStorage;