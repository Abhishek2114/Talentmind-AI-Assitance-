import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-job-description.ts';
import '@/ai/flows/parse-resume-information.ts';
import '@/ai/flows/generate-resume-feedback.ts';
import '@/ai/flows/find-relevant-jobs.ts';
import '@/ai/flows/comprehensive-analysis.ts';
