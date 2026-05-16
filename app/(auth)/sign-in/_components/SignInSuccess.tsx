'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PremiumButton, SerifHeading } from '@/components/ui';

interface SignInSuccessProps {
  email: string;
  onReset: () => void;
}

export const SignInSuccess = ({ email, onReset }: SignInSuccessProps) => (
  <motion.div
    key="success"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="w-full"
  >
    <div className="p-10! md:p-14! bg-bg2/20 border border-white/5 rounded-4xl!">
      <div className="w-16! h-16! bg-green-500/10 rounded-2xl! flex items-center justify-center mb-8! border border-green-500/20 relative">
        <CheckCircle2 className="text-green-400" size={32} />
      </div>
      
      <SerifHeading as="h3" className="mb-4!">Check your inbox</SerifHeading>
      
      <p className="text-t2 text-lg! leading-relaxed mb-10! font-medium opacity-70">
        We&apos;ve dispatched a secure gateway link to:<br />
        <span className="text-t1 font-bold block mt-3! text-xl!">{email}</span>
      </p>
      
      <div className="space-y-6!">
        <PremiumButton
          variant="secondary"
          onClick={onReset}
          className="w-full! py-5! text-base! rounded-2xl!"
        >
          Use different email
        </PremiumButton>
        <p className="text-t3 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
          Token expiration: 15 minutes
        </p>
      </div>
    </div>
  </motion.div>
);
