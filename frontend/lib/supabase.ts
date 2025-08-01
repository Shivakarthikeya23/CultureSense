import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xavsprnmcrfxapryyxxz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdnNwcm5tY3JmeGFwcnl5eHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTM2NjgsImV4cCI6MjA2OTU2OTY2OH0.RSs5DRVHuchovEeUVgkMp2HXW3iYxSj_0IbCU0FBzfs'

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