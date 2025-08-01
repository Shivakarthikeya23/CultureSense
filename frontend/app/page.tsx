'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Brain, TrendingUp, Target, BarChart3, Users, Globe, Zap, 
  Music, ShoppingBag, Utensils, MapPin, BookOpen, User, LogIn, 
  Sparkles, Star, Award, Rocket, Shield, Lock, CheckCircle,
  Play, Download, ExternalLink, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      const testimonials = document.querySelector('.testimonials-scroll');
      if (testimonials) {
        testimonials.scrollLeft += 1;
        if (testimonials.scrollLeft >= testimonials.scrollWidth / 2) {
          testimonials.scrollLeft = 0;
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
          
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <motion.div 
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/dashboard">
                      <motion.button 
                        className="btn-primary flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Dashboard</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Link
                      href="/auth/login"
                      className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link href="/auth/signup">
                      <motion.button 
                        className="btn-primary flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden pt-32 pb-16"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Premium Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 shadow-2xl">
                <div className="relative">
                  <Brain className="h-8 w-8 text-blue-400 animate-pulse-glow" />
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50"></div>
                </div>
                <span className="text-2xl font-bold text-gradient">
                  CultureSense
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
            >
              <span className="text-gradient">AI-Powered</span>
              <br />
              <span className="text-white">Cultural Intelligence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Unlock the power of cross-domain cultural insights with Qloo's unique intelligence. 
              Transform how businesses understand their audience through AI-driven cultural analysis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
            >
              <Link href={user ? "/dashboard" : "/auth/signup"}>
                <motion.button 
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Rocket className="h-5 w-5" />
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <motion.button 
                className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center space-x-8 text-white/60"
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy-First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Real-Time AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Enterprise Ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Powered by <span className="text-gradient">Qloo's</span> Cross-Domain Intelligence
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover how cultural preferences connect across music, fashion, food, travel, and more. 
              No personal data required - just pure cultural intelligence.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Cultural Analysis",
                description: "Advanced LLM-powered insights into cultural patterns and preferences",
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: TrendingUp,
                title: "Cross-Domain Insights",
                description: "Discover hidden connections between different cultural domains",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: Target,
                title: "Business Intelligence",
                description: "Actionable insights for marketing, product development, and strategy",
                gradient: "from-green-500 to-blue-600"
              },
              {
                icon: Users,
                title: "Audience Profiling",
                description: "Understand your audience's cultural DNA without personal data",
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: Globe,
                title: "Global Cultural Data",
                description: "Access to the world's richest cultural intelligence platform",
                gradient: "from-teal-500 to-green-600"
              },
              {
                icon: Zap,
                title: "Real-Time Processing",
                description: "Instant cultural analysis powered by cutting-edge AI",
                gradient: "from-indigo-500 to-purple-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card-hover group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Trusted by <span className="text-gradient">Leading Brands</span>
            </motion.h2>
          </div>

          <div className="testimonials-scroll flex space-x-8 overflow-x-auto pb-8">
            {[
              {
                name: "Sarah Chen",
                role: "CMO, TechFlow",
                content: "CultureSense revolutionized our marketing strategy. We now understand our audience's cultural DNA like never before.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Product Director, InnovateCorp",
                content: "The cross-domain insights are game-changing. We've seen a 40% increase in engagement since implementing CultureSense.",
                rating: 5
              },
              {
                name: "Dr. Emily Watson",
                role: "Research Lead, DataViz",
                content: "Finally, a platform that combines AI with cultural intelligence. The privacy-first approach is exactly what we needed.",
                rating: 5
              },
              {
                name: "Alex Thompson",
                role: "CEO, StartupXYZ",
                content: "CultureSense helped us pivot our entire product strategy. The cultural insights were eye-opening and actionable.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="card min-w-[400px] flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your <span className="text-gradient">Cultural Intelligence</span>?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of businesses already using CultureSense to understand their audience better.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href={user ? "/dashboard" : "/auth/signup"}>
                <motion.button 
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Start Your Free Trial</span>
                  <ArrowUpRight className="h-5 w-5" />
                </motion.button>
              </Link>
              <motion.button 
                className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-5 w-5" />
                <span>Download Report</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-gradient">CultureSense</span>
            </div>
            <p className="text-white/60 mb-4">
              Powered by Qloo's Cross-Domain Cultural Intelligence
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/40">
              <span>© 2024 CultureSense. All rights reserved.</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 