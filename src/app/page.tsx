import { TalentMindDashboard } from '@/components/dashboard/TalentMindDashboard';
import { Briefcase, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight font-headline">
              TalentMind <span className="text-accent">AI</span>
            </h1>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
            v1.0 Production
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <section className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-accent" /> Powered by Gemini 2.5 Flash
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-6">
            Career Intelligence for the <span className="text-primary">Next Generation</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TalentMind AI bridges the gap between your professional profile and industry requirements. 
            Upload your resume for deterministic skill matching and actionable career coaching.
          </p>
        </section>

        <TalentMindDashboard />
      </main>

      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 TalentMind AI. Engineered for career excellence.</p>
        </div>
      </footer>
    </div>
  );
}