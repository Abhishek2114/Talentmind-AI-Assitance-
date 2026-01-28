'use server';

/**
 * @fileOverview Resume parsing flow.
 *
 * - parseResumeInformation - A function that parses resume information.
 * - ParseResumeInformationInput - The input type for the parseResumeInformation function.
 * - ParseResumeInformationOutput - The return type for the parseResumeInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseResumeInformationInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* e.g., application/pdf */
    ),
});
export type ParseResumeInformationInput = z.infer<
  typeof ParseResumeInformationInputSchema
>;

const ParseResumeInformationOutputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
  experience: z
    .string()
    .describe('A summary of the candidate\'s work experience.'),
  education: z.string().describe('A summary of the candidate\'s education.'),
  contactInformation: z
    .string()
    .describe('A summary of the candidate\'s contact information.'),
});
export type ParseResumeInformationOutput = z.infer<
  typeof ParseResumeInformationOutputSchema
>;

export async function parseResumeInformation(
  input: ParseResumeInformationInput
): Promise<ParseResumeInformationOutput> {
  return parseResumeInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseResumeInformationPrompt',
  input: {schema: ParseResumeInformationInputSchema},
  output: {schema: ParseResumeInformationOutputSchema},
  prompt: `You are an expert resume parser. You will extract skills, work experience, education, and contact information from the resume.

  Resume: {{media url=resumeDataUri}}
  \n`,
});

const parseResumeInformationFlow = ai.defineFlow(
  {
    name: 'parseResumeInformationFlow',
    inputSchema: ParseResumeInformationInputSchema,
    outputSchema: ParseResumeInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
