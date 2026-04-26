'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, ArrowRight, Shield, Zap, Globe, Layers, Command, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-t1 selection:bg-accent/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <Cloud className="w-6 h-6 text-bg" />
          </div>
          <span className="font-bold text-xl tracking-tight">tab<span className="text-accent">stack</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-semibold text-t2 hover:text-t1 transition-colors">Features</a>
          <Link href="/dashboard" className="text-sm font-semibold text-t2 hover:text-t1 transition-colors">Dashboard</Link>
          <Link href="/sign-in" className="btn-secondary h-11 px-6 text-sm">Sign In</Link>
          <Link href="/sign-in" className="btn-primary h-11 px-7 text-sm">Download Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-32 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-widest font-bold mb-10"
        >
          <Zap size={12} fill="currentColor" /> Now with Cloud Sync v2.0
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 font-serif leading-[1.05]"
        >
          Your browser tabs,<br />
          <span className="text-accent italic font-medium">secured in a vault.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-t2 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          TabStack snapshots your open windows into organized vaults. 
          Sync your work across profiles and share entire sessions with a single secure link.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link href="/sign-in" className="btn-primary text-base py-5 px-10 group shadow-2xl">
            Get TabStack for Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/dashboard" className="btn-secondary text-base py-5 px-10">
            Open Cloud Vault
          </Link>
        </motion.div>
      </header>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: <Shield className="text-accent" />, 
              title: "Encrypted Vaults", 
              desc: "Save snapshots locally or sync them to our encrypted cloud. Your browsing data never leaves your control."
            },
            { 
              icon: <Globe className="text-accent" />, 
              title: "Public Broadcast", 
              desc: "Share your curated collections of resources with teammates or the world via secure, shareable broadcast links."
            },
            { 
              icon: <Layers className="text-accent" />, 
              title: "Multi-Profile Sync", 
              desc: "Log in once and sync your work sessions across work, personal, and experimental browser profiles instantly."
            }
          ].map((feature, i) => (
            <div key={i} className="p-10 bg-bg2 border border-line rounded-[2.5rem] hover:bg-bg3 hover:border-line2 transition-all">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif">{feature.title}</h3>
              <p className="text-t2 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-line py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-t3/10 rounded-lg flex items-center justify-center">
               <Cloud className="w-5 h-5 text-t3" />
             </div>
             <span className="font-bold text-t2">tab<span className="text-t3">stack</span></span>
          </div>

          <div className="flex gap-10 text-sm font-semibold text-t3">
            <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <a href="https://github.com" className="hover:text-accent transition-colors">Engineering</a>
          </div>

          <div className="flex gap-6">
             <a href="#" className="text-t3 hover:text-accent transition-colors"><Command size={20} /></a>
             <a href="#" className="text-t3 hover:text-accent transition-colors"><ExternalLink size={20} /></a>
          </div>
        </div>
        <div className="text-center mt-12 text-[10px] text-t3 uppercase tracking-[0.3em] font-bold">
          © 2026 NAUMAN CHAUDHRY. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}