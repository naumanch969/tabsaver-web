'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { GlassCard, SerifHeading, Badge, Section, Container, ANIM_VARIANTS } from '@/components/ui';
import { FEATURES_DATA } from '@/constants/landing';

export const Features = () => {
  return (
    <Section id="features" className="py-24! md:py-32!">
      <Container className="mx-auto!">
        <FeaturesHeader />
        <FeaturesGrid />
      </Container>
    </Section>
  );
};

const FeaturesHeader = () => (
  <div className="flex flex-col md:flex-row! justify-between! items-end! mb-16! md:mb-20! gap-10! mx-auto!">
    <div className="max-w-3xl! mx-auto! md:mx-0! flex flex-col">
      <Badge variant="accent" className="w-fit! mb-8! px-6! py-2! text-[10px]! tracking-[0.3em]">Core Features</Badge>
      <SerifHeading as="h2" className="tracking-tighter">
        Simple, clear, and direct<br />tab management.
      </SerifHeading>
      <p className="text-base! md:text-lg! font-medium leading-relaxed max-w-xl! opacity-70 text-t2">
        Whether you are doing research, planning a trip, or just cleaning up your browser, TabStack makes organizing tabs a breeze.
      </p>
    </div>

    <div className="hidden md:block pb-6!">
      <div className="flex items-center gap-4! text-accent font-black tracking-[0.4em] text-[10px]! uppercase cursor-pointer hover:opacity-70 transition-all group">
        Explore capabilities 
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

const FeaturesGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6! md:gap-10! mx-auto!">
    {FEATURES_DATA.map((feature, i) => (
      <FeatureCard key={feature.title} feature={feature} index={i} />
    ))}
  </div>
);

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const FeatureCard = ({ feature, index }: { feature: Feature, index: number }) => {
  const Icon = feature.icon;
  return (
    <GlassCard 
      {...{
        ...ANIM_VARIANTS.fadeInUp,
        transition: { ...ANIM_VARIANTS.fadeInUp.transition, delay: index * 0.1 }
      }}
      viewport={{ once: true }}
      className="p-10! group relative overflow-hidden rounded-4xl!"
    >
      <div className="w-14! h-14! bg-accent/10 rounded-2xl! flex items-center justify-center mb-6! group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-2xl! shadow-accent/10 border border-accent/20">
        <div className="text-accent group-hover:text-bg transition-colors duration-500">
          <Icon size={28} />
        </div>
      </div>
      <SerifHeading as="h3" className="tracking-tight">{feature.title}</SerifHeading>
      <p className="text-base! md:text-lg! leading-relaxed group-hover:text-t1 transition-colors duration-500 font-medium opacity-60 group-hover:opacity-100">
        {feature.desc}
      </p>
      
      <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
        <Icon size={160} />
      </div>
    </GlassCard>
  );
};

