'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}

export const TabButton = ({ active, onClick, label, count }: TabButtonProps) => (
  <button 
    onClick={onClick}
    className={`pb-5! text-sm! font-bold tracking-tight transition-all relative group ${active ? 'text-t1' : 'text-t3 hover:text-t2'}`}
  >
    <div className="flex items-center gap-2.5!">
      {label}
      <span className={`px-2! py-0.5! rounded-lg! text-[9px]! font-black ${active ? 'bg-accent/20 text-accent' : 'bg-white/5 text-t3 group-hover:bg-white/10'}`}>
        {count}
      </span>
    </div>
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-[2px]! bg-accent shadow-[0_0_20px_rgba(234,179,8,0.6)]"
      />
    )}
  </button>
);
