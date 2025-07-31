'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Brain, ArrowLeft, Download, Share2, 
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  Users, BarChart3, TrendingUp, Zap
} from 'lucide-react';
import Link from 'next/link';

const domains = [
  { id: 'music', label: 'Music', icon: Music, color: 'text-blue-500' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, color: 'text-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'travel', label: 'Travel', icon: MapPin, color: 'text-green-500' },
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-indigo-500' },
];

interface CampaignData {
  campaign_strategy?: {
    overall_approach: string;
    cultural_angle: string;
    key_messaging: string[];
    tone: string;
  };
  audience_insights?: {
    cultural_profile: string;
    preferences: string[];
    values: string[];
    behaviors: string[];
  };
  channel_recommendations?: Array<{
    channel: string;
    rationale: string;
    content_type: string;
    timing: string;
  }>;
  content_strategy?: {
    themes: string[];
    formats: string[];
    cultural_elements: string[];
    risk_considerations: string[];
  };
  success_metrics?: string[];
  timeline_recommendations?: {
    optimal_launch: string;
    campaign_duration: string;
    key_milestones: string[];
  };
  analysis_metadata?: {
    brand?: string;
    target_audience?: string;
    domains?: string[];
    generated_at?: string;
  };
}

export default function CampaignsPage() {
  const [brand, setBrand] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [selectedDomains, setSelectedDomains] = useState(['music', 'fashion']);
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateCampaign = async () => {
    if (!brand.trim() || !targetAudience.trim() || selectedDomains.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/campaign-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: brand.trim(),
          targetAudience: targetAudience.trim(),
          domains: selectedDomains,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate campaign intelligence');
      }

      const data = await response.json();
      setCampaignData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Campaign generation error:', err);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Intelligence</h1>
          <p className="text-xl text-gray-600">Generate culturally-informed marketing strategies powered by AI</p>
        </motion.div>

        {/* Campaign Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Parameters</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand/Company Name *
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Nike, Starbucks, Tesla"
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience *
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Gen Z urban professionals, eco-conscious millennials"
                className="input-field w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cultural Domains *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedDomains.includes(domain.id)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <domain.icon className={`h-6 w-6 mx-auto mb-2 ${domain.color}`} />
                  <div className="text-sm font-medium">{domain.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={generateCampaign}
              disabled={loading}
              className="btn-primary inline-flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Campaign...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Generate Campaign Intelligence</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

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
          </motion.div>
        )}

        {/* Results */}
        {campaignData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Campaign Strategy */}
            {campaignData.campaign_strategy && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-purple-500" />
                  Campaign Strategy
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Overall Approach</h3>
                    <p className="text-gray-600 mb-4">{campaignData.campaign_strategy.overall_approach}</p>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">Cultural Angle</h3>
                    <p className="text-gray-600 mb-4">{campaignData.campaign_strategy.cultural_angle}</p>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">Brand Tone</h3>
                    <p className="text-gray-600">{campaignData.campaign_strategy.tone}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Key Messaging</h3>
                    <ul className="space-y-2">
                      {campaignData.campaign_strategy.key_messaging.map((message, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span className="text-gray-600">{message}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Audience Insights */}
            {campaignData.audience_insights && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-500" />
                  Audience Insights
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cultural Profile</h3>
                    <p className="text-gray-600 mb-4">{campaignData.audience_insights.cultural_profile}</p>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">Core Values</h3>
                    <ul className="space-y-1">
                      {campaignData.audience_insights.values.map((value, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-gray-600">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cultural Preferences</h3>
                    <ul className="space-y-1 mb-4">
                      {campaignData.audience_insights.preferences.map((pref, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-gray-600">{pref}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">Behaviors</h3>
                    <ul className="space-y-1">
                      {campaignData.audience_insights.behaviors.map((behavior, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-gray-600">{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Channel Recommendations */}
            {campaignData.channel_recommendations && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-green-500" />
                  Channel Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaignData.channel_recommendations.map((channel, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-100"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{channel.channel}</h3>
                      <p className="text-sm text-gray-600 mb-2">{channel.rationale}</p>
                      <div className="text-xs text-gray-500">
                        <div><strong>Content:</strong> {channel.content_type}</div>
                        <div><strong>Timing:</strong> {channel.timing}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Strategy */}
            {campaignData.content_strategy && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-orange-500" />
                  Content Strategy
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Content Themes</h3>
                    <ul className="space-y-1 mb-4">
                      {campaignData.content_strategy.themes.map((theme, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span className="text-gray-600">{theme}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">Content Formats</h3>
                    <ul className="space-y-1">
                      {campaignData.content_strategy.formats.map((format, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span className="text-gray-600">{format}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cultural Elements</h3>
                    <ul className="space-y-1 mb-4">
                      {campaignData.content_strategy.cultural_elements.map((element, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span className="text-gray-600">{element}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">Risk Considerations</h3>
                    <ul className="space-y-1">
                      {campaignData.content_strategy.risk_considerations.map((risk, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">⚠</span>
                          <span className="text-gray-600">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Success Metrics & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {campaignData.success_metrics && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-indigo-500" />
                    Success Metrics
                  </h2>
                  <ul className="space-y-2">
                    {campaignData.success_metrics.map((metric, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">📊</span>
                        <span className="text-gray-600">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {campaignData.timeline_recommendations && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
                    Timeline Recommendations
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Optimal Launch</h3>
                      <p className="text-gray-600">{campaignData.timeline_recommendations.optimal_launch}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Campaign Duration</h3>
                      <p className="text-gray-600">{campaignData.timeline_recommendations.campaign_duration}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Key Milestones</h3>
                      <ul className="space-y-1">
                        {campaignData.timeline_recommendations.key_milestones.map((milestone, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">🎯</span>
                            <span className="text-gray-600">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Metadata */}
            {campaignData.analysis_metadata && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <strong>Analysis Details:</strong> Brand: {campaignData.analysis_metadata.brand || 'N/A'} | 
                  Target: {campaignData.analysis_metadata.target_audience || 'N/A'} | 
                  Domains: {campaignData.analysis_metadata.domains?.join(', ') || 'N/A'} | 
                  Generated: {campaignData.analysis_metadata.generated_at ? new Date(campaignData.analysis_metadata.generated_at).toLocaleString() : 'N/A'}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 