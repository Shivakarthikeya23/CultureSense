'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Brain, ArrowLeft, Download, Share2, 
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  BarChart3, Target, Users, Globe
} from 'lucide-react';
import Link from 'next/link';

interface TrendData {
  summary?: string;
  trends?: Array<{
    domain: string;
    trend: string;
    direction: string;
    key_insights?: string[];
    business_implications?: string[];
    confidence_score?: string;
  }>;
  cross_domain_patterns?: Array<{
    pattern: string;
    strength: string;
    business_opportunity: string;
  }>;
  market_recommendations?: string[];
  analysis_metadata?: {
    domains?: string[];
    generated_at?: string;
  };
}

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

export default function TrendsPage() {
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion', 'food']);
  const [timeframe, setTimeframe] = useState('3months');
  const [region, setRegion] = useState('global');
  const [loading, setLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeTrends = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze-trends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains: selectedDomains,
          region,
          timeframe,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze trends');
      }

      const data = await response.json();
      setTrendData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Trend analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDomains.length > 0) {
      analyzeTrends();
    }
  }, [selectedDomains, timeframe, region]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CultureSense
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary inline-flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
              <button className="btn-secondary inline-flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cultural Trends Analysis</h1>
          <p className="text-xl text-gray-600">AI-powered analysis of cultural trends and business implications</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Domains</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
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
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                      selectedDomains.includes(domain.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <domain.icon className={`h-5 w-5 mx-auto mb-1 ${domain.color}`} />
                    <div className="font-medium">{domain.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="input-field w-full"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input-field w-full"
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

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg text-gray-600">Analyzing cultural trends...</span>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8"
          >
            <div className="flex items-center space-x-2 text-red-800">
              <span className="text-lg">⚠️</span>
              <span>Error: {error}</span>
            </div>
            <button 
              onClick={analyzeTrends}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Results */}
        {trendData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Executive Summary */}
            {trendData.summary && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-blue-500" />
                  Executive Summary
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed">{trendData.summary}</p>
                </div>
              </div>
            )}

            {/* Trends Analysis */}
            {trendData.trends && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
                  Cultural Trends Analysis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {trendData.trends.map((trend, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">{trend.domain}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${
                            trend.direction === 'up' ? 'text-green-600' : 
                            trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {trend.trend}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">{trend.direction}</span>
                        </div>
                      </div>
                      
                      {trend.key_insights && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2">Key Insights:</h4>
                          <ul className="space-y-1">
                            {trend.key_insights.map((insight, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {trend.business_implications && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Business Implications:</h4>
                          <ul className="space-y-1">
                            {trend.business_implications.map((implication, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                {implication}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-Domain Patterns */}
            {trendData.cross_domain_patterns && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-purple-500" />
                  Cross-Domain Patterns
                </h2>
                <div className="space-y-4">
                  {trendData.cross_domain_patterns.map((pattern, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{pattern.pattern}</h3>
                        <span className="text-lg font-bold text-purple-600">{pattern.strength}%</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Business Opportunity:</strong> {pattern.business_opportunity}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Market Recommendations */}
            {trendData.market_recommendations && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-orange-500" />
                  Market Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendData.market_recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-100"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-orange-500 text-lg">💡</span>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Metadata */}
            {trendData.analysis_metadata && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <strong>Analysis Details:</strong> Domains: {trendData.analysis_metadata.domains?.join(', ') || 'N/A'} | 
                  Generated: {trendData.analysis_metadata.generated_at ? new Date(trendData.analysis_metadata.generated_at).toLocaleString() : 'N/A'}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 