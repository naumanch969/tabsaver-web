'use client';

import React from 'react';
import { GlassCard, SerifHeading, Section, Container, ANIM_VARIANTS } from '@/components/ui';
import { STATS_DATA } from '@/constants/landing';

export const Stats = () => {
  return (
    <Section className="py-16! md:py-24!">
      <Container className="mx-auto!">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6! md:gap-10! mx-auto!">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

const StatCard = ({ stat, index }: { stat: StatItem, index: number }) => (
  <GlassCard
    {...{
      ...ANIM_VARIANTS.fadeIn,
      transition: { ...ANIM_VARIANTS.fadeIn.transition, delay: index * 0.1 }
    }}
    viewport={{ once: true }}
    className="p-8! md:p-12! text-center! border-none! shadow-none! bg-transparent! hover:bg-accent/5 transition-colors duration-500 rounded-[2.5rem]!"
  >
    <div className="text-accent font-black tracking-[0.3em] text-[10px]! uppercase mb-4! opacity-50">{stat.label}</div>
    <SerifHeading as="h4" className="text-4xl! md:text-6xl! tracking-tighter mb-1! leading-none">
      {stat.value}
    </SerifHeading>
    <div className="text-xs! md:text-base! font-medium uppercase tracking-widest opacity-40">{stat.suffix}</div>
  </GlassCard>
);

