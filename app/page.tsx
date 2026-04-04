'use client';

import { Nav } from './components/nav';
import { Hero } from './components/hero';
import { Features } from './components/features';
import { Steps } from './components/steps';
import { CTA } from './components/cta';
import { Footer } from './components/footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="px-4!">
        <Features />
        <Steps />
        <CTA />
        <Footer />
      </div>
    </>
  );
}