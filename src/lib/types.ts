import type { AnalyzeJobDescriptionOutput } from '@/ai/flows/analyze-job-description';
import type { GenerateResumeFeedbackOutput } from '@/ai/flows/generate-resume-feedback';
import type { IdentifySkillGapsOutput } from '@/ai/flows/identify-skill-gaps';
import type { ParseResumeInformationOutput } from '@/ai/flows/parse-resume-information';

export type AnalysisResult = {
  resumeInfo: ParseResumeInformationOutput;
  jobInfo: AnalyzeJobDescriptionOutput;
  skillGaps: IdentifySkillGapsOutput;
  feedback: GenerateResumeFeedbackOutput;
};

export type JobRecommendation = {
  id: number;
  title: string;
  company: string;
  location: string;
  skills: string[];
  matchPercentage: number;
  url: string;
};
