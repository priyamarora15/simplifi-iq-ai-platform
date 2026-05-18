require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCompanyInsights = async (companyData) => {
  console.log("AI function started");
  try {
    const prompt = `
You are an expert AI business consultant.

Analyze this company.

Title:
${companyData.title}

Meta:
${companyData.metaDescription}

Headings:
${companyData.headings.slice(0, 5).join(", ")}

Paragraphs:
${companyData.paragraphs.slice(0, 5).join(", ")}

About:
${companyData.aboutContent.substring(0, 500)}

Generate:
1. Company Overview
2. Strengths
3. Weaknesses
4. AI Opportunities
5. Marketing Suggestions
6. Final Recommendations
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    console.log("AI response received");

    return {
      success: true,
      insights: completion.choices[0].message.content,
    };
  } catch (error) {
    return {
      success: false,
      message: "AI analysis failed",
      error: error.message,
    };
  }
};

module.exports = generateCompanyInsights;