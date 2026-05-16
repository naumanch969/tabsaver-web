'use client';

import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface SidebarActionProps {
  icon: LucideIcon;
  label: string;
  desc: string;
}

export const SidebarAction = ({ icon: Icon, label, desc }: SidebarActionProps) => (
  <button className="w-full text-left p-5! rounded-2xl! hover:bg-white/5 transition-all group flex items-center gap-5!">
     <div className="w-12 h-12 rounded-2xl! bg-white/5 flex items-center justify-center shrink-0 border border-line group-hover:border-accent/20 transition-all">
        <Icon size={20} className="text-t3 group-hover:text-accent transition-colors" />
     </div>
     <div className="grow">
        <div className="text-sm! font-bold text-t1 mb-0.5! tracking-tight">{label}</div>
        <div className="text-[11px]! font-medium text-t3 opacity-40 group-hover:opacity-80 transition-opacity">{desc}</div>
     </div>
     <ArrowRight size={14} className="text-t3 opacity-0 group-hover:opacity-100 -translate-x-3! group-hover:translate-x-0! transition-all" />
  </button>
);
