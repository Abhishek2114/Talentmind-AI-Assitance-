import { TalentMindDashboard } from '@/components/dashboard/TalentMindDashboard';
import { Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <header className="border-b border-white/10 bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Briefcase className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-primary font-headline">
              TalentMind
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 sm:py-16">
        <section className="text-center mb-16 md:mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">
              Unlock Your Career Potential with AI
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and a job description to get a detailed analysis, discover skill gaps, and receive personalized feedback to land your dream job.
            </p>
          </div>
        </section>

        <TalentMindDashboard />
      </main>
    </div>
  );
}
