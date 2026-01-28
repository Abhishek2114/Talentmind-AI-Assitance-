import { config } from 'dotenv';
config();

import '@/ai/flows/identify-skill-gaps.ts';
import '@/ai/flows/analyze-job-description.ts';
import '@/ai/flows/parse-resume-information.ts';
import '@/ai/flows/generate-resume-feedback.ts';