const express = require("express");
const router = express.Router();

// PDF Export endpoint
router.post("/pdf", async (req, res) => {
  try {
    const { data, preferences, domains, timeframe, region } = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data provided for export" });
    }

    // For now, we'll create a simple text-based report
    // In a production environment, you'd use a library like puppeteer or jsPDF
    const reportContent = generateReportContent(
      data,
      preferences,
      domains,
      timeframe,
      region
    );

    // Set headers for file download
    res.setHeader("Content-Type", "text/plain");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="culturesense-analysis-${
        new Date().toISOString().split("T")[0]
      }.txt"`
    );

    res.send(reportContent);
  } catch (error) {
    console.error("PDF export error:", error);
    res.status(500).json({ error: "Failed to generate export" });
  }
});

function generateReportContent(data, preferences, domains, timeframe, region) {
  const timestamp = new Date().toLocaleString();

  let content = `CULTURESENSE ANALYSIS REPORT
Generated on: ${timestamp}
Analysis Period: ${timeframe}
Region: ${region}
Domains Analyzed: ${domains.join(", ")}

==========================================
USER PREFERENCES
==========================================
`;

  // Add user preferences
  Object.entries(preferences).forEach(([domain, preference]) => {
    if (preference) {
      content += `${
        domain.charAt(0).toUpperCase() + domain.slice(1)
      }: ${preference}\n`;
    }
  });

  content += `\n==========================================
CROSS-DOMAIN INSIGHTS
==========================================
`;

  // Add cross-domain insights
  if (data.cross_domain_insights) {
    data.cross_domain_insights.forEach((insight, index) => {
      content += `\n${
        index + 1
      }. ${insight.source_domain.toUpperCase()} → ${insight.target_domain.toUpperCase()}
   Affinity Score: ${insight.affinity_score}%
   Cultural Pattern: ${insight.cultural_pattern}
   Business Implications: ${insight.business_implications?.[0] || "N/A"}
`;
    });
  }

  content += `\n==========================================
CULTURAL SEGMENTS
==========================================
`;

  // Add cultural segments
  if (data.cultural_segments) {
    data.cultural_segments.forEach((segment, index) => {
      content += `\n${index + 1}. ${segment.segment_name}
   Market Size: ${segment.market_size}
   Characteristics: ${segment.characteristics?.join(", ") || "N/A"}
   Preferences: ${segment.preferences?.join(", ") || "N/A"}
`;
    });
  }

  content += `\n==========================================
SUMMARY
==========================================
This analysis was generated using CultureSense, powered by Qloo's cross-domain cultural intelligence API. The insights reveal how cultural preferences connect across different domains, providing valuable business intelligence for marketing, product development, and audience targeting.

For more information, visit: https://culturesense.ai
`;

  return content;
}

module.exports = router;
