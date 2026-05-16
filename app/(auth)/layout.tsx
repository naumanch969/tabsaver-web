'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/layout/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-t1 selection:bg-accent/30 overflow-x-hidden relative flex flex-col md:flex-row">
      
      {/* LEFT SIDE: CONTENT */}
      <div className="relative z-10 w-full md:w-1/2 lg:w-[45%] flex flex-col min-h-screen bg-bg">
        {/* Header/Logo */}
        <header className="p-8 md:p-12">
          <Logo />
        </header>

        {/* Main Form Area */}
        <main className="grow flex items-center justify-center p-8 md:p-12 pt-0 md:pt-0">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>

        {/* Footer info */}
        <footer className="p-8 md:p-12 opacity-40 text-[10px] uppercase tracking-[0.2em] font-black">
          © {new Date().getFullYear()} TabStack Protocol.
        </footer>
      </div>

      {/* RIGHT SIDE: VISUALS - Simplified */}
      <div className="hidden md:flex relative w-1/2 lg:w-[55%] bg-bg2/30 border-l border-white/5 overflow-hidden items-center justify-center">
        {/* Subtle non-laggy gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,179,8,0.05),transparent_70%)]" />
        
        <div className="relative z-10 p-20 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-t1 leading-tight tracking-tighter mb-6">
              Organize your digital workspace with <span className="text-accent italic">TabStack.</span>
            </h2>
            <p className="text-t3 text-lg leading-relaxed font-medium opacity-60">
              The intelligent way to manage tabs, bookmarks, and your online productivity.
            </p>
          </motion.div>
        </div>

        {/* Static decorative element instead of animation if lag was an issue */}
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-t from-accent/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
