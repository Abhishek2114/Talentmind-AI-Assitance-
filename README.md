# 🚀 TalentMind AI: Personal Career Co-Pilot

**TalentMind AI** is an automated career assistant that bridges the gap between candidate resumes and specific job requirements. By leveraging Generative AI, it identifies skill deficiencies, provides actionable resume feedback, and retrieves real-time job matches tailored to the user's professional profile.

---

## 🏗️ System Architecture

The application is built using a modern, serverless architecture centered on the Next.js ecosystem and Genkit AI orchestration.

```text
TalentMind AI
│
├── Client Layer (Next.js 14 App Router)
│   ├── UI Framework: React, Tailwind CSS, ShadCN UI
│   ├── Features: PDF Upload, JD Analysis Interface
│   └── State Management: React Server Actions & useActionState
│
├── Business Logic Layer (Server Actions)
│   └── Entry Point: analyzeResumeAndJob (Async Orchestration)
│
├── Genkit AI Orchestration (Server-Side)
│   ├── parseResumeInformation (PDF-to-Schema Parsing)
│   ├── analyzeJobDescription (Requirement Extraction)
│   ├── generateResumeFeedback (Contextual Career Coaching)
│   └── findRelevantJobs (AI-Driven Search Retrieval)
│
├── Model Layer (LLM)
│   └── Google Gemini 2.5 Flash
│
└── Infrastructure
    └── Platform: Firebase App Hosting (Google Cloud)
```

## 🧠 How The AI Works: Genkit Flow Orchestration

TalentMind utilizes **Genkit**, a production-grade AI toolkit from Firebase, to manage complex multi-step interactions with the LLM. The system executes a non-linear analysis pipeline designed for low latency and high accuracy.

### 1. Multi-Modal Ingestion & Parallel Parsing
The analysis begins with a parallel execution of two distinct flows:
*   **Resume Parsing (`parseResumeInformation`)**: Ingests a PDF (as a Base64 Data URI) and uses the Gemini model to map unstructured text into a typed Zod schema containing `skills`, `experience`, `education`, and `contactInformation`.
*   **Job Description Analysis (`analyzeJobDescription`)**: Analyzes raw job text to extract essential `requiredSkills` and a summary of the `requiredExperience`.

### 2. Algorithmic Skill Matching
Rather than relying solely on fuzzy LLM matching for the core comparison, the system employs a deterministic **Skill Match Engine**. It performs a case-insensitive intersection of the candidate's extracted skills against the extracted job requirements to provide a 100% accurate "Matching vs. Missing" report.

### 3. Contextual Insight Generation
Once the core entities are parsed, the system initiates a second tier of parallel flows:
*   **Actionable Feedback (`generateResumeFeedback`)**: Evaluates the resume text against the identified gaps to generate specific, constructive suggestions.
*   **Real-time Job Search (`findRelevantJobs`)**: Uses the combined skill set to search major job platforms (LinkedIn, Indeed, etc.) for live opportunities, ensuring recommendations are grounded in current market reality.

### 4. Deterministic Output
All flows are governed by strict Zod schemas, ensuring that the frontend receives predictable JSON objects, eliminating the common "hallucination" issues associated with raw LLM text responses.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **AI Toolkit:** Genkit (v1.x)
- **LLM:** Google Gemini 2.5 Flash
- **Styling:** Tailwind CSS & ShadCN UI
- **Runtime:** Node.js
- **Deployment:** Firebase App Hosting