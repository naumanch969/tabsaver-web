import React from 'react';
import { motion } from 'framer-motion';
import { PremiumButton, Label } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export const ForgotPasswordForm = ({
  email,
  setEmail,
  onSubmit,
  loading,
  error
}: ForgotPasswordFormProps) => {
  return (
    <motion.div key="form" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
      <form onSubmit={onSubmit} className="space-y-6!">
        <div className="space-y-2!">
          <Label className="text-[10px] opacity-60">Email Address</Label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-bg2/20 border border-white/10 rounded-lg! py-4! px-5! text-t1 placeholder:text-t3/30 focus:outline-none focus:border-accent/40 transition-all font-medium"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3! px-5! rounded-lg! flex items-center gap-3!">
            <div className="w-1.5! h-1.5! rounded-full bg-red-400" />
            {error}
          </div>
        )}

        <PremiumButton type="submit" disabled={loading} className="w-full! py-4! h-14!">
          {loading ? 'Dispatching...' : 'Send Recovery Link'}
        </PremiumButton>

        <Link href="/sign-in" className="flex items-center justify-center gap-2! text-[10px] text-t3 hover:text-accent font-black uppercase tracking-widest transition-colors">
          <ArrowLeft size={12} />
          Back to Login
        </Link>
      </form>
    </motion.div>
  );
};
