'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Brain, Send, Download, Share2,
  Music, ShoppingBag, Utensils, MapPin, BookOpen,
  MessageCircle, Sparkles, Target, TrendingUp, Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
}

const quickQuestions = [
  "What campaign should I run for Gen Z in Japan?",
  "Which music genre connects with fitness audiences in the US?",
  "Show me upcoming cultural opportunities for 'vegan food lovers who also enjoy tech podcasts'",
  "How can my brand tap into the streetwear x sustainability trend?",
  "What cultural shifts should I watch for in 2024?",
  "Help me understand my audience's cross-domain preferences"
];

export default function CulturalStrategist() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hi! I'm your Cultural Strategist powered by Qloo's cross-domain intelligence. I can help you understand cultural connections, create targeted campaigns, and discover market opportunities.\n\nWhat would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending message to API:', content.trim());
      console.log('Conversation history:', messages.slice(-5));
      
      const response = await fetch('/api/cultural-strategist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        }),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: result.response,
          timestamp: new Date(),
          data: result.data
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to get response: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in cultural strategist:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble connecting to my cultural intelligence network right now. Please try again in a moment!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
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
                Export Chat
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
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Cultural Strategist
            </h1>
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your AI-powered cultural intelligence assistant. Ask me anything about cultural trends, 
            audience insights, campaign strategies, or cross-domain opportunities.
          </p>
        </div>

        {/* Quick Questions */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'assistant' && (
                        <Brain className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.data && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            {message.data.cultural_insights && (
                              <div className="mb-2">
                                <p className="text-xs font-semibold text-blue-600 mb-1">Cultural Insights:</p>
                                <ul className="text-xs space-y-1">
                                  {message.data.cultural_insights.map((insight: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-1">
                                      <span className="text-blue-500">•</span>
                                      <span>{insight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {message.data.qloo_affinities && (
                              <div className="mb-2">
                                <p className="text-xs font-semibold text-purple-600 mb-1">Qloo Affinities:</p>
                                <div className="text-xs space-y-1">
                                  {message.data.qloo_affinities.map((affinity: any, idx: number) => (
                                    <div key={idx} className="flex items-center space-x-2">
                                      <span className="text-purple-500">→</span>
                                      <span>{affinity.source} → {affinity.target}</span>
                                      <span className="text-purple-600 font-semibold">{affinity.score}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {message.data.recommendations && (
                              <div>
                                <p className="text-xs font-semibold text-green-600 mb-1">Recommendations:</p>
                                <ul className="text-xs space-y-1">
                                  {message.data.recommendations.map((rec: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-1">
                                      <span className="text-green-500">💡</span>
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <div className="flex items-center space-x-1">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm">Analyzing cultural patterns...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about cultural trends, audience insights, or campaign strategies..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Audience Insights</h3>
            </div>
            <p className="text-sm text-gray-600">
              Understand your audience's cultural preferences and cross-domain affinities
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Trend Analysis</h3>
            </div>
            <p className="text-sm text-gray-600">
              Discover emerging cultural trends and their business implications
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Campaign Strategy</h3>
            </div>
            <p className="text-sm text-gray-600">
              Get personalized campaign recommendations based on cultural intelligence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 