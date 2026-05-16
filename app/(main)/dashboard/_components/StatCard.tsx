'use client';

import React from 'react';
import { GlassCard, Label } from '@/components/ui';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
}

export const StatCard = ({ icon: Icon, label, value, trend }: StatCardProps) => (
  <GlassCard className="p-6! md:p-8! flex items-start gap-5! rounded-lg!" hover={false}>
    <div className="w-12! h-12! md:w-14! md:h-14! bg-white/5 rounded-lg! flex items-center justify-center border border-line shrink-0">
       <Icon size={22} className="text-accent/60" />
    </div>
    <div className="grow">
       <Label className="mb-2! block opacity-40 text-[9px]! font-black uppercase tracking-[0.3em]">{label}</Label>
       <div className="text-2xl! md:text-3xl! font-bold mb-1.5! tracking-tight leading-none">{value}</div>
       <div className="text-[9px]! font-bold uppercase tracking-[0.3em] text-accent/40">{trend}</div>
    </div>
  </GlassCard>
);
