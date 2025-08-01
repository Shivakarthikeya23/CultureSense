'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Brain, ArrowRight, Download, Share2,
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  BarChart3, PieChart, Activity, Loader2, TrendingUp, Globe
} from 'lucide-react';
import Link from 'next/link';

// TypeScript interfaces for the market intelligence result
interface CulturalTrend {
  domain: string;
  trend: string;
  direction: 'up' | 'down' | 'stable';
  cross_domain_impact: string;
  business_opportunity: string;
  qloo_insight: string;
}

interface CrossDomainPattern {
  pattern: string;
  strength: string;
  business_implication: string;
  qloo_evidence: string;
}

interface MarketIntelligenceResult {
  cultural_trends: CulturalTrend[];
  cross_domain_patterns: CrossDomainPattern[];
  market_recommendations: string[];
}

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

const regions = [
  { id: 'global', label: 'Global', icon: Globe },
  { id: 'north-america', label: 'North America' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia' },
  { id: 'latin-america', label: 'Latin America' },
];

const timeframes = [
  { id: '1month', label: 'Last Month' },
  { id: '3months', label: 'Last 3 Months' },
  { id: '6months', label: 'Last 6 Months' },
  { id: '1year', label: 'Last Year' },
];

export default function CulturalMarketIntelligence() {
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion', 'food']);
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [isLoading, setIsLoading] = useState(false);
  const [marketResult, setMarketResult] = useState<MarketIntelligenceResult | null>(null);

  const handleDomainToggle = (domainId: string) => {
    if (selectedDomains.includes(domainId)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domainId));
    } else {
      setSelectedDomains([...selectedDomains, domainId]);
    }
  };

  const generateMarketIntelligence = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cultural-market-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains: selectedDomains,
          region: selectedRegion,
          timeframe: selectedTimeframe
        }),
      });

      if (response.ok) {
        const result: MarketIntelligenceResult = await response.json();
        setMarketResult(result);
      } else {
        console.error('Market intelligence generation failed');
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
            Cultural Market Intelligence
          </h1>
          <p className="text-gray-600">
            Discover cultural trends and market opportunities using Qloo's cross-domain data
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Analysis Configuration</h2>

            {/* Domain Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cultural Domains
              </label>
              <div className="grid grid-cols-2 gap-3">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainToggle(domain.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDomains.includes(domain.id)
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <domain.icon className={`h-4 w-4 ${domain.color}`} />
                    <span>{domain.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Region Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeframes.map((timeframe) => (
                  <option key={timeframe.id} value={timeframe.id}>
                    {timeframe.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateMarketIntelligence}
              disabled={isLoading || selectedDomains.length === 0}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Market Intelligence...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Generate Market Intelligence
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Intelligence Results</h2>

            {!marketResult ? (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Configure your analysis parameters and click "Generate Market Intelligence" to see results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cultural Trends */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Trends</h3>
                  <div className="space-y-3">
                    {(marketResult?.cultural_trends || []).map((trend: CulturalTrend, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{trend.domain}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-semibold ${
                              trend.direction === 'up' ? 'text-green-600' : 
                              trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {trend.trend}
                            </span>
                            <TrendingUp className={`h-4 w-4 ${
                              trend.direction === 'up' ? 'text-green-600' : 
                              trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`} />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{trend.cross_domain_impact}</p>
                        <p className="text-xs text-blue-600 mb-2">
                          <strong>Business Opportunity:</strong> {trend.business_opportunity}
                        </p>
                        <p className="text-xs text-green-600">
                          <strong>Qloo Insight:</strong> {trend.qloo_insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross-Domain Patterns */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cross-Domain Patterns</h3>
                  <div className="space-y-3">
                    {marketResult.cross_domain_patterns?.map((pattern: CrossDomainPattern, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">Pattern</span>
                          <span className="text-sm font-semibold text-green-600">{pattern.strength}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{pattern.pattern}</p>
                        <p className="text-xs text-blue-600 mb-2">
                          <strong>Business Implication:</strong> {pattern.business_implication}
                        </p>
                        <p className="text-xs text-green-600">
                          <strong>Qloo Evidence:</strong> {pattern.qloo_evidence}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Recommendations</h3>
                  <div className="space-y-2">
                    {marketResult.market_recommendations?.map((recommendation: string, index: number) => (
                      <div key={index} className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-green-800">💡 {recommendation}</p>
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