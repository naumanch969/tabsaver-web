'use client';

import React from 'react';
import { GlassCard, SerifHeading } from '@/components/ui';
import { LucideIcon } from 'lucide-react';

interface PrivacyCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const PrivacyCard = ({ icon: Icon, title, desc }: PrivacyCardProps) => (
  <GlassCard className="p-10! md:p-14! space-y-8! rounded-[2.5rem]! border-white/5!" hover={false}>
    <div className="w-14! h-14! bg-accent/10 rounded-xl! flex items-center justify-center border border-accent/20">
      <Icon className="text-accent" size={24} />
    </div>
    <div className="space-y-4!">
      <SerifHeading as="h3" className="text-2xl! md:text-3xl! tracking-tight">{title}</SerifHeading>
      <p className="text-t2 text-base! md:text-lg! leading-relaxed font-medium opacity-70">
        {desc}
      </p>
    </div>
  </GlassCard>
);
