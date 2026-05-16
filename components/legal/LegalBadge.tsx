'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LegalBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const LegalBadge = ({ children, className }: LegalBadgeProps) => (
  <div className={cn(
    "inline-flex items-center gap-3! bg-accent/10 border border-accent/20 px-5! py-2! rounded-full text-accent font-black uppercase tracking-[0.4em] text-[9px]",
    className
  )}>
    <div className="w-1.5! h-1.5! rounded-full bg-accent animate-pulse" />
    {children}
  </div>
);
