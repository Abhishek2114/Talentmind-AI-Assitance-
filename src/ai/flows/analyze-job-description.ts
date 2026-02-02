'use server';

/**
 * @fileOverview Analyzes a job description to identify required skills and experience.
 *
 * - analyzeJobDescription - A function that analyzes a job description.
 * - AnalyzeJobDescriptionInput - The input type for the analyzeJobDescription function.
 * - AnalyzeJobDescriptionOutput - The return type for the analyzeJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to analyze.'),
});
export type AnalyzeJobDescriptionInput = z.infer<
  typeof AnalyzeJobDescriptionInputSchema
>;

const AnalyzeJobDescriptionOutputSchema = z.object({
  requiredSkills: z
    .array(z.string())
    .describe('A list of required skills for the job.'),
  requiredExperience: z
    .string()
    .describe('A description of the required experience for the job.'),
});
export type AnalyzeJobDescriptionOutput = z.infer<
  typeof AnalyzeJobDescriptionOutputSchema
>;

export async function analyzeJobDescription(
  input: AnalyzeJobDescriptionInput
): Promise<AnalyzeJobDescriptionOutput> {
  return analyzeJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJobDescriptionPrompt',
  input: {schema: AnalyzeJobDescriptionInputSchema},
  output: {schema: AnalyzeJobDescriptionOutputSchema},
  prompt: `You are an expert HR assistant who specializes in parsing job descriptions. Your task is to analyze the following job description and extract two key pieces of information:
1.  **Required Skills**: A list of essential technical and soft skills mentioned.
2.  **Required Experience**: A concise summary of the necessary years of experience, roles, and qualifications.

Analyze the following job description:
---
{{{jobDescription}}}
---

Return the results as a JSON object that strictly adheres to the output schema. For "requiredSkills", provide a JSON array of strings. For "requiredExperience", provide a single string summarizing the experience requirements.`,
});

const analyzeJobDescriptionFlow = ai.defineFlow(
  {
    name: 'analyzeJobDescriptionFlow',
    inputSchema: AnalyzeJobDescriptionInputSchema,
    outputSchema: AnalyzeJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
