'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, TrendingUp, Target, BarChart3, Users, Globe, Zap, Music, ShoppingBag, Utensils, MapPin, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CultureSense
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Unlock Cross-Domain
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cultural Intelligence
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              CultureSense leverages Qloo's unique cross-domain cultural intelligence to help businesses understand how their customers' music taste connects to fashion choices, food preferences, and travel decisions — without any personal data.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <Link href="/dashboard" className="btn-primary inline-flex items-center space-x-2 text-lg">
                <span>Access Cultural Intelligence</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Qloo-Centric Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <Music className="h-8 w-8 text-blue-500 mr-2" />
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <ShoppingBag className="h-8 w-8 text-purple-500 ml-2" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross-Domain Connections</h3>
                  <p className="text-gray-600">Discover how music taste connects to fashion choices</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <Utensils className="h-8 w-8 text-orange-500 mr-2" />
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <MapPin className="h-8 w-8 text-green-500 ml-2" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Affinities</h3>
                  <p className="text-gray-600">Map food preferences to travel destinations</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-indigo-500 mr-2" />
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <Globe className="h-8 w-8 text-blue-500 ml-2" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Alignment</h3>
                  <p className="text-gray-600">Align your brand with audience cultural DNA</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <Zap className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy-First</h3>
                  <p className="text-gray-600">Cultural intelligence without personal data</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Business Value Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Qloo-Powered Business Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage Qloo's unique cross-domain cultural intelligence to make data-driven business decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8"
            >
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Teams</h3>
              <p className="text-gray-700 mb-4">Cross-domain cultural analysis for campaign planning and audience targeting</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Your indie music fans also love sustainable fashion"</li>
                <li>• Cross-domain campaign strategies</li>
                <li>• Cultural risk assessment</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8"
            >
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Teams</h3>
              <p className="text-gray-700 mb-4">Understanding audience cultural preferences for feature development</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Plant-based food lovers prefer eco-tourism"</li>
                <li>• Cultural preference mapping</li>
                <li>• Cross-domain feature demand</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8"
            >
              <Globe className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Brand Managers</h3>
              <p className="text-gray-700 mb-4">Cross-domain affinity mapping for brand positioning</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Vintage fashion fans love indie music"</li>
                <li>• Brand-culture alignment scoring</li>
                <li>• Cultural authenticity analysis</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8"
            >
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Creators</h3>
              <p className="text-gray-700 mb-4">Cultural intelligence for content strategy and creation</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Fusion food enthusiasts love travel content"</li>
                <li>• Cross-domain content themes</li>
                <li>• Cultural trend integration</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8"
            >
              <TrendingUp className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Researchers</h3>
              <p className="text-gray-700 mb-4">Privacy-first consumer preference analysis</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cross-domain cultural segments</li>
                <li>• Preference pattern analysis</li>
                <li>• Cultural market opportunities</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8"
            >
              <Brain className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-700 mb-4">Qloo + LLM integration for cultural intelligence</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cross-domain cultural analysis</li>
                <li>• Semantic cultural understanding</li>
                <li>• Predictive cultural insights</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Qloo Integration Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Qloo's Cross-Domain Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CultureSense leverages Qloo's unique cultural affinity graph to provide insights that no other platform can offer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Qloo Makes CultureSense Unique
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cross-Domain Affinities</h4>
                    <p className="text-gray-600">Discover how music taste connects to fashion choices, food preferences to travel destinations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy-First Approach</h4>
                    <p className="text-gray-600">Cultural intelligence without personal data - Qloo's unique advantage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Semantic Cultural Understanding</h4>
                    <p className="text-gray-600">Go beyond demographics to understand cultural context and meaning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-Time Cultural Graph</h4>
                    <p className="text-gray-600">Access the world's most advanced graph of cultural and consumer preferences</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Example: Cross-Domain Cultural Analysis</h4>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Input:</strong> "Our audience loves indie music and sustainable fashion"
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-800">
                    <strong>Qloo Analysis:</strong> "Indie music fans show 87% affinity with vintage aesthetics and 92% correlation with plant-based food preferences"
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Business Insight:</strong> "Partner with indie artists and sustainable food brands for authentic connections"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 