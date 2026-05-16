'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Fingerprint } from 'lucide-react';
import { GlassCard, PremiumButton, Label } from '@/components/ui';

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  message: { type: 'success' | 'error', text: string } | null;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignInForm = ({ email, setEmail, loading, message, onSubmit }: SignInFormProps) => (
  <motion.div
    key="form"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -20, opacity: 0 }}
    transition={{ delay: 0.1 }}
    className="mx-auto!"
  >
    <GlassCard className="p-10! md:p-14! relative overflow-hidden rounded-[2.5rem]! border-white/5!" hover={false}>
      <form onSubmit={onSubmit} className="space-y-8! relative z-10">
        <div className="space-y-4!">
          <div className="flex items-center justify-between px-2!">
            <Label className="tracking-[0.4em] opacity-40 text-[9px] uppercase font-black">Identity Verification</Label>
            <div className="flex items-center gap-2! text-[9px] text-accent font-black uppercase tracking-widest">
              <Lock size={10} /> Secure
            </div>
          </div>
          
          <div className="relative group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vault.owner@example.com"
              className="w-full bg-bg2/40 border border-white/5! rounded-xl! py-5! px-7! text-t1 placeholder:text-t3/30 focus:outline-none focus:border-accent/30! focus:bg-bg2/60 transition-all font-medium text-lg!"
            />
          </div>
        </div>

        {message?.type === 'error' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3! px-5! rounded-xl! flex items-center gap-3!"
          >
            <div className="w-1.5! h-1.5! rounded-full bg-red-400" />
            {message.text}
          </motion.div>
        )}

        <PremiumButton
          type="submit"
          disabled={loading}
          className="w-full! py-6! text-lg! h-16! rounded-xl! shadow-2xl! shadow-accent/10 group"
        >
          {loading ? (
            <span className="flex items-center gap-4!">
              <div className="w-5! h-5! border-2! border-bg/30 border-t-bg rounded-full animate-spin" />
              Initializing...
            </span>
          ) : (
            <span className="flex items-center gap-3!">
              Request Magic Link
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          )}
        </PremiumButton>

        <p className="text-center text-[10px]! text-t3 font-black uppercase tracking-[0.3em] opacity-30 leading-loose">
          Passwordless authentication • Single-use token distribution
        </p>
      </form>
      
      <div className="absolute -bottom-8 -right-8 opacity-[0.02] pointer-events-none">
        <Fingerprint size={180} />
      </div>
    </GlassCard>
  </motion.div>
);
