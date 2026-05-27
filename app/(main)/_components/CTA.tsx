'use client';

import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GlassCard, SerifHeading, PremiumButton, Section, Container, ANIM_VARIANTS } from '@/components/ui';

export const CTA = () => {
  return (
    <Section className="pb-32! md:pb-48!">
      <Container className="mx-auto!">
        <GlassCard 
          {...ANIM_VARIANTS.fadeInUp}
          viewport={{ once: true }}
          className="p-16! md:p-24! text-center! bg-accent/5 border-accent/10 relative overflow-hidden rounded-[3rem]! max-w-6xl! mx-auto!" 
          hover={false}
        >
          <div className="relative z-10 max-w-4xl! mx-auto!">
            <SerifHeading as="h2" className="tracking-tighter">
              Ready to get started?
            </SerifHeading>
            <p className="text-t2 text-base! md:text-lg! font-medium leading-relaxed mb-16! opacity-70">
              Join thousands of people who use TabStack to stay organized and never lose a tab again.
            </p>
            <div className="flex flex-col! sm:flex-row! items-center! justify-center! gap-6! mx-auto!">
              <Link href="/sign-in" className="w-full! sm:w-auto!">
                <PremiumButton variant="primary">
                  Download for Chrome
                  <Download size={18} />
                </PremiumButton>
              </Link>
              <Link href="/dashboard" className="w-full! sm:w-auto!">
                <PremiumButton variant="outline">
                  Open Dashboard
                  <ArrowRight size={18} />
                </PremiumButton>
              </Link>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full! h-full! bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,transparent_70%)] pointer-events-none" />
        </GlassCard>
      </Container>
    </Section>
  );
};
