'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Brain, Download, Share2, Copy, Twitter, Facebook, Linkedin,
  Music, ShoppingBag, Utensils, MapPin, BookOpen, Sparkles, User, Zap
} from 'lucide-react';
import Link from 'next/link';

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

const personaTypes = [
  {
    id: 'conscious-explorer',
    name: 'The Conscious Explorer',
    description: 'Values authenticity, sustainability, and meaningful experiences',
    traits: ['Eco-conscious', 'Adventure-seeking', 'Community-minded'],
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'urban-trendsetter',
    name: 'The Urban Trendsetter',
    description: 'Always ahead of the curve, embraces innovation and style',
    traits: ['Fashion-forward', 'Tech-savvy', 'Socially connected'],
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'cultural-curator',
    name: 'The Cultural Curator',
    description: 'Deep appreciation for arts, culture, and intellectual pursuits',
    traits: ['Artistic', 'Intellectual', 'Culturally aware'],
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'wellness-enthusiast',
    name: 'The Wellness Enthusiast',
    description: 'Prioritizes health, mindfulness, and balanced living',
    traits: ['Health-focused', 'Mindful', 'Balanced'],
    color: 'from-teal-400 to-green-500'
  },
  {
    id: 'creative-rebel',
    name: 'The Creative Rebel',
    description: 'Challenges norms, embraces individuality and artistic expression',
    traits: ['Individualistic', 'Artistic', 'Non-conformist'],
    color: 'from-red-400 to-orange-500'
  }
];

export default function CulturalPersona() {
  const [preferences, setPreferences] = useState({
    music: '',
    fashion: '',
    food: '',
    travel: '',
    books: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [persona, setPersona] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handlePreferenceChange = (domain: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [domain]: value
    }));
  };

  const generatePersona = async () => {
    setIsGenerating(true);
    try {
      console.log('Sending preferences to API:', preferences);
      
      const response = await fetch('/api/cultural-persona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: preferences
        }),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result);
        setPersona(result);
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to generate persona: ${response.status}`);
      }
    } catch (error) {
      console.error('Error generating persona:', error);
      alert('Failed to generate persona. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (persona?.share_text) {
      await navigator.clipboard.writeText(persona.share_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = persona?.share_text || 'Check out my cultural persona!';
    const url = window.location.href;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const canGenerate = Object.values(preferences).some(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <User className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Cultural Persona Builder
            </h1>
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter 3 things your audience loves and discover your unique cultural persona. 
            Understand your cultural DNA and how it connects across domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Cultural Preferences</h2>
            
            <div className="space-y-6">
              {domains.map((domain) => (
                <div key={domain.id} className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <domain.icon className={`h-4 w-4 ${domain.color}`} />
                    <span>{domain.label} Preferences</span>
                  </label>
                  <input
                    type="text"
                    value={preferences[domain.id as keyof typeof preferences]}
                    onChange={(e) => handlePreferenceChange(domain.id, e.target.value)}
                    placeholder={`e.g., indie folk, vintage fashion, plant-based cuisine...`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={generatePersona}
              disabled={isGenerating || !canGenerate}
              className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <Zap className="h-5 w-5 mr-2 animate-pulse" />
                  Generating Your Cultural DNA...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Discover My Cultural Persona
                </div>
              )}
            </button>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Cultural Persona</h2>

            {!persona ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your cultural preferences and click "Discover My Cultural Persona" to see your results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Persona Header */}
                <div className={`bg-gradient-to-r ${personaTypes.find(p => p.id === persona.persona_type)?.color || 'from-blue-400 to-purple-500'} rounded-xl p-6 text-white`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="h-6 w-6" />
                    <h3 className="text-xl font-bold">{persona.persona_name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{persona.description}</p>
                </div>

                {/* Cultural Traits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Cultural Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.cultural_traits?.map((trait: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Your Preferences</h4>
                  <div className="space-y-2">
                    {Object.entries(persona.preferences || {}).map(([domain, value]) => (
                      <div key={domain} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${domains.find(d => d.id === domain)?.color.replace('text-', 'bg-')}`}></div>
                        <div>
                          <span className="text-sm font-medium text-gray-700 capitalize">{domain}:</span>
                          <span className="text-sm text-gray-600 ml-2">{value as string}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross-Domain Insights */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Cross-Domain Insights</h4>
                  <div className="space-y-2">
                    {persona.cross_domain_insights?.map((insight: string, index: number) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">💡 {insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qloo Affinities */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Qloo Affinities</h4>
                  <div className="space-y-2">
                    {persona.qloo_affinities?.map((affinity: any, index: number) => (
                      <div key={index} className="flex items-center justify-between bg-purple-50 rounded-lg p-3">
                        <span className="text-sm text-purple-800">{affinity.source} → {affinity.target}</span>
                        <span className="text-sm font-semibold text-purple-600">{affinity.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Forecast */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Cultural Forecast</h4>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-800">{persona.cultural_forecast}</p>
                  </div>
                </div>

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Share Your Persona</h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('twitter')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('facebook')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => shareOnSocial('linkedin')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 