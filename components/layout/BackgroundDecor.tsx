import React from 'react';
import { GridPattern } from '@/components/ui';

export const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base Grid */}
      <GridPattern className="opacity-[0.03] scale-[2]" />
      
      {/* Subtle Glows (Gradients only, no blur for performance) */}
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05),transparent_70%)] opacity-20" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.02),transparent_70%)] opacity-10" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-line/30 to-transparent opacity-20" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-line/30 to-transparent opacity-20" />
    </div>
  );
};

