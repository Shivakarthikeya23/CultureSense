const axios = require("axios");

const BASE_URL = "http://localhost:3001/api";

async function testEndpoints() {
  console.log("🧪 Testing CultureSense API Endpoints...\n");

  try {
    // Test Cultural Persona
    console.log("1. Testing Cultural Persona...");
    const personaResponse = await axios.post(`${BASE_URL}/cultural-persona`, {
      preferences: {
        music: "Classical, Mass",
        fashion: "Baggy, Vintage",
        food: "Indian, Spicy, Korean",
        travel: "Mountains, Beaches",
        books: "N/A",
      },
    });
    console.log(
      "✅ Cultural Persona Response:",
      personaResponse.data.persona_name
    );
    console.log("   Preferences:", personaResponse.data.preferences);
    console.log("");

    // Test Cultural Strategist
    console.log("2. Testing Cultural Strategist...");
    const strategistResponse = await axios.post(
      `${BASE_URL}/cultural-strategist`,
      {
        message: "What campaign should I run for Gen Z in Japan?",
        conversationHistory: [],
      }
    );
    console.log(
      "✅ Cultural Strategist Response:",
      strategistResponse.data.response.substring(0, 100) + "..."
    );
    console.log(
      "   Cultural Insights:",
      strategistResponse.data.data.cultural_insights
    );
    console.log("");

    // Test Cross-Domain Analysis
    console.log("3. Testing Cross-Domain Analysis...");
    const crossDomainResponse = await axios.post(
      `${BASE_URL}/cross-domain-analysis`,
      {
        domains: ["music", "fashion"],
        preferences: {
          music: "indie, alternative",
          fashion: "vintage, sustainable",
        },
      }
    );
    console.log(
      "✅ Cross-Domain Analysis Response:",
      crossDomainResponse.data.affinities ? "Success" : "No affinities"
    );
    console.log("");

    console.log("🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.code === "ECONNREFUSED") {
      console.error(
        "❌ Connection refused. Is the server running on port 3001?"
      );
    } else {
      console.error("❌ Error details:", error);
    }
  }
}

// Start the test
testEndpoints();
