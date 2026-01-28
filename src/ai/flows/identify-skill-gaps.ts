'use server';

/**
 * @fileOverview Identifies skill gaps between a resume and a job description using AI.
 *
 * - identifySkillGaps - A function that identifies skill gaps.
 * - IdentifySkillGapsInput - The input type for the identifySkillGaps function.
 * - IdentifySkillGapsOutput - The return type for the identifySkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifySkillGapsInputSchema = z.object({
  resume: z.string().describe('The resume text.'),
  jobDescription: z.string().describe('The job description text.'),
});
export type IdentifySkillGapsInput = z.infer<typeof IdentifySkillGapsInputSchema>;

const IdentifySkillGapsOutputSchema = z.object({
  skillGaps: z.array(z.string()).describe('The skills present in the job description but not in the resume.'),
});
export type IdentifySkillGapsOutput = z.infer<typeof IdentifySkillGapsOutputSchema>;

export async function identifySkillGaps(input: IdentifySkillGapsInput): Promise<IdentifySkillGapsOutput> {
  return identifySkillGapsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifySkillGapsPrompt',
  input: {schema: IdentifySkillGapsInputSchema},
  output: {schema: IdentifySkillGapsOutputSchema},
  prompt: `You are a helpful AI assistant that identifies the skill gaps between a resume and a job description.

  Resume:
  {{resume}}

  Job Description:
  {{jobDescription}}

  Identify the skills present in the job description that are not present in the resume. Return the skills in a JSON array.
  Make sure the output can be parsed by JSON.parse.
  {
    "skillGaps": []
  }`,
});

const identifySkillGapsFlow = ai.defineFlow(
  {
    name: 'identifySkillGapsFlow',
    inputSchema: IdentifySkillGapsInputSchema,
    outputSchema: IdentifySkillGapsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    try {
      if (!output || !output.skillGaps) {
        console.error('Unexpected output from prompt:', output);
        throw new Error('Failed to parse skill gaps from the output.');
      }
      return output;
    } catch (e) {
      console.error('Failed to parse skill gaps:', e);
      throw new Error('Failed to parse skill gaps from the output.');
    }
  }
);
