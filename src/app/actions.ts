'use server';

import { comprehensiveAnalysis } from '@/ai/flows/comprehensive-analysis';
import type { AnalysisResult } from '@/lib/types';

type FormState = {
  result: AnalysisResult | null;
  error: string | null;
};

async function fileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

/**
 * Utility to wait for a specific duration
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeResumeAndJob(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (!process.env.GEMINI_API_KEY) {
    const errorMessage = 'The GEMINI_API_KEY is not configured on the server. Please add it to your deployment environment variables to enable AI features.';
    console.error(errorMessage);
    return { result: null, error: errorMessage };
  }
  
  const resumeFile = formData.get('resume') as File | null;
  const jobDescription = formData.get('jobDescription') as string | null;

  if (!resumeFile || resumeFile.size === 0) {
    return { result: null, error: 'Resume file is required.' };
  }
  if (!jobDescription) {
    return { result: null, error: 'Job description is required.' };
  }

  // Robust retry strategy with exponential backoff
  let attempts = 0;
  const maxAttempts = 3;
  const baseDelay = 4000; // Start with 4 seconds

  while (attempts < maxAttempts) {
    try {
      const resumeDataUri = await fileToDataUri(resumeFile);

      // Perform consolidated AI request
      const analysis = await comprehensiveAnalysis({ 
        resumeDataUri, 
        jobDescription 
      });

      if (!analysis) throw new Error('AI Analysis failed to produce results.');

      // Deterministic skill gap calculation
      const resumeSkillsSet = new Set(analysis.resumeInfo.skills.map(skill => skill.toLowerCase().trim()));
      const requiredSkills = analysis.jobInfo.requiredSkills || [];
      const skillGapsList = requiredSkills.filter(skill => !resumeSkillsSet.has(skill.toLowerCase().trim()));

      return {
        result: { 
          resumeInfo: analysis.resumeInfo, 
          jobInfo: analysis.jobInfo, 
          skillGaps: { skillGaps: skillGapsList }, 
          feedback: analysis.feedback,
          jobRecommendations: analysis.jobRecommendations 
        },
        error: null,
      };
    } catch (e: any) {
      attempts++;
      console.error(`Attempt ${attempts} failed for analysis:`, e.message);

      // Handle Quota Exceeded with exponential backoff
      if (e.message.includes('429') && attempts < maxAttempts) {
        const backoffTime = baseDelay * Math.pow(2, attempts - 1);
        await wait(backoffTime);
        continue;
      }

      const userMessage = e.message.includes('429') 
        ? 'The AI service is currently busy. We tried to retry automatically, but the quota is still exceeded. Please wait a moment and try again.'
        : (e.message || 'An unexpected error occurred during analysis.');

      return { result: null, error: userMessage };
    }
  }

  return { result: null, error: 'Maximum analysis attempts exceeded. Please try again in 30 seconds.' };
}
