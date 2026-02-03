'use client';

import React, { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { analyzeResumeAndJob } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUp, Loader2, RefreshCw, ClipboardList, UserCircle, Sparkles } from 'lucide-react';
import { AnalysisResults } from './AnalysisResults';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const initialState = { result: null, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full shadow-lg" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing Intelligence...
        </>
      ) : (
        'Start Deep Analysis'
      )}
    </Button>
  );
}

export function TalentMindDashboard() {
  const [formKey, setFormKey] = useState(0);
  const [state, formAction] = useActionState(analyzeResumeAndJob, initialState);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFileName, setResumeFileName] = useState('');

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: state.error,
      });
    }
  }, [state, toast]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
    } else {
      setResumeFileName('');
    }
  };
  
  const handleReset = () => {
    setFormKey(prevKey => prevKey + 1);
    setResumeFileName('');
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  if (state.result) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold font-headline">Analysis Overview</h3>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
                 <Card className="border-primary/10 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <UserCircle className="h-5 w-5 text-primary" />
                          Resume Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" defaultValue={['resume-skills']} className="w-full">
                            <AccordionItem value="resume-skills" className="border-none">
                                <AccordionTrigger className="text-sm font-medium hover:no-underline">Extracted Skills</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {state.result.resumeInfo.skills.length > 0 ?
                                            state.result.resumeInfo.skills.map(skill => <Badge key={skill} variant="secondary" className="text-[10px] font-medium">{skill}</Badge>) :
                                            <p className="text-sm text-muted-foreground italic">No skills identified.</p>
                                        }
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="border-primary/10 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <ClipboardList className="h-5 w-5 text-accent" />
                          Job Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Accordion type="multiple" defaultValue={['job-skills']} className="w-full">
                            <AccordionItem value="job-skills" className="border-none">
                                <AccordionTrigger className="text-sm font-medium hover:no-underline">Target Requirements</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                         {state.result.jobInfo.requiredSkills.length > 0 ?
                                            state.result.jobInfo.requiredSkills.map(skill => <Badge key={skill} variant="secondary" className="text-[10px] font-medium">{skill}</Badge>) :
                                            <p className="text-sm text-muted-foreground italic">Generic role requirements.</p>
                                         }
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-8">
                <AnalysisResults result={state.result} />
            </div>
        </div>
      </div>
    );
  }
  

  return (
    <form key={formKey} action={formAction} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">1</span>
            Source Document
          </div>
          <Card className="relative overflow-hidden border-dashed">
            <CardContent className="p-0">
              <Label htmlFor="resume" className="sr-only">Resume</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept=".pdf"
                ref={fileInputRef}
              />
              <div className="flex flex-col items-center justify-center p-12 text-center group transition-colors hover:bg-muted/30">
                  <div className="mb-4 rounded-full bg-primary/5 p-4 transition-colors group-hover:bg-primary/10">
                    <FileUp className="w-8 h-8 text-primary"/>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                      {resumeFileName ? resumeFileName : 'Upload professional resume'}
                  </h4>
                  <p className="text-xs text-muted-foreground">PDF format only. Max 5MB.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">2</span>
            Target Context
          </div>
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="jobDescription" className="sr-only">Job Description</Label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the full job description or requirements here..."
                required
                rows={10}
                className="flex min-h-[200px] w-full bg-transparent p-0 text-sm focus-visible:outline-none resize-none placeholder:text-muted-foreground"
              />
            </CardContent>
          </Card>
        </div>
        
        <SubmitButton />
      </div>

      <div className="lg:sticky top-24 hidden lg:block">
        <Card className="bg-primary/5 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Real-time Intelligence</CardTitle>
            <CardDescription>Upload your profile to unlock career insights.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="h-2 w-1/3 bg-primary/10 rounded" />
              <div className="h-4 w-full bg-primary/10 rounded" />
              <div className="h-4 w-5/6 bg-primary/10 rounded" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-2 w-1/2 bg-primary/10 rounded" />
              <div className="h-4 w-full bg-primary/10 rounded" />
              <div className="h-4 w-3/4 bg-primary/10 rounded" />
            </div>
            <div className="rounded-xl border border-primary/10 p-6 bg-background/50">
              <div className="flex items-center gap-3 text-sm font-medium text-primary mb-2">
                <Sparkles className="h-4 w-4" />
                AI-Driven Optimization
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our orchestration layer uses parallel processing to parse, analyze, and coach in seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
