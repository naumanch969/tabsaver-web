'use client';

import React from 'react';
import { GlassCard, SerifHeading } from '@/components/ui';
import { LucideIcon } from 'lucide-react';

interface TermsCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const TermsCard = ({ icon: Icon, title, desc }: TermsCardProps) => (
  <GlassCard className="p-12! md:p-16! space-y-10! rounded-[3rem]! border-white/5!" hover={false}>
    <div className="w-16! h-16! bg-accent/10 rounded-2xl! flex items-center justify-center border border-accent/20">
      <Icon className="text-accent" size={28} />
    </div>
    <div className="space-y-4!">
      <SerifHeading as="h3" className="tracking-tight">{title}</SerifHeading>
      <p className="text-t2 text-base! md:text-lg! leading-relaxed font-medium opacity-70">
        {desc}
      </p>
    </div>
  </GlassCard>
);
