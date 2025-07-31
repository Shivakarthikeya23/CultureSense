'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Brain, ArrowRight, Download, Share2,
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  ArrowLeftRight, PieChart, Activity, Loader2
} from 'lucide-react';
import Link from 'next/link';

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

export default function CrossDomainAnalysis() {
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion']);
  const [preferences, setPreferences] = useState({
    music: ['indie', 'alternative'],
    fashion: ['vintage', 'sustainable'],
    food: ['plant-based', 'fusion'],
    travel: ['eco-tourism', 'urban'],
    books: ['self-help', 'literary fiction']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleDomainToggle = (domainId: string) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domainId));
    } else {
      setSelectedDomains([...selectedDomains, domainId]);
    }
  };

  const handlePreferenceChange = (domain: string, value: string, index: number) => {
    const newPreferences = { ...preferences };
    if (!newPreferences[domain]) {
      newPreferences[domain] = [];
    }
    newPreferences[domain][index] = value;
    setPreferences(newPreferences);
  };

  const analyzeCrossDomain = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cross-domain-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains: selectedDomains,
          preferences: preferences
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
      } else {
        console.error('Analysis failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cross-Domain Cultural Analysis
          </h1>
          <p className="text-gray-600">
            Analyze how cultural preferences connect across domains using Qloo's unique intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Configuration</h2>

            {/* Domain Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Cultural Domains
              </label>
              <div className="grid grid-cols-2 gap-3">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainToggle(domain.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-colors ${
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

            {/* Preferences Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cultural Preferences
              </label>
              <div className="space-y-4">
                {selectedDomains.map((domainId) => {
                  const domain = domains.find(d => d.id === domainId);
                  return (
                    <div key={domainId} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {domain?.label} Preferences
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={preferences[domainId]?.[0] || ''}
                          onChange={(e) => handlePreferenceChange(domainId, e.target.value, 0)}
                          placeholder={`e.g., indie, alternative`}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="text"
                          value={preferences[domainId]?.[1] || ''}
                          onChange={(e) => handlePreferenceChange(domainId, e.target.value, 1)}
                          placeholder={`e.g., vintage, sustainable`}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={analyzeCrossDomain}
              disabled={isLoading || selectedDomains.length < 2}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ArrowLeftRight className="h-5 w-5 mr-2" />
                  Analyze Cross-Domain Connections
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>

            {!analysisResult ? (
              <div className="text-center py-12">
                <ArrowLeftRight className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Configure your analysis and click "Analyze Cross-Domain Connections" to see results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cross-Domain Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cross-Domain Insights</h3>
                  <div className="space-y-3">
                    {analysisResult.cross_domain_insights?.map((insight: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {insight.source_domain} → {insight.target_domain}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">{insight.affinity_score}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{insight.cultural_pattern}</p>
                        <div className="space-y-1">
                          {insight.business_implications?.map((implication: string, idx: number) => (
                            <p key={idx} className="text-xs text-blue-600">• {implication}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Segments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Segments</h3>
                  <div className="space-y-3">
                    {analysisResult.cultural_segments?.map((segment: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{segment.segment_name}</h4>
                          <span className="text-sm font-medium text-purple-600">{segment.market_size}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Characteristics:</strong> {segment.characteristics?.join(', ')}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Preferences:</strong> {segment.preferences?.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qloo Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Qloo Insights</h3>
                  <div className="space-y-2">
                    {analysisResult.qloo_insights?.map((insight: string, index: number) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">{insight}</p>
                      </div>
                    ))}
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