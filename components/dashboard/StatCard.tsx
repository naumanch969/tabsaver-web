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
  <GlassCard className="p-10! flex items-start gap-8! rounded-[2.5rem]!" hover={false}>
    <div className="w-16! h-16! bg-white/5 rounded-2xl! flex items-center justify-center border border-line shrink-0">
       <Icon size={28} className="text-accent/60" />
    </div>
    <div className="grow">
       <Label className="mb-3! block opacity-40 text-[11px]! font-black uppercase tracking-[0.4em]">{label}</Label>
       <div className="text-3xl! md:text-4xl! font-bold mb-2! tracking-tighter leading-none">{value}</div>
       <div className="text-[10px]! font-black uppercase tracking-[0.4em] text-accent/40">{trend}</div>
    </div>
  </GlassCard>
);
