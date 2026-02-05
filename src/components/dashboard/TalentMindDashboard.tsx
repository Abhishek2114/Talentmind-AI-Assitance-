'use client';

import React, { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { analyzeResumeAndJob } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUp, Loader2, RefreshCw, ClipboardList, UserCircle, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { AnalysisResults } from './AnalysisResults';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const initialState = { result: null, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full shadow-2xl h-14 text-lg font-bold tracking-tight bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Analyzing Intelligence...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Start Deep Analysis
        </>
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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20">
          <div>
            <h3 className="text-2xl font-bold font-headline text-white">Analysis Overview</h3>
            <p className="text-xs text-white/70">Strategic alignment report generated successfully.</p>
          </div>
          <Button onClick={handleReset} variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            <RefreshCw className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
                 <Card className="border-white/20 shadow-2xl bg-black/60 backdrop-blur-md overflow-hidden">
                    <CardHeader className="pb-4 bg-white/5">
                        <CardTitle className="text-lg flex items-center gap-2 text-white">
                          <UserCircle className="h-5 w-5 text-primary" />
                          Extracted Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Accordion type="multiple" defaultValue={['resume-skills']} className="w-full">
                            <AccordionItem value="resume-skills" className="border-none">
                                <AccordionTrigger className="text-sm font-semibold text-white/90 hover:no-underline py-2">Candidate Skills</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-1.5 pt-4">
                                        {state.result.resumeInfo.skills.length > 0 ?
                                            state.result.resumeInfo.skills.map(skill => (
                                              <Badge key={skill} variant="secondary" className="bg-primary/30 text-white border-primary/40 text-[10px] py-1">
                                                {skill}
                                              </Badge>
                                            )) :
                                            <p className="text-sm text-white/60 italic">No skills identified.</p>
                                        }
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="border-white/20 shadow-2xl bg-black/60 backdrop-blur-md overflow-hidden">
                    <CardHeader className="pb-4 bg-white/5">
                        <CardTitle className="text-lg flex items-center gap-2 text-white">
                          <ClipboardList className="h-5 w-5 text-accent" />
                          Role Requirements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                       <Accordion type="multiple" defaultValue={['job-skills']} className="w-full">
                            <AccordionItem value="job-skills" className="border-none">
                                <AccordionTrigger className="text-sm font-semibold text-white/90 hover:no-underline py-2">Target Skills</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-1.5 pt-4">
                                         {state.result.jobInfo.requiredSkills.length > 0 ?
                                            state.result.jobInfo.requiredSkills.map(skill => (
                                              <Badge key={skill} variant="secondary" className="bg-accent/30 text-white border-accent/40 text-[10px] py-1">
                                                {skill}
                                              </Badge>
                                            )) :
                                            <p className="text-sm text-white/60 italic">Generic role requirements.</p>
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
    <form key={formKey} action={formAction} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-in fade-in duration-1000">
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-[10px] bg-primary/40 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-primary/20">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px]">1</span>
            Source Document
          </div>
          <Card className="relative overflow-hidden border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl transition-all hover:ring-2 hover:ring-primary/40 group">
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
              <div className="flex flex-col items-center justify-center p-14 text-center group transition-colors hover:bg-white/10">
                  <div className="mb-5 rounded-2xl bg-primary/30 p-5 transition-transform group-hover:scale-110 duration-300 border border-primary/20">
                    <FileUp className="w-10 h-10 text-white"/>
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">
                      {resumeFileName ? resumeFileName : 'Upload professional resume'}
                  </h4>
                  <p className="text-xs text-white/60 font-medium">PDF format only. High-precision vision parsing enabled.</p>
                  {resumeFileName && (
                    <Badge variant="outline" className="mt-4 border-primary/50 text-white bg-primary/30 px-3 py-1 animate-in zoom-in-50">
                      <CheckCircle2 className="mr-1.5 h-3 w-3" /> File Ready
                    </Badge>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-[10px] bg-accent/40 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-accent/20">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[10px]">2</span>
            Target Context
          </div>
          <Card className="bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xl overflow-hidden transition-all hover:ring-2 hover:ring-accent/40">
            <CardContent className="p-6">
              <Label htmlFor="jobDescription" className="sr-only">Job Description</Label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the full job description or core requirements here..."
                required
                rows={12}
                className="flex min-h-[250px] w-full bg-transparent p-0 text-sm text-white font-medium focus-visible:outline-none resize-none placeholder:text-white/30 placeholder:font-normal leading-relaxed"
              />
            </CardContent>
          </Card>
        </div>
        
        <SubmitButton />
      </div>

      <div className="lg:sticky top-24 hidden lg:block space-y-6">
        <Card className="bg-black/40 border-white/10 shadow-2xl backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 rounded-lg bg-primary/30 border border-primary/20">
                <Sparkles className="h-5 w-5 text-white" />
               </div>
               <CardTitle className="text-xl text-white">AI Engine Status</CardTitle>
            </div>
            <CardDescription className="text-white/60">Orchestrating parallel Genkit flows for strategic intelligence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 font-bold">
                <span>Resume Extraction</span>
                <span className="text-primary font-mono">Optimized</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-primary/60" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 font-bold">
                <span>Semantic Analysis</span>
                <span className="text-accent font-mono">Active</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-5/6 bg-accent/60" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 p-6 bg-white/5 space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold text-white">
                <FileText className="h-4 w-4 text-primary" />
                Technical Protocol
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                We utilize Gemini 2.5 Flash to identify technical skills and experience metrics. 
                Deterministic logic is then applied to map profile alignment with 100% precision, eliminating AI hallucinations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}