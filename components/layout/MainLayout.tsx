'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackgroundDecor } from './BackgroundDecor';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  userEmail?: string | null;
  onSignOut?: () => void;
  showFooter?: boolean;
  className?: string;
  mainClassName?: string;
}

export const MainLayout = ({ 
  children, 
  userEmail, 
  onSignOut, 
  showFooter = true,
  className,
  mainClassName
}: MainLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-bg text-t1 selection:bg-accent/30 overflow-x-hidden relative flex flex-col",
      className
    )}>
      <BackgroundDecor />
      <Navbar userEmail={userEmail} onSignOut={onSignOut} />
      
      <main className={cn("relative z-10 pt-24! md:pt-32! grow", mainClassName)}>
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};
