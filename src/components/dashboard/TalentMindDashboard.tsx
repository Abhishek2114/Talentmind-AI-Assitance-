'use client';

import { useFormStatus } from 'react-dom';
import React, { useEffect, useRef, useState, useActionState } from 'react';
import { analyzeResumeAndJob } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileUp, Loader2, RefreshCw } from 'lucide-react';
import { AnalysisResults } from './AnalysisResults';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

const initialState = { result: null, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze'
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
      <div className="space-y-8">
        <div className="flex justify-end">
          <Button onClick={handleReset} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Start New Analysis
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Resume Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {state.result.resumeInfo.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Experience</h4>
                                    <p className="text-sm text-muted-foreground">{state.result.resumeInfo.experience}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Education</h4>
                                    <p className="text-sm text-muted-foreground">{state.result.resumeInfo.education}</p>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Job Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Required Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {state.result.jobInfo.requiredSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Required Experience</h4>
                                    <p className="text-sm text-muted-foreground">{state.result.jobInfo.requiredExperience}</p>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <AnalysisResults result={state.result} />
            </div>
        </div>
      </div>
    );
  }
  

  return (
    <form key={formKey} action={formAction} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Upload Your Resume</CardTitle>
            <CardDescription>Upload your resume in PDF format.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="resume" className="sr-only">Resume</Label>
            <div className="relative">
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".pdf"
                  ref={fileInputRef}
                />
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
                    <FileUp className="w-10 h-10 mb-2"/>
                    <p className="font-medium">
                        {resumeFileName ? resumeFileName : 'Click or drag to upload file'}
                    </p>
                    <p className="text-sm">PDF (max 5MB)</p>
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2. Paste Job Description</CardTitle>
            <CardDescription>Paste the full job description below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="jobDescription" className="sr-only">Job Description</Label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste job description here..."
              required
              rows={12}
            />
          </CardContent>
        </Card>
        <SubmitButton />
      </div>

      <div className="lg:sticky top-24">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>3. Get Your Analysis</CardTitle>
            <CardDescription>Your results will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-6 space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
