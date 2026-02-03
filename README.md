# TalentMind AI: Career Intelligence Platform

**TalentMind AI** is a professional-grade career co-pilot that leverages Generative AI to bridge the gap between candidates and their ideal roles. By utilizing deterministic skill matching and contextual career coaching, it provides actionable insights for the modern job market.

## 🏗️ System Architecture

The platform is built on a high-performance, serverless stack designed for low latency and data integrity.

```text
TalentMind AI
│
├── Frontend (Next.js 14 App Router)
│   ├── UI: React, Tailwind CSS, ShadCN UI
│   └── State: React Server Actions
│
├── Orchestration (Firebase Genkit)
│   ├── parseResumeInformation (Multi-modal PDF parsing)
│   ├── analyzeJobDescription (Contextual requirement extraction)
│   ├── generateResumeFeedback (AI-driven coaching)
│   └── findRelevantJobs (Intelligence-based retrieval)
│
├── Logic Layer
│   └── Deterministic Skill Matching (Case-insensitive set comparison)
│
├── AI Model
│   └── Google Gemini 2.5 Flash
│
└── Infrastructure
    └── Platform: Firebase App Hosting (Google Cloud)
```

## 🧠 How The AI Works

TalentMind utilizes **Firebase Genkit** for production-grade AI orchestration. Unlike basic LLM wrappers, the system executes a multi-stage reasoning pipeline:

1.  **Parallel Multi-Modal Parsing:** The system concurrently ingests unstructured PDF data (via Gemini's multi-modal vision) and job description text.
2.  **Structured Entity Extraction:** Every output is governed by strict **Zod schemas**, transforming fuzzy LLM responses into typed, predictable JSON data.
3.  **Deterministic Evaluation:** The core skill gap analysis is handled by a deterministic logic engine rather than a probabilistic LLM call, ensuring 100% accuracy in identifying matching vs. missing skills.
4.  **Actionable Synthesis:** Downstream flows use the extracted context to generate high-fidelity career coaching and source relevant job opportunities.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI Orchestration:** Firebase Genkit (v1.x)
- **Model:** Google Gemini 2.5 Flash
- **Styling:** Tailwind CSS & ShadCN UI
- **Deployment:** Firebase App Hosting
- **Language:** TypeScript (Strict Mode)

## 🚀 Key Features

- **Resume Intelligence:** Multi-modal PDF analysis to extract skills, experience, and education.
- **JD Requirement Mapping:** Precision extraction of essential skills from unstructured job postings.
- **Deterministic Skill Gap Matrix:** Instant visual reporting of profile alignment.
- **Contextual Coaching:** Generative AI feedback focused on resume optimization for specific roles.
- **Intelligent Job Match:** Automated discovery of live opportunities based on parsed profile data.

---
*Engineered for recruiters and candidates who demand precision in the age of AI.*