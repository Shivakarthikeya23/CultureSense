# 🧠 CultureSense - AI-Powered Cultural Intelligence Platform

**CultureSense** is an AI-powered cultural intelligence platform designed to help businesses make data-driven decisions by understanding shifting consumer preferences across domains like music, fashion, food, travel, and entertainment — without relying on any personally identifiable information.

By integrating large language models (LLMs) like Gemini with Qloo's Taste AI™ API, CultureSense enables businesses to explore real-time cultural trends, discover cross-domain affinities between brands and audiences, and receive actionable insights through a conversational, analytics-rich interface.

## 🏆 Hackathon Project

This project was built for the **Qloo LLM Hackathon** - a global competition exploring the intersection of LLMs and Qloo's unique cross-domain cultural intelligence.

## 🚀 Core Features

### **Cross-Domain Cultural Analysis**
- Analyze how cultural preferences connect across different domains
- Discover hidden affinities between music, fashion, food, travel, and more
- Generate actionable business insights using Qloo's unique cultural graph

### **Cultural Persona Builder**
- Create comprehensive cultural DNA profiles
- Understand audience cultural patterns without personal data
- Generate detailed cultural insights and recommendations

### **Cultural Strategist AI**
- Chat with AI for strategic cultural recommendations
- Get personalized insights for marketing and brand strategy
- Leverage Qloo's cross-domain intelligence for decision-making

### **Professional Features**
- Export analysis results as PDF and CSV
- Social sharing with native Web Share API
- User authentication and data persistence
- Enterprise-ready design and functionality

## 🛠️ Technical Stack

### **Frontend**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** with custom design system
- **Framer Motion** for premium animations
- **Supabase** for authentication and database

### **Backend**
- **Node.js** with Express
- **Google Gemini AI** for cultural analysis
- **Qloo Taste AI™ API** for cross-domain intelligence
- **Supabase** for data persistence

## 🔐 Security & Environment Setup

**⚠️ IMPORTANT: This application requires proper environment configuration for security.**

### **Required Environment Variables**

#### **Frontend (.env.local)**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### **Backend (.env)**
```bash
# API Keys (REQUIRED)
GEMINI_API_KEY=your_gemini_api_key_here
QLOO_API_KEY=your_qloo_api_key_here
QLOO_API_URL=https://hackathon.api.qloo.com

# Supabase Configuration (REQUIRED)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### **Getting Your API Keys**

1. **Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Qloo API Key**: Provided for hackathon participants
3. **Supabase**: Create a project at [supabase.com](https://supabase.com)

## 🚀 Quick Start

### **1. Clone and Setup**
```bash
git clone <repository-url>
cd cultural-dna
```

### **2. Install Dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### **3. Environment Configuration**
```bash
# Frontend
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Backend
cd ../backend
cp .env.example .env
# Edit .env with your API keys
```

### **4. Database Setup**
```bash
# Run the Supabase schema
# See SUPABASE_SETUP.md for detailed instructions
```

### **5. Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### **6. Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📁 Project Structure

```
cultural-dna/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages and components
│   ├── components/          # Reusable React components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── lib/                # Utility libraries and configurations
│   └── .env.local          # Frontend environment variables
├── backend/                 # Node.js/Express backend
│   ├── routes/             # API route handlers
│   ├── lib/                # Backend utilities
│   └── .env                # Backend environment variables
├── supabase-schema.sql     # Database schema
└── README.md               # This file
```

## 🔧 API Endpoints

### **Cultural Analysis**
- `POST /api/cross-domain-analysis` - Cross-domain cultural analysis
- `POST /api/brand-culture-alignment` - Brand-culture alignment analysis
- `POST /api/cultural-market-intelligence` - Market intelligence analysis

### **Cultural Persona**
- `POST /api/cultural-persona` - Generate cultural persona
- `POST /api/save-persona` - Save persona to database

### **Cultural Strategist**
- `POST /api/cultural-strategist` - AI-powered cultural strategy chat

### **Export & Sharing**
- `POST /api/export/pdf` - Export analysis as PDF
- `GET /api/export/csv` - Export analysis as CSV

## 🎯 Business Applications

### **Marketing Teams**
- Cross-domain campaign strategies
- Cultural authenticity analysis
- Audience cultural profiling

### **Product Teams**
- Cultural preference mapping
- Feature demand analysis
- Cross-domain user insights

### **Brand Managers**
- Brand-culture alignment scoring
- Cultural risk assessment
- Authentic brand positioning

### **Content Creators**
- Cross-domain content themes
- Cultural trend integration
- Audience cultural understanding

## 🏆 Hackathon Features

### **Innovation Highlights**
- **First Platform**: Combining Qloo's cross-domain insights with AI
- **Privacy-First**: Cultural intelligence without personal data
- **Real-Time Processing**: Instant analysis with graceful fallbacks
- **Professional Polish**: Enterprise-ready features and design

### **Technical Excellence**
- **Modern Architecture**: Next.js 14, TypeScript, TailwindCSS
- **Robust Integration**: Qloo API + Gemini AI + Supabase
- **Performance Optimized**: Fast loading, caching, error handling
- **Scalable Design**: Ready for enterprise deployment

### **Business Value**
- **Actionable Insights**: Specific recommendations for real problems
- **Export Functionality**: Professional PDF and CSV generation
- **Social Sharing**: Native Web Share API with fallbacks
- **User Management**: Complete authentication and data persistence

## 🔒 Security & Privacy

- **No Personal Data**: Uses only cultural preferences, no PII
- **Environment Variables**: All API keys stored securely
- **Authentication**: Supabase Row Level Security (RLS)
- **CORS Protection**: Proper cross-origin request handling
- **Input Validation**: Comprehensive request validation

## 🚀 Deployment

### **Frontend (Vercel)**
```bash
cd frontend
vercel --prod
```

### **Backend (Railway/Render)**
```bash
cd backend
# Deploy to your preferred platform
# Ensure environment variables are set
```

## 📊 Testing

See `TESTING_GUIDE.md` for comprehensive testing instructions.

## 🤝 Contributing

This is a hackathon project. For questions or issues, please refer to the hackathon documentation.

## 📄 License

This project is built for the Qloo LLM Hackathon. All rights reserved.

---

**Built with ❤️ for the Qloo LLM Hackathon**

*Leveraging Qloo's unique cross-domain cultural intelligence to power the future of business decision-making.* 