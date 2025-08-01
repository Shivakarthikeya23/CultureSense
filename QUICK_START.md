# 🚀 CultureSense Quick Start Guide

## ⚡ 5-Minute Setup & Test

### 1. Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
**Expected:** `🚀 CultureSense Backend running on port 3001`

### 2. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
**Expected:** `Ready - started server on 0.0.0.0:3000`

### 3. Test API Endpoints
```bash
# In backend folder
node test-api.js
```

### 4. Test Frontend
1. **Visit:** http://localhost:3000
2. **Click:** "Access Business Intelligence"
3. **Test:** Select domains and see data update

## 🎯 Quick Demo Flow

### Demo 1: Dashboard Overview (30 seconds)
- Visit http://localhost:3000/dashboard
- Show professional business intelligence interface
- Select different cultural domains
- Demonstrate real-time data updates

### Demo 2: Trend Analysis (45 seconds)
- Visit http://localhost:3000/trends
- Select: Music, Fashion, Food
- Show AI-generated cultural analysis
- Highlight business implications

### Demo 3: Campaign Intelligence (60 seconds)
- Visit http://localhost:3000/campaigns
- Enter: Brand "Nike", Target "Gen Z urban professionals"
- Select: Music, Fashion domains
- Generate complete marketing strategy

## 🔧 If Something Breaks

### API Issues
```bash
# Test individual endpoints
curl http://localhost:3001/api/health
curl -X POST http://localhost:3001/api/analyze-trends \
  -H "Content-Type: application/json" \
  -d '{"domains":["music"],"region":"global","timeframe":"3months"}'
```

### Frontend Issues
- Check browser console for errors
- Verify backend is running on port 3001
- Clear browser cache if needed

### Gemini API Issues
- App will use sophisticated fallback data
- No need to worry - demo will still work perfectly

## 🏆 Hackathon Ready Features

✅ **Professional Business UI** - Enterprise-grade dashboard
✅ **Real AI Integration** - Gemini API for cultural analysis  
✅ **Sophisticated Fallbacks** - Always works, even if APIs fail
✅ **Complete Campaign Intelligence** - Full marketing strategy generation
✅ **Cross-Domain Analysis** - Cultural affinity mapping
✅ **Business Reports** - Professional email delivery

## 🎬 Demo Script

**Opening (30s):** "CultureSense transforms cultural data into business intelligence, helping companies create data-driven marketing strategies."

**Dashboard (30s):** "Our professional dashboard lets you analyze cultural trends across music, fashion, food, travel, and books."

**Trend Analysis (45s):** "AI-powered analysis reveals cultural patterns and business opportunities. Here we see music trends and their marketing implications."

**Campaign Intelligence (60s):** "Generate complete marketing strategies. For Nike targeting Gen Z, we get cultural insights, channel recommendations, and success metrics."

**Closing (15s):** "CultureSense gives businesses the cultural intelligence they need to win in today's market."

---

**Ready to win! 🏆✨** 