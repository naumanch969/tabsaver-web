'use client';

import { motion } from 'framer-motion';
import { Download, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge, PremiumButton, Section, Container, ANIM_VARIANTS, SerifHeading } from '@/components/ui';

export const Hero = () => {
  return (
    <Section className="pt-32! md:pt-50! pb-32! md:pb-40!">
      <Container className="flex flex-col! items-center! text-center! mx-auto!">
        <div className="flex flex-col! items-center! text-center! gap-8! md:gap-10! max-w-5xl! mx-auto!">
          <div className="space-y-4">
            <HeroBadge />
            <HeroTitle />
          </div>
          <HeroDescription />
          <HeroActions />
        </div>
      </Container>
    </Section>
  );
};

const HeroBadge = () => (
  <motion.div {...ANIM_VARIANTS.fadeInUp} className='w-fit mx-auto'>
    <Badge variant="accent" className="px-6! py-2! flex items-center gap-3! text-[10px]! tracking-[0.3em]">
      <Zap size={12} fill="currentColor" className="animate-pulse text-accent" />
      System Protocol v2.0 Active
    </Badge>
  </motion.div>
);

const HeroTitle = () => (
  <motion.div
    {...ANIM_VARIANTS.fadeInUp}
    className="space-y-4!"
  >
    <SerifHeading as="h1" className="text-balance tracking-tighter">
      Your browser tabs,<br />
      <span className="text-accent italic font-medium relative inline-block">
        secured in a vault.
        <svg className="absolute -bottom-4 left-0 w-full h-4 text-accent/10" viewBox="0 0 400 12" preserveAspectRatio="none">
          <path d="M0,10 Q100,0 200,10 T400,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </span>
    </SerifHeading>
  </motion.div>
);

const HeroDescription = () => (
  <motion.p
    {...{
      ...ANIM_VARIANTS.fadeInUp,
      transition: { ...ANIM_VARIANTS.fadeInUp.transition, delay: 0.2 }
    }}
    className="text-base! md:text-lg! max-w-4xl! mx-auto! leading-relaxed text-balance font-medium text-t2 px-4!"
  >
    TabStack snapshots your complex browser windows into high-performance, encrypted vaults.
    Sync across identities and broadcast entire architectures with authority.
  </motion.p>
);


const HeroActions = () => (
  <motion.div
    {...{
      ...ANIM_VARIANTS.fadeInUp,
      transition: { ...ANIM_VARIANTS.fadeInUp.transition, delay: 0.4 }
    }}
    className="flex flex-col! sm:flex-row! items-center! justify-center! gap-5! w-full sm:w-auto mx-auto!"
  >
    <Link href="/sign-in" className="w-full sm:w-auto">
      <PremiumButton variant="primary">
        Download Extension
        <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
      </PremiumButton>
    </Link>
    <Link href="/dashboard" className="w-full sm:w-auto">
      <PremiumButton variant="outline">
        Enter Cloud Vault
        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
      </PremiumButton>
    </Link>
  </motion.div>
);

