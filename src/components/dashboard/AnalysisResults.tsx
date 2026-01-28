'use client';

import type { AnalysisResult, JobRecommendation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Briefcase, FileText, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { mockJobRecommendations } from '@/lib/mock-data';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const allSkills = new Set([
      ...result.resumeInfo.skills, 
      ...result.jobInfo.requiredSkills
    ]);
  const resumeSkills = new Set(result.resumeInfo.skills);
  const jobSkills = new Set(result.jobInfo.requiredSkills);
  
  const matchingSkills = result.resumeInfo.skills.filter(skill => jobSkills.has(skill));

  return (
    <Tabs defaultValue="skill-gap" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="skill-gap">
          <FileText className="mr-2 h-4 w-4" /> Skill Gap
        </TabsTrigger>
        <TabsTrigger value="feedback">
          <Lightbulb className="mr-2 h-4 w-4" /> AI Feedback
        </TabsTrigger>
        <TabsTrigger value="jobs">
          <Briefcase className="mr-2 h-4 w-4" /> Job Matches
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="skill-gap">
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>
              A comparison of your skills against the job requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center"><XCircle className="h-5 w-5 mr-2 text-destructive"/>Missing Skills ({result.skillGaps.skillGaps.length})</h3>
              <p className="text-sm text-muted-foreground mb-3">These skills are in the job description but not on your resume.</p>
              <div className="flex flex-wrap gap-2">
                {result.skillGaps.skillGaps.length > 0 ? (
                  result.skillGaps.skillGaps.map((skill) => (
                    <Badge key={skill} variant="destructive">{skill}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-accent font-medium">No skill gaps found. Great match!</p>
                )}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center"><CheckCircle2 className="h-5 w-5 mr-2 text-accent"/>Matching Skills ({matchingSkills.length})</h3>
              <p className="text-sm text-muted-foreground mb-3">You have these required skills.</p>
              <div className="flex flex-wrap gap-2">
                 {matchingSkills.length > 0 ? (
                    matchingSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-accent/30 bg-accent/10 text-accent">{skill}</Badge>
                    ))
                 ) : (
                    <p className="text-sm text-muted-foreground">No matching skills found from the job requirements.</p>
                 )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="feedback">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Resume Feedback</CardTitle>
            <CardDescription>
              Actionable suggestions to improve your resume for this specific role.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap font-sans">
            <p>{result.feedback.feedback}</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="jobs">
        <Card>
          <CardHeader>
            <CardTitle>Potential Job Matches</CardTitle>
            <CardDescription>
              Other roles you might be a good fit for based on your profile. (Mock data)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockJobRecommendations.map((job: JobRecommendation) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between">
                         <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <CardDescription>{job.company} - {job.location}</CardDescription>
                         </div>
                         <Badge variant={job.matchPercentage > 80 ? 'default' : 'secondary'} className={job.matchPercentage > 90 ? 'bg-accent text-accent-foreground' : ''}>
                           {job.matchPercentage}% Match
                         </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                   <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 5).map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                        {job.skills.length > 5 && <Badge variant="outline">+{job.skills.length - 5} more</Badge>}
                   </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button variant="ghost" asChild>
                        <a href={job.url} target="_blank" rel="noopener noreferrer">View Job <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
