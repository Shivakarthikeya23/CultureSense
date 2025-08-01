import { supabase, CulturalPersona, CulturalAnalysis } from './supabase'

// Cultural Persona operations
export const personaService = {
  async create(persona: Omit<CulturalPersona, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('cultural_personas')
      .insert([persona])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('cultural_personas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('cultural_personas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<CulturalPersona>) {
    const { data, error } = await supabase
      .from('cultural_personas')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('cultural_personas')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Cultural Analysis operations
export const analysisService = {
  async create(analysis: Omit<CulturalAnalysis, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('cultural_analyses')
      .insert([analysis])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('cultural_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getByType(userId: string, analysisType: CulturalAnalysis['analysis_type']) {
    const { data, error } = await supabase
      .from('cultural_analyses')
      .select('*')
      .eq('user_id', userId)
      .eq('analysis_type', analysisType)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('cultural_analyses')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('cultural_analyses')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// User profile operations
export const userService = {
  async createProfile(userId: string, email: string) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, email }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
} 