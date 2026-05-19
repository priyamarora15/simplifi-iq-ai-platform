const generateCompanyInsights = require("./services/aiService");
const scrapeWebsite = require("./utils/scraper");
const express = require("express");
const cors = require("cors");
const sendAuditEmail = require("./services/emailService");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SimplifIQ Backend Running");
});

app.post("/analyze-company", async (req, res) => {
    console.log("Analyze route hit");
  try {
    const { companyName, website, email } = req.body;

    if (!companyName || !website || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const scrapedData = await scrapeWebsite(website);
    const aiInsights = await generateCompanyInsights(scrapedData);
    await sendAuditEmail(
    email,
    companyName,
    scrapedData,
    aiInsights.insights
    );

    res.json({
        success: true,
        companyName,
        website,
        scrapedData,
        aiInsights,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});