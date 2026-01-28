'use server';

import { analyzeJobDescription } from '@/ai/flows/analyze-job-description';
import { generateResumeFeedback } from '@/ai/flows/generate-resume-feedback';
import { identifySkillGaps } from '@/ai/flows/identify-skill-gaps';
import { parseResumeInformation } from '@/ai/flows/parse-resume-information';
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

export async function analyzeResumeAndJob(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
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

    const [skillGaps, feedback] = await Promise.all([
      identifySkillGaps({ resume: resumeText, jobDescription }),
      generateResumeFeedback({ resumeText }),
    ]);

    if (!skillGaps) throw new Error('Could not analyze skill gaps.');
    if (!feedback) throw new Error('Could not generate feedback.');

    return {
      result: { resumeInfo, jobInfo, skillGaps, feedback },
      error: null,
    };
  } catch (e: any) {
    console.error('Error in analyzeResumeAndJob action:', e);
    return { result: null, error: e.message || 'An unexpected error occurred during analysis.' };
  }
}
