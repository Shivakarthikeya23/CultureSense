'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, BarChart3, Users, Globe, Zap,
  Search, Filter, Download, Share2, Brain, ArrowRight,
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  ArrowLeftRight, PieChart, Activity, MessageCircle, User, Sparkles
} from 'lucide-react';
import Link from 'next/link';

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

export default function Dashboard() {
  const [crossDomainData, setCrossDomainData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion']);
  const [timeframe, setTimeframe] = useState('3months');
  const [region, setRegion] = useState('global');
  
  // User preferences state
  const [userPreferences, setUserPreferences] = useState({
    music: '',
    fashion: '',
    food: '',
    travel: '',
    books: ''
  });

  const handlePreferenceChange = (domain: string, value: string) => {
    setUserPreferences(prev => ({
      ...prev,
      [domain]: value
    }));
  };

  const loadCrossDomainData = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch('/api/cross-domain-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains: selectedDomains,
          preferences: userPreferences
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCrossDomainData(data);
      } else {
        console.error('Failed to load cross-domain data');
      }
    } catch (error) {
      console.error('Error loading cross-domain data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeftRight className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CultureSense
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="btn-secondary">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cross-Domain Cultural Intelligence
          </h1>
          <p className="text-gray-600">
            Leverage Qloo's unique cross-domain cultural intelligence to understand how your audience's preferences connect across domains.
          </p>
        </div>

        {/* User Input Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Cultural Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {domains.map((domain) => (
              <div key={domain.id} className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <domain.icon className={`h-4 w-4 ${domain.color}`} />
                  <span>{domain.label} Preferences</span>
                </label>
                <input
                  type="text"
                  value={userPreferences[domain.id as keyof typeof userPreferences]}
                  onChange={(e) => handlePreferenceChange(domain.id, e.target.value)}
                  placeholder={`e.g., indie folk, vintage fashion, plant-based cuisine...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
          <button
            onClick={loadCrossDomainData}
            disabled={isLoadingData}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingData ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Cultural Intelligence
              </>
            )}
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cultural Domains
              </label>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => {
                      if (selectedDomains.includes(domain.id)) {
                        setSelectedDomains(selectedDomains.filter(d => d !== domain.id));
                      } else {
                        setSelectedDomains([...selectedDomains, domain.id]);
                      }
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDomains.includes(domain.id)
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <domain.icon className={`h-4 w-4 ${domain.color}`} />
                    <span>{domain.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="global">Global</option>
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="latin-america">Latin America</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cross-Domain Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cross-Domain Affinities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ArrowLeftRight className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Cross-Domain Affinities</h3>
                  <p className="text-sm text-gray-600">Qloo's unique cultural connections</p>
                </div>
              </div>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {isLoadingData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading cultural insights...</p>
                </div>
              ) : crossDomainData?.cross_domain_insights ? (
                crossDomainData.cross_domain_insights.map((affinity: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {affinity.source_domain.charAt(0).toUpperCase() + affinity.source_domain.slice(1)} → {affinity.target_domain.charAt(0).toUpperCase() + affinity.target_domain.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${parseInt(affinity.affinity_score)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{affinity.affinity_score}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{affinity.cultural_pattern}</p>
                    <p className="text-xs text-blue-600 font-medium">{affinity.business_implications?.[0]}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Enter your preferences above and click "Analyze Cultural Intelligence" to see cross-domain insights</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cultural Segments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Cultural Segments</h3>
                  <p className="text-sm text-gray-600">Audience cultural DNA profiles</p>
                </div>
              </div>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {isLoadingData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading cultural segments...</p>
                </div>
              ) : crossDomainData?.cultural_segments ? (
                crossDomainData.cultural_segments.map((segment: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{segment.segment_name}</h4>
                      <span className="text-sm font-medium text-purple-600">{segment.market_size}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Characteristics</p>
                        <p className="text-sm text-gray-700">{segment.characteristics?.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Preferences</p>
                        <p className="text-sm text-gray-700">{segment.preferences?.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Enter your preferences above and click "Analyze Cultural Intelligence" to see cultural segments</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link href="/cross-domain-analysis" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <ArrowLeftRight className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cross-Domain Analysis</h3>
              <p className="text-blue-100 text-sm">
                Analyze how cultural preferences connect across domains using Qloo's unique intelligence
              </p>
            </motion.div>
          </Link>

          <Link href="/brand-culture-alignment" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Brand-Culture Alignment</h3>
              <p className="text-purple-100 text-sm">
                Assess how well your brand aligns with audience cultural preferences
              </p>
            </motion.div>
          </Link>

          <Link href="/cultural-market-intelligence" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Intelligence</h3>
              <p className="text-green-100 text-sm">
                Discover cultural trends and market opportunities using Qloo's cross-domain data
              </p>
            </motion.div>
          </Link>

          <Link href="/cultural-strategist" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <MessageCircle className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cultural Strategist</h3>
              <p className="text-orange-100 text-sm">
                Chat with AI to get personalized cultural insights and strategic recommendations
              </p>
            </motion.div>
          </Link>

          <Link href="/cultural-persona" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <Sparkles className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cultural Persona</h3>
              <p className="text-pink-100 text-sm">
                Build your cultural persona and discover your unique cultural DNA profile
              </p>
            </motion.div>
          </Link>
        </div>

        {/* Qloo Integration Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Powered by Qloo's Cross-Domain Intelligence</h3>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              CultureSense leverages Qloo's unique cultural affinity graph to provide insights that no other platform can offer. 
              Discover how your audience's music taste connects to their fashion choices, food preferences to travel destinations, 
              and much more — all without any personal data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowLeftRight className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Cross-Domain Affinities</h4>
                <p className="text-sm text-gray-600">Discover hidden cultural connections</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Privacy-First</h4>
                <p className="text-sm text-gray-600">Cultural intelligence without personal data</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Semantic Understanding</h4>
                <p className="text-sm text-gray-600">Go beyond demographics to cultural context</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 