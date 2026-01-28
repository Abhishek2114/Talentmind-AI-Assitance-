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
  prompt: `You are an expert HR assistant who can analyze job descriptions and provide the required skills and experience.

Analyze the following job description and extract the required skills and experience.

Job Description: {{{jobDescription}}}

Output the required skills as a list of strings, and the required experience as a text description.

Skills: {{output.requiredSkills}}
Experience: {{output.requiredExperience}}`,
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
