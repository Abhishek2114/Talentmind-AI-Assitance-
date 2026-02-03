# 🚀 TalentMind AI: Your Personal Career Co-Pilot

<div align="center">

**Stop guessing, start getting hired. TalentMind is a cutting-edge, AI-powered career assistant that bridges the gap between your resume and your dream job.**

</div>

---

**TalentMind** analyzes your resume against any job description to give you an undeniable advantage. It provides a detailed breakdown of skill gaps, offers personalized feedback to improve your application, and even finds relevant, up-to-the-minute job postings from across the web.

This application is built with a modern tech stack, leveraging the power of Google's Gemini AI through Genkit, all running on a seamless Next.js frontend.

<br />

## ✨ Key Features

-   **📄 Smart Resume & Job Analysis:** Upload your resume (PDF) and paste a job description to get an instant, AI-driven analysis of your compatibility.
-   **🎯 Skill Gap Identification:** The AI pinpoints the exact skills and qualifications listed in the job description that are missing from your resume. See what you have and what you need, instantly.
-   **✍️ AI-Powered Resume Feedback:** Receive actionable, constructive feedback on your resume's content, focusing on areas for improvement to better target the role.
-   **🔍 Real-time Job Search:** Based on your unique skill profile, the AI scours major job boards (like LinkedIn, Indeed, and Google Careers) to find current and relevant job openings.
-   **💅 Sleek, Modern UI:** A beautiful and intuitive interface built with Next.js, Tailwind CSS, and ShadCN UI, featuring interactive accordions and a professional "glassmorphism" design.

## 🏗️ Architecture Design

```text
TalentMind AI
│
├── Next.js Frontend
│   ├── Resume Upload
│   ├── JD Input
│   └── Results Dashboard
│
├── Genkit AI Layer
│   ├── Resume Parser
│   ├── JD Analyzer
│   ├── Skill Gap Engine
│   ├── Feedback Generator
│   └── Job Search Flow
│
├── Google Gemini LLM
│
└── Deployment
    ├── Firebase App Hosting
    └── Vercel / Netlify
```

## 🧠 How The AI Works: The Prompt Flow

TalentMind uses a sophisticated, multi-step AI flow orchestrated by **Genkit** to provide its comprehensive analysis. Here’s a look under the hood:

1.  **Initial Input:** The user provides two key pieces of information: their **Resume (PDF)** and the text of a **Job Description**.

2.  **Parallel Processing:** To maximize speed, the system runs two AI flows at the same time:
    *   **Flow A: Resume Parsing (`parseResumeInformation`)**: The uploaded PDF is sent to the Gemini model, which extracts key information into a structured format: `skills`, `experience`, `education`, and `contactInformation`.
    *   **Flow B: Job Description Analysis (`analyzeJobDescription`)**: The job description text is sent to the Gemini model, which identifies and extracts the `requiredSkills` and a summary of the `requiredExperience`.

3.  **Core Analysis (Concurrent Flows):** Once the initial data is processed, the AI performs the main analysis by running three more flows in parallel:
    *   **Skill Gap Analysis**: A precise, case-insensitive comparison engine determines the exact overlap and gaps between your profile and the job.
    *   **Resume Feedback (`generateResumeFeedback`)**: The parsed resume text is analyzed to generate constructive `feedback` for improvement.
    *   **Job Search (`findRelevantJobs`)**: The complete list of skills (from both the resume and the job description) is used to perform a real-time search for relevant, recent job postings.

4.  **Final Output:** The results from all the AI flows are compiled into a single, comprehensive `AnalysisResult` object, which is then displayed to the user in a clean, tabbed interface.

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI:** [Google's Gemini model](https://deepmind.google.com/technologies/gemini/)
-   **AI Toolkit:** [Genkit (from Firebase)](https://firebase.google.com/docs/genkit)
-   **Deployment:** Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## ⚙️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add your Google AI API key.
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
