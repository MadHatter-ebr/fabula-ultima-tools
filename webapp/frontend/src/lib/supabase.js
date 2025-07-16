import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database table names
export const TABLES = {
  CHARACTERS: 'characters',
  CAMPAIGNS: 'campaigns',
  COMBAT_SESSIONS: 'combat_sessions',
  DICE_ROLLS: 'dice_rolls',
  USER_PROFILES: 'user_profiles'
}

// Authentication helpers
export const authHelpers = {
  signUp: async (email, password) => {
    return await supabase.auth.signUp({ email, password })
  },

  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  signInWithProvider: async (provider) => {
    return await supabase.auth.signInWithOAuth({ provider })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const dbHelpers = {
  // Character operations
  saveCharacter: async (character) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.CHARACTERS)
      .upsert({
        ...character,
        user_id: user.id,
        updated_at: new Date().toISOString()
      })
  },

  loadCharacters: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.CHARACTERS)
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
  },

  deleteCharacter: async (characterId) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.CHARACTERS)
      .delete()
      .eq('id', characterId)
      .eq('user_id', user.id)
  },

  // Campaign operations
  saveCampaign: async (campaign) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.CAMPAIGNS)
      .upsert({
        ...campaign,
        gm_id: user.id,
        updated_at: new Date().toISOString()
      })
  },

  loadCampaigns: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.CAMPAIGNS)
      .select('*')
      .eq('gm_id', user.id)
      .order('updated_at', { ascending: false })
  },

  // Combat session operations
  saveCombatSession: async (session) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.COMBAT_SESSIONS)
      .upsert({
        ...session,
        gm_id: user.id,
        updated_at: new Date().toISOString()
      })
  },

  loadCombatSessions: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.COMBAT_SESSIONS)
      .select('*')
      .eq('gm_id', user.id)
      .order('updated_at', { ascending: false })
  },

  // Dice roll logging
  logDiceRoll: async (rollData) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return // Optional logging

    return await supabase
      .from(TABLES.DICE_ROLLS)
      .insert({
        ...rollData,
        user_id: user.id,
        created_at: new Date().toISOString()
      })
  },

  // User profile operations
  getUserProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.USER_PROFILES)
      .select('*')
      .eq('id', user.id)
      .single()
  },

  updateUserProfile: async (profile) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    return await supabase
      .from(TABLES.USER_PROFILES)
      .upsert({
        ...profile,
        id: user.id,
        updated_at: new Date().toISOString()
      })
  }
}