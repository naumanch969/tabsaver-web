'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { GlassCard, PremiumButton, SerifHeading } from '@/components/ui';

interface SuccessStateProps {
  email: string;
  onReset: () => void;
}

export const SuccessState = ({ email, onReset }: SuccessStateProps) => (
  <motion.div
    key="success"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center mx-auto!"
  >
    <GlassCard className="p-12! md:p-20! border-green-500/10! rounded-[2.5rem]!" hover={false}>
      <div className="w-20! h-20! bg-green-500/10 rounded-2xl! flex items-center justify-center mx-auto! mb-10! border border-green-500/20 relative">
        <CheckCircle2 className="text-green-400" size={40} />
      </div>
      
      <SerifHeading as="h3">Check your inbox</SerifHeading>
      
      <p className="text-t2 text-lg! leading-relaxed mb-10! font-medium opacity-70">
        We&apos;ve dispatched a secure gateway link to:<br />
        <span className="text-t1 font-bold block mt-3! text-xl!">{email}</span>
      </p>
      
      <div className="space-y-6!">
        <PremiumButton
          variant="secondary"
          onClick={onReset}
          className="w-full! py-5! text-base! rounded-xl!"
        >
          Use different email
        </PremiumButton>
        <p className="text-t3 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
          Token expiration: 15 minutes
        </p>
      </div>
    </GlassCard>
  </motion.div>
);
