'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Brain, ArrowRight, Download, Share2,
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  Target, PieChart, Activity, Loader2, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// TypeScript interfaces for the alignment result
interface BrandCultureProfile {
  alignment_score: number;
  brand_identity: string;
  audience_cultural_dna: string;
  cultural_gaps: string[];
}

interface CrossDomainOpportunity {
  domain: string;
  opportunity: string;
  qloo_insight: string;
  implementation: string;
}

interface AlignmentResult {
  brand_culture_profile: BrandCultureProfile;
  cross_domain_opportunities: CrossDomainOpportunity[];
  qloo_recommendations: string[];
}

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

export default function BrandCultureAlignment() {
  const [brand, setBrand] = useState('Nike');
  const [targetAudience, setTargetAudience] = useState('Young professionals aged 25-35');
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion', 'travel']);
  const [isLoading, setIsLoading] = useState(false);
  const [alignmentResult, setAlignmentResult] = useState<AlignmentResult | null>(null);

  const handleDomainToggle = (domainId: string) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domainId));
    } else {
      setSelectedDomains([...selectedDomains, domainId]);
    }
  };

  const analyzeAlignment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/brand-culture-alignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: brand,
          targetAudience: targetAudience,
          domains: selectedDomains
        }),
      });

      if (response.ok) {
        const result: AlignmentResult = await response.json();
        setAlignmentResult(result);
      } else {
        console.error('Alignment analysis failed');
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
            Brand-Culture Alignment
          </h1>
          <p className="text-gray-600">
            Assess how well your brand aligns with audience cultural preferences
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Brand Configuration</h2>

            {/* Brand Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Nike, Apple, Starbucks"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Target Audience */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <textarea
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Describe your target audience..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Domain Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cultural Domains to Analyze
              </label>
              <div className="grid grid-cols-2 gap-3">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainToggle(domain.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDomains.includes(domain.id)
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <domain.icon className={`h-4 w-4 ${domain.color}`} />
                    <span>{domain.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={analyzeAlignment}
              disabled={isLoading || !brand || !targetAudience || selectedDomains.length === 0}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing Alignment...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Target className="h-5 w-5 mr-2" />
                  Analyze Brand-Culture Alignment
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Alignment Results</h2>

            {!alignmentResult ? (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Configure your brand and target audience, then click "Analyze Brand-Culture Alignment" to see results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Brand-Culture Profile */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Brand-Culture Profile</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">Alignment Score</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {alignmentResult.brand_culture_profile?.alignment_score}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${alignmentResult.brand_culture_profile?.alignment_score || 0}%` }}
                      ></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Brand Identity:</strong> {alignmentResult.brand_culture_profile?.brand_identity}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Audience Cultural DNA:</strong> {alignmentResult.brand_culture_profile?.audience_cultural_dna}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cultural Gaps */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Gaps</h3>
                  <div className="space-y-2">
                    {alignmentResult.brand_culture_profile?.cultural_gaps?.map((gap, index) => (
                      <div key={index} className="bg-red-50 rounded-lg p-3">
                        <p className="text-sm text-red-800">⚠️ {gap}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross-Domain Opportunities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cross-Domain Opportunities</h3>
                  <div className="space-y-3">
                    {alignmentResult.cross_domain_opportunities?.map((opportunity: CrossDomainOpportunity, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{opportunity.domain}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Opportunity</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{opportunity.opportunity}</p>
                        <p className="text-xs text-blue-600 mb-2">
                          <strong>Qloo Insight:</strong> {opportunity.qloo_insight}
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Implementation:</strong> {opportunity.implementation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qloo Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Qloo Recommendations</h3>
                  <div className="space-y-2">
                    {alignmentResult.qloo_recommendations?.map((recommendation, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">💡 {recommendation}</p>
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