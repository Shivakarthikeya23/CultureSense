import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface CulturalPersona {
  id: string
  user_id: string
  name: string
  description: string
  preferences: {
    music: string[]
    fashion: string[]
    food: string[]
    travel: string[]
    books: string[]
  }
  analysis_results: any
  created_at: string
  updated_at: string
}

export interface CulturalAnalysis {
  id: string
  user_id: string
  analysis_type: 'cross_domain' | 'brand_alignment' | 'market_intelligence' | 'cultural_strategist'
  domains: string[]
  preferences: any
  results: any
  created_at: string
  updated_at: string
} 