# 🚀 TalentMind AI: Your Personal Career Co-Pilot

<div align="center">

**Stop guessing, start getting hired. TalentMind is a cutting-edge, AI-powered career assistant that bridges the gap between your resume and your dream job.**

</div>

---

**TalentMind** analyzes your resume against any job description to give you an undeniable advantage. It provides a detailed breakdown of skill gaps, offers personalized feedback to improve your application, and even finds relevant, up-to-the-minute job postings from across the web.

This application is built with a modern tech stack, leveraging the power of Google's Gemini AI through Genkit, all running on a seamless Next.js frontend.

<br />

<div align="center">

*   **Live Demo:** `[Link to Your Deployed App]`
*   **Inspect AI Traces:** `[Link to Your Genkit Inspector]`

</div>

<br />

## ✨ Key Features

-   **📄 Smart Resume & Job Analysis:** Upload your resume (PDF) and paste a job description to get an instant, AI-driven analysis of your compatibility.
-   **🎯 Skill Gap Identification:** The AI pinpoints the exact skills and qualifications listed in the job description that are missing from your resume. See what you have and what you need, instantly.
-   **✍️ AI-Powered Resume Feedback:** Receive actionable, constructive feedback on your resume's content, focusing on areas for improvement to better target the role.
-   **🔍 Real-time Job Search:** Based on your unique skill profile, the AI scours major job boards (like LinkedIn, Indeed, and Google Careers) to find current and relevant job openings.
-   **💅 Sleek, Modern UI:** A beautiful and intuitive interface built with Next.js, Tailwind CSS, and ShadCN UI, featuring a "glassmorphism" design that's both professional and visually appealing.

## 🏗️ Architecture Diagram

Below is a high-level overview of the application's architecture.

```
TalentMind AI
│
├── Next.js Frontend
│   ├── Resume Upload
│   ├── JD Input
│   ├── Results Dashboard
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
    *   **Skill Gap Analysis (`identifySkillGaps`)**: The skills from the resume are compared against the required skills from the job description to identify any `skillGaps`.
    *   **Resume Feedback (`generateResumeFeedback`)**: The parsed resume text is analyzed to generate constructive `feedback` for improvement.
    *   **Job Search (`findRelevantJobs`)**: The complete list of skills (from both the resume and the job description) is used to perform a real-time search for relevant, recent job postings.

4.  **Final Output:** The results from all the AI flows are compiled into a single, comprehensive `AnalysisResult` object, which is then displayed to the user in a clean, tabbed interface.

This entire process is defined as a serverless "flow" in Genkit, ensuring it's reliable, scalable, and easy to monitor.

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI:** [Google's Gemini model](https://deepmind.google.com/technologies/gemini/)
-   **AI Toolkit:** [Genkit (from Firebase)](https://firebase.google.com/docs/genkit)
-   **Deployment:** Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting), Vercel, Netlify

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd talentmind-ai-assistant
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add your Google AI API key. You can obtain a free key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🚀 Deployment

When you deploy this application to a hosting provider like Vercel, Netlify, or Firebase App Hosting from your GitHub repository, you **must** configure your `GEMINI_API_KEY` as an environment variable in the provider's settings.

The local `.env` file is not uploaded to GitHub for security reasons, so the deployed application will not have access to the key unless you set it in your hosting platform's project settings.

### Setting Environment Variables

-   **Vercel:** Go to your Project > Settings > Environment Variables.
-   **Netlify:** Go to your Site settings > Build & deploy > Environment.
-   **Firebase App Hosting:** You will be prompted to set secrets during the `firebase apphosting:backends:create` flow. You can manage them later with `firebase apphosting:secrets`.

Add a new variable with the name `GEMINI_API_KEY` and paste your key as the value. After setting the variable, you may need to redeploy your project for the change to take effect.

## 🔬 Inspecting AI Flows with Genkit

This project uses **Genkit** to manage the interactions with the Gemini AI model. You can (and should!) inspect your AI flows using the Genkit developer UI.

1.  In a **new terminal window**, run:
    ```bash
    npm run genkit:dev
    ```
2.  Open [http://localhost:4000](http://localhost:4000) in your browser.

This interface allows you to see the full trace of each AI flow—including the prompts sent to the model and the structured data it returns. It's an invaluable tool for debugging and refining your AI-powered features.
