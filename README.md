# SimplifiIQ - AI Lead Intelligence Platform

An AI-powered automation platform that transforms lead intake into personalized business audits.

## Features

- Google Authentication using Firebase
- Company data scraping and enrichment
- AI-generated business insights using Groq LLM
- PDF audit report generation
- Automated email delivery
- Modern SaaS-style UI
- Responsive frontend with animations

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion
- Firebase Authentication

### Backend
- Node.js
- Express.js
- Groq API
- Nodemailer
- PDFKit
- Cheerio

## Workflow

1. User logs in with Google
2. User submits company details
3. Backend scrapes website data
4. AI generates business insights
5. PDF report is generated
6. Report is emailed automatically

## Setup Instructions

### Frontend

```bash
cd client
npm install
npm run dev