'use client';

import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { GlassCard, SerifHeading, Badge, Section, Container, ANIM_VARIANTS } from '@/components/ui';

const TESTIMONIALS = [
  {
    text: "One of my favorite extensions of all time. Smoothens my workflow.",
    author: "Google User"
  },
  {
    text: "It's good. Easy to use. One thing I would want is to have my history connected with an account, but thats just okay.",
    author: "Google User"
  },
  {
    text: "It's minimal and clean, and honestly, so useful when you're just navigating across so many tab sessions.",
    author: "Google User"
  },
  {
    text: "A lifesaver for research projects. I can finally close my tabs without fear of losing my references.",
    author: "Google User"
  },
  {
    text: "Very straightforward and does exactly what it says. Grouping tabs has never been this simple.",
    author: "Google User"
  },
  {
    // text: "Great for sharing links with my team quickly. Just one click and done.",
    text: "Does what it says. No complaints so far.",
    author: "Google User"
  }
];

export const Testimonials = () => {
  return (
    <Section id="testimonials" className="py-24! md:py-32! bg-bg/50">
      <Container className="mx-auto!">
        <TestimonialsHeader />
        <TestimonialsGrid />
        <TestimonialsFooter />
      </Container>
    </Section>
  );
};

const TestimonialsHeader = () => (
  <div className="flex flex-col items-center text-center mb-16! md:mb-20! gap-6! mx-auto!">
    <Badge variant="accent" className="px-6! py-2! text-[10px]! tracking-[0.3em]">Loved by Users</Badge>
    <SerifHeading as="h2" className="tracking-tighter">
      Don't just take our word for it.
    </SerifHeading>
    <p className="text-base! md:text-lg! font-medium leading-relaxed max-w-xl! opacity-70 text-t2">
      See what people are saying about how TabStack improves their daily workflow.
    </p>
  </div>
);

const TestimonialsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6! md:gap-8! mx-auto! mb-12!">
    {TESTIMONIALS.map((testimonial, i) => (
      <GlassCard 
        key={i}
        {...{
          ...ANIM_VARIANTS.fadeInUp,
          transition: { ...ANIM_VARIANTS.fadeInUp.transition, delay: i * 0.1 }
        }}
        viewport={{ once: true }}
        className="p-8! rounded-lg! flex flex-col gap-6!"
      >
        <div className="flex gap-1 text-accent">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} size={16} fill="currentColor" />
          ))}
        </div>
        <p className="text-base! leading-relaxed text-t1 font-medium italic flex-grow">
          "{testimonial.text}"
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
            G
          </div>
          <span className="text-sm font-semibold opacity-80">{testimonial.author}</span>
        </div>
      </GlassCard>
    ))}
  </div>
);

const TestimonialsFooter = () => (
  <div className="flex justify-center">
    <a 
      href="https://chromewebstore.google.com/detail/tab-saver/fcoojccdffamjgkgcegmiopcmipnieeb/reviews" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-accent font-semibold hover:opacity-80 transition-opacity"
    >
      View all reviews on Chrome Web Store
      <ExternalLink size={16} />
    </a>
  </div>
);
