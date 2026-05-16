'use client';

import { BackgroundDecor } from '@/components/layout/BackgroundDecor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero, Features, CTA } from '@/components/landing';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-t1 selection:bg-accent/30 overflow-x-hidden relative">
      <BackgroundDecor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
