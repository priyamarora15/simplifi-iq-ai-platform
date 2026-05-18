const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDF = (companyName, scrapedData, aiInsights) => {
  return new Promise((resolve) => {

    const filePath = `./${companyName}-report.pdf`;

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(24).text("SimplifiIQ AI Audit Report", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(18).text(`Company: ${companyName}`);

    doc.moveDown();

    doc.fontSize(16).text("Website Title:");
    doc.fontSize(12).text(scrapedData.title || "N/A");

    doc.moveDown();

    doc.fontSize(16).text("Meta Description:");
    doc.fontSize(12).text(scrapedData.metaDescription || "N/A");

    doc.moveDown();

    doc.fontSize(16).text("AI Insights:");
    doc.fontSize(12).text(aiInsights);

    doc.end();

    stream.on("finish", () => {
      resolve(filePath);
    });
  });
};

module.exports = generatePDF;