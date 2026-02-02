import type { AnalyzeJobDescriptionOutput } from '@/ai/flows/analyze-job-description';
import type { GenerateResumeFeedbackOutput } from '@/ai/flows/generate-resume-feedback';
import type { ParseResumeInformationOutput } from '@/ai/flows/parse-resume-information';

// This type is now calculated manually in actions.ts
export type IdentifySkillGapsOutput = {
  skillGaps: string[];
};

export type AnalysisResult = {
  resumeInfo: ParseResumeInformationOutput;
  jobInfo: AnalyzeJobDescriptionOutput;
  skillGaps: IdentifySkillGapsOutput;
  feedback: GenerateResumeFeedbackOutput;
  jobRecommendations: JobRecommendation[];
};

export type JobRecommendation = {
  title: string;
  company: string;
  location: string;
  url: string;
};
