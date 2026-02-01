# TalentMind AI Assistant

**TalentMind** is a cutting-edge, AI-powered career assistant desgit remote set-url origin to help job seekers land their dream job. By analyzing your resume against a specific job description, it provides a detailed breakdown of skill gaps, offers personalized feedback to improve your application, and even finds relevant, up-to-the-minute job postings from across the web.

This application is built with a modern tech stack, leveraging the power of Google's Gemini AI through Genkit, all running on a seamless Next.js frontend.

## ✨ Key Features

-   **📄 Resume & Job Description Analysis:** Upload your resume (PDF) and paste a job description to get an instant, AI-driven analysis of how you stack up.
-   **🎯 Skill Gap Identification:** The AI pinpoints the exact skills and qualifications listed in the job description that are missing from your resume.
-   **✍️ AI-Powered Resume Feedback:** Receive actionable, constructive feedback on your resume's content, focusing on areas for improvement to better target the role.
-   **🔍 Real-time Job Search:** Based on your unique skill profile, the AI scours major job boards (like LinkedIn, Indeed, and Google Careers) to find current and relevant job openings.
-   **💅 Sleek, Modern UI:** A beautiful and intuitive interface built with Next.js, Tailwind CSS, and ShadCN UI, featuring a "glassmorphism" design that's both professional and visually appealing.

## 🚀 How It Works

1.  **Upload Resume:** Select and upload your current resume in PDF format.
2.  **Paste Job Description:** Copy the full text from a job posting you are interested in and paste it into the text area.
3.  **Analyze:** Click the "Analyze" button to let the AI work its magic.
4.  **Get Results:** In seconds, you'll receive a comprehensive dashboard with three tabs:
    -   **Skill Gap:** See which skills you have and which you're missing.
    -   **AI Feedback:** Read personalized suggestions for resume improvement.
    -   **Job Matches:** Browse a list of real job postings that match your profile.

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI:** [Google's Gemini model](https://deepmind.google.com/technologies/gemini/)
-   **AI Toolkit:** [Genkit (from Firebase)](https://firebase.google.com/docs/genkit) for defining and running AI flows.
-   **Deployment:** Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

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

## 🔬 Inspecting AI Flows with Genkit

This project uses **Genkit** to manage the interactions with the Gemini AI model. You can (and should!) inspect your AI flows using the Genkit developer UI.

1.  In a **new terminal window**, run:
    ```bash
    npm run genkit:dev
    ```
2.  Open [http://localhost:4000](http://localhost:4000) in your browser.

This interface allows you to see the full trace of each AI flow—including the prompts sent to the model and the structured data it returns. It's an invaluable tool for debugging and refining your AI-powered features.
