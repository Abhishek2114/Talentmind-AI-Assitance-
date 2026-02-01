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
  jobs: z.array(JobSchema).describe('A list of relevant job postings. Find at least 5 jobs.'),
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
  prompt: `You are an expert job search assistant. Your primary task is to find real, up-to-date job postings from major online job platforms based on a list of skills provided.

Your goal is to provide high-quality, relevant results. Follow these instructions carefully:
1.  **Search on Multiple Platforms**: Actively search for jobs on well-known platforms like LinkedIn, Indeed, Glassdoor, and Google Careers.
2.  **Ensure Recency and Relevance**: THIS IS THE MOST IMPORTANT RULE. Prioritize jobs posted within the **last 7 days**. The jobs must be currently open and accepting applications. Do not include jobs that are already closed.
3.  **Location**: If no specific location is provided, prioritize **remote jobs** available in North America.
4.  **Provide Direct Links**: The URL for each job must be a direct, functioning link to the job posting page itself, not a link to a search results page or a company's homepage.
5.  **Do Not Invent Jobs**: You must not create or hallucinate job postings. All information must come from actual listings. Verify that the company is real and the job is plausible.
6.  **Find at Least 5 Jobs**: Return a minimum of 5 relevant job postings.

Here are the skills to base your search on:
{{#each skills}}- {{{this}}}
{{/each}}

Return the findings as a JSON object that strictly follows the specified output format.
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
