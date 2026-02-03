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

  // Implementation of a simple retry strategy for quota errors
  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    try {
      const resumeDataUri = await fileToDataUri(resumeFile);

      // Perform a single consolidated AI request to minimize quota usage
      const analysis = await comprehensiveAnalysis({ 
        resumeDataUri, 
        jobDescription 
      });

      if (!analysis) throw new Error('AI Analysis failed to produce results.');

      // Calculate skill gaps deterministically in code (case-insensitive)
      const resumeSkillsSet = new Set(analysis.resumeInfo.skills.map(skill => skill.toLowerCase()));
      const requiredSkills = analysis.jobInfo.requiredSkills || [];
      const skillGapsList = requiredSkills.filter(skill => !resumeSkillsSet.has(skill.toLowerCase()));

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
      console.error(`Attempt ${attempts} failed:`, e.message);

      // If it's a 429 (Too Many Requests) and we have attempts left, wait and retry
      if (e.message.includes('429') && attempts < maxAttempts) {
        await wait(2000); // Wait 2 seconds before retrying
        continue;
      }

      const userMessage = e.message.includes('429') 
        ? 'The AI service is currently busy due to high demand (Quota Exceeded). Please wait a few seconds and try again.'
        : (e.message || 'An unexpected error occurred during analysis.');

      return { result: null, error: userMessage };
    }
  }

  return { result: null, error: 'Maximum analysis attempts exceeded. Please try again later.' };
}
