'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { personaService, analysisService } from '@/lib/database'
import { CulturalPersona, CulturalAnalysis } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { 
  User, 
  LogOut, 
  Trash2, 
  Eye, 
  Calendar, 
  TrendingUp,
  Music,
  BookOpen,
  Plane,
  ShoppingBag,
  Utensils,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import AuthGuard from '@/components/AuthGuard'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [personas, setPersonas] = useState<CulturalPersona[]>([])
  const [analyses, setAnalyses] = useState<CulturalAnalysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      const [personasData, analysesData] = await Promise.all([
        personaService.getByUserId(user!.id),
        analysisService.getByUserId(user!.id)
      ])
      setPersonas(personasData)
      setAnalyses(analysesData)
    } catch (error) {
      console.error('Error loading user data:', error)
      toast.error('Failed to load your data')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePersona = async (id: string) => {
    if (confirm('Are you sure you want to delete this persona?')) {
      try {
        await personaService.delete(id)
        setPersonas(personas.filter(p => p.id !== id))
        toast.success('Persona deleted successfully')
      } catch (error) {
        console.error('Error deleting persona:', error)
        toast.error('Failed to delete persona')
      }
    }
  }

  const handleDeleteAnalysis = async (id: string) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      try {
        await analysisService.delete(id)
        setAnalyses(analyses.filter(a => a.id !== id))
        toast.success('Analysis deleted successfully')
      } catch (error) {
        console.error('Error deleting analysis:', error)
        toast.error('Failed to delete analysis')
      }
    }
  }

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case 'cross_domain': return <TrendingUp className="w-5 h-5" />
      case 'brand_alignment': return <ShoppingBag className="w-5 h-5" />
      case 'market_intelligence': return <TrendingUp className="w-5 h-5" />
      case 'cultural_strategist': return <User className="w-5 h-5" />
      default: return <TrendingUp className="w-5 h-5" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-white/70 hover:text-white mb-6 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
              <p className="text-gray-300">Manage your cultural personas and analyses</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user?.email}</h2>
                <p className="text-gray-300">Member since {formatDate(user?.created_at || '')}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cultural Personas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Cultural Personas</h3>
                <Link
                  href="/cultural-persona"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Create New
                </Link>
              </div>

              {personas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">No personas created yet</p>
                  <Link
                    href="/cultural-persona"
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Create your first persona →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {personas.map((persona) => (
                    <div
                      key={persona.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-2">{persona.name}</h4>
                          <p className="text-sm text-gray-300 mb-3">{persona.description}</p>
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(persona.created_at)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={`/cultural-persona/${persona.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeletePersona(persona.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Cultural Analyses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Cultural Analyses</h3>
                <Link
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  New Analysis
                </Link>
              </div>

              {analyses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">No analyses performed yet</p>
                  <Link
                    href="/dashboard"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Start your first analysis →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getAnalysisIcon(analysis.analysis_type)}
                            <h4 className="font-medium text-white capitalize">
                              {analysis.analysis_type.replace('_', ' ')}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">
                            Domains: {analysis.domains.join(', ')}
                          </p>
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(analysis.created_at)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={`/analysis/${analysis.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteAnalysis(analysis.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
} 