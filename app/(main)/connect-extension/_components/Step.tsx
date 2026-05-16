import React from 'react';
import { Label } from '@/components/ui';

interface StepProps {
  active: boolean;
  done: boolean;
  icon: React.ElementType;
  title: string;
  num: string;
}

export const Step = ({ active, done, icon: Icon, title, num }: StepProps) => (
  <div className={`flex items-center gap-10! transition-all duration-700 ${active ? 'opacity-100 translate-x-6!' : 'opacity-20'}`}>
    <div className={`w-14! h-14! rounded-lg! border flex items-center justify-center shrink-0 transition-all duration-700 ${done ? 'bg-green-500/10 border-green-500/20 scale-90' : (active ? 'bg-accent/10 border-accent/20 scale-110 shadow-2xl shadow-accent/20' : 'bg-white/5 border-white/5')}`}>
      <Icon size={28} className={done ? 'text-green-400' : (active ? 'text-accent' : 'text-t2')} />
    </div>
    <div>
      <Label className="text-[11px]! uppercase tracking-[0.5em]! opacity-40 mb-2! block font-black">Step {num}</Label>
      <p className="font-bold text-lg! md:text-xl! tracking-tighter! leading-none">{title}</p>
    </div>
  </div>
);
