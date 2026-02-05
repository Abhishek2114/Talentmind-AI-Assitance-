'use client';

import type { AnalysisResult, JobRecommendation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Briefcase, FileText, ArrowRight, CheckCircle2, XCircle, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const jobSkillsLower = new Set(result.jobInfo.requiredSkills.map(s => s.toLowerCase()));
  
  const matchingSkills = result.resumeInfo.skills.filter(skill => jobSkillsLower.has(skill.toLowerCase()));

  return (
    <Tabs defaultValue="skill-gap" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 h-12">
        <TabsTrigger value="skill-gap" className="data-[state=active]:shadow-md">
          <FileText className="mr-2 h-4 w-4" /> Skill Gap
        </TabsTrigger>
        <TabsTrigger value="feedback" className="data-[state=active]:shadow-md">
          <Lightbulb className="mr-2 h-4 w-4" /> Coaching
        </TabsTrigger>
        <TabsTrigger value="jobs" className="data-[state=active]:shadow-md">
          <Briefcase className="mr-2 h-4 w-4" /> Opportunities
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="skill-gap" className="mt-6">
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    Gaps Detected
                    <XCircle className="h-4 w-4 text-destructive"/>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.skillGaps.skillGaps.length > 0 ? (
                      result.skillGaps.skillGaps.map((skill) => (
                        <Badge key={skill} variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-accent font-medium">100% Skill alignment found.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    Matches Found
                    <CheckCircle2 className="h-4 w-4 text-accent"/>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {matchingSkills.length > 0 ? (
                      matchingSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-accent/30 bg-accent/5 text-accent">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No overlap identified.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Experience Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Candidate Profile Summary</h4>
                  <p>{result.resumeInfo.experience}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Target Role Expectations</h4>
                  <p>{result.jobInfo.requiredExperience}</p>
                </div>
              </CardContent>
            </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="feedback" className="mt-6">
        <Card className="border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Strategic Feedback
            </CardTitle>
            <CardDescription>
              Tailored suggestions for resume optimization based on target requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
            {result.feedback.feedback}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="jobs" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.jobRecommendations.map((job: JobRecommendation, index) => (
            <Card key={`${job.url}-${index}`} className="flex flex-col hover:border-primary/30 transition-all group">
              <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                       <div className="space-y-1">
                          <CardTitle className="text-base group-hover:text-primary transition-colors">{job.title}</CardTitle>
                          <CardDescription className="text-xs font-medium">{job.company}</CardDescription>
                       </div>
                  </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{job.location}</p>
              </CardContent>
              <CardFooter className="pt-0 justify-end">
                  <Button variant="ghost" size="sm" className="text-xs font-semibold" asChild>
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        View Posting <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}