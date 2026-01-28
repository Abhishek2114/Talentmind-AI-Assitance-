import { TalentMindDashboard } from '@/components/dashboard/TalentMindDashboard';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
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
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">
              Unlock Your Career Potential with AI
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Upload your resume and a job description to get a detailed analysis, discover skill gaps, and receive personalized feedback to land your dream job.
            </p>
          </div>
          {heroImage && (
            <div className="relative h-80 lg:h-full min-h-[300px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </section>

        <TalentMindDashboard />
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Powered by Firebase and Google AI</p>
      </footer>
    </div>
  );
}
