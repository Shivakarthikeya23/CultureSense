'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Mail, Music, Copy, Check, Sparkles, Heart, Globe, BookOpen, MapPin, ShoppingBag, Utensils } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface CulturalProfile {
  type: string;
  tagline: string;
  description: string;
  insights: string[];
  recommendations: {
    music: string[];
    books: string[];
    travel: string[];
    fashion: string[];
    food: string[];
  };
}

const categoryIcons = {
  music: Music,
  books: BookOpen,
  travel: MapPin,
  fashion: ShoppingBag,
  food: Utensils,
};

export default function ResultsPage() {
  const [profile, setProfile] = useState<CulturalProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('culturalProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      // Redirect to input if no profile exists
      window.location.href = '/input';
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
                  title: 'My CultureSense Profile',
        text: `Check out my CultureSense profile: ${profile?.type} - ${profile?.tagline}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/send-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, profile }),
      });

      if (response.ok) {
        toast.success('Profile sent to your email!');
        setShowEmailForm(false);
        setEmail('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      toast.error('Failed to send profile to email');
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cultural-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cultural-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Your CultureSense Profile
              </h1>
              <p className="text-gray-600">
                Discover your unique cultural personality and personalized recommendations
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={handleShare}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button
                onClick={() => setShowEmailForm(true)}
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-cultural-500 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.type}</h2>
            <p className="text-lg text-cultural-600 font-medium mb-4">{profile.tagline}</p>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">{profile.description}</p>
          </div>

          {/* Cultural Insights */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary-500" />
              Cultural Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.insights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-500"
                >
                  <p className="text-gray-800">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-cultural-500" />
            Personalized Recommendations
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(profile.recommendations).map(([category, items]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <div key={category} className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Icon className="h-5 w-5 mr-2 text-primary-500" />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-cultural-500 rounded-full"></div>
                        <span className="text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Email Form Modal */}
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Send Profile to Email
              </h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input-field mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEmailSubmit}
                  className="btn-primary flex-1"
                >
                  Send
                </button>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/input" className="btn-secondary">
              Generate New Profile
            </Link>
            <button
              onClick={handleCopyLink}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 