import React from 'react';

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center grow p-6! gap-8!">
    <div className="w-16! h-16! border-2! border-accent border-t-transparent rounded-full animate-spin" />
    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-accent animate-pulse">Deciphering broadcast...</p>
  </div>
);
