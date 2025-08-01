const axios = require("axios");

const BASE_URL = "http://localhost:3001";

async function testAPI() {
  console.log("🧪 Testing CultureSense API Endpoints...\n");

  try {
    // Test 1: Health Check
    console.log("1️⃣ Testing Health Check...");
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Health check passed:", healthResponse.data);
    console.log("");

    // Test 2: Cross-Domain Analysis
    console.log("2️⃣ Testing Cross-Domain Analysis...");
    const crossDomainResponse = await axios.post(
      `${BASE_URL}/cross-domain-analysis`,
      {
        domains: ["music", "fashion", "food"],
        preferences: {
          music: ["indie", "alternative"],
          fashion: ["vintage", "sustainable"],
          food: ["plant-based", "fusion"],
        },
      }
    );
    console.log("✅ Cross-domain analysis working");
    console.log(
      "   - Cross-domain insights:",
      crossDomainResponse.data.cross_domain_insights?.length || 0
    );
    console.log(
      "   - Cultural segments:",
      crossDomainResponse.data.cultural_segments?.length || 0
    );
    console.log(
      "   - Qloo insights:",
      crossDomainResponse.data.qloo_insights?.length || 0
    );
    console.log("");

    // Test 3: Brand-Culture Alignment
    console.log("3️⃣ Testing Brand-Culture Alignment...");
    const brandAlignmentResponse = await axios.post(
      `${BASE_URL}/brand-culture-alignment`,
      {
        brand: "Nike",
        targetAudience: "Young professionals aged 25-35",
        domains: ["music", "fashion", "travel"],
      }
    );
    console.log("✅ Brand-culture alignment working");
    console.log(
      "   - Alignment score:",
      brandAlignmentResponse.data.brand_culture_profile?.alignment_score
    );
    console.log(
      "   - Cross-domain opportunities:",
      brandAlignmentResponse.data.cross_domain_opportunities?.length || 0
    );
    console.log(
      "   - Qloo recommendations:",
      brandAlignmentResponse.data.qloo_recommendations?.length || 0
    );
    console.log("");

    // Test 4: Cultural Market Intelligence
    console.log("4️⃣ Testing Cultural Market Intelligence...");
    const marketIntelligenceResponse = await axios.post(
      `${BASE_URL}/cultural-market-intelligence`,
      {
        domains: ["music", "fashion", "food"],
        region: "global",
        timeframe: "3months",
      }
    );
    console.log("✅ Cultural market intelligence working");
    console.log(
      "   - Cultural trends:",
      marketIntelligenceResponse.data.cultural_trends?.length || 0
    );
    console.log(
      "   - Cross-domain patterns:",
      marketIntelligenceResponse.data.cross_domain_patterns?.length || 0
    );
    console.log(
      "   - Market recommendations:",
      marketIntelligenceResponse.data.market_recommendations?.length || 0
    );
    console.log("");

    // Test 5: Legacy Endpoints (Backward Compatibility)
    console.log("5️⃣ Testing Legacy Endpoints...");
    const legacyTrendsResponse = await axios.post(
      `${BASE_URL}/analyze-trends`,
      {
        domains: ["music", "fashion"],
        region: "global",
        timeframe: "3months",
      }
    );
    console.log("✅ Legacy trends endpoint working");

    const legacyCampaignResponse = await axios.post(
      `${BASE_URL}/campaign-insights`,
      {
        brand: "Adidas",
        targetAudience: "Athletic millennials",
        domains: ["music", "fashion", "travel"],
      }
    );
    console.log("✅ Legacy campaign insights endpoint working");
    console.log("");

    console.log("🎉 All API endpoints working correctly!");
    console.log("");
    console.log("📊 Summary:");
    console.log("   ✅ Health check endpoint");
    console.log("   ✅ Cross-domain cultural analysis");
    console.log("   ✅ Brand-culture alignment");
    console.log("   ✅ Cultural market intelligence");
    console.log("   ✅ Legacy endpoints (backward compatibility)");
    console.log("");
    console.log("🚀 CultureSense is ready for demo!");
  } catch (error) {
    console.error("❌ API Test Failed:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    process.exit(1);
  }
}

// Run the tests
testAPI();
