'use server';

/**
 * @fileOverview Finds relevant job postings based on a list of skills.
 *
 * - findRelevantJobs - A function that finds relevant jobs.
 * - FindRelevantJobsInput - The input type for the findRelevantJobs function.
 * - FindRelevantJobsOutput - The return type for the findRelevantJobs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSchema = z.object({
    title: z.string().describe('The job title.'),
    company: z.string().describe('The company name.'),
    location: z.string().describe('The job location.'),
    url: z.string().url().describe('A URL to the job posting. It should be a real and valid URL from a known job board like LinkedIn, Indeed, etc.'),
});

const FindRelevantJobsInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills to search for jobs with.'),
});
export type FindRelevantJobsInput = z.infer<typeof FindRelevantJobsInputSchema>;

const FindRelevantJobsOutputSchema = z.object({
  jobs: z.array(JobSchema).describe('A list of relevant job postings. Find at least 3 jobs.'),
});
export type FindRelevantJobsOutput = z.infer<typeof FindRelevantJobsOutputSchema>;


export async function findRelevantJobs(
  input: FindRelevantJobsInput
): Promise<FindRelevantJobsOutput> {
  return findRelevantJobsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findRelevantJobsPrompt',
  input: {schema: FindRelevantJobsInputSchema},
  output: {schema: FindRelevantJobsOutputSchema},
  prompt: `You are a helpful AI assistant that finds relevant job postings on the internet based on a list of skills.
  Your task is to find real, current job postings from job boards like LinkedIn, Indeed, Google Careers, etc. Do not make up jobs. Provide valid URLs.

  Skills:
  {{#each skills}}- {{{this}}}
  {{/each}}

  Find at least 3 job postings that are a good match for these skills.
  Return the jobs as a JSON object with a 'jobs' array.
  `,
});

const findRelevantJobsFlow = ai.defineFlow(
  {
    name: 'findRelevantJobsFlow',
    inputSchema: FindRelevantJobsInputSchema,
    outputSchema: FindRelevantJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
