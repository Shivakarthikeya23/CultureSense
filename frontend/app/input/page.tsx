'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X, Music, BookOpen, MapPin, ShoppingBag, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const categories = [
  { id: 'music', label: 'Music', icon: Music, placeholder: 'e.g., The Beatles, Jazz, Classical' },
  { id: 'books', label: 'Books', icon: BookOpen, placeholder: 'e.g., 1984, Fantasy novels, Self-help' },
  { id: 'travel', label: 'Travel', icon: MapPin, placeholder: 'e.g., Japan, Beach destinations, Mountains' },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag, placeholder: 'e.g., Minimalist style, Vintage, Streetwear' },
  { id: 'food', label: 'Food', icon: Utensils, placeholder: 'e.g., Italian cuisine, Spicy food, Vegan' },
];

export default function InputPage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<Record<string, string[]>>({
    music: [],
    books: [],
    travel: [],
    fashion: [],
    food: [],
  });
  const [currentInput, setCurrentInput] = useState('');
  const [currentCategory, setCurrentCategory] = useState('music');
  const [isLoading, setIsLoading] = useState(false);

  const addPreference = (category: string, value: string) => {
    if (value.trim() && !preferences[category].includes(value.trim())) {
      setPreferences(prev => ({
        ...prev,
        [category]: [...prev[category], value.trim()]
      }));
      setCurrentInput('');
    }
  };

  const removePreference = (category: string, index: number) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    const totalPreferences = Object.values(preferences).flat().length;
    if (totalPreferences < 5) {
      toast.error('Please add at least 5 preferences across all categories');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate profile');
      }

      const data = await response.json();
      
      // Store in localStorage for the results page
      localStorage.setItem('culturalProfile', JSON.stringify(data));
      
      router.push('/results');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate your cultural profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPreferences = Object.values(preferences).flat().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cultural-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Share Your Cultural Tastes
          </h1>
          <p className="text-gray-600">
            Tell us about your favorite things across different cultural domains. We'll use this to create your unique CulturalDNA profile.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Preferences Added: {totalPreferences}/10
              </span>
              <span className="text-sm text-gray-500">
                {totalPreferences >= 5 ? '✓ Ready to generate' : 'Add at least 5 more'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-cultural-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalPreferences / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span className="font-medium">{category.label}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {preferences[category.id].length}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add {categories.find(c => c.id === currentCategory)?.label} Preferences
          </h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPreference(currentCategory, currentInput)}
              placeholder={categories.find(c => c.id === currentCategory)?.placeholder}
              className="input-field flex-1"
            />
            <button
              onClick={() => addPreference(currentCategory, currentInput)}
              disabled={!currentInput.trim()}
              className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-4 py-3 rounded-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Current Category Preferences */}
          <div className="space-y-2">
            {preferences[currentCategory].map((pref, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
              >
                <span className="text-gray-800">{pref}</span>
                <button
                  onClick={() => removePreference(currentCategory, index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* All Preferences Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Cultural Preferences</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id}>
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {preferences[category.id].map((pref, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                    >
                      {pref}
                    </span>
                  ))}
                  {preferences[category.id].length === 0 && (
                    <span className="text-gray-400 text-sm">No preferences added yet</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button
            onClick={handleSubmit}
            disabled={totalPreferences < 5 || isLoading}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Your Profile...</span>
              </div>
            ) : (
              'Generate My CulturalDNA Profile'
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
} 