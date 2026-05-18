const axios = require("axios");
const cheerio = require("cheerio");
const tryScrapePage = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $("script").remove();
    $("style").remove();
    $("noscript").remove();

    const text = $("body").text();

    return text.replace(/\s+/g, " ").trim();
  } catch (error) {
    return null;
  }
};
const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const aboutUrls = [
    `${url}/about`,
    `${url}/about-us`,
    `${url}/company`,
    ];

    const $ = cheerio.load(data);

    const title = $("title").text();

    const metaDescription = $('meta[name="description"]').attr("content");

    const headings = [];

    $("h1, h2").each((i, el) => {
      headings.push($(el).text());
    });

    const paragraphs = [];

    $("p").each((i, el) => {
        const text = $(el).text().trim();

        if (text.length > 40) {
            paragraphs.push(text);
        }
    });

    const socialLinks = [];
    $("a").each((i, el) => {
    const href = $(el).attr("href");

    if (!href) return;

    const lowerHref = href.toLowerCase();

    if (
        lowerHref.includes("linkedin.com") ||
        lowerHref.includes("instagram.com") ||
        lowerHref.includes("twitter.com") ||
        lowerHref.includes("x.com") ||
        lowerHref.includes("facebook.com")
    ) {
        socialLinks.push(href);
    }
    });

    const uniqueSocialLinks = [...new Set(socialLinks)];
    let aboutContent = "No about page found";

    for (const aboutUrl of aboutUrls) {
    try {
        const result = await tryScrapePage(aboutUrl);

        if (result) {
        aboutContent = result.substring(0, 3000);
        break;
        }
    } catch (error) {
        console.log(`Failed to scrape ${aboutUrl}`);
    }
    }
    return {
        success: true,
        title,
        metaDescription,
        headings,
        paragraphs: paragraphs.slice(0, 20),
        socialLinks:
            uniqueSocialLinks.length > 0
                ? uniqueSocialLinks
                : ["No social links found"],
        aboutContent
    };
  } catch (error) {
        console.log(error.message);

        return {
            success: false,
            message: "Website scraping failed",
            error: error.message,
        };
    }
};

module.exports = scrapeWebsite;