'use server';

import { analyzeJobDescription } from '@/ai/flows/analyze-job-description';
import { generateResumeFeedback } from '@/ai/flows/generate-resume-feedback';
import { parseResumeInformation } from '@/ai/flows/parse-resume-information';
import type { AnalysisResult } from '@/lib/types';
import { findRelevantJobs } from '@/ai/flows/find-relevant-jobs';

type FormState = {
  result: AnalysisResult | null;
  error: string | null;
};

async function fileToDataUri(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

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

  try {
    const resumeDataUri = await fileToDataUri(resumeFile);

    const [resumeInfo, jobInfo] = await Promise.all([
      parseResumeInformation({ resumeDataUri }),
      analyzeJobDescription({ jobDescription }),
    ]);

    if (!resumeInfo) throw new Error('Could not parse resume.');
    if (!jobInfo) throw new Error('Could not analyze job description.');

    const resumeText = `
      Skills: ${resumeInfo.skills.join(', ')}
      Experience: ${resumeInfo.experience}
      Education: ${resumeInfo.education}
    `;

    const allSkills = [...new Set([...resumeInfo.skills, ...jobInfo.requiredSkills])];

    // Calculate skill gaps directly instead of using a separate AI flow
    const resumeSkillsSet = new Set(resumeInfo.skills.map(skill => skill.toLowerCase()));
    const requiredSkills = jobInfo.requiredSkills || [];
    const skillGapsList = requiredSkills.filter(skill => !resumeSkillsSet.has(skill.toLowerCase()));

    const skillGaps = { skillGaps: skillGapsList };

    const [feedback, jobRecommendationsResult] = await Promise.all([
      generateResumeFeedback({ resumeText }),
      findRelevantJobs({ skills: allSkills }),
    ]);

    if (!feedback) throw new Error('Could not generate feedback.');
    if (!jobRecommendationsResult) throw new Error('Could not find job recommendations.');

    return {
      result: { 
        resumeInfo, 
        jobInfo, 
        skillGaps, 
        feedback,
        jobRecommendations: jobRecommendationsResult.jobs 
      },
      error: null,
    };
  } catch (e: any) {
    console.error('Error in analyzeResumeAndJob action:', e);
    return { result: null, error: e.message || 'An unexpected error occurred during analysis.' };
  }
}
