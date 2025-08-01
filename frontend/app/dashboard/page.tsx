'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Target, BarChart3, Users, Globe, Zap,
  Search, Filter, Download, Share2, Brain, ArrowRight,
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  ArrowLeftRight, PieChart, Activity, MessageCircle, User, Sparkles,
  FileText, Image, Copy, Check, Star, Award, Rocket, Shield,
  Play, ExternalLink, ArrowUpRight, Eye, Settings, Bell
} from 'lucide-react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500', gradient: 'from-blue-500 to-purple-600' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500', gradient: 'from-purple-500 to-pink-600' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500', gradient: 'from-orange-500 to-red-600' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500', gradient: 'from-green-500 to-teal-600' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500', gradient: 'from-indigo-500 to-purple-600' },
];

export default function Dashboard() {
  const [crossDomainData, setCrossDomainData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion']);
  const [timeframe, setTimeframe] = useState('3months');
  const [region, setRegion] = useState('global');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
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

  // Export functionality
  const exportToPDF = async () => {
    if (!crossDomainData) {
      alert('No data to export. Please run an analysis first.');
      return;
    }

    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: crossDomainData,
          preferences: userPreferences,
          domains: selectedDomains,
          timeframe,
          region
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `culturesense-analysis-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to export PDF. Please try again.');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  const exportToCSV = () => {
    if (!crossDomainData) {
      alert('No data to export. Please run an analysis first.');
      return;
    }

    try {
      let csvContent = 'Domain,Affinity Score,Cultural Pattern,Business Implications\n';
      
      if (crossDomainData.cross_domain_insights) {
        crossDomainData.cross_domain_insights.forEach((insight: any) => {
          csvContent += `"${insight.source_domain} → ${insight.target_domain}","${insight.affinity_score}","${insight.cultural_pattern}","${insight.business_implications?.[0] || ''}"\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `culturesense-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('CSV export error:', error);
      alert('CSV export failed. Please try again.');
    }
  };

  // Share functionality
  const shareAnalysis = async () => {
    if (!crossDomainData) {
      alert('No analysis to share. Please run an analysis first.');
      return;
    }

    const shareData = {
      title: 'CultureSense Analysis',
      text: `Check out my cultural intelligence analysis powered by Qloo's cross-domain insights!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Share failed:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    const shareText = `🔍 CultureSense Analysis Results

Cross-Domain Cultural Intelligence powered by Qloo's unique insights.

${crossDomainData?.cross_domain_insights?.slice(0, 3).map((insight: any) => 
  `• ${insight.source_domain} → ${insight.target_domain}: ${insight.affinity_score}% affinity`
).join('\n')}

Discover your cultural intelligence at: ${window.location.origin}

#CultureSense #CulturalIntelligence #QlooAPI`;

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Header */}
        <motion.div 
          className="glass border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                  <ArrowLeftRight className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <Brain className="h-8 w-8 text-blue-400 animate-pulse-glow" />
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50"></div>
                  </div>
                  <span className="text-2xl font-bold text-gradient">
                    CultureSense
                  </span>
                </motion.div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Export Dropdown */}
                <div className="relative group">
                  <motion.button 
                    className="btn-secondary flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </motion.button>
                  <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <motion.button
                        onClick={exportToPDF}
                        className="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 flex items-center space-x-2 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Export as PDF</span>
                      </motion.button>
                      <motion.button
                        onClick={exportToCSV}
                        className="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 flex items-center space-x-2 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <Image className="h-4 w-4" />
                        <span>Export as CSV</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                {/* Share Button */}
                <motion.button 
                  onClick={shareAnalysis}
                  className="btn-secondary flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </>
                  )}
                </motion.button>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <motion.button 
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className="h-5 w-5 text-white/80" />
                  </motion.button>
                  <motion.button 
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="h-5 w-5 text-white/80" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Cross-Domain Cultural Intelligence
                </h1>
                <p className="text-white/70 text-lg">
                  Leverage Qloo's unique cross-domain cultural intelligence to understand how your audience's preferences connect across domains.
                </p>
              </div>
              <motion.div 
                className="flex items-center space-x-2 px-4 py-2 glass rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white/80 text-sm">Premium</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            className="flex space-x-1 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {['overview', 'analysis', 'insights', 'reports'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* User Input Section */}
          <motion.div
            className="card-hover mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Cultural Preferences</h2>
              <motion.button
                onClick={loadCrossDomainData}
                disabled={isLoadingData}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoadingData ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    <span>Analyze Cultural Intelligence</span>
                  </>
                )}
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {domains.map((domain) => (
                <motion.div 
                  key={domain.id} 
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <label className="flex items-center space-x-2 text-sm font-medium text-white/80">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${domain.gradient} flex items-center justify-center`}>
                      <domain.icon className="h-4 w-4 text-white" />
                    </div>
                    <span>{domain.label} Preferences</span>
                  </label>
                  <input
                    type="text"
                    value={userPreferences[domain.id as keyof typeof userPreferences]}
                    onChange={(e) => handlePreferenceChange(domain.id, e.target.value)}
                    placeholder={`e.g., indie folk, vintage fashion, plant-based cuisine...`}
                    className="input-field"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="card-hover mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Cultural Domains
                </label>
                <div className="flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <motion.button
                      key={domain.id}
                      onClick={() => {
                        if (selectedDomains.includes(domain.id)) {
                          setSelectedDomains(selectedDomains.filter(d => d !== domain.id));
                        } else {
                          setSelectedDomains([...selectedDomains, domain.id]);
                        }
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedDomains.includes(domain.id)
                          ? `bg-gradient-to-r ${domain.gradient} text-white shadow-lg`
                          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <domain.icon className="h-4 w-4" />
                      <span>{domain.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="input-field"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="input-field"
                >
                  <option value="global">Global</option>
                  <option value="north-america">North America</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="latin-america">Latin America</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Analysis Results */}
          <AnimatePresence mode="wait">
            {crossDomainData && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
              >
                {/* Cross-Domain Affinities */}
                <motion.div
                  className="card-hover"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <ArrowLeftRight className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Cross-Domain Affinities</h3>
                        <p className="text-white/60 text-sm">Qloo's unique cultural connections</p>
                      </div>
                    </div>
                    <PieChart className="h-5 w-5 text-white/40" />
                  </div>

                  <div className="space-y-4">
                    {crossDomainData.cross_domain_insights?.map((affinity: any, index: number) => (
                      <motion.div 
                        key={index} 
                        className="glass rounded-lg p-4 border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-white">
                              {affinity.source_domain.charAt(0).toUpperCase() + affinity.source_domain.slice(1)} → {affinity.target_domain.charAt(0).toUpperCase() + affinity.target_domain.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${parseInt(affinity.affinity_score)}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              ></motion.div>
                            </div>
                            <span className="text-sm font-semibold text-white">{affinity.affinity_score}</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-2">{affinity.cultural_pattern}</p>
                        <p className="text-xs text-blue-400 font-medium">{affinity.business_implications?.[0]}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Cultural Segments */}
                <motion.div
                  className="card-hover"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Cultural Segments</h3>
                        <p className="text-white/60 text-sm">Audience cultural DNA profiles</p>
                      </div>
                    </div>
                    <Activity className="h-5 w-5 text-white/40" />
                  </div>

                  <div className="space-y-4">
                    {crossDomainData.cultural_segments?.map((segment: any, index: number) => (
                      <motion.div 
                        key={index} 
                        className="glass rounded-lg p-4 border border-white/10"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">{segment.segment_name}</h4>
                          <span className="text-sm font-medium text-purple-400">{segment.market_size}</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-white/50 uppercase tracking-wide">Characteristics</p>
                            <p className="text-sm text-white/80">{segment.characteristics?.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/50 uppercase tracking-wide">Preferences</p>
                            <p className="text-sm text-white/80">{segment.preferences?.join(', ')}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              {
                title: "Cross-Domain Analysis",
                description: "Analyze how cultural preferences connect across domains using Qloo's unique intelligence",
                icon: ArrowLeftRight,
                gradient: "from-blue-500 to-blue-600",
                href: "/cross-domain-analysis"
              },
              {
                title: "Brand-Culture Alignment",
                description: "Assess how well your brand aligns with audience cultural preferences",
                icon: Target,
                gradient: "from-purple-500 to-purple-600",
                href: "/brand-culture-alignment"
              },
              {
                title: "Market Intelligence",
                description: "Discover cultural trends and market opportunities using Qloo's cross-domain data",
                icon: BarChart3,
                gradient: "from-green-500 to-green-600",
                href: "/cultural-market-intelligence"
              },
              {
                title: "Cultural Strategist",
                description: "Chat with AI to get personalized cultural insights and strategic recommendations",
                icon: MessageCircle,
                gradient: "from-orange-500 to-orange-600",
                href: "/cultural-strategist"
              },
              {
                title: "Cultural Persona",
                description: "Build your cultural persona and discover your unique cultural DNA profile",
                icon: Sparkles,
                gradient: "from-pink-500 to-pink-600",
                href: "/cultural-persona"
              }
            ].map((action, index) => (
              <Link key={index} href={action.href} className="group">
                <motion.div
                  className="card-hover h-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Qloo Integration Highlight */}
          <motion.div
            className="mt-12 card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Powered by Qloo's Cross-Domain Intelligence</h3>
            </div>
            <p className="text-white/70 text-lg max-w-4xl mx-auto mb-8">
              CultureSense leverages Qloo's unique cultural affinity graph to provide insights that no other platform can offer. 
              Discover how your audience's music taste connects to their fashion choices, food preferences to travel destinations, 
              and much more — all without any personal data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: ArrowLeftRight,
                  title: "Cross-Domain Affinities",
                  description: "Discover hidden cultural connections"
                },
                {
                  icon: Zap,
                  title: "Privacy-First",
                  description: "Cultural intelligence without personal data"
                },
                {
                  icon: Globe,
                  title: "Semantic Understanding",
                  description: "Go beyond demographics to cultural context"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
} 