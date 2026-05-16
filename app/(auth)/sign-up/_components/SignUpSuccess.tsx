import React from 'react';
import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

interface SignUpSuccessProps {
  email: string;
  onBack: () => void;
}

export const SignUpSuccess = ({ email, onBack }: SignUpSuccessProps) => {
  return (
    <motion.div key="success" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
      <div className="p-10! bg-bg2/20 border border-green-500/10 rounded-3xl! border-white/5!">
        <div className="w-16! h-16! bg-green-500/10 rounded-2xl! flex items-center justify-center mb-8! border border-green-500/20">
          <CheckCircle2 className="text-green-400" size={32} />
        </div>
        <h3 className="text-2xl font-serif mb-4">Registration Sent</h3>
        <p className="text-t2 text-lg! leading-relaxed mb-10! opacity-70">
          A verification link has been sent to <span className="text-t1 font-bold">{email}</span>. Please authorize to continue.
        </p>
        <PremiumButton variant="secondary" onClick={onBack} className="w-full! py-4! rounded-xl!">
          Return to Sign In
        </PremiumButton>
      </div>
    </motion.div>
  );
};
