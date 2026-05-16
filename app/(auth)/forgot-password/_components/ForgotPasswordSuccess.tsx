import React from 'react';
import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ForgotPasswordSuccessProps {
  email: string;
}

export const ForgotPasswordSuccess = ({ email }: ForgotPasswordSuccessProps) => {
  return (
    <motion.div key="success" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
      <div className="p-10! bg-bg2/20 border border-white/5 rounded-3xl!">
        <div className="w-16! h-16! bg-green-500/10 rounded-2xl! flex items-center justify-center mb-8! border border-green-500/20">
          <CheckCircle2 className="text-green-400" size={32} />
        </div>
        <h3 className="text-2xl font-serif mb-4">Link Sent</h3>
        <p className="text-t2 text-lg! leading-relaxed mb-10! opacity-70">
          A recovery protocol has been dispatched to <span className="text-t1 font-bold">{email}</span>.
        </p>
        <Link href="/sign-in">
          <PremiumButton variant="secondary" className="w-full! py-4! rounded-xl!">
            Back to Sign In
          </PremiumButton>
        </Link>
      </div>
    </motion.div>
  );
};
